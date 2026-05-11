import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGlobalSettings extends Document {
    primaryColor?: string;
    accentColor?: string;
    enableDarkMode?: boolean;
    siteTitle?: string;
    metaDescription?: string;
    keywords: string[];
    enableAnimations?: boolean;
    language?: string;
    timezone?: string;
    dateFormat?: string;
    enableMaintenance?: boolean;
    maintenanceMessage?: string;
    cookieConsent?: boolean;
    analyticsCode?: string;
    socialSharing?: boolean;
    enableComments?: boolean;
}

const globalSettingsSchema: Schema = new Schema({
    primaryColor: String,
    accentColor: String,
    enableDarkMode: Boolean,
    siteTitle: String,
    metaDescription: String,
    keywords: [String],
    enableAnimations: Boolean,
    language: String,
    timezone: String,
    dateFormat: String,
    enableMaintenance: Boolean,
    maintenanceMessage: String,
    cookieConsent: Boolean,
    analyticsCode: String,
    socialSharing: Boolean,
    enableComments: Boolean
});

const GlobalSettings: Model<IGlobalSettings> = mongoose.models.GlobalSettings || mongoose.model<IGlobalSettings>("GlobalSettings", globalSettingsSchema);

export default GlobalSettings;
