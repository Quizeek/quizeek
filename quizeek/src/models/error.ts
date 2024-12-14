export class InvalidDataError extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, InvalidDataError.prototype);
  }
}

export class InvalidSessionError extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, InvalidSessionError.prototype);
  }
}
