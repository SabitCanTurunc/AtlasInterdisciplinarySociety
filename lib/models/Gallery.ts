import mongoose, { Schema, model, models } from 'mongoose';

const GallerySchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Lütfen bir başlık/açıklama girin'],
        },
        imageUrl: {
            type: String,
            required: [true, 'Lütfen bir görsel yükleyin'],
        },
        publicId: {
            type: String, // Cloudinary'den silme işlemleri için saklanabilir
        }
    },
    { timestamps: true }
);

const Gallery = models.Gallery || model('Gallery', GallerySchema);

export default Gallery;
