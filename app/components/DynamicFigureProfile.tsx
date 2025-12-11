import { useState, useEffect } from "react";
import type { FigureDetails, TimelineEvent, FigureProfile } from "../types/figure";

interface DynamicFigureProfileProps {
  figure: FigureDetails;
  selectedEvent: TimelineEvent | null;
}

export function DynamicFigureProfile({ figure, selectedEvent }: DynamicFigureProfileProps) {
  const [currentProfile, setCurrentProfile] = useState<FigureProfile>({
    image: figure.profileImage,
    description: figure.description,
    title: figure.category === 'politics' ? '정치인' : figure.category === 'entertainment' ? '연예인' : '스포츠인'
  });

  useEffect(() => {
    if (selectedEvent?.figureProfile) {
      setCurrentProfile({
        image: selectedEvent.figureProfile.image || figure.profileImage,
        description: selectedEvent.figureProfile.description || figure.description,
        title: selectedEvent.figureProfile.title || (figure.category === 'politics' ? '정치인' : figure.category === 'entertainment' ? '연예인' : '스포츠인')
      });
    } else {
      setCurrentProfile({
        image: figure.profileImage,
        description: figure.description,
        title: figure.category === 'politics' ? '정치인' : figure.category === 'entertainment' ? '연예인' : '스포츠인'
      });
    }
  }, [selectedEvent, figure]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-blue-100 dark:ring-blue-900 transition-all duration-500">
          <img 
            src={currentProfile.image} 
            alt={figure.name}
            className="w-full h-full object-cover transition-opacity duration-500"
          />
          {selectedEvent && (
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {selectedEvent.date.getFullYear()}
            </div>
          )}
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {figure.name}
          </h1>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 mb-4">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm font-medium">
              {currentProfile.title}
            </span>
            {selectedEvent && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {selectedEvent.date.toLocaleDateString('ko-KR')} 기준
              </span>
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-all duration-500">
            {currentProfile.description}
          </p>
          {selectedEvent && (
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                현재 선택된 이벤트: <span className="font-medium text-gray-700 dark:text-gray-300">{selectedEvent.title}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
