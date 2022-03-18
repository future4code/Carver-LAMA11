export abstract class BaseError extends Error {
  sqlMessage: string | undefined;
    constructor(message: string, public code: number, sqlMessage?: string) {
      super(message);
    }
}
  