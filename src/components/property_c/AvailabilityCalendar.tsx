import React from 'react';
import clsx from 'clsx';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isWithinInterval, isSameDay } from 'date-fns';

interface AvailabilityCalendarProps {
  month: Date;
  selectedRange: [Date | null, Date | null];
  onSelectDay: (day: Date) => void;
  className?: string;
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

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({ month, selectedRange, onSelectDay, className }) => {
  const days = getDaysArray(month);
  const [start, end] = selectedRange;
  return (
    <div className={clsx('flex flex-col items-center w-full', className)}>
      <h3 className="font-semibold text-base text-gray-900 mb-2">{format(month, 'MMMM yyyy')}</h3>
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

export default AvailabilityCalendar; 