import mongoose, { Schema, model, models } from 'mongoose';

const PublicationSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Lütfen bir yayın başlığı girin'],
        },
        desc: {
            type: String,
            required: [true, 'Lütfen yayının içeriği hakkında kısa bilgi girin'],
        },
        type: {
            type: String,
            enum: ['Dergi', 'Rapor', 'Bülten', 'Makale', 'Kitap'],
            required: [true, 'Lütfen yayın tipini seçin'],
        },
        date: {
            type: String,
            required: [true, 'Lütfen yayının tarihini girin (Örn: Ocak 2026)'],
        },
        link: {
            type: String,
            default: '#',
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const Publication = models.Publication || model('Publication', PublicationSchema);

export default Publication;
