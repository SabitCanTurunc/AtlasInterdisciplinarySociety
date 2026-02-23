'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Loader2 } from 'lucide-react';

export default function DeleteEventButton({ eventId }: { eventId: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!confirm('Bu etkinliği silmek istediğinize emin misiniz?')) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/admin/events?id=${eventId}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                router.refresh();
            } else {
                alert('Etkinlik silinirken bir hata oluştu.');
            }
        } catch (e) {
            alert('Bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="text-red-400 hover:text-red-300 transition-colors p-2 disabled:opacity-50"
            title="Etkinliği Sil"
        >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
        </button>
    );
}
