import mongoose, { Schema, Document, Model } from "mongoose";

export interface IQuote extends Document {
    id?: string;
    text?: string;
    author?: string;
    category?: string;
    visible?: boolean;
    createdAt?: string;
    read?: boolean;
}

const quoteSchema: Schema = new Schema({
    id: String,
    text: String,
    author: String,
    category: String,
    visible: Boolean,
    createdAt: String,
    read: { type: Boolean, default: false }
});

const Quote: Model<IQuote> = mongoose.models.Quote || mongoose.model<IQuote>("Quote", quoteSchema);

export default Quote;
