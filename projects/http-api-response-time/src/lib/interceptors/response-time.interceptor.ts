import { Injectable, Inject, Optional } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { HTTP_MONITOR_CONFIG } from '../http-monitor.token';
import { HttpMonitorConfig } from '../http-monitor.config';

@Injectable()
export class ResponseTimeInterceptor implements HttpInterceptor {
  constructor(@Optional() @Inject(HTTP_MONITOR_CONFIG) private config: HttpMonitorConfig) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.config?.enabled === false) return next.handle(req);

    const start = performance.now();

    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          const end = performance.now();
          const duration = (end - start).toFixed(2);

          const log = {
            url: req.urlWithParams,
            method: req.method,
            responseTime: `${duration} ms`,
            timestamp: new Date().toISOString()
          };

          const key = this.config?.storageKey || 'httpResponseTimes';
          const maxLogs = this.config?.maxLogs || 50;

          const logs = JSON.parse(localStorage.getItem(key) || '[]');
          logs.push(log);
          if (logs.length > maxLogs) logs.shift();
          localStorage.setItem(key, JSON.stringify(logs));
        }
      })
    );
  }
}
