import { useState, useEffect } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/figure.$id";
import type { FigureDetails, TimelineEvent } from "../types/figure";
import { useFigure } from "../hooks/useFigures";
import { DynamicFigureProfile } from "../components/DynamicFigureProfile";
import { Timeline } from "../components/Timeline";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `${params.id} - PublicFigure` },
    { name: "description", content: `${params.id}의 상세 정보 및 타임라인` },
  ];
}

export default function Figure({ params }: Route.ComponentProps) {
  const { id } = params;
  const { figure, loading, error } = useFigure(id);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  useEffect(() => {
    if (figure && figure.events.length > 0 && !selectedEvent) {
      setSelectedEvent(figure.events[0]);
    }
  }, [figure, selectedEvent]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (error || !figure) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            인물을 찾을 수 없습니다
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {error || "요청하신 인물 정보가 없습니다."}
          </p>
          <Link 
            to="/" 
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ← 홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <Link 
            to="/" 
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
          >
            ← 홈으로
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <DynamicFigureProfile 
          figure={figure} 
          selectedEvent={selectedEvent} 
        />
        
        <Timeline 
          events={figure.events}
          selectedEvent={selectedEvent}
          onEventSelect={setSelectedEvent}
        />
      </div>
    </div>
  );
}
