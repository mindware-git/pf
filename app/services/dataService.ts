import type { FigureDetails, TimelineEvent } from "../types/figure";

export interface DataService {
  getFigures(): Promise<FigureDetails[]>;
  getFigureById(id: string): Promise<FigureDetails | null>;
  getEvents(figureId?: string): Promise<TimelineEvent[]>;
}
