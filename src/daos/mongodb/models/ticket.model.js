import { Schema, model, Types } from "mongoose";

const ticketSchema = new Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    purchase_datetime: {
        type: Date,
        default: Date.now,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export const TicketModel = model('Ticket', ticketSchema);