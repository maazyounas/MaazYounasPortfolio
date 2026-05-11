import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAbout extends Document {
    tagline?: string;
    shortIntro?: string;
    bio?: string;
    profileImage?: string;
    techStack: {
        name?: string;
        icon?: string;
    }[];
}

const aboutSchema: Schema = new Schema({
    tagline: String,
    shortIntro: String,
    bio: String,
    profileImage: String,
    techStack: [
        {
            name: String,
            icon: String
        }
    ]
});

const About: Model<IAbout> = mongoose.models.About || mongoose.model<IAbout>("About", aboutSchema);

export default About;
