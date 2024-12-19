export type ApiError = [{ Error: string }, number];

export function isApiError(error: unknown): error is ApiError {
  return error instanceof Array && error.length === 2 && typeof error[1] === 'number';
}
