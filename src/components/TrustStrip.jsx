import React from 'react';
import { ShieldCheck, Repeat, Globe2, Banknote } from 'lucide-react';
import { clientPayments } from '../data/clientPayments';

const TrustStrip = () => {
    const totalPaid = clientPayments.length;
    const paidInFull = clientPayments.every((p) => p.status === 'Paid');
    const names = clientPayments.map((p) => p.name);
    const repeatClients = names.some((n, i) => names.indexOf(n) !== i);

    const badges = [
        { icon: Banknote, label: `20+ Client Projects Completed` },
        { icon: ShieldCheck, label: paidInFull ? '100% Payment Completion Rate' : 'Verified Payment History' },
        { icon: Globe2, label: 'Clients Across Asia, Europe & the Middle East' },
        ...(repeatClients ? [{ icon: Repeat, label: 'Repeat Clients Who Came Back' }] : []),
    ];

    return (
        <section className="py-10 sm:py-12 px-5 sm:px-6 lg:px-8 border-t border-line bg-surface">
            <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                {badges.map((badge, i) => {
                    const Icon = badge.icon;
                    return (
                        <div key={i} className="flex items-center gap-2.5">
                            <Icon className="w-4 h-4 text-accent2 flex-shrink-0" />
                            <span className="text-sm text-muted whitespace-nowrap">{badge.label}</span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default TrustStrip;
