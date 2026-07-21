export interface UserProfilResponseDTO {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  photo: string | null; // si jamais la photo n'as pas été ajouté
  address: string;
  city: string;
  country: string;
  bio: string;
  interventionArea?: string;
}

export type ProfileErrors = {
  [key: string]: string;
};
