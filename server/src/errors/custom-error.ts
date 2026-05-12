export class CustomError extends Error {
  public readonly status: number;
  public readonly code: string | number;
  public readonly details?: unknown;

  constructor(
    status: number,
    code: string | number,
    message: string,
    details?: unknown
  ) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;

    Object.setPrototypeOf(this, new.target.prototype);
  }

  serializeErrors() {
    return {
      message: this.message,
      details: this.details,
    };
  }
}
