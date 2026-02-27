'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';

export default function DeletePublicationButton({ publicationId, title }: { publicationId: string, title: string }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm(`"${title}" yayınını silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`)) {
            return;
        }

        setIsDeleting(true);

        try {
            const res = await fetch(`/api/admin/publications?id=${publicationId}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Silme işlemi başarısız');
            }

            toast.success('Yayın başarıyla silindi');
            router.refresh();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500 hover:text-white transition-colors"
            title="Yayını Sil"
        >
            {isDeleting ? (
                <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            ) : (
                <><Trash2 className="w-3.5 h-3.5" /> Sil</>
            )}
        </button>
    );
}
