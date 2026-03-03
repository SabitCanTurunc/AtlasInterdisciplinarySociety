'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

export default function TogglePublicationButton({ publicationId, initialStatus }: { publicationId: string, initialStatus: boolean }) {
    const { t: allTranslations } = useLanguage();
    const t = allTranslations.admin.publications;
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isActive, setIsActive] = useState(initialStatus);

    const handleToggle = async () => {
        setIsLoading(true);

        try {
            const res = await fetch(`/api/admin/publications`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: publicationId, isActive: !isActive }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || allTranslations.admin.gallery.errorMsg);
            }

            setIsActive(!isActive);
            toast.success(t.successToggled);
            router.refresh();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleToggle}
            disabled={isLoading}
            className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium transition-colors border ${isActive
                ? 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/30 hover:bg-[#10b981]/20'
                : 'bg-[#64748b]/10 text-[#94a3b8] border-[#64748b]/30 hover:bg-[#64748b]/20'
                }`}
            title={isActive ? t.toggleHide : t.toggleShow}
        >
            {isLoading ? (
                <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            ) : isActive ? (
                <><Eye className="w-3.5 h-3.5" /> {t.toggleShow}</>
            ) : (
                <><EyeOff className="w-3.5 h-3.5" /> {t.toggleHide}</>
            )}
        </button>
    );
}
