export interface SucessResponse<T> {
  statusCode: number;
  message: string;
  data?: Array<T>;
}

export interface FailResponse {
  statusCode: number;
  message: string;
  error?: string;
}
