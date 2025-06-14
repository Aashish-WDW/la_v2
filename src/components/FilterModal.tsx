import React from 'react';

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const FilterModal: React.FC<FilterModalProps> = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 sm:mx-0 p-6 relative animate-fadeInUp">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-lg font-semibold mb-4 text-center">{title}</h2>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default FilterModal; 