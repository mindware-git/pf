export interface TimelineEvent {
  id: string;
  figureId?: string;  // 어떤 인물의 이벤트인지 (선택적 - 전체 이벤트 목록용)
  date: Date;
  title: string;
  description: string;
  category: 'politics' | 'entertainment' | 'sports' | 'scandal' | 'achievement';
  importance: 'low' | 'medium' | 'high' | 'critical';
  images?: string[];
  sources?: string[];
  // 시간대별 프로필 정보
  figureProfile?: {
    image?: string;  // 그 시대의 프로필 이미지
    description?: string;  // 그 시대의 인물 설명
    title?: string;  // 그 시대의 직책/칭호
  };
}

export interface FigureDetails {
  id: string;
  name: string;
  profileImage: string;  // 현재/기본 프로필
  category: string;
  birthDate: Date;
  description: string;  // 현재/기본 설명
  events: TimelineEvent[];
}

export interface FigureProfile {
  image: string;
  description: string;
  title: string;
}
