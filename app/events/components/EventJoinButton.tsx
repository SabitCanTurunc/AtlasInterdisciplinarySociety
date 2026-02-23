'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Check } from 'lucide-react';

interface EventJoinButtonProps {
    eventId: string;
    isParticipating: boolean;
    isLoggedIn: boolean;
    isPast: boolean;
}

export default function EventJoinButton({ eventId, isParticipating: initialParticipating, isLoggedIn, isPast }: EventJoinButtonProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isParticipating, setIsParticipating] = useState(initialParticipating);

    const handleToggle = async () => {
        if (!isLoggedIn) {
            router.push('/login');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/events/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ eventId }),
            });

            if (res.ok) {
                const data = await res.json();
                setIsParticipating(data.isParticipating);
                router.refresh();
            } else {
                alert('Kayıt işlemi sırasında bir hata oluştu.');
            }
        } catch (error) {
            console.error(error);
            alert('Kayıt işlemi sırasında bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    if (isPast) {
        return null; // Don't show button for past events
    }

    if (isParticipating) {
        return (
            <button
                onClick={handleToggle}
                disabled={loading}
                className="w-full mt-4 py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 bg-[#a1f65e]/20 text-[#a1f65e] border border-[#a1f65e]/30 hover:bg-[#a1f65e]/30 transition-colors disabled:opacity-70"
            >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                    <>
                        <Check className="w-4 h-4" />
                        Kayıtlısın
                    </>
                )}
            </button>
        );
    }

    return (
        <button
            onClick={handleToggle}
            disabled={loading}
            className="w-full mt-4 py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 bg-[#1e3a5f] text-white hover:bg-[#1a2744] transition-colors disabled:opacity-70"
        >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Etkinliğe Katıl'}
        </button>
    );
}
