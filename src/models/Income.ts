

import mongoose, { Schema, Document } from 'mongoose';

export interface IIcome extends Document {
    station: string;
    amount: number;
    price: number;
    owner: string;
    createdAt: Date;
    updatedAt: Date;
}

const IcomeSchema: Schema = new Schema({
    station: { type: String, required: true },
    amount: { type: Number, required: true },
    price: { type: Number, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Income || mongoose.model<IIcome>('Income', IcomeSchema);