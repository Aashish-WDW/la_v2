'use client';

import { useState, useEffect } from 'react';
import CenterModal from '../explore_components/CenterModal';

export default function CategoryFilterModal({
  selectedTabs,
  onToggleTab,
  onClose,
  onApply,
}: {
  selectedTabs: string[];
  onToggleTab: (tabId: string) => void;
  onClose: () => void;
  onApply: (tabs: string[]) => void;
}) {
  const tabs = [
    { id: 'villas', label: 'Villas' },
    { id: 'pgs', label: "PG's" },
    { id: 'hostels', label: 'Hostels' },
    { id: 'apartments', label: 'Apartments' },
    { id: 'rentals', label: 'Rental Properties' },
    { id: 'sale', label: 'Properties for Sale' },
  ];

  const [localTabs, setLocalTabs] = useState<string[]>([]);

  useEffect(() => {
    setLocalTabs(selectedTabs);
  }, [selectedTabs]);

  const toggleTab = (tabId: string) => {
    setLocalTabs((prev) =>
      prev.includes(tabId) ? prev.filter((id) => id !== tabId) : [...prev, tabId]
    );
  };

  return (
    <CenterModal title="Select Category" onClose={onClose}>
      <div className="space-y-3 mb-4">
        {tabs.map((tab) => {
          const selected = localTabs.includes(tab.id);
          return (
            <button
              key={tab.id}
              onClick={() => toggleTab(tab.id)}
              className={`w-full px-5 py-3 rounded-xl border text-sm font-medium tracking-wide transition-all duration-200
                ${
                  selected
                    ? 'bg-[#00aeef] text-white border-[#00aeef]'
                    : 'bg-white hover:bg-gray-100 text-gray-800 border-gray-200'
                }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => {
          onApply(localTabs);
          onClose();
        }}
        className="mt-4 w-full bg-[#00aeef] hover:bg-[#0095cc] text-white py-3 rounded-full font-semibold transition-all duration-200 text-sm"
      >
        Apply
      </button>
    </CenterModal>
  );
}
