import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

jest.useFakeTimers();

test('should debounce value changes', () => {
  const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
    initialProps: { value: 'initial', delay: 500 },
  });

  expect(result.current).toBe('initial');

  rerender({ value: 'updated', delay: 500 });
  expect(result.current).toBe('initial');

  act(() => {
    jest.advanceTimersByTime(500);
  });

  expect(result.current).toBe('updated');
});
