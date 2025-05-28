export const SERVICE_OPTIONS = {
  "battery-issue": {
    title: "Battery Issue",
    description: "Get help with your vehicle's battery problems.",
    imageUri: "https://picsum.photos/1400?battery",
    route: "battery-issue",
  },
  "tyre-issue": {
    title: "Tyre Issue",
    description: "Assistance for tyre punctures and replacements.",
    imageUri: "https://picsum.photos/1400?tyre",
    route: "tyre-issue",
  },
  "need-fuel": {
    title: "Need Fuel",
    description: "Fuel delivery service to your location.",
    imageUri: "https://picsum.photos/1400?fuel",
    route: "need-fuel",
  },
  "need-towing": {
    title: "Need Towing",
    description: "Towing service for your vehicle.",
    imageUri: "https://picsum.photos/1400?towing",
    route: "need-towing",
  },
  "vehicle-broke-down": {
    title: "Vehicle Broke Down",
    description: "Help for vehicles that have broken down.",
    imageUri: "https://picsum.photos/1400?broke-down",
    route: "vehicle-broke-down",
  },
  "scheduled-maintenance": {
    title: "Scheduled Maintenance",
    description: "Book scheduled maintenance for your vehicle.",
    imageUri: "https://picsum.photos/1400?maintenance",
    route: "scheduled-maintenance",
  },
};

export const FUEL_DATA = {
  petrol: {
    name: "Petrol",
    grades: [
      { name: "Octane 92", rate: 370 },
      { name: "Octane 95", rate: 430 },
    ],
  },
  diesel: {
    name: "Diesel",
    grades: [
      { name: "Auto Diesel", rate: 340 },
      { name: "Super Diesel", rate: 390 },
    ],
  },
};
