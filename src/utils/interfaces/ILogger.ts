export interface ILogger {
  info(message: unknown): void;
  error(message: unknown): void;
  warn(message: unknown): void;
}
