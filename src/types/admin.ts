export type Gender = "MALE" | "FEMALE" | string;

export type AccountStatus = "ACTIVE" | "SUSPENDED";

export type RoleName =
  | "ROLE_CLIENT"
  | "ROLE_PRESTATAIRE"
  | "ROLE_ADMIN"
  | string;

// 2. UserProfileMinDto Contract
export interface UserProfileMinDto {
  firstName: string;
  lastName: string;
  gender: Gender;
  accountStatus: AccountStatus;
  roles: RoleName[];
}

// 3. Spring Data Page<T> Response Wrapper
export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
