export interface Donor {
  id: string;
  name: string;
  bloodType: string;
  location: string;
  distance?: string;
  lastDonation?: string;
  donationCount: number;
  available: boolean;
  verified: boolean;
}

export interface SearchFilters {
  location: string;
  bloodType: string;
  radius?: number;
}
