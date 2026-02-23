import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            unique: true,
        },
        password: {
            type: String,
            select: false,
        },
        image: {
            type: String,
        },
        role: {
            type: String,
            enum: ['user', 'admin', 'super_admin'],
            default: 'user',
        },
        emailVerified: {
            type: Date,
        }
    },
    { timestamps: true }
);

const User = models.User || model('User', UserSchema);

export default User;
