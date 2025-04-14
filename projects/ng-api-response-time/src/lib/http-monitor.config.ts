export interface HttpMonitorConfig {
  enabled?: boolean;
  maxLogs?: number;
  storageKey?: string;
  filterWith?: string;
}

export type HttpMonitorReponseType = {
  url: string;
  method: string;
  responseTime: number;
  timestamp: Date;
};
