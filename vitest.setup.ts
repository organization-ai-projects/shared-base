import { afterAll, beforeAll, vi } from 'vitest';

beforeAll(() => {
  // Stub global `fetch` with a mocked response
  vi.stubGlobal(
    'fetch',
    async () =>
      ({
        json: async () => ({ message: 'Mocked response' }),
        text: async () => 'Mocked text response',
        status: 200,
        ok: true,
      }) as Response,
  );

  // Mock `localStorage` and `sessionStorage` with basic operations
  const storageMock = {
    getItem: vi.fn().mockReturnValue('mockedValue'),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  };
  vi.stubGlobal('localStorage', storageMock);
  vi.stubGlobal('sessionStorage', storageMock);

  // Set mock environment variables
  process.env.MY_ENV_VAR = 'mockedValue';

  // Initialize DOM with a default structure
  document.body.innerHTML = '<div id="app">App Initialized</div>';

  // Mock `fs` module for file system operations
  vi.mock('fs', async () => {
    const actual = await vi.importActual<typeof import('fs')>('fs');
    return {
      ...actual,
      existsSync: vi.fn().mockReturnValue(true),
      mkdirSync: vi.fn(),
      writeFileSync: vi.fn(),
      readFileSync: vi.fn().mockReturnValue('mocked file content'),
    };
  });
});

afterAll(() => {
  // Restore all mocks to their original state
  vi.restoreAllMocks();
});
