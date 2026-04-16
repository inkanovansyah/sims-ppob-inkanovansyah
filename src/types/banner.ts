export interface Banner {
  banner_name: string;
  banner_image: string;
  description: string;
}

export interface BannerState {
  data: Banner[];
  loading: boolean;
  error: string | null;
}
