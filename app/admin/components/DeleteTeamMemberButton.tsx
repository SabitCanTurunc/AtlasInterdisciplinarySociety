'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';
import { useLanguage } from '@/app/context/LanguageContext';

export default function DeleteTeamMemberButton({ memberId }: { memberId: string }) {
    const { t: allTranslations } = useLanguage();
    const t = allTranslations.admin.team; // Ensure you have this in translations.ts
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const res = await fetch(`/api/admin/team?id=${memberId}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Ekip üyesi silinemedi');
            }

            toast.success('Ekip üyesi başarıyla silindi');
            router.refresh();
        } catch (error: any) {
            toast.error(error.message);
            setIsDeleting(false);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button
                    className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                    disabled={isDeleting}
                >
                    <Trash2 size={18} />
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#111d32] border-[#1e3a5f] text-white">
                <AlertDialogHeader>
                    <AlertDialogTitle>{t.deleteBtn}</AlertDialogTitle>
                    <AlertDialogDescription className="text-[#94a3b8]">
                        {t.deleteConfirm}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-[#1a2744] border-none hover:bg-[#1e3a5f] hover:text-white mt-0 h-10 w-full sm:w-auto">
                        {t.cancelBtn}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault(); // Varsayılan onClick davranışını engelle
                            handleDelete();    // Kendi asenkron fonksiyonumuzu çağır
                        }}
                        disabled={isDeleting}
                        className="bg-red-500 text-white hover:bg-red-600 border-none h-10 w-full sm:w-auto flex items-center justify-center min-w-[100px]"
                    >
                        {isDeleting ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            t.confirmDeleteBtn
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
