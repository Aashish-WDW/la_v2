'use client';

import Image from 'next/image';
import { Star, Shield, Clock } from 'lucide-react';

interface HostInfoProps {
    host: {
        name: string;
        avatar: string;
        joinDate: string;
        responseTime: string;
        responseRate: number;
        isSuperhost: boolean;
    };
}

export default function HostInfo({ host }: HostInfoProps) {
    return (
        <div className="py-6 border-b">
            <div className="flex items-start gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                        src={host.avatar}
                        alt={host.name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-semibold">Hosted by {host.name}</h3>
                        {host.isSuperhost && (
                            <span className="px-2 py-1 bg-[#00aeef]/10 text-[#00aeef] text-xs font-medium rounded-full">
                                Superhost
                            </span>
                        )}
                    </div>
                    <div className="text-gray-600 mb-4">
                        Joined in {host.joinDate}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <Clock size={20} className="text-gray-600" />
                            <div>
                                <div className="font-medium">{host.responseTime}</div>
                                <div className="text-sm text-gray-600">Response time</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Shield size={20} className="text-gray-600" />
                            <div>
                                <div className="font-medium">{host.responseRate}%</div>
                                <div className="text-sm text-gray-600">Response rate</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button className="mt-6 w-full py-3 border border-gray-300 rounded-lg font-medium hover:border-gray-400 transition">
                Contact host
            </button>
        </div>
    );
} 