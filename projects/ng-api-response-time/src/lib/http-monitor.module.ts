import { NgModule, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ResponseTimeInterceptor } from './interceptors/response-time.interceptor';
import { HTTP_MONITOR_CONFIG } from './http-monitor.token';
import { HttpMonitorConfig } from './http-monitor.config';

@NgModule({})
export class HttpMonitorModule {
  static forRoot(config: HttpMonitorConfig = {}): ModuleWithProviders<HttpMonitorModule> {
    return {
      ngModule: HttpMonitorModule,
      providers: [
        { provide: HTTP_MONITOR_CONFIG, useValue: config },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ResponseTimeInterceptor,
          multi: true
        }
      ]
    };
  }
}
