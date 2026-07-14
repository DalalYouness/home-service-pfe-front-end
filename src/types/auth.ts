// equal to loginRequestDto in my backend
export interface LoginRequestDto {
  email: string;
  password: string;
}

// equal to AuthResponseDto in my backend
export interface AuthResponseDto {
  token: string;
  email: string;
  fullName: string;
  message: string;
  roles: string[];
  expiresIn: string;
}
