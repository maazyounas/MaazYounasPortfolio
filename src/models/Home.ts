import mongoose, { Schema, Document, Model } from "mongoose";

interface IHeroButton {
    text?: string;
    link?: string;
    variant: 'primary' | 'secondary' | 'outline';
}

export interface IHome extends Document {
    heroTagline?: string;
    heroDescription?: string;
    showProjects?: boolean;
    showServices?: boolean;
    showTestimonials?: boolean;
    heroBackgroundStyle: 'default' | 'minimal' | 'gradient' | 'particles';
    heroButtons: IHeroButton[];
    featuredProjects: string[];
    seoTitle?: string;
    seoDescription?: string;
}

const homeSchema: Schema = new Schema({
    heroTagline: String,
    heroDescription: String,
    showProjects: Boolean,
    showServices: Boolean,
    showTestimonials: Boolean,
    heroBackgroundStyle: {
        type: String,
        enum: ['default', 'minimal', 'gradient', 'particles'],
        default: 'default'
    },
    heroButtons: [{
        text: String,
        link: String,
        variant: {
            type: String,
            enum: ['primary', 'secondary', 'outline'],
            default: 'primary'
        }
    }],
    featuredProjects: [String],
    seoTitle: String,
    seoDescription: String,
});

const Home: Model<IHome> = mongoose.models.Home || mongoose.model<IHome>("Home", homeSchema);

export default Home;
