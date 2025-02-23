

import mongoose, { Schema, Document } from 'mongoose';

export interface IExpense extends Document {
    station: string;
    amount: number;
    price: number;
    owner: string;
    createdAt: Date;
    updatedAt: Date;
}

const ExpensesSchema: Schema = new Schema({
    station: { type: String, required: true },
    amount: { type: Number, required: true },
    price: { type: Number, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Expenses || mongoose.model<IExpense>('Expenses', ExpensesSchema);
