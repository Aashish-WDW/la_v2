'use client';

import { X } from 'lucide-react';

export default function CenterModal({
  title,
  onClose,
  children,
  wide = false,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className={`bg-white w-full ${
          wide ? 'max-w-5xl' : 'max-w-md'
        } p-6 rounded-xl shadow-xl relative`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button onClick={onClose}>
            <X className="text-gray-600 hover:text-black" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
