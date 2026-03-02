import type { Donor } from '../types/donor';

export const mockDonors: Donor[] = [
  { id: '1',  name: 'Juan D.',       bloodType: 'O+',  location: 'Manila',       distance: '1.2 km', lastDonation: '2026-01-15', donationCount: 12, available: true,  verified: true },
  { id: '2',  name: 'Maria S.',      bloodType: 'A+',  location: 'Quezon City',  distance: '3.4 km', lastDonation: '2026-02-01', donationCount: 8,  available: true,  verified: true },
  { id: '3',  name: 'Carlos R.',     bloodType: 'B-',  location: 'Manila',       distance: '0.8 km', lastDonation: '2025-12-20', donationCount: 5,  available: true,  verified: true },
  { id: '4',  name: 'Ana L.',        bloodType: 'O+',  location: 'Makati',       distance: '5.1 km', lastDonation: '2026-02-10', donationCount: 15, available: true,  verified: true },
  { id: '5',  name: 'Pedro M.',      bloodType: 'AB+', location: 'Pasig',        distance: '4.2 km', lastDonation: '2026-01-28', donationCount: 3,  available: false, verified: true },
  { id: '6',  name: 'Rosa T.',       bloodType: 'O-',  location: 'Manila',       distance: '2.0 km', lastDonation: '2026-02-05', donationCount: 20, available: true,  verified: true },
  { id: '7',  name: 'Miguel A.',     bloodType: 'A-',  location: 'Quezon City',  distance: '6.3 km', lastDonation: '2025-11-15', donationCount: 7,  available: true,  verified: false },
  { id: '8',  name: 'Sofia C.',      bloodType: 'B+',  location: 'Taguig',       distance: '7.8 km', lastDonation: '2026-02-12', donationCount: 10, available: true,  verified: true },
  { id: '9',  name: 'Diego P.',      bloodType: 'O+',  location: 'Manila',       distance: '1.5 km', lastDonation: '2026-01-20', donationCount: 6,  available: true,  verified: true },
  { id: '10', name: 'Elena V.',      bloodType: 'A+',  location: 'Mandaluyong',  distance: '3.9 km', lastDonation: '2026-02-08', donationCount: 9,  available: true,  verified: true },
  { id: '11', name: 'Roberto G.',    bloodType: 'AB-', location: 'Makati',       distance: '5.6 km', lastDonation: '2026-01-05', donationCount: 4,  available: true,  verified: true },
  { id: '12', name: 'Isabella F.',   bloodType: 'O+',  location: 'Pasig',        distance: '4.0 km', lastDonation: '2026-02-15', donationCount: 11, available: true,  verified: true },
];
