import { HttpStatus } from '@nestjs/common';

// System error messages
export const ERROR_SYSTEM = 'error.system';
export const ERROR_UNAUTHORIZED = 'error.unauthorized';
export const ERROR_USER_NOT_FOUND = 'error.userNotFound';
export const ERROR_FORBIDDEN_RESOURCE = 'error.forbidden_resource';

export const CONSTRAINT_ERRORS: Record<string, string | string[]> = {
  // System error
  SYS_000: HttpStatus.INTERNAL_SERVER_ERROR.toString(),
  SYS_002: HttpStatus.UNPROCESSABLE_ENTITY.toString(),
  SYS_003: HttpStatus.SERVICE_UNAVAILABLE.toString(),

  // Auth
  AUTH_000: ERROR_UNAUTHORIZED,

  // User
  USER_NF_001: ERROR_USER_NOT_FOUND,
};
