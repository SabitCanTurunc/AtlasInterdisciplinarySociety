import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { auth } from '@/auth';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
    try {
        const session = await auth();
        const role = (session?.user as any)?.role;

        if (!session?.user || (role !== 'admin' && role !== 'super_admin')) {
            return NextResponse.json({ message: 'Yetkisiz erişim.' }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'Dosya bulunamadı.' }, { status: 400 });
        }

        // 5MB limit check (5 * 1024 * 1024 bytes)
        const MAX_FILE_SIZE = 5 * 1024 * 1024;
        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json({ error: 'Dosya boyutu 5MB\'ı geçemez. Lütfen daha küçük bir görsel seçin.' }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to Cloudinary using a Promise wrapper for the upload_stream
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: 'atlassociety/events' }, // Organize in a specific folder
                (error, result) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(result);
                }
            ).end(buffer);
        });

        // Return the secure URL from Cloudinary
        return NextResponse.json({ url: (result as any).secure_url }, { status: 200 });
    } catch (error: any) {
        console.error('Upload Error:', error);
        return NextResponse.json({ message: 'Resim yüklenirken bir hata oluştu.', error: error.message }, { status: 500 });
    }
}
