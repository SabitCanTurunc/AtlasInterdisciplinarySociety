import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
    title: string;
    description: string;
    date: Date;
    location: string;
    locationLink?: string;
    imageUrl?: string;
    createdAt: Date;
    requiresRegistration: boolean;
    participants: mongoose.Types.ObjectId[];
    endDate?: Date;
    speakers?: { name: string; title: string; imageUrl?: string }[];
}

const eventSchema: Schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Etkinlik başlığı zorunludur.'],
    },
    description: {
        type: String,
        required: [true, 'Etkinlik açıklaması zorunludur.'],
    },
    date: {
        type: Date,
        required: [true, 'Etkinlik tarihi zorunludur.'],
    },
    endDate: {
        type: Date,
    },
    location: {
        type: String,
        required: [true, 'Etkinlik konumu zorunludur.'],
    },
    locationLink: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    requiresRegistration: {
        type: Boolean,
        default: false,
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    speakers: [{
        name: String,
        title: String,
        imageUrl: String
    }]
});

const Event = mongoose.models.Event || mongoose.model<IEvent>('Event', eventSchema);

export default Event;
