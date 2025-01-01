import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { describe, expect, it, beforeAll, afterEach, afterAll } from 'vitest';
import { useFetch } from '../../hooks/useFetch';

// Typage des réponses
interface SuccessResponse {
  message: string;
}

interface ErrorResponse {
  error: string;
}

// Configuration du serveur MSW
const server = setupServer(
  http.get('http://example.com/success', () => {
    return HttpResponse.json<SuccessResponse>({ message: 'Success' });
  }),

  http.get('http://example.com/failure', () => {
    return HttpResponse.json<ErrorResponse>({ error: 'Internal Server Error' }, { status: 500 });
  }),

  http.get('http://example.com/invalid-json', () => {
    return HttpResponse.text('Invalid JSON');
  }),
);

// Typage des props pour le composant de test
interface TestComponentProps {
  url: string;
  options?: RequestInit;
}

// Composant de test
const TestComponent: React.FC<TestComponentProps> = ({ url, options }) => {
  const [data, loading, error] = useFetch<SuccessResponse | ErrorResponse>(url, options);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>Data: {JSON.stringify(data)}</div>;
};

// Tests du hook useFetch
describe('TestComponent', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('should render the loading message', async () => {
    render(<TestComponent url="http://example.com/invalid-json" />);
    expect(screen.getByText('Loading...')).toBeDefined();
  });

  it('should handle successful requests', async () => {
    render(<TestComponent url="http://example.com/success" />);
    await screen.findByText(/Data: {"message":"Success"}/);
  });

  it('should handle failed requests', async () => {
    render(<TestComponent url="http://example.com/failure" />);
    await screen.findByText('Error: Internal Server Error (Status: 500)');
  });

  it('should handle dynamic endpoint changes', async () => {
    const { rerender } = render(<TestComponent url="http://example.com/success" />);
    await screen.findByText(/Data: {"message":"Success"}/);

    server.use(
      http.get('http://example.com/another-success', () => {
        return HttpResponse.json<SuccessResponse>({ message: 'Another Success' });
      }),
    );

    rerender(<TestComponent url="http://example.com/another-success" />);
    await screen.findByText(/Data: {"message":"Another Success"}/);
  });
});
