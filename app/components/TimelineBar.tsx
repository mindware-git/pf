import { useRef } from "react";
import type { TimelineEvent } from "../types/figure";

interface TimelineBarProps {
  zoomLevel: number;
  selectedEvent: TimelineEvent | null;
  getEventPosition: (event: TimelineEvent) => number;
  onTimelineClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  onWheel: (event: React.WheelEvent<HTMLDivElement>) => void;
}

export function TimelineBar({ 
  zoomLevel, 
  selectedEvent, 
  getEventPosition, 
  onTimelineClick, 
  onWheel 
}: TimelineBarProps) {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={timelineRef}
      className="relative h-16 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer overflow-hidden transition-transform duration-200"
      style={{ transform: `scaleX(${zoomLevel})`, transformOrigin: 'left center' }}
      onClick={onTimelineClick}
      onWheel={onWheel}
    >
      <div className="absolute inset-0 flex items-center">
        <div className="w-full h-2 bg-blue-200 dark:bg-blue-800"></div>
      </div>
      {selectedEvent && (
        <div 
          className="absolute top-1/2 transform -translate-y-1/2 w-1 h-12 bg-red-500 transition-all duration-300"
          style={{ left: `${getEventPosition(selectedEvent)}%` }}
        >
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full"></div>
        </div>
      )}
    </div>
  );
}
