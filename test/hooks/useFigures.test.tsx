import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useFigures, useFigure } from '../../app/hooks/useFigures';
import { jsonDataService } from '../../app/services/jsonDataService';

// Mock the jsonDataService
vi.mock('../../app/services/jsonDataService');

describe('useFigures', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should load figures on mount', async () => {
    const mockFigures = [
      {
        id: 'figure-1',
        name: 'Figure 1',
        profileImage: '/test.jpg',
        category: 'test',
        birthDate: new Date('1990-01-01'),
        description: 'Test description',
        events: []
      }
    ];

    vi.mocked(jsonDataService.getFigures).mockResolvedValue(mockFigures);

    const { result } = renderHook(() => useFigures());

    expect(result.current.loading).toBe(true);
    expect(result.current.figures).toEqual([]);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.figures).toEqual(mockFigures);
      expect(result.current.error).toBeNull();
    });

    expect(jsonDataService.getFigures).toHaveBeenCalledTimes(1);
  });

  it('should handle error when loading figures', async () => {
    const errorMessage = 'Failed to load figures';
    vi.mocked(jsonDataService.getFigures).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useFigures());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.figures).toEqual([]);
      expect(result.current.error).toBe(errorMessage);
    });
  });

  it('should not call getFigures again on re-render if data is already loaded', async () => {
    const mockFigures = [
      {
        id: 'figure-1',
        name: 'Figure 1',
        profileImage: '/test.jpg',
        category: 'test',
        birthDate: new Date('1990-01-01'),
        description: 'Test description',
        events: []
      }
    ];

    vi.mocked(jsonDataService.getFigures).mockResolvedValue(mockFigures);

    const { result, rerender } = renderHook(() => useFigures());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    rerender();

    expect(jsonDataService.getFigures).toHaveBeenCalledTimes(1);
  });
});

describe('useFigure', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should load specific figure by id', async () => {
    const mockFigure = {
      id: 'figure-1',
      name: 'Figure 1',
      profileImage: '/test.jpg',
      category: 'test',
      birthDate: new Date('1990-01-01'),
      description: 'Test description',
      events: []
    };

    vi.mocked(jsonDataService.getFigureById).mockResolvedValue(mockFigure);

    const { result } = renderHook(() => useFigure('figure-1'));

    expect(result.current.loading).toBe(true);
    expect(result.current.figure).toBeNull();
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.figure).toEqual(mockFigure);
      expect(result.current.error).toBeNull();
    });

    expect(jsonDataService.getFigureById).toHaveBeenCalledWith('figure-1');
  });

  it('should handle error when loading figure', async () => {
    const errorMessage = 'Figure not found';
    vi.mocked(jsonDataService.getFigureById).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useFigure('figure-1'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.figure).toBeNull();
      expect(result.current.error).toBe(errorMessage);
    });
  });

  it('should return null when figure is not found', async () => {
    vi.mocked(jsonDataService.getFigureById).mockResolvedValue(null);

    const { result } = renderHook(() => useFigure('non-existent'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.figure).toBeNull();
      expect(result.current.error).toBeNull();
    });
  });

  it('should not call getFigureById when id is empty', async () => {
    const { result } = renderHook(() => useFigure(''));

    expect(result.current.loading).toBe(false);
    expect(result.current.figure).toBeNull();
    expect(result.current.error).toBeNull();

    expect(jsonDataService.getFigureById).not.toHaveBeenCalled();
  });

  it('should call getFigureById when id changes', async () => {
    const mockFigure1 = {
      id: 'figure-1',
      name: 'Figure 1',
      profileImage: '/test1.jpg',
      category: 'test',
      birthDate: new Date('1990-01-01'),
      description: 'Test 1',
      events: []
    };

    const mockFigure2 = {
      id: 'figure-2',
      name: 'Figure 2',
      profileImage: '/test2.jpg',
      category: 'test',
      birthDate: new Date('1990-01-01'),
      description: 'Test 2',
      events: []
    };

    vi.mocked(jsonDataService.getFigureById)
      .mockResolvedValueOnce(mockFigure1)
      .mockResolvedValueOnce(mockFigure2);

    const { result, rerender } = renderHook(
      ({ id }) => useFigure(id),
      { initialProps: { id: 'figure-1' } }
    );

    await waitFor(() => {
      expect(result.current.figure).toEqual(mockFigure1);
    });

    rerender({ id: 'figure-2' });

    await waitFor(() => {
      expect(result.current.figure).toEqual(mockFigure2);
    });

    expect(jsonDataService.getFigureById).toHaveBeenCalledTimes(2);
    expect(jsonDataService.getFigureById).toHaveBeenNthCalledWith(1, 'figure-1');
    expect(jsonDataService.getFigureById).toHaveBeenNthCalledWith(2, 'figure-2');
  });
});
