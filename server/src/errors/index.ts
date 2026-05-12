import { CustomError } from "./custom-error";

const badRequestError = (
  code: string | number,
  message: string,
  details?: unknown
) => new CustomError(400, code, message, details);

const notAuthorizedError = (
  code: string | number,
  message: string,
  details?: unknown
) => new CustomError(401, code, message, details);

const notFoundError = (
  code: string | number,
  message: string,
  details?: unknown
) => new CustomError(404, code, message, details);

export { badRequestError, notAuthorizedError, notFoundError };
