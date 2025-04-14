export interface HttpMonitorConfig {
  enabled?: boolean;
  maxLogs?: number;
  storageKey?: string;
  filterWith?: string;
  serviceId?: string;
}

export type HttpMonitorReponseType = {
  url: string;
  method: string;
  responseTime: number;
  timestamp: Date;
  serviceId: string;
};
