import mongoose, { Schema, model, models } from 'mongoose';

const SponsorSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Lütfen bir sponsor adı girin'],
        },
        imageUrl: {
            type: String,
            required: [true, 'Lütfen bir görsel yükleyin'],
        },
        websiteUrl: {
            type: String, // Opsiyonel
        },
        publicId: {
            type: String, // Cloudinary'den silme işlemleri için saklanabilir
        }
    },
    { timestamps: true }
);

const Sponsor = models.Sponsor || model('Sponsor', SponsorSchema);

export default Sponsor;
