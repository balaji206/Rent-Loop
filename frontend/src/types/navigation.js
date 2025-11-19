// src/types/navigation.js

export const Screens = [
  "onboarding",
  "auth",
  "home",
  "explore",
  "product",
  "rental-request",
  "payment",
  "chat",
  "meetup",
  "wallet",
  "add-listing",
  "my-listings",
  "my-rentals",
  "notifications",
  "profile",
  "rate-review",
];

export const ScreenEnum = {
  ONBOARDING: "onboarding",
  AUTH: "auth",
  HOME: "home",
  EXPLORE: "explore",
  PRODUCT: "product",
  RENTAL_REQUEST: "rental-request",
  PAYMENT: "payment",
  CHAT: "chat",
  MEETUP: "meetup",
  WALLET: "wallet",
  ADD_LISTING: "add-listing",
  MY_LISTINGS: "my-listings",
  MY_RENTALS: "my-rentals",
  NOTIFICATIONS: "notifications",
  PROFILE: "profile",
  RATE_REVIEW: "rate-review",
};

// Common data types
export const ProductShape = {
  id: "",
  name: "",
  description: "",
  category: "",
  pricePerDay: 0,
  deposit: 0,
  image: "",
  images: [],
  distance: 0,
  rating: 0,
  reviewCount: 0,
  owner: {
    id: "",
    name: "",
    avatar: "",
    verified: false,
    rating: 0,
  },
  availability: [],
};

export const RentalShape = {
  id: "",
  product: ProductShape,
  startDate: "",
  endDate: "",
  totalPrice: 0,
  status: "requested",
  meetupLocation: "",
};
