import mongoose, { Schema, model, models } from 'mongoose';

const ProjectSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Lütfen bir proje başlığı girin'],
        },
        category: {
            type: String,
            required: [true, 'Lütfen bir kategori girin'],
        },
        shortDescription: {
            type: String,
            required: [true, 'Lütfen bir kısa açıklama girin'],
        },
        description: {
            type: String,
            required: [true, 'Lütfen bir proje açıklaması girin'],
        },
        metrics: {
            type: String,
            required: [true, 'Lütfen özet metrikleri/değerleri girin'],
        },
        status: {
            type: String,
            required: [true, 'Lütfen projenin durumunu belirtin'],
        },
        imageUrl: {
            type: String,
            required: [true, 'Lütfen bir proje görseli yükleyin'],
        },
        featured: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Project = models.Project || model('Project', ProjectSchema);

export default Project;
