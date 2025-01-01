import { afterAll, beforeAll, vi } from 'vitest';

beforeAll(() => {
  console.log('Avant tous les tests : Configuration initiale');

  // Mock de `fetch`
  vi.stubGlobal(
    'fetch',
    async () =>
      ({
        json: async () => ({ message: 'Mocked response' }),
      }) as Response,
  );

  // Mock de `localStorage` et `sessionStorage`
  const storageMock = {
    getItem: vi.fn().mockReturnValue('mockedValue'),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  };
  vi.stubGlobal('localStorage', storageMock);
  vi.stubGlobal('sessionStorage', storageMock);

  // Variables d'environnement
  process.env.MY_ENV_VAR = 'mockedValue';

  // DOM initialization
  document.body.innerHTML = '<div id="app">App Initialized</div>';

  // Mock de `fs`
  vi.mock('fs', async () => {
    const actual = await vi.importActual<typeof import('fs')>('fs');
    return {
      ...actual,
      existsSync: vi.fn().mockReturnValue(true),
      mkdirSync: vi.fn(),
    };
  });
});

afterAll(() => {
  vi.restoreAllMocks();
  console.log('Après tous les tests : Nettoyage terminé');
});
