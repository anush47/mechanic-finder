export type ServiceType = 'battery_emergency' | 'fuel_delivery' | 'maintenance' | 'roadside_assist' | 'towing' | 'tire_change';

export type BookingStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';

export interface Service {
  id: string;
  type: ServiceType;
  name: string;
  description: string;
  basePrice: number;
  emergencyPrice: number;
  estimatedDuration: number;
}

export interface Booking {
  id: string;
  mechanicId: string;
  mechanicName: string;
  mechanicImage: string;
  vehicleId: string;
  vehicleName: string;
  service: Service;
  date: string;
  time: string;
  status: BookingStatus;
  price: number;
  location: string;
  notes: string;
  isEmergency: boolean;
}

export const services: Service[] = [
  {
    id: '1',
    type: 'battery_emergency',
    name: 'Battery Emergency Service',
    description: 'Jump start or battery replacement service',
    basePrice: 75,
    emergencyPrice: 120,
    estimatedDuration: 30,
  },
  {
    id: '2',
    type: 'fuel_delivery',
    name: 'Fuel Delivery',
    description: 'Emergency fuel delivery service',
    basePrice: 50,
    emergencyPrice: 80,
    estimatedDuration: 45,
  },
  {
    id: '3',
    type: 'maintenance',
    name: 'Regular Maintenance',
    description: 'Scheduled vehicle maintenance service',
    basePrice: 150,
    emergencyPrice: 200,
    estimatedDuration: 120,
  },
  {
    id: '4',
    type: 'roadside_assist',
    name: 'Roadside Assistance',
    description: 'General roadside assistance and repairs',
    basePrice: 100,
    emergencyPrice: 150,
    estimatedDuration: 60,
  },
  {
    id: '5',
    type: 'towing',
    name: 'Towing Service',
    description: 'Vehicle towing to nearest service center',
    basePrice: 200,
    emergencyPrice: 300,
    estimatedDuration: 90,
  },
  {
    id: '6',
    type: 'tire_change',
    name: 'Tire Change',
    description: 'Flat tire change or repair service',
    basePrice: 80,
    emergencyPrice: 120,
    estimatedDuration: 45,
  },
];

export const bookingsData: Booking[] = [
  {
    id: '1',
    mechanicId: '1',
    mechanicName: 'John Smith',
    mechanicImage: 'https://images.pexels.com/photos/8989471/pexels-photo-8989471.jpeg',
    vehicleId: '1',
    vehicleName: '2019 Toyota Camry',
    service: services[2], // Regular Maintenance
    date: '2023-09-25',
    time: '10:00 AM',
    status: 'completed',
    price: 150,
    location: '123 Auto Street, Mechanicsville, CA',
    notes: 'Regular maintenance service completed.',
    isEmergency: false,
  },
  {
    id: '2',
    mechanicId: '2',
    mechanicName: 'Sarah Johnson',
    mechanicImage: 'https://images.pexels.com/photos/8989497/pexels-photo-8989497.jpeg',
    vehicleId: '2',
    vehicleName: '2020 Honda CR-V',
    service: services[0], // Battery Emergency
    date: '2023-10-12',
    time: '2:30 PM',
    status: 'scheduled',
    price: 120,
    location: '456 Mechanic Avenue, Autobahn, CA',
    notes: 'Emergency battery replacement needed.',
    isEmergency: true,
  },
  {
    id: '3',
    mechanicId: '3',
    mechanicName: 'Miguel Rodriguez',
    mechanicImage: 'https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg',
    vehicleId: '3',
    vehicleName: '2018 Ford F-150',
    service: services[4], // Towing
    date: '2023-10-05',
    time: '9:00 AM',
    status: 'in_progress',
    price: 300,
    location: '789 Wrench Road, Geartown, CA',
    notes: 'Emergency towing required.',
    isEmergency: true,
  },
];