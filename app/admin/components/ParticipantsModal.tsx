'use client';

import { useState } from 'react';
import { Copy, X, Check } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

interface Participant {
    _id: string;
    name: string;
    email: string;
    phoneNumber?: string;
    school?: string;
    department?: string;
}

interface Props {
    participants: Participant[];
}

export default function ParticipantsModal({ participants }: Props) {
    const { t: allTranslations, language } = useLanguage();
    const t = allTranslations.admin.events;
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        const textToCopy = participants.map(p =>
            `${p.name} <${p.email}> | Tel: ${p.phoneNumber || '-'} | Okul: ${p.school || '-'} | Bölüm: ${p.department || '-'}`
        ).join('\n');
        try {
            await navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error(allTranslations.admin.gallery.errorMsg, err);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-[#1a2744] text-[#d4af37] px-2 py-1 rounded font-medium hover:bg-[#1e3a5f] transition-colors"
                title={t.participantsBtn}
            >
                {participants.length} {t.participantsBtn}
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
                    <div className="absolute inset-0 bg-[#0a1628]/80 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>

                    <div className="relative bg-[#111d32] border border-[#1e3a5f] rounded-xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-[#1e3a5f] flex items-center justify-between bg-[#0a1628]">
                            <h3 className="text-lg font-bold text-white">{t.participantsModalTitle}</h3>
                            <button onClick={() => setIsOpen(false)} className="text-[#94a3b8] hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Custom scrollable content area */}
                        <div className="p-6 overflow-y-auto flex-1">
                            {participants.length === 0 ? (
                                <p className="text-[#94a3b8] text-center italic py-4">{t.noParticipants}</p>
                            ) : (
                                <ul className="space-y-3">
                                    {participants.map((p) => (
                                        <li key={p._id} className="flex flex-col gap-1 p-3 rounded-lg bg-[#0a1628] border border-[#1e3a5f]/50">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full">
                                                <span className="font-medium text-white text-sm">{p.name}</span>
                                                <span className="text-[#a1f65e] text-xs font-mono break-all">{p.email}</span>
                                            </div>
                                            <div className="flex flex-col sm:flex-row gap-2 mt-2 text-xs text-[#94a3b8]">
                                                <span>📱 {p.phoneNumber || '-'}</span>
                                                <span className="hidden sm:inline">•</span>
                                                <span>🎓 {p.school || '-'} ({p.department || '-'})</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Footer / Actions */}
                        {participants.length > 0 && (
                            <div className="px-6 py-4 border-t border-[#1e3a5f] bg-[#0a1628] flex justify-end">
                                <button
                                    onClick={handleCopy}
                                    className="flex items-center gap-2 px-4 py-2 bg-[#d4af37]/20 text-[#d4af37] rounded-lg hover:bg-[#d4af37]/30 transition-colors font-medium text-sm"
                                >
                                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    {copied ? (language === 'en' ? 'Copied' : 'Kopyalandı') : (language === 'en' ? 'Copy List' : 'Listeyi Kopyala')}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
