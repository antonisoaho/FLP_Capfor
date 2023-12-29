export interface ApiResponse<T> {
  success: boolean;
  status: number | undefined;
  data?: T;
  error?: string;
}

export interface ErrorResponse {
  error?: string;
}
