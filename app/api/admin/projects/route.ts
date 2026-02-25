import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Project from '@/lib/models/Project';
import { auth } from '@/auth';

export async function POST(request: Request) {
    try {
        const session = await auth();

        // Authorization check
        if (!session?.user || (session.user as any).role === 'user') {
            return NextResponse.json({ message: 'Yetkisiz erişim' }, { status: 403 });
        }

        const body = await request.json();

        // Validation check
        if (!body.title || !body.category || !body.shortDescription || !body.description || !body.metrics || !body.status || !body.imageUrl) {
            return NextResponse.json({ message: 'Lütfen tüm alanları doldurun' }, { status: 400 });
        }

        await connectToDatabase();

        // If this project is set as featured, might want to unset other featured projects depending on logic, 
        // but for now, we'll allow multiple or we can optionally enforce only one.
        // Let's enforce only one featured project at a time to keep UI consistent.
        if (body.featured) {
            await Project.updateMany({}, { $set: { featured: false } });
        }

        const newProject = await Project.create(body);

        return NextResponse.json({ status: 'success', data: newProject }, { status: 201 });
    } catch (error: any) {
        console.error('Project creation error:', error);
        return NextResponse.json({ message: 'Proje oluşturulamadı', error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const session = await auth();

        // Authorization check
        if (!session?.user || (session.user as any).role === 'user') {
            return NextResponse.json({ message: 'Yetkisiz erişim' }, { status: 403 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ message: 'Proje ID belirtilmedi' }, { status: 400 });
        }

        await connectToDatabase();
        const deletedProject = await Project.findByIdAndDelete(id);

        if (!deletedProject) {
            return NextResponse.json({ message: 'Proje bulunamadı' }, { status: 404 });
        }

        return NextResponse.json({ status: 'success', message: 'Proje silindi' }, { status: 200 });
    } catch (error: any) {
        console.error('Project deletion error:', error);
        return NextResponse.json({ message: 'Proje silinemedi', error: error.message }, { status: 500 });
    }
}
