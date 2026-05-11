import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVisitor extends Document {
    ip: string;
    userAgent?: string;
    url?: string;
    visitDate: Date;
}

const visitorSchema: Schema = new Schema({
    ip: { type: String, required: true },
    userAgent: { type: String },
    url: { type: String },
    visitDate: { type: Date, default: Date.now }
});

const Visitor: Model<IVisitor> = mongoose.models.Visitor || mongoose.model<IVisitor>("Visitor", visitorSchema);

export default Visitor;
