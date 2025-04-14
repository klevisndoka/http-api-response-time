import { InjectionToken } from '@angular/core';
import { HttpMonitorConfig } from './http-monitor.config';

export const HTTP_MONITOR_CONFIG = new InjectionToken<HttpMonitorConfig>('HTTP_MONITOR_CONFIG');
