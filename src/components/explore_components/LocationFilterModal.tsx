'use client';

import CenterModal from '../explore_components/CenterModal';

export default function LocationFilterModal({
  selectedLocations,
  onToggleLocation,
  onClose,
}: {
  selectedLocations: string[];
  onToggleLocation: (locId: string) => void;
  onClose: () => void;
}) {
  const locations = ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai'];

  return (
    <CenterModal title="Select location" onClose={onClose}>
      <div className="space-y-3">
        {locations.map((loc) => {
          const selected = selectedLocations.includes(loc);

          return (
            <button
              key={loc}
              onClick={() => onToggleLocation(loc)}
              className={`w-full px-5 py-3 rounded-xl border text-sm font-medium tracking-wide transition-all duration-200
                ${selected
                  ? 'bg-[#00aeef] text-white border-[#00aeef]'
                  : 'bg-white hover:bg-gray-100 text-gray-800 border-gray-200'
                }`}
            >
              {loc}
            </button>
          );
        })}
      </div>

      {/* Apply Button */}
      <button
        onClick={() => {
          console.log('Apply clicked');
          onClose();
        }}
        className="mt-6 w-full bg-[#00aeef] hover:bg-[#0095cc] text-white py-3 rounded-full font-semibold transition-all duration-200 text-sm"
      >
        Apply
      </button>
    </CenterModal>
  );
}
