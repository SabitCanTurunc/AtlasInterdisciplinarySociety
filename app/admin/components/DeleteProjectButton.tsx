'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Loader2 } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

export default function DeleteProjectButton({ projectId, projectTitle }: { projectId: string, projectTitle: string }) {
    const { t: allTranslations } = useLanguage();
    const t = allTranslations.admin.projects;
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!window.confirm(t.deleteConfirm.replace('{title}', projectTitle))) {
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`/api/admin/projects?id=${projectId}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                throw new Error(allTranslations.admin.gallery.errorMsg);
            }

            router.refresh();
        } catch (error) {
            console.error(error);
            alert(allTranslations.admin.gallery.errorMsg);
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors disabled:opacity-50"
            title={t.deleteBtn}
        >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
        </button>
    );
}
