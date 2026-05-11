export interface SecuritySettings {
  adminUsername?: string;
  email?: string;
  sessionTimeout?: number;
  maxLoginAttempts?: number;
  lockoutDuration?: number;
  resumeUrl?: string;
  maintenanceMessage?: string;
  notificationEmails?: string[];
  lastLogin?: string;
  [key: string]: string | number | string[] | undefined;
}
