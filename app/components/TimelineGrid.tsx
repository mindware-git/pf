import { useMemo } from "react";

interface TimelineGridProps {
  startDate: Date;
  endDate: Date;
  zoomLevel: number;
  getEventPosition: (date: Date) => number;
}

type TimeUnit = 'year' | 'month' | 'day';

export function TimelineGrid({ startDate, endDate, zoomLevel, getEventPosition }: TimelineGridProps) {
  const timeUnit: TimeUnit = useMemo(() => {
    if (zoomLevel <= 1) return 'year';
    if (zoomLevel <= 2) return 'month';
    return 'day';
  }, [zoomLevel]);

  const timeMarks = useMemo(() => {
    const marks: Array<{ date: Date; label: string; position: number; isMajor: boolean }> = [];
    const current = new Date(startDate);

    if (timeUnit === 'year') {
      current.setFullYear(startDate.getFullYear(), 0, 1);
      while (current <= endDate) {
        const position = getEventPosition(current);
        marks.push({
          date: new Date(current),
          label: current.getFullYear().toString(),
          position,
          isMajor: true
        });
        current.setFullYear(current.getFullYear() + 1);
      }
    } else if (timeUnit === 'month') {
      current.setFullYear(startDate.getFullYear(), startDate.getMonth(), 1);
      while (current <= endDate) {
        const position = getEventPosition(current);
        marks.push({
          date: new Date(current),
          label: `${current.getFullYear()}.${(current.getMonth() + 1).toString().padStart(2, '0')}`,
          position,
          isMajor: current.getMonth() === 0
        });
        current.setMonth(current.getMonth() + 1);
      }
    } else {
      current.setDate(startDate.getDate());
      while (current <= endDate) {
        const position = getEventPosition(current);
        marks.push({
          date: new Date(current),
          label: `${current.getMonth() + 1}/${current.getDate()}`,
          position,
          isMajor: current.getDate() === 1
        });
        current.setDate(current.getDate() + 1);
      }
    }

    return marks;
  }, [startDate, endDate, timeUnit, getEventPosition]);

  return (
    <div className="relative h-8 mb-2">
      {/* 메인 눈금선 */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full h-px bg-gray-300 dark:bg-gray-600"></div>
      </div>
      
      {/* 시간 단위 눈금과 레이블 */}
      {timeMarks.map((mark, index) => (
        <div
          key={index}
          className="absolute"
          style={{ left: `${mark.position}%` }}
        >
          {/* 눈금 */}
          <div 
            className={`absolute bg-gray-400 dark:bg-gray-500 ${
              mark.isMajor ? 'w-px h-4 -top-2' : 'w-px h-2 -top-1'
            }`}
          ></div>
          
          {/* 레이블 */}
          {mark.isMajor && (
            <div 
              className="absolute text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap"
              style={{ 
                top: '1.5rem',
                transform: 'translateX(-50%)',
                fontSize: timeUnit === 'year' ? '0.75rem' : '0.7rem'
              }}
            >
              {mark.label}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
