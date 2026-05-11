import bcrypt from "bcryptjs";
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAdminUser extends Document {
    username: string;
    email: string;
    password: string;
    resetCode?: string | null;
    resetCodeExpiry?: Date | null;
    lastLogin?: Date;
    resumeUrl: string;
    securitySettings: Map<string, unknown>;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const AdminUserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true, default: "admin" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetCode: { type: String, default: null },
    resetCodeExpiry: { type: Date, default: null },
    lastLogin: { type: Date },
    resumeUrl: { type: String, default: "" },
    securitySettings: {
        type: Map,
        of: Schema.Types.Mixed,
        default: {}
    }
});

AdminUserSchema.pre<IAdminUser>("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    if (this.password && !this.password.startsWith("$2a$") && !this.password.startsWith("$2b$") && !this.password.startsWith("$2y$")) {
        this.password = await bcrypt.hash(this.password, 12);
    }
});

AdminUserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    if (!this.password) {
        return false;
    }

    const isValid = await bcrypt.compare(candidatePassword, this.password);
    if (isValid) {
        return true;
    }

    if (candidatePassword === this.password) {
        this.password = await bcrypt.hash(candidatePassword, 12);
        await this.save();
        return true;
    }

    return false;
};

const AdminUser: Model<IAdminUser> = mongoose.models.AdminUser || mongoose.model<IAdminUser>("AdminUser", AdminUserSchema);

export default AdminUser;
