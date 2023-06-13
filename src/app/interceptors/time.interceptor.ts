import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TimeInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const start = performance.now()
    return next.handle(request)
      .pipe(
        tap(() => {
          const end = performance.now()
          const time = `${end - start}ms`
          console.log(request.url, time)
        })
      )
  }
}
