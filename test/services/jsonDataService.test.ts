import { describe, it, expect, vi, beforeEach } from 'vitest';
import { jsonDataService } from '../../app/services/jsonDataService';

// Mock fetch
global.fetch = vi.fn();

describe('JsonDataService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset the service instance to clear cached data
    (jsonDataService as any).figuresData = null;
    (jsonDataService as any).eventsData = null;
  });

  describe('getFigures', () => {
    it('should fetch and parse figures data correctly', async () => {
      const mockFiguresData = [
        {
          id: 'test-figure',
          name: 'Test Figure',
          profileImage: '/test.jpg',
          category: 'test',
          birthDate: '1990-01-01',
          description: 'Test description',
          events: []
        }
      ];

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockFiguresData
      });

      const result = await jsonDataService.getFigures();

      expect(fetch).toHaveBeenCalledWith('/data/figures.json');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('test-figure');
      expect(result[0].birthDate).toBeInstanceOf(Date);
      expect(result[0].birthDate.getFullYear()).toBe(1990);
    });

    it('should return empty array on fetch error', async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      const result = await jsonDataService.getFigures();

      expect(result).toEqual([]);
    });

    it('should cache figures data', async () => {
      const mockFiguresData = [{ id: 'test', name: 'Test', profileImage: '', category: '', birthDate: '1990-01-01', description: '', events: [] }];

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockFiguresData
      });

      await jsonDataService.getFigures();
      await jsonDataService.getFigures(); // Second call

      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('getFigureById', () => {
    it('should return figure by id', async () => {
      const mockFiguresData = [
        {
          id: 'figure-1',
          name: 'Figure 1',
          profileImage: '/test1.jpg',
          category: 'test',
          birthDate: '1990-01-01',
          description: 'Test 1',
          events: []
        },
        {
          id: 'figure-2',
          name: 'Figure 2',
          profileImage: '/test2.jpg',
          category: 'test',
          birthDate: '1990-01-01',
          description: 'Test 2',
          events: []
        }
      ];

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockFiguresData
      });

      const result = await jsonDataService.getFigureById('figure-1');

      expect(result?.id).toBe('figure-1');
      expect(result?.name).toBe('Figure 1');
    });

    it('should return null for non-existent figure', async () => {
      const mockFiguresData = [
        {
          id: 'figure-1',
          name: 'Figure 1',
          profileImage: '/test1.jpg',
          category: 'test',
          birthDate: '1990-01-01',
          description: 'Test 1',
          events: []
        }
      ];

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockFiguresData
      });

      const result = await jsonDataService.getFigureById('non-existent');

      expect(result).toBeNull();
    });
  });

  describe('getEvents', () => {
    it('should fetch and parse events data correctly', async () => {
      const mockEventsData = [
        {
          id: 'event-1',
          figureId: 'figure-1',
          date: '2020-01-01',
          title: 'Test Event',
          description: 'Test description',
          category: 'achievement',
          importance: 'high'
        }
      ];

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockEventsData
      });

      const result = await jsonDataService.getEvents();

      expect(fetch).toHaveBeenCalledWith('/data/events.json');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('event-1');
      expect(result[0].date).toBeInstanceOf(Date);
      expect(result[0].date.getFullYear()).toBe(2020);
    });

    it('should filter events by figureId', async () => {
      const mockEventsData = [
        {
          id: 'event-1',
          figureId: 'figure-1',
          date: '2020-01-01',
          title: 'Event 1',
          description: 'Test 1',
          category: 'achievement',
          importance: 'high'
        },
        {
          id: 'event-2',
          figureId: 'figure-2',
          date: '2020-01-02',
          title: 'Event 2',
          description: 'Test 2',
          category: 'achievement',
          importance: 'high'
        }
      ];

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockEventsData
      });

      const result = await jsonDataService.getEvents('figure-1');

      expect(result).toHaveLength(1);
      expect(result[0].figureId).toBe('figure-1');
    });

    it('should return empty array on fetch error', async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      const result = await jsonDataService.getEvents();

      expect(result).toEqual([]);
    });
  });
});
