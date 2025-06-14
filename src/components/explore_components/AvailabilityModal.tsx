'use client';

import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import {
  format,
  addMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isWithinInterval,
  isSameDay,
  parse,
  set,
} from 'date-fns';

interface Props {
  initialRange?: [number, number];
  onApply: (range: [number, number]) => void;
  onClose: () => void;
}

function getDaysArray(date: Date): (Date | null)[] {
  const start = startOfWeek(startOfMonth(date), { weekStartsOn: 0 });
  const end = endOfWeek(endOfMonth(date), { weekStartsOn: 0 });
  const dayArray: (Date | null)[] = [];

  for (let d = start; d <= end; d = addDays(d, 1)) {
    if (isSameMonth(d, date)) {
      dayArray.push(d);
    } else {
      dayArray.push(null);
    }
  }

  return dayArray;
}

const CalendarMonth = ({ date, selectedRange, onSelectDay }: {
  date: Date;
  selectedRange: [Date | null, Date | null];
  onSelectDay: (day: Date) => void;
}) => {
  const days = getDaysArray(date);
  const [start, end] = selectedRange;

  return (
    <div className="flex flex-col items-center w-full">
      <h3 className="font-semibold text-base text-gray-900 mb-2">{format(date, 'MMMM yyyy')}</h3>
      <div className="grid grid-cols-7 gap-y-2 text-xs text-gray-500 w-full mb-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => (
          <div key={d} className="text-center font-medium">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1 text-sm w-full">
        {days.map((day, index) => {
          const isSelected =
            day && start && end && isWithinInterval(day, { start, end }) ||
            (day && start && isSameDay(day, start)) ||
            (day && end && isSameDay(day, end));
          return (
            <div
              key={index}
              className={clsx(
                'h-9 w-9 text-center leading-9 rounded-full mx-auto transition',
                day
                  ? isSelected
                    ? 'bg-[#00aeef] text-white font-bold cursor-pointer'
                    : 'hover:bg-[#00aeef]/10 text-gray-800 cursor-pointer'
                  : 'text-transparent cursor-default'
              )}
              onClick={() => day && onSelectDay(day)}
            >
              {day ? day.getDate() : ''}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function AvailabilityModal({
  initialRange,
  onApply,
  onClose
}: Props) {
  const [monthOffset, setMonthOffset] = useState(0);
  const baseMonth = addMonths(new Date(), monthOffset);

  // Range selection state
  const [selectedRange, setSelectedRange] = useState<[Date | null, Date | null]>(() => {
    if (initialRange && initialRange[0] && initialRange[1]) {
      const today = new Date();
      const start = set(today, { date: initialRange[0] });
      const end = set(today, { date: initialRange[1] });
      return [start, end];
    }
    return [null, null];
  });

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

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/10 flex items-center justify-center px-4">
      <div className="relative w-full max-w-2xl bg-white text-gray-900 rounded-2xl p-6 shadow-xl animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <h2 className="text-lg font-semibold mb-6 text-center">
          Select Availability
        </h2>

        {/* Month Navigation */}
        <div className="flex justify-between items-center mb-4 px-4">
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

        {/* Calendar Grid */}
        <div className="grid grid-cols-2 gap-6 px-2">
          <CalendarMonth date={baseMonth} selectedRange={selectedRange} onSelectDay={handleSelectDay} />
          <CalendarMonth date={addMonths(baseMonth, 1)} selectedRange={selectedRange} onSelectDay={handleSelectDay} />
        </div>

        {/* Apply Button */}
        <button
          onClick={() => {
            if (selectedRange[0] && selectedRange[1]) {
              onApply([selectedRange[0].getDate(), selectedRange[1].getDate()]);
              onClose();
            }
          }}
          className="mt-6 w-full bg-[#00aeef] hover:bg-[#0095cc] text-white py-3 rounded-full font-semibold transition-all duration-200"
          disabled={!(selectedRange[0] && selectedRange[1])}
        >
          Apply
        </button>
      </div>
    </div>
  );
}
