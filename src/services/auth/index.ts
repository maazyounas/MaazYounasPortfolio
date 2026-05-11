import jwt from "jsonwebtoken";
import AdminUser from "@/models/AdminUser";
import { env } from "@/lib/server/env";
import { LoginRequest, LoginResponse, ChangePasswordRequest, ForgotPasswordRequest, PasswordResetRequest } from "./types";

const JWT_SECRET = env.JWT_SECRET;

/**
 * Get default admin credentials from environment variables
 */
const getDefaults = () => ({
  username: env.ADMIN_USERNAME,
  email: env.ADMIN_EMAIL,
  password: env.ADMIN_PASSWORD,
});

/**
 * Ensure default admin user exists in database
 */
async function ensureDefaultAdminExists() {
  let user = await AdminUser.findOne();
  
  if (!user) {
    const defaults = getDefaults();
    user = await AdminUser.create({
      username: defaults.username,
      email: defaults.email,
      password: defaults.password,
      securitySettings: {
        adminUsername: defaults.username,
        sessionTimeout: 30,
        maxLoginAttempts: 5,
        lockoutDuration: 15,
      },
    });
  }
  
  return user;
}

/**
 * Sync environment defaults to admin user
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function syncDefaultsToUser(user: any) {
  const defaults = getDefaults();
  let needsSave = false;

  // Ensure user has email
  if (!user.email) {
    user.email = defaults.email;
    if (!user.username) {
      user.username = defaults.username;
    }
    if (!user.password) {
      user.password = defaults.password;
    }
    needsSave = true;
  }

  // Ensure user has username
  if (!user.username) {
    user.username = user.email || defaults.username;
    needsSave = true;
  }

  if (needsSave) {
    await user.save();
  }

  return user;
}

/**
 * Find admin user by username or email
 */
async function findAdminUser(usernameOrEmail: string) {
  return (
    (await AdminUser.findOne({ username: usernameOrEmail })) ||
    (await AdminUser.findOne({ email: usernameOrEmail }))
  );
}

/**
 * Login admin user
 */
export async function loginAdmin(payload: LoginRequest): Promise<LoginResponse> {
  const usernameOrEmail = payload.username ?? payload.email ?? "";
  const password = payload.password;

  // Ensure default admin exists
  await ensureDefaultAdminExists();

  // Find user
  let user = await findAdminUser(usernameOrEmail);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  // Sync defaults to user
  user = await syncDefaultsToUser(user);

  const defaults = getDefaults();

  // Check if login uses default credentials
  const matchesDefaultsLogin =
    (usernameOrEmail === defaults.username || usernameOrEmail === defaults.email) &&
    password === defaults.password;

  if (matchesDefaultsLogin) {
    const needsUpdate =
      user.username !== defaults.username ||
      user.email !== defaults.email ||
      user.password !== defaults.password;
    if (needsUpdate) {
      user.username = defaults.username;
      user.email = defaults.email;
      user.password = defaults.password;
      await user.save();
    }
  }

  // Verify password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, username: user.username, email: user.email },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  // Update last login
  user.lastLogin = new Date();
  await user.save();

  return {
    token,
    user: {
      id: user._id.toString(),
      username: user.username || user.email,
      email: user.email,
      role: "admin",
    },
  };
}

/**
 * Initiate password reset by sending code to email
 */
export async function initiatePasswordReset(payload: ForgotPasswordRequest): Promise<string> {
  const admin = await AdminUser.findOne({ email: payload.email });
  
  if (!admin) {
    throw new Error("Account not found");
  }

  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const resetCodeExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  admin.resetCode = resetCode;
  admin.resetCodeExpiry = resetCodeExpiry;
  await admin.save();

  return resetCode; // Return for email sending
}

/**
 * Reset password with reset code
 */
export async function resetPassword(payload: PasswordResetRequest): Promise<void> {
  const admin = await AdminUser.findOne({ email: payload.email });

  if (!admin || !admin.resetCode || !admin.resetCodeExpiry) {
    throw new Error("Invalid reset code");
  }

  if (admin.resetCode !== payload.resetCode) {
    throw new Error("Invalid reset code");
  }

  if (admin.resetCodeExpiry.getTime() < Date.now()) {
    throw new Error("Reset code expired");
  }

  // Update password
  admin.password = payload.newPassword;
  admin.resetCode = undefined;
  admin.resetCodeExpiry = undefined;
  await admin.save();
}

/**
 * Change password for authenticated user
 */
export async function changePassword(payload: ChangePasswordRequest): Promise<void> {
  let admin = payload.email
    ? await AdminUser.findOne({ email: payload.email })
    : await AdminUser.findOne();

  if (!admin) {
    // Create default admin if doesn't exist
    admin = await ensureDefaultAdminExists();
  }

  // Verify current password
  const isMatch = await admin.comparePassword(payload.currentPassword);
  if (!isMatch) {
    throw new Error("Current password is incorrect");
  }

  // Update password
  admin.password = payload.newPassword;
  await admin.save();
}

/**
 * Verify JWT token
 */
export function verifyToken(token: string): { id: string; username: string; email: string } {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; username: string; email: string };
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
}
