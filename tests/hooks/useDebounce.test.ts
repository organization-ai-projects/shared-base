import { describe, test, expect, vi, act } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDebounce } from '../../src/hooks/useDebounce';

vi.useFakeTimers();

describe('useDebounce', () => {
  test('should debounce value changes', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 500 },
    });

    expect(result.current).toBe('initial');

    rerender({ value: 'updated', delay: 500 });
    expect(result.current).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated');
  });
});
