import { z } from "zod";

export const contactMessageSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().trim().email("Enter a valid email address"),
  subject: z.string().trim().max(120, "Subject is too long").optional().or(z.literal("")).default("Portfolio inquiry"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(3000, "Message is too long"),
});

export const adminLoginSchema = z
  .object({
    username: z.string().trim().min(2, "Username must be at least 2 characters").max(120).optional(),
    email: z.string().trim().email("Enter a valid email address").optional(),
    password: z.string().min(8, "Password must be at least 8 characters").max(128),
  })
  .refine((data) => !!data.username || !!data.email, {
    message: "Username or email is required",
    path: ["username"],
  });

export const adminForgotPasswordSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
});

export const adminResetPasswordSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  resetCode: z.string().trim().min(5, "Reset code is required").max(20),
  newPassword: z.string().min(8, "New password must be at least 8 characters").max(128),
});

export const adminChangePasswordSchema = z.object({
  currentPassword: z.string().min(8, "Current password is required").max(128),
  newPassword: z.string().min(8, "New password must be at least 8 characters").max(128),
  email: z.string().trim().email("Enter a valid email address").optional(),
});

export const securitySettingsSchema = z
  .object({
    adminUsername: z.string().trim().min(3).max(50).optional(),
    email: z.string().trim().email("Enter a valid email address").optional(),
    sessionTimeout: z.number().int().min(5).max(1440).optional(),
    maxLoginAttempts: z.number().int().min(1).max(20).optional(),
    lockoutDuration: z.number().int().min(1).max(1440).optional(),
    resumeUrl: z.string().trim().url("Enter a valid URL").optional(),
    maintenanceMessage: z.string().trim().max(500).optional(),
    notificationEmails: z.array(z.string().trim().email("Enter valid notification emails")).optional(),
  })
  .passthrough();
