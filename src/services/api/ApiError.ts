/**
 * Error de dominio de la capa de datos.
 * Los mocks lo lanzan igual que lo hará el cliente HTTP, así la UI ya sabe
 * manejar 404 / 409 desde hoy y no hay que tocarla cuando llegue el backend.
 */
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly details?: Record<string, string>,
  ) {
    super(message);
    this.name = 'ApiError';
  }

  static notFound(resource: string, key: string): ApiError {
    return new ApiError(404, `No se encontró ${resource} "${key}".`);
  }

  static conflict(message: string, details?: Record<string, string>): ApiError {
    return new ApiError(409, message, details);
  }

  static validation(details: Record<string, string>): ApiError {
    return new ApiError(422, 'Hay campos con errores.', details);
  }
}

export const isApiError = (error: unknown): error is ApiError => error instanceof ApiError;
