import mongoose, { Schema, Document, Model } from "mongoose";

interface IContactField {
    id?: string;
    label?: string;
    type?: 'text' | 'email' | 'textarea' | 'select';
    required?: boolean;
    placeholder?: string;
    options?: string[];
}

export interface IContact extends Document {
    email?: string;
    phone?: string;
    location?: string;
    socialLinks: Map<string, string>;
    formEnabled?: boolean;
    contactFormFields: IContactField[];
    autoReplyMessage?: string;
    notificationEmails: string[];
}

const fieldSchema = new Schema({
    id: String,
    label: String,
    type: { type: String, enum: ['text', 'email', 'textarea', 'select'] },
    required: Boolean,
    placeholder: String,
    options: [String]
});

const contactSchema: Schema = new Schema({
    email: String,
    phone: String,
    location: String,
    socialLinks: { type: Map, of: String },
    formEnabled: Boolean,
    contactFormFields: [fieldSchema],
    autoReplyMessage: String,
    notificationEmails: [String]
});

const Contact: Model<IContact> = mongoose.models.Contact || mongoose.model<IContact>("Contact", contactSchema);

export default Contact;
