export class AppError extends Error {
  constructor(message, statusCode = 500, publicMessage = message) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.publicMessage = publicMessage;
  }
}
