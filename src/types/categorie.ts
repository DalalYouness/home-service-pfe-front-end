export interface ServiceResponseDto {
  id: number;
  name: string;
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

export interface AddServiceReqProviderDTO {
  serviceId: number;
}

export interface CategoryRequestDto {
  serviceName: string;
  description?: string;
}

export interface AddCategoryResponseDto {
  message: string;
}
