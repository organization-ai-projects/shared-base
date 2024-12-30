import { ILogger } from '../../utils/interfaces/ILogger';

export class MockLogger implements ILogger {
  logs: { info: string[]; error: string[]; warn: string[] } = {
    info: [],
    error: [],
    warn: [],
  };

  info(message: string): void {
    this.logs.info.push(message);
  }

  error(message: string): void {
    this.logs.error.push(message);
  }

  warn(message: string): void {
    this.logs.warn.push(message);
  }

  // Méthode pour réinitialiser les logs (utile pour des tests)
  clearLogs(): void {
    this.logs = { info: [], error: [], warn: [] };
  }
}
