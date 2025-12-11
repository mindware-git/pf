interface ZoomControlsProps {
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onTimeUnitChange: (unit: 'year' | 'month' | 'day') => void;
}

export function ZoomControls({ zoomLevel, onZoomIn, onZoomOut, onTimeUnitChange }: ZoomControlsProps) {
  const getTimeUnit = () => {
    if (zoomLevel <= 1) return 'year';
    if (zoomLevel <= 2) return 'month';
    return 'day';
  };

  const currentTimeUnit = getTimeUnit();

  return (
    <div className="flex justify-between items-center mb-4">
      {/* 시간 단위 선택 버튼 */}
      <div className="flex gap-2">
        <button
          onClick={() => onTimeUnitChange('year')}
          className={`px-3 py-1 rounded-lg transition-colors ${
            currentTimeUnit === 'year'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
          aria-label="연 단위"
        >
          연
        </button>
        <button
          onClick={() => onTimeUnitChange('month')}
          className={`px-3 py-1 rounded-lg transition-colors ${
            currentTimeUnit === 'month'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
          aria-label="월 단위"
        >
          월
        </button>
        <button
          onClick={() => onTimeUnitChange('day')}
          className={`px-3 py-1 rounded-lg transition-colors ${
            currentTimeUnit === 'day'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
          aria-label="일 단위"
        >
          일
        </button>
      </div>

      {/* 기존 줌 컨트롤 */}
      <div className="flex gap-2">
        <button
          onClick={onZoomOut}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={zoomLevel <= 0.5}
          aria-label="축소"
        >
          −
        </button>
        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm min-w-[60px] text-center">
          {Math.round(zoomLevel * 100)}%
        </span>
        <button
          onClick={onZoomIn}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={zoomLevel >= 3}
          aria-label="확대"
        >
          +
        </button>
      </div>
    </div>
  );
}
