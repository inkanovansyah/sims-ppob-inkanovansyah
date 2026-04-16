export interface APIResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface PaginatedData<T> {
  offset: number;
  limit: number;
  records: T[];
}
