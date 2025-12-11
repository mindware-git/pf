import type { TimelineEvent } from "../types/figure";

interface EventMarkersProps {
  events: TimelineEvent[];
  selectedEvent: TimelineEvent | null;
  onEventSelect: (event: TimelineEvent) => void;
  getEventPosition: (event: TimelineEvent) => number;
}

const categoryIcons = {
  politics: "🏛️",
  entertainment: "⭐",
  sports: "🏆",
  scandal: "💥",
  achievement: "🎖️"
};

const categoryColors = {
  politics: "bg-blue-500",
  entertainment: "bg-pink-500",
  sports: "bg-green-500",
  scandal: "bg-red-500",
  achievement: "bg-yellow-500"
};

const importanceSizes = {
  low: "w-2 h-2",
  medium: "w-3 h-3",
  high: "w-4 h-4",
  critical: "w-6 h-6"
};

export function EventMarkers({ events, selectedEvent, onEventSelect, getEventPosition }: EventMarkersProps) {
  return (
    <div className="relative h-20 mb-4">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full h-1 bg-gray-300 dark:bg-gray-600"></div>
      </div>
      {events.map((event) => (
        <div
          key={event.id}
          className={`absolute top-1/2 transform -translate-y-1/2 cursor-pointer group ${
            selectedEvent?.id === event.id ? 'z-10' : 'z-0'
          }`}
          style={{ left: `${getEventPosition(event)}%` }}
          onClick={() => onEventSelect(event)}
        >
          <div 
            className={`relative ${importanceSizes[event.importance]} ${categoryColors[event.category]} rounded-full transform -translate-x-1/2 group-hover:scale-125 transition-all duration-200 ${
              selectedEvent?.id === event.id ? 'ring-4 ring-white dark:ring-gray-800 scale-125' : ''
            }`}
          >
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-20">
              {event.title}
            </div>
          </div>
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
            {categoryIcons[event.category]}
          </div>
        </div>
      ))}
    </div>
  );
}
