export interface AnalyticsData {
  revenue: {
    total: number;
    change: number;
    monthly: number[];
  };
  orders: {
    total: number;
    change: number;
  };
  users: {
    total: number;
    change: number;
  };
  conversion: {
    rate: number;
    change: number;
  };
}
