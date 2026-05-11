import DOMPurify from "dompurify";
import validator from "validator";
import {
  adminLoginSchema,
  adminChangePasswordSchema,
  adminForgotPasswordSchema,
  adminResetPasswordSchema,
  contactMessageSchema,
} from "@/lib/validation/schemas";

export const sanitizeClientInput = (value: string): string => {
  const trimmed = value.trim().replace(/\s+/g, " ");
  const cleaned = DOMPurify.sanitize(trimmed, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
  return validator.escape(cleaned);
};

export const validateContactForm = (formData: unknown) => {
  return contactMessageSchema.parse(formData);
};

export const validateAdminLogin = (formData: unknown) => {
  return adminLoginSchema.parse(formData);
};

export const validateAdminForgotPassword = (formData: unknown) => {
  return adminForgotPasswordSchema.parse(formData);
};

export const validateAdminResetPassword = (formData: unknown) => {
  return adminResetPasswordSchema.parse(formData);
};

export const validateAdminChangePassword = (formData: unknown) => {
  return adminChangePasswordSchema.parse(formData);
};
