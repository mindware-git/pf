import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ZoomControls } from '../../app/components/ZoomControls';

describe('ZoomControls', () => {
  const mockOnZoomIn = vi.fn();
  const mockOnZoomOut = vi.fn();
  const mockOnTimeUnitChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render zoom controls with current zoom level', () => {
    render(
      <ZoomControls
        zoomLevel={1}
        onZoomIn={mockOnZoomIn}
        onZoomOut={mockOnZoomOut}
        onTimeUnitChange={mockOnTimeUnitChange}
      />
    );

    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByText('연')).toBeInTheDocument();
    expect(screen.getByText('월')).toBeInTheDocument();
    expect(screen.getByText('일')).toBeInTheDocument();
    expect(screen.getByText('+')).toBeInTheDocument();
    expect(screen.getByText('−')).toBeInTheDocument();
  });

  it('should highlight year button when zoom level is 1', () => {
    render(
      <ZoomControls
        zoomLevel={1}
        onZoomIn={mockOnZoomIn}
        onZoomOut={mockOnZoomOut}
        onTimeUnitChange={mockOnTimeUnitChange}
      />
    );

    const yearButton = screen.getByText('연');
    const monthButton = screen.getByText('월');
    const dayButton = screen.getByText('일');

    expect(yearButton).toHaveClass('bg-blue-500', 'text-white');
    expect(monthButton).not.toHaveClass('bg-blue-500', 'text-white');
    expect(dayButton).not.toHaveClass('bg-blue-500', 'text-white');
  });

  it('should highlight month button when zoom level is 1.5', () => {
    render(
      <ZoomControls
        zoomLevel={1.5}
        onZoomIn={mockOnZoomIn}
        onZoomOut={mockOnZoomOut}
        onTimeUnitChange={mockOnTimeUnitChange}
      />
    );

    const yearButton = screen.getByText('연');
    const monthButton = screen.getByText('월');
    const dayButton = screen.getByText('일');

    expect(yearButton).not.toHaveClass('bg-blue-500', 'text-white');
    expect(monthButton).toHaveClass('bg-blue-500', 'text-white');
    expect(dayButton).not.toHaveClass('bg-blue-500', 'text-white');
  });

  it('should highlight day button when zoom level is 2.5', () => {
    render(
      <ZoomControls
        zoomLevel={2.5}
        onZoomIn={mockOnZoomIn}
        onZoomOut={mockOnZoomOut}
        onTimeUnitChange={mockOnTimeUnitChange}
      />
    );

    const yearButton = screen.getByText('연');
    const monthButton = screen.getByText('월');
    const dayButton = screen.getByText('일');

    expect(yearButton).not.toHaveClass('bg-blue-500', 'text-white');
    expect(monthButton).not.toHaveClass('bg-blue-500', 'text-white');
    expect(dayButton).toHaveClass('bg-blue-500', 'text-white');
  });

  it('should call onTimeUnitChange with year when year button is clicked', () => {
    render(
      <ZoomControls
        zoomLevel={2}
        onZoomIn={mockOnZoomIn}
        onZoomOut={mockOnZoomOut}
        onTimeUnitChange={mockOnTimeUnitChange}
      />
    );

    const yearButton = screen.getByText('연');
    fireEvent.click(yearButton);

    expect(mockOnTimeUnitChange).toHaveBeenCalledWith('year');
  });

  it('should call onTimeUnitChange with month when month button is clicked', () => {
    render(
      <ZoomControls
        zoomLevel={1}
        onZoomIn={mockOnZoomIn}
        onZoomOut={mockOnZoomOut}
        onTimeUnitChange={mockOnTimeUnitChange}
      />
    );

    const monthButton = screen.getByText('월');
    fireEvent.click(monthButton);

    expect(mockOnTimeUnitChange).toHaveBeenCalledWith('month');
  });

  it('should call onTimeUnitChange with day when day button is clicked', () => {
    render(
      <ZoomControls
        zoomLevel={1}
        onZoomIn={mockOnZoomIn}
        onZoomOut={mockOnZoomOut}
        onTimeUnitChange={mockOnTimeUnitChange}
      />
    );

    const dayButton = screen.getByText('일');
    fireEvent.click(dayButton);

    expect(mockOnTimeUnitChange).toHaveBeenCalledWith('day');
  });

  it('should call onZoomIn when zoom in button is clicked', () => {
    render(
      <ZoomControls
        zoomLevel={1}
        onZoomIn={mockOnZoomIn}
        onZoomOut={mockOnZoomOut}
        onTimeUnitChange={mockOnTimeUnitChange}
      />
    );

    const zoomInButton = screen.getByText('+');
    fireEvent.click(zoomInButton);

    expect(mockOnZoomIn).toHaveBeenCalledTimes(1);
  });

  it('should call onZoomOut when zoom out button is clicked', () => {
    render(
      <ZoomControls
        zoomLevel={1}
        onZoomIn={mockOnZoomIn}
        onZoomOut={mockOnZoomOut}
        onTimeUnitChange={mockOnTimeUnitChange}
      />
    );

    const zoomOutButton = screen.getByText('−');
    fireEvent.click(zoomOutButton);

    expect(mockOnZoomOut).toHaveBeenCalledTimes(1);
  });

  it('should disable zoom out button when zoom level is at minimum', () => {
    render(
      <ZoomControls
        zoomLevel={0.5}
        onZoomIn={mockOnZoomIn}
        onZoomOut={mockOnZoomOut}
        onTimeUnitChange={mockOnTimeUnitChange}
      />
    );

    const zoomOutButton = screen.getByText('−');
    expect(zoomOutButton).toBeDisabled();
  });

  it('should disable zoom in button when zoom level is at maximum', () => {
    render(
      <ZoomControls
        zoomLevel={3}
        onZoomIn={mockOnZoomIn}
        onZoomOut={mockOnZoomOut}
        onTimeUnitChange={mockOnTimeUnitChange}
      />
    );

    const zoomInButton = screen.getByText('+');
    expect(zoomInButton).toBeDisabled();
  });

  it('should display correct zoom percentage', () => {
    const { rerender } = render(
      <ZoomControls
        zoomLevel={1.5}
        onZoomIn={mockOnZoomIn}
        onZoomOut={mockOnZoomOut}
        onTimeUnitChange={mockOnTimeUnitChange}
      />
    );

    expect(screen.getByText('150%')).toBeInTheDocument();

    rerender(
      <ZoomControls
        zoomLevel={2}
        onZoomIn={mockOnZoomIn}
        onZoomOut={mockOnZoomOut}
        onTimeUnitChange={mockOnTimeUnitChange}
      />
    );

    expect(screen.getByText('200%')).toBeInTheDocument();
  });
});
