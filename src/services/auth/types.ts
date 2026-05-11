export interface LoginRequest {
  username?: string;
  email?: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
}

export interface PasswordResetRequest {
  email: string;
  resetCode: string;
  newPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  email?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface AdminUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  lastLogin?: Date;
  resetCode?: string;
  resetCodeExpiry?: Date;
  comparePassword(password: string): Promise<boolean>;
  save(): Promise<void>;
}
