import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
    title: string;
    description: string;
    image?: string;
    tech?: string[];
    link?: string;
    github?: string;
    showLink: boolean;
    showGithub: boolean;
    category: string;
    featured: boolean;
    visible: boolean;
    order: number;
    complexity: "beginner" | "intermediate" | "advanced";
    views: number;
    createdAt: Date;
    updatedAt: Date;
}

const projectSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: String,
    tech: [String],
    link: String,
    github: String,
    showLink: { type: Boolean, default: true },
    showGithub: { type: Boolean, default: true },
    category: { type: String, default: "web" },
    featured: { type: Boolean, default: false },
    visible: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    complexity: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"],
        default: "intermediate",
    },
    views: { type: Number, default: 0 },
}, { timestamps: true });

const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema);

export default Project;
