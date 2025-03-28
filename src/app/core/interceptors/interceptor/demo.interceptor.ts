import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, tap } from 'rxjs';

// حافظ على الكاش على مستوى التطبيق
const cache = new Map<string, any>();

export const demoInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Interceptor triggered for URL:', req.url);

  // التحقق من أن الطلب هو لصورة بناءً على الهيدر Content-Type أو الامتداد في URL
  const contentType = req.headers.get('Content-Type');
  const isImage = contentType?.startsWith('image/') || /\.(png|jpg|jpeg|webp)$/.test(req.url);

  if (isImage) {
    console.log('Request is for an image:', req.url);
    const cachedResponse = cache.get(req.url);
    if (cachedResponse) {
      console.log('Returning cached response for URL:', req.url);
      return of(new HttpResponse({ body: cachedResponse }));
    } else {
      return next(req).pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            console.log('Caching response for URL:', req.url);
            cache.set(req.url, event.body);
          }
        })
      );
    }
  } else {
    console.log('Request is not for an image, passing through:', req.url);
    // إذا لم يكن الطلب لصورة، مرر الطلب الأصلي للمعالج التالي
    return next(req);
  }
};


// // image-cache.interceptor.ts
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpInterceptorFn } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { tap } from 'rxjs/operators';

// export const ImageCacheInterceptor : HttpInterceptorFn = (req, next) => {
//   const cache = new Map<string, any>();

//   if (req.responseType === 'blob' && /\.(png|jpg|jpeg|webp)$/.test(req.url)) {
//     const cachedResponse = cache.get(req.url);
//     if (cachedResponse) {
//       return of(new HttpResponse({ body: cachedResponse, url: req.url, status: 200 }));
//     } else {
//       return next.(req).pipe(
//         tap(event => {
//           if (event instanceof HttpResponse) {
//             cache.set(req.url, event.body);
//           }
//         })
//       );
//     }
//   } else {
//     return next(req);
//   }
// }
