import type { FigureDetails, TimelineEvent } from "../types/figure";
import type { DataService } from "./dataService";

class JsonDataService implements DataService {
  private figuresData: FigureDetails[] | null = null;
  private eventsData: TimelineEvent[] | null = null;

  async getFigures(): Promise<FigureDetails[]> {
    if (this.figuresData) {
      return this.figuresData;
    }

    try {
      const response = await fetch('/data/figures.json');
      if (!response.ok) {
        throw new Error('Failed to fetch figures data');
      }
      const data = await response.json();
      this.figuresData = data.map((figure: any) => ({
        ...figure,
        birthDate: new Date(figure.birthDate),
        events: figure.events.map((event: any) => ({
          ...event,
          date: new Date(event.date)
        }))
      }));
      return this.figuresData;
    } catch (error) {
      console.error('Error loading figures:', error);
      return [];
    }
  }

  async getFigureById(id: string): Promise<FigureDetails | null> {
    const figures = await this.getFigures();
    return figures.find(figure => figure.id === id) || null;
  }

  async getEvents(figureId?: string): Promise<TimelineEvent[]> {
    if (this.eventsData) {
      return figureId 
        ? this.eventsData.filter(event => event.figureId === figureId)
        : this.eventsData;
    }

    try {
      const response = await fetch('/data/events.json');
      if (!response.ok) {
        throw new Error('Failed to fetch events data');
      }
      const data = await response.json();
      this.eventsData = data.map((event: any) => ({
        ...event,
        date: new Date(event.date)
      }));
      
      return figureId 
        ? this.eventsData.filter(event => event.figureId === figureId)
        : this.eventsData;
    } catch (error) {
      console.error('Error loading events:', error);
      return [];
    }
  }
}

export const jsonDataService = new JsonDataService();
