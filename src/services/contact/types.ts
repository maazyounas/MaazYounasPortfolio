export interface ContactSubmission {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ContactResponse {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}
