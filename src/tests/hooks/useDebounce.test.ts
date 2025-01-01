import { act, renderHook } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { useDebounce } from '../../hooks/useDebounce';

// Activer les timers simulés dans Vitest
vi.useFakeTimers();

describe('useDebounce', () => {
  test('should debounce value changes', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 500 },
    });

    // Vérifier la valeur initiale
    expect(result.current).toBe('initial');

    // Mise à jour de la valeur
    rerender({ value: 'updated', delay: 500 });
    expect(result.current).toBe('initial'); // Toujours 'initial' avant le délai

    // Avancer le temps
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Vérifier la valeur mise à jour après le délai
    expect(result.current).toBe('updated');
  });
});
