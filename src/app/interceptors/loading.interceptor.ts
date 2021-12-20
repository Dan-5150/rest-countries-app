import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

/**
 * Displays loading spinner during HTTP requests
 */
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  /**
   * Number of HTTP requests
   */
  requestCount = 0;

  /**
   * Constructor
   *
   * @param spinner Ngx-spinner service
   */
  constructor(private spinner: NgxSpinnerService) {}

  /**
   * HTTP Interceptor
   *
   * @param req HTTP request
   * @param next HTTP Handler
   * @returns HTTP event
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Reset requestCount if it hits negative value
    if (this.requestCount < 0) {
      this.requestCount = 0;
    }
    // Show loading spinner
    this.spinner.show();
    this.requestCount++;

    return next.handle(req).pipe(
      tap(),
      finalize(() => {
        // Finish loading
        this.requestCount = this.requestCount - 1;
        // Hide loading spinner
        if (this.requestCount === 0) {
          this.spinner.hide();
        }
      })
    );
  }
}
