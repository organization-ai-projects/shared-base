import { act, renderHook } from '@testing-library/react';
import { useDebounce } from './useDebounce';

jest.useFakeTimers();

test('should debounce value changes', () => {
  const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
    initialProps: { value: 'initial', delay: 500 },
  });

  // Valeur initiale
  expect(result.current).toBe('initial');

  // Mise à jour de la valeur
  rerender({ value: 'updated', delay: 500 });
  expect(result.current).toBe('initial');

  // Simule un délai
  act(() => {
    jest.advanceTimersByTime(500);
  });

  expect(result.current).toBe('updated');
});
