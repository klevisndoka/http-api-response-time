import { Injectable, Inject, Optional } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { HTTP_MONITOR_CONFIG } from '../http-monitor.token';
import {
  HttpMonitorConfig,
  HttpMonitorReponseType,
} from '../http-monitor.config';

@Injectable()
export class ResponseTimeInterceptor implements HttpInterceptor {
  constructor(
    @Optional() @Inject(HTTP_MONITOR_CONFIG) private config: HttpMonitorConfig
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.config.filterWith || req.url.includes(this.config.filterWith)) {
      const start = performance.now();

      return next.handle(req).pipe(
        tap((event) => {
          if (event instanceof HttpResponse) {
            const end = performance.now();
            const duration = parseFloat((end - start).toFixed(2));
            
            const log = {
              url: req.urlWithParams,
              method: req.method,
              responseTime: duration,
              timestamp: new Date(),
            } as HttpMonitorReponseType;

            const key = this.config?.storageKey || 'httpResponseTimes';
            const maxLogs = this.config?.maxLogs || 50;

            const logs = JSON.parse(localStorage.getItem(key) || '[]');
            logs.push(log);
            if (logs.length > maxLogs) logs.shift();
            localStorage.setItem(key, JSON.stringify(logs));
          }
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
