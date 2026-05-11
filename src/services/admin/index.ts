import AdminUser from "@/models/AdminUser";
import { SecuritySettings } from "./types";

/**
 * Normalize security settings from Map or object
 */
function normalizeSettings(value: unknown): Record<string, unknown> {
  if (!value) return {};
  if (value instanceof Map) {
    return Object.fromEntries(value);
  }
  if (typeof value === "object") {
    return value as Record<string, unknown>;
  }
  return {};
}

/**
 * Get current admin security settings
 */
export async function getSecuritySettings(): Promise<SecuritySettings> {
  const admin = await AdminUser.findOne();

  if (!admin) {
    return {};
  }

  const securitySettings = normalizeSettings(admin.securitySettings);

  return {
    ...securitySettings,
    email: admin.email,
    adminUsername: (admin.username || securitySettings.adminUsername || "admin") as string,
    resumeUrl: (admin.resumeUrl || securitySettings.resumeUrl || "") as string,
    lastLogin: admin.lastLogin?.toISOString() || (securitySettings.lastLogin as string | undefined),
  };
}

/**
 * Update admin security settings
 */
export async function updateSecuritySettings(settings: SecuritySettings): Promise<SecuritySettings> {
  const admin = await AdminUser.findOne();

  if (!admin) {
    throw new Error("Admin user not found");
  }

  const existing = normalizeSettings(admin.securitySettings);
  const nextSettings = new Map(Object.entries({ ...existing, ...settings }));

  admin.securitySettings = nextSettings;

  // Update top-level fields if provided
  if (settings.email && settings.email !== admin.email) {
    admin.email = settings.email;
  }

  if (settings.adminUsername && settings.adminUsername !== admin.username) {
    admin.username = settings.adminUsername;
  }

  await admin.save();

  return getSecuritySettings();
}

/**
 * Get admin profile information
 */
export async function getAdminProfile() {
  const admin = await AdminUser.findOne();

  if (!admin) {
    throw new Error("Admin user not found");
  }

  return {
    id: admin._id.toString(),
    username: admin.username,
    email: admin.email,
    lastLogin: admin.lastLogin,
  };
}

/**
 * Update admin profile
 */
export async function updateAdminProfile(data: { username?: string; email?: string }): Promise<{ id: string; username: string; email: string }> {
  const admin = await AdminUser.findOne();

  if (!admin) {
    throw new Error("Admin user not found");
  }

  if (data.username && data.username !== admin.username) {
    // Check if username already exists
    const existing = await AdminUser.findOne({ username: data.username });
    if (existing && existing._id.toString() !== admin._id.toString()) {
      throw new Error("Username already in use");
    }
    admin.username = data.username;
  }

  if (data.email && data.email !== admin.email) {
    // Check if email already exists
    const existing = await AdminUser.findOne({ email: data.email });
    if (existing && existing._id.toString() !== admin._id.toString()) {
      throw new Error("Email already in use");
    }
    admin.email = data.email;
  }

  await admin.save();

  return {
    id: admin._id.toString(),
    username: admin.username,
    email: admin.email,
  };
}
