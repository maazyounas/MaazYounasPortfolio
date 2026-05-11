import sanitizeHtml from "sanitize-html";
import validator from "validator";
import { z } from "zod";
import {
  adminChangePasswordSchema,
  adminForgotPasswordSchema,
  adminLoginSchema,
  adminResetPasswordSchema,
  contactMessageSchema,
  securitySettingsSchema,
} from "@/lib/validation/schemas";

// Re-export Zod schemas for convenience
export {
  adminChangePasswordSchema,
  adminForgotPasswordSchema,
  adminLoginSchema,
  adminResetPasswordSchema,
  contactMessageSchema,
  securitySettingsSchema,
};

export const sanitizeServerString = (value: string): string => {
  const trimmed = value.trim();
  const escaped = validator.escape(validator.stripLow(trimmed, true));
  return validator.whitelist(escaped, "\x20-\x7E\r\n");
};

export const sanitizeServerHtml = (value: string): string => {
  return sanitizeHtml(value, {
    allowedTags: [],
    allowedAttributes: {},
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: {},
  });
};

export const sanitizeObject = <T>(input: T): T => {
  if (typeof input === "string") {
    return sanitizeServerString(input) as unknown as T;
  }

  if (Array.isArray(input)) {
    return input.map((item) => sanitizeObject(item)) as unknown as T;
  }

  if (input && typeof input === "object" && !(input instanceof Date)) {
    return Object.fromEntries(
      Object.entries(input).map(([key, value]) => [key, sanitizeObject(value)]),
    ) as unknown as T;
  }

  return input;
};

export const validateZodBody = <T>(
  body: unknown,
  schema: z.ZodSchema<T>
): T => {
  const result = schema.safeParse(body);
  if (!result.success) {
    const errors = result.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");
    throw new Error(`Validation failed: ${errors}`);
  }
  return result.data;
};

export const parseContactMessage = (body: unknown) => {
  const parsed = contactMessageSchema.parse(body);
  return {
    name: sanitizeServerString(parsed.name),
    email: validator.normalizeEmail(parsed.email, { gmail_remove_dots: false }) ?? sanitizeServerString(parsed.email),
    subject: parsed.subject ? sanitizeServerString(parsed.subject) : "Portfolio inquiry",
    message: sanitizeServerHtml(parsed.message),
  };
};

export const parseAdminLoginPayload = (body: unknown) => {
  const parsed = adminLoginSchema.parse(body);
  return {
    username: parsed.username ? sanitizeServerString(parsed.username) : undefined,
    email: parsed.email ? validator.normalizeEmail(parsed.email, { gmail_remove_dots: false }) ?? sanitizeServerString(parsed.email) : undefined,
    password: parsed.password,
  };
};

export const parseAdminForgotPasswordPayload = (body: unknown) => {
  const parsed = adminForgotPasswordSchema.parse(body);
  return {
    email: validator.normalizeEmail(parsed.email, { gmail_remove_dots: false }) ?? sanitizeServerString(parsed.email),
  };
};

export const parseAdminResetPasswordPayload = (body: unknown) => {
  const parsed = adminResetPasswordSchema.parse(body);
  return {
    email: validator.normalizeEmail(parsed.email, { gmail_remove_dots: false }) ?? sanitizeServerString(parsed.email),
    resetCode: sanitizeServerString(parsed.resetCode),
    newPassword: parsed.newPassword,
  };
};

export const parseAdminChangePasswordPayload = (body: unknown) => {
  const parsed = adminChangePasswordSchema.parse(body);
  return {
    currentPassword: parsed.currentPassword,
    newPassword: parsed.newPassword,
    email: parsed.email ? validator.normalizeEmail(parsed.email, { gmail_remove_dots: false }) ?? sanitizeServerString(parsed.email) : undefined,
  };
};

export const parseSecuritySettingsPayload = (body: unknown) => {
  const parsed = securitySettingsSchema.parse(body);
  return sanitizeObject(parsed);
};

export const adminLoginExpressSchema = {
  username: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: { options: { min: 2, max: 120 }, errorMessage: "Username must be between 2 and 120 characters" },
    escape: true,
  },
  email: {
    in: ["body"],
    optional: true,
    trim: true,
    isEmail: { errorMessage: "Enter a valid email address" },
    normalizeEmail: true,
  },
  password: {
    in: ["body"],
    trim: true,
    isLength: { options: { min: 8, max: 128 }, errorMessage: "Password must be between 8 and 128 characters" },
  },
};

export const adminEmailExpressSchema = {
  email: {
    in: ["body"],
    trim: true,
    isEmail: { errorMessage: "Enter a valid email address" },
    normalizeEmail: true,
  },
};

export const adminResetPasswordExpressSchema = {
  email: {
    in: ["body"],
    trim: true,
    isEmail: { errorMessage: "Enter a valid email address" },
    normalizeEmail: true,
  },
  resetCode: {
    in: ["body"],
    trim: true,
    isLength: { options: { min: 5, max: 20 }, errorMessage: "Reset code is required" },
    escape: true,
  },
  newPassword: {
    in: ["body"],
    trim: true,
    isLength: { options: { min: 8, max: 128 }, errorMessage: "New password must be at least 8 characters" },
  },
};

export const adminChangePasswordExpressSchema = {
  currentPassword: {
    in: ["body"],
    trim: true,
    isLength: { options: { min: 8, max: 128 }, errorMessage: "Current password is required" },
  },
  newPassword: {
    in: ["body"],
    trim: true,
    isLength: { options: { min: 8, max: 128 }, errorMessage: "New password must be at least 8 characters" },
  },
  email: {
    in: ["body"],
    optional: true,
    trim: true,
    isEmail: { errorMessage: "Enter a valid email address" },
    normalizeEmail: true,
  },
};

export const securitySettingsExpressSchema = {
  adminUsername: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: { options: { min: 3, max: 50 }, errorMessage: "Username must be between 3 and 50 characters" },
    escape: true,
  },
  email: {
    in: ["body"],
    optional: true,
    trim: true,
    isEmail: { errorMessage: "Enter a valid email address" },
    normalizeEmail: true,
  },
  sessionTimeout: {
    in: ["body"],
    optional: true,
    isInt: { options: { min: 5, max: 1440 }, errorMessage: "Session timeout must be between 5 and 1440 minutes" },
    toInt: true,
  },
  maxLoginAttempts: {
    in: ["body"],
    optional: true,
    isInt: { options: { min: 1, max: 20 }, errorMessage: "Login attempts must be between 1 and 20" },
    toInt: true,
  },
  lockoutDuration: {
    in: ["body"],
    optional: true,
    isInt: { options: { min: 1, max: 1440 }, errorMessage: "Lockout duration must be between 1 and 1440 minutes" },
    toInt: true,
  },
  resumeUrl: {
    in: ["body"],
    optional: true,
    trim: true,
    isURL: { errorMessage: "Enter a valid resume URL" },
  },
};
