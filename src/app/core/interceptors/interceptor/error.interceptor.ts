import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject, Injector, PLATFORM_ID } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { ErrorService } from "../../../shared/services/error.service";
import { isPlatformBrowser } from "@angular/common";

export const errorInterceptor: HttpInterceptorFn = (authReq, next) => {
  const _ErrorService = inject(ErrorService);
  const platformId = inject(PLATFORM_ID);

  return next(authReq).pipe(
    catchError((err: any) => {
      let errorMessage = '';
      if (isPlatformBrowser(platformId)) {
        console.error('HTTP Error Details:', err);

        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            case 400:
              errorMessage = err.error?.message || 'Bad Request';
              _ErrorService.setError({ message: errorMessage, title: 'Error' });
              break;

            case 401:
              errorMessage = err.error?.message || 'Unauthorized';
              _ErrorService.setError({ message: errorMessage, title: 'Authentication Error' });
              break;

            case 500:
              errorMessage = 'Internal Server Error';
              _ErrorService.setError({ message: errorMessage, title: 'Server Error' });
              break;

            default:
              errorMessage = err.error?.message || 'An unexpected error occurred.';
              _ErrorService.setError({ message: errorMessage, title: 'Error' });
              break;
          }
        } else {
          // Handle non-HTTP errors
          errorMessage = 'An unknown error occurred.';
          console.error('Non-HTTP Error Details:', err);
          _ErrorService.setError({ message: errorMessage, title: 'Error' });
        }
      }

      return throwError(() => err);
    })
  );
};
