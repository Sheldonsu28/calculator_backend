import { HttpError } from "./HttpError";

export class CustomError extends HttpError {
  statusCode = 411;
  
  constructor(message?: string) {
    super(message || "Custom Error");

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
