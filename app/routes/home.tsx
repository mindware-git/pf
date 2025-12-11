import type { Route } from "./+types/home";
import { useFigures } from "../hooks/useFigures";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "PublicFigure - 공인들의 진실된 기록" },
    {
      name: "description",
      content:
        "정확한 데이터로 만나는 공인들의 진실된 기록. 투명한 정보로 공인의 발자취를 추적하고, 데이터 기반의 객관적인 분석을 제공하는 플랫폼.",
    },
  ];
}

export default function Home() {
  const { figures, loading, error } = useFigures();

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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">오류가 발생했습니다</p>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            PublicFigure
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            공인들의 진실된 기록을 만나보세요
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {figures.map((figure) => (
            <div
              key={figure.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full mr-4"></div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {figure.name}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {figure.category}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {figure.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    생년월일: {new Date(figure.birthDate).toLocaleDateString('ko-KR')}
                  </span>
                  <a
                    href={`/figure/${figure.id}`}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                  >
                    자세히 보기
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
