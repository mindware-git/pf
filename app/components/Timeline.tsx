import { useState, useRef, useMemo } from "react";
import type { TimelineEvent } from "../types/figure";
import { ZoomControls } from "./ZoomControls";
import { EventMarkers } from "./EventMarkers";
import { TimelineBar } from "./TimelineBar";
import { EventDetails } from "./EventDetails";
import { TimelineGrid } from "./TimelineGrid";

interface TimelineProps {
  events: TimelineEvent[];
  selectedEvent: TimelineEvent | null;
  onEventSelect: (event: TimelineEvent) => void;
}

export function Timeline({ events, selectedEvent, onEventSelect }: TimelineProps) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const timelineRef = useRef<HTMLDivElement>(null);

  const sortedEvents = [...events].sort((a, b) => a.date.getTime() - b.date.getTime());
  const startDate = sortedEvents[0]?.date || new Date();
  const endDate = sortedEvents[sortedEvents.length - 1]?.date || new Date();
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  const getEventPosition = (event: TimelineEvent) => {
    const eventDays = Math.ceil((event.date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return (eventDays / totalDays) * 100;
  };

  const handleTimelineClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current) return;
    
    const rect = timelineRef.current.getBoundingClientRect();
    const clickX = (event.clientX - rect.left) / zoomLevel;
    const clickPercentage = clickX / rect.width;
    
    const closestEvent = sortedEvents.reduce((prev, curr) => {
      const prevPos = getEventPosition(prev);
      const currPos = getEventPosition(curr);
      return Math.abs(currPos - clickPercentage * 100) < Math.abs(prevPos - clickPercentage * 100) ? curr : prev;
    });
    
    onEventSelect(closestEvent);
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.ctrlKey || event.metaKey) {
      // Ctrl/Cmd + 휠로 줌
      const delta = event.deltaY > 0 ? -0.1 : 0.1;
      setZoomLevel(prev => Math.max(0.5, Math.min(3, prev + delta)));
    }
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.5));

  const handleTimeUnitChange = (unit: 'year' | 'month' | 'day') => {
    switch (unit) {
      case 'year':
        setZoomLevel(1);
        break;
      case 'month':
        setZoomLevel(1.5);
        break;
      case 'day':
        setZoomLevel(2.5);
        break;
    }
  };

  // 이벤트 필터링: 줌 레벨에 따라 표시할 이벤트 필터링
  const filteredEvents = useMemo(() => {
    if (zoomLevel <= 1) {
      // 연 단위: 중요도가 높은 이벤트만 표시
      return sortedEvents.filter(event => 
        event.importance === 'high' || event.importance === 'critical'
      );
    } else if (zoomLevel <= 2) {
      // 월 단위: 중간 이상 이벤트 표시
      return sortedEvents.filter(event => 
        event.importance !== 'low'
      );
    } else {
      // 일 단위: 모든 이벤트 표시
      return sortedEvents;
    }
  }, [sortedEvents, zoomLevel]);

  // 날짜 위치 계산 함수 (TimelineGrid용)
  const getDatePosition = (date: Date) => {
    const dateDays = Math.ceil((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return (dateDays / totalDays) * 100;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        타임라인
      </h2>

      <ZoomControls
        zoomLevel={zoomLevel}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onTimeUnitChange={handleTimeUnitChange}
      />

      <TimelineGrid
        startDate={startDate}
        endDate={endDate}
        zoomLevel={zoomLevel}
        getEventPosition={getDatePosition}
      />

      <EventMarkers
        events={filteredEvents}
        selectedEvent={selectedEvent}
        onEventSelect={onEventSelect}
        getEventPosition={getEventPosition}
      />

      <TimelineBar
        zoomLevel={zoomLevel}
        selectedEvent={selectedEvent}
        getEventPosition={getEventPosition}
        onTimelineClick={handleTimelineClick}
        onWheel={handleWheel}
      />

      <EventDetails selectedEvent={selectedEvent} />
    </div>
  );
}
