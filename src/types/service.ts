export interface Service {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}

export interface ServiceState {
  data: Service[];
  loading: boolean;
  error: string | null;
}
