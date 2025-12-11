import { useState } from "react";
import { Link } from "react-router";

interface Figure {
  id: string;
  name: string;
  category: "politics" | "entertainment" | "sports";
  profileImage: string;
  rank: number;
  rankChange: number;
  recordCount: number;
  lastActivity: string;
}

const mockFigures: Figure[] = [
  {
    id: "1",
    name: "김민준",
    category: "politics",
    profileImage: "https://via.placeholder.com/80x80/3B82F6/FFFFFF?text=김",
    rank: 1,
    rankChange: 2,
    recordCount: 156,
    lastActivity: "2시간 전",
  },
  {
    id: "2",
    name: "이서아",
    category: "entertainment",
    profileImage: "https://via.placeholder.com/80x80/EC4899/FFFFFF?text=이",
    rank: 2,
    rankChange: -1,
    recordCount: 243,
    lastActivity: "5시간 전",
  },
  {
    id: "3",
    name: "박현우",
    category: "politics",
    profileImage: "https://via.placeholder.com/80x80/10B981/FFFFFF?text=박",
    rank: 3,
    rankChange: 0,
    recordCount: 189,
    lastActivity: "1일 전",
  },
  {
    id: "4",
    name: "최지혜",
    category: "entertainment",
    profileImage: "https://via.placeholder.com/80x80/F59E0B/FFFFFF?text=최",
    rank: 4,
    rankChange: 3,
    recordCount: 312,
    lastActivity: "3시간 전",
  },
  {
    id: "5",
    name: "정도현",
    category: "sports",
    profileImage: "https://via.placeholder.com/80x80/8B5CF6/FFFFFF?text=정",
    rank: 5,
    rankChange: -2,
    recordCount: 98,
    lastActivity: "6시간 전",
  },
  {
    id: "6",
    name: "강수빈",
    category: "entertainment",
    profileImage: "https://via.placeholder.com/80x80/EF4444/FFFFFF?text=강",
    rank: 6,
    rankChange: 1,
    recordCount: 267,
    lastActivity: "4시간 전",
  },
];

const categoryLabels = {
  politics: "정치인",
  entertainment: "연예인",
  sports: "스포츠인",
};

const categoryColors = {
  politics: "bg-blue-100 text-blue-800",
  entertainment: "bg-pink-100 text-pink-800",
  sports: "bg-green-100 text-green-800",
};

export function Welcome() {
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "politics" | "entertainment" | "sports"
  >("all");

  const filteredFigures =
    selectedCategory === "all"
      ? mockFigures
      : mockFigures.filter((figure) => figure.category === selectedCategory);

  const topFigures = filteredFigures.slice(0, 4);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <header className="text-center mb-16">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Public
              <span className="text-blue-600 dark:text-blue-400">Figure</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium">
              정확한 데이터로 만나는 공인들의 진실된 기록
            </p>
          </div>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            투명한 정보로 공인의 발자취를 추적하고, 데이터 기반의 객관적인
            분석을 제공하는 플랫폼
          </p>
        </header>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === "all"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setSelectedCategory("politics")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === "politics"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              정치인
            </button>
            <button
              onClick={() => setSelectedCategory("entertainment")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === "entertainment"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              연예인
            </button>
            <button
              onClick={() => setSelectedCategory("sports")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === "sports"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              스포츠인
            </button>
          </div>
        </div>

        {/* Ranking Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              실시간 랭킹
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {selectedCategory === "all"
                ? "전체 분야"
                : categoryLabels[selectedCategory]}{" "}
              인물 순위
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topFigures.map((figure) => (
              <FigureCard key={figure.id} figure={figure} />
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {mockFigures.length}+
            </div>
            <div className="text-gray-600 dark:text-gray-400">등록된 공인</div>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {mockFigures
                .reduce((sum, fig) => sum + fig.recordCount, 0)
                .toLocaleString()}
              +
            </div>
            <div className="text-gray-600 dark:text-gray-400">기록된 행적</div>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              24/7
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              실시간 업데이트
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4">
              지금 바로 공인들의 기록을 확인해보세요
            </h3>
            <p className="mb-6 text-blue-100">
              정확한 데이터와 객관적인 분석으로 공인의 진실된 모습을 만나보실 수
              있습니다
            </p>
            <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              랭킹 자세히 보기
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

function FigureCard({ figure }: { figure: Figure }) {
  const rankChangeColor =
    figure.rankChange > 0
      ? "text-red-500"
      : figure.rankChange < 0
        ? "text-blue-500"
        : "text-gray-400";
  const rankChangeIcon =
    figure.rankChange > 0 ? "↑" : figure.rankChange < 0 ? "↓" : "−";

  return (
    <Link to={`/figure/${figure.id}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer group hover:scale-105 transform">
        <div className="p-6">
          {/* Rank Badge */}
          <div className="flex justify-between items-start mb-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                figure.rank === 1
                  ? "bg-yellow-500"
                  : figure.rank === 2
                    ? "bg-gray-400"
                    : figure.rank === 3
                      ? "bg-orange-600"
                      : "bg-gray-600"
              }`}
            >
              {figure.rank}
            </div>
            <div
              className={`flex items-center text-sm font-medium ${rankChangeColor}`}
            >
              <span>{rankChangeIcon}</span>
              <span className="ml-1">{Math.abs(figure.rankChange)}</span>
            </div>
          </div>

          {/* Profile */}
          <div className="text-center mb-4">
            <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden ring-4 ring-gray-100 dark:ring-gray-700 group-hover:ring-blue-200 dark:group-hover:ring-blue-800 transition-colors">
              <img
                src={figure.profileImage}
                alt={figure.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
              {figure.name}
            </h3>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${categoryColors[figure.category]}`}
            >
              {categoryLabels[figure.category]}
            </span>
          </div>

          {/* Stats */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">기록 수</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {figure.recordCount}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">
                최근 활동
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {figure.lastActivity}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
