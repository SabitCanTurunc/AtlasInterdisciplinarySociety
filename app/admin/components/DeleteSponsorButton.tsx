'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useLanguage } from '@/app/context/LanguageContext';

export default function DeleteSponsorButton({ sponsorId }: { sponsorId: string }) {
    const { t: allTranslations } = useLanguage();
    const t = allTranslations.admin.sponsors;
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm(t.deleteMsg)) {
            return;
        }

        setIsDeleting(true);

        try {
            const res = await fetch(`/api/admin/sponsors?id=${sponsorId}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Sponsor silinemedi');
            }

            toast.success('Sponsor silindi');
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
            className="bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/30 p-2 rounded-lg transition-colors"
            title={t.deleteBtn}
        >
            {isDeleting ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
            )}
        </button>
    );
}
