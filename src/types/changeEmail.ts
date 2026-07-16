export interface ChangeEmailRequestDto {
  newEmail: string;
  currentPassword: string;
}

// Define the contract for possible validation and backend errors
export interface ChangeEmailErrors {
  global?: string; // For UserNotFoundException or general network/server errors
  newEmail?: string; // For EmailAlreadyExistsException
  currentPassword?: string; // For InvalidPasswordException
}
