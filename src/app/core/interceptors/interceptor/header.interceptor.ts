import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import {  environment as env } from '../../../../environments/environment';

export const headerInterceptor:  HttpInterceptorFn = (req, next) => {

  // const authTokenx = localStorage.getItem('customerAuthorization');
  const authToken = 'YOUR_AUTH_TOKEN_HERE';
  const  validSegments: string[] = ['ar', 'en','de'];

  const tokenService = inject(AuthService); 
  const matchedSegment = validSegments.find(segment => req.url === `${env.baseURL}${segment}`);

  // console.log(req.url)
  if (matchedSegment) {
    const redirectedReq = req.clone({
      url: `${req.url}/Translations/GetTranslationFileWeb`, // تعديل المسار
    });
    return next(redirectedReq); // تمرير الطلب المعدل
  }
  if (tokenService.getToken()) {
    // Clone the request and add the authorization header
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${tokenService.getToken()}`)
    });

    // Pass the cloned request with the updated header to the next handler
    return next(authReq);
  } else {
    // If no auth token is found, pass the original request to the next handler
    return next(req);
  }
};


 

 