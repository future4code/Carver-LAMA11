export abstract class BaseError extends Error {
    constructor(message: string, public code: number, public sqlMessage?: string) {
      super(message);
    }
}
  