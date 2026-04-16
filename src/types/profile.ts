export interface Profile {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
}

export interface ProfileState {
  data: Profile | null;
  loading: boolean;
  error: string | null;
}
