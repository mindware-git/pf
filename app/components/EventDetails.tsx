import type { TimelineEvent } from "../types/figure";

interface EventDetailsProps {
  selectedEvent: TimelineEvent | null;
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

export function EventDetails({ selectedEvent }: EventDetailsProps) {
  if (!selectedEvent) {
    return (
      <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg text-center text-gray-500 dark:text-gray-400">
        타임라인에서 이벤트를 선택해주세요
      </div>
    );
  }

  return (
    <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg animate-in fade-in duration-300">
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 ${categoryColors[selectedEvent.category]} rounded-full flex items-center justify-center text-white text-xl flex-shrink-0`}>
          {categoryIcons[selectedEvent.category]}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {selectedEvent.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            {selectedEvent.date.toLocaleDateString('ko-KR')}
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {selectedEvent.description}
          </p>
          {selectedEvent.images && selectedEvent.images.length > 0 && (
            <div className="mt-4">
              <img 
                src={selectedEvent.images[0]} 
                alt={selectedEvent.title}
                className="rounded-lg max-w-md w-full h-auto"
              />
            </div>
          )}
          {selectedEvent.sources && selectedEvent.sources.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                관련 출처:
              </h4>
              <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
                {selectedEvent.sources.map((source, index) => (
                  <li key={index}>
                    <a 
                      href={source} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {source}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
