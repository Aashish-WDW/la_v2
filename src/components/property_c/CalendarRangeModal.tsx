import React, { useState } from 'react';
import { X } from 'lucide-react';
import { addMonths } from 'date-fns';
import AvailabilityCalendar from '../property_c/AvailabilityCalendar';

interface CalendarRangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (range: [Date, Date]) => void;
  initialRange?: [Date | null, Date | null];
}

const CalendarRangeModal: React.FC<CalendarRangeModalProps> = ({ isOpen, onClose, onApply, initialRange }) => {
  const [monthOffset, setMonthOffset] = useState(0);
  const baseMonth = addMonths(new Date(), monthOffset);
  const [selectedRange, setSelectedRange] = useState<[Date | null, Date | null]>(initialRange || [null, null]);

  const handleSelectDay = (day: Date) => {
    const [start, end] = selectedRange;
    if (!start || (start && end)) {
      setSelectedRange([day, null]);
    } else if (start && !end) {
      if (day < start) {
        setSelectedRange([day, start]);
      } else {
        setSelectedRange([start, day]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/10 flex items-center justify-center px-0 sm:px-4">
      <div className="relative w-full max-w-2xl bg-white text-gray-900 rounded-t-2xl sm:rounded-2xl p-2 sm:p-6 shadow-xl animate-fadeIn max-h-[95vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
        >
          <X size={20} />
        </button>
        <h2 className="text-lg font-semibold mb-4 sm:mb-6 text-center">Select Dates</h2>
        <div className="flex justify-between items-center mb-2 sm:mb-4 px-2 sm:px-4">
          <button
            onClick={() => setMonthOffset((prev) => prev - 1)}
            className="text-xl px-3 py-1 rounded-full text-gray-500 hover:bg-gray-100 transition"
          >
            ‹
          </button>
          <button
            onClick={() => setMonthOffset((prev) => prev + 1)}
            className="text-xl px-3 py-1 rounded-full text-gray-500 hover:bg-gray-100 transition"
          >
            ›
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-6 px-2">
          <AvailabilityCalendar month={baseMonth} selectedRange={selectedRange} onSelectDay={handleSelectDay} />
          <AvailabilityCalendar month={addMonths(baseMonth, 1)} selectedRange={selectedRange} onSelectDay={handleSelectDay} />
        </div>
        <button
          onClick={() => {
            if (selectedRange[0] && selectedRange[1]) {
              onApply([selectedRange[0], selectedRange[1]]);
              onClose();
            }
          }}
          className="mt-4 sm:mt-6 w-full bg-[#00aeef] hover:bg-[#0095cc] text-white py-3 rounded-full font-semibold transition-all duration-200"
          disabled={!(selectedRange[0] && selectedRange[1])}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default CalendarRangeModal; 