import mongoose, { Schema, model, models } from 'mongoose';

const TeamMemberSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Lütfen ekip üyesinin adını ve soyadını girin'],
        },
        role: {
            type: String,
            required: [true, 'Lütfen ekip üyesinin görevini girin'],
        },
        faculty: {
            type: String, // Opsiyonel (Örn: 'mbg', 'ie', 'ce')
        },
        imageUrl: {
            type: String,
            required: [true, 'Lütfen bir görsel yükleyin'],
        },
        instagram: {
            type: String, // Opsiyonel
        },
        twitter: {
            type: String, // Opsiyonel
        },
        linkedin: {
            type: String, // Opsiyonel
        },
        publicId: {
            type: String, // Cloudinary'den silme işlemleri için saklanabilir
        }
    },
    { timestamps: true }
);

const TeamMember = models.TeamMember || model('TeamMember', TeamMemberSchema);

export default TeamMember;
