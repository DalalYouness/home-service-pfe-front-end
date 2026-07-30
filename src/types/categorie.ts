export interface ServiceResponseDto {
  id: number;
  service_name: string;
  description?: string;
}
export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  last: boolean;
  first: boolean;
  empty: boolean;
}
