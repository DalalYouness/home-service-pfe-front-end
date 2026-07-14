export interface RegisterRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  birthDate: string;
  gender: "MALE" | "FEMALE" | "";
  country: string;
  city: string;
  address: string;
}
export type RegisterRequestErrors = Partial<
  Record<keyof RegisterRequestDto, string>
>;
