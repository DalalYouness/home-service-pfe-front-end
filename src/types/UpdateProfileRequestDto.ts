export interface UpdateProfileRequestDto {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  bio?: string; // Optional حيت تقدر تجي خاوية فـ الـ textarea
  interventionArea?: string; // Optional حيت كتحتاجها غير بالنسبة للـ PRESTATAIRE
}
