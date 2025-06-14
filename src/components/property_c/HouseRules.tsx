'use client';

import { Clock, Users, Ban, PawPrint } from 'lucide-react';

interface HouseRulesProps {
    rules: {
        checkIn: string;
        checkOut: string;
        maxGuests: number;
        smoking: boolean;
        pets: boolean;
        additionalRules: string[];
    };
}

export default function HouseRules({ rules }: HouseRulesProps) {
    return (
        <div className="py-6 border-b">
            <h2 className="text-2xl font-semibold mb-6">House rules</h2>
            <div className="grid gap-4">
                <div className="flex items-center gap-3">
                    <Clock size={24} className="text-gray-600" />
                    <div>
                        <p className="font-medium">Check-in: {rules.checkIn}</p>
                        <p className="font-medium">Checkout: {rules.checkOut}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Users size={24} className="text-gray-600" />
                    <div>
                        <p className="font-medium">Maximum {rules.maxGuests} {rules.maxGuests === 1 ? 'guest' : 'guests'}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Ban size={24} className="text-gray-600" />
                    <div>
                        <p className="font-medium">Smoking {rules.smoking ? 'allowed' : 'not allowed'}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <PawPrint size={24} className="text-gray-600" />
                    <div>
                        <p className="font-medium">Pets {rules.pets ? 'allowed' : 'not allowed'}</p>
                    </div>
                </div>
            </div>
            {rules.additionalRules.length > 0 && (
                <div className="mt-6">
                    <h3 className="font-medium mb-2">Additional rules</h3>
                    <ul className="list-disc list-inside text-gray-700">
                        {rules.additionalRules.map((rule, index) => (
                            <li key={index}>{rule}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
} 