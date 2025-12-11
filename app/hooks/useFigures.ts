import { useState, useEffect } from "react";
import type { FigureDetails } from "../types/figure";
import { jsonDataService } from "../services/jsonDataService";

export function useFigures() {
  const [figures, setFigures] = useState<FigureDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFigures() {
      try {
        setLoading(true);
        setError(null);
        const data = await jsonDataService.getFigures();
        setFigures(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load figures');
      } finally {
        setLoading(false);
      }
    }

    loadFigures();
  }, []);

  return { figures, loading, error };
}

export function useFigure(id: string) {
  const [figure, setFigure] = useState<FigureDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setFigure(null);
      setLoading(false);
      return;
    }

    async function loadFigure() {
      try {
        setLoading(true);
        setError(null);
        const data = await jsonDataService.getFigureById(id);
        setFigure(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load figure');
      } finally {
        setLoading(false);
      }
    }

    loadFigure();
  }, [id]);

  return { figure, loading, error };
}
