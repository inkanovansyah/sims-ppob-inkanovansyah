export interface Balance {
  balance: number;
}

export interface BalanceState {
  data: Balance | null;
  loading: boolean;
  error: string | null;
}
