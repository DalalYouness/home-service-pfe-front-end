export interface UpdateProfileRequestDto {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  bio?: string;
  interventionArea?: string;
}
