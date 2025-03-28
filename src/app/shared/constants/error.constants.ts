export const HTTP_STATUS_CODES = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    SERVER_ERROR: 500
  } as const;
  
  export const ERROR_MESSAGES = {
    BAD_REQUEST: 'Bad Request',
    UNAUTHORIZED: 'Unauthorized',
    SERVER_ERROR: 'Internal Server Error',
    UNEXPECTED: 'something unexpected happened',
    GENERIC: 'An unexpected error occurred'
  } as const;