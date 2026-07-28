export interface ChangeEmailRequestDto {
  newEmail: string;
  currentPassword: string;
}

// Define the contract for possible validation and backend errors
export interface ChangeEmailErrors {
  newEmail?: string; // For EmailAlreadyExistsException
  currentPassword?: string; // For InvalidPasswordException
}
