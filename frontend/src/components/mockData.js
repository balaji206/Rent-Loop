import { ProductShape, RentalShape } from "../types/navigation";

export const mockProducts = [
  {
    id: "1",
    name: "Sony A7III Camera",
    description:
      "Professional full-frame mirrorless camera with 24.2MP sensor. Perfect for photography and videography. Includes battery and charger.",
    category: "Electronics",
    pricePerDay: 45,
    deposit: 500,
    image:
      "https://images.unsplash.com/photo-1586437855769-01f981e0576b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1586437855769-01f981e0576b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    distance: 1.2,
    rating: 4.8,
    reviewCount: 24,
    owner: {
      id: "u1",
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=1",
      verified: true,
      rating: 4.9,
    },
    availability: ["2025-11-15", "2025-11-16", "2025-11-17"],
  },
  {
    id: "2",
    name: "Power Drill Set",
    description:
      "Professional cordless drill with multiple bits and accessories. Great for DIY projects and home repairs.",
    category: "Tools",
    pricePerDay: 15,
    deposit: 100,
    image:
      "https://images.unsplash.com/photo-1593307315564-c96172dc89dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1593307315564-c96172dc89dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    distance: 0.8,
    rating: 4.9,
    reviewCount: 18,
    owner: {
      id: "u2",
      name: "Mike Chen",
      avatar: "https://i.pravatar.cc/150?img=12",
      verified: true,
      rating: 5.0,
    },
    availability: ["2025-11-14", "2025-11-15"],
  },
  {
    id: "3",
    name: "Mountain Bike",
    description:
      "Trek mountain bike with 21-speed gearing. Perfect for trails and outdoor adventures. Recently serviced.",
    category: "Sports",
    pricePerDay: 25,
    deposit: 200,
    image:
      "https://images.unsplash.com/photo-1652640867694-afdac071d881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1652640867694-afdac071d881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    distance: 2.1,
    rating: 4.7,
    reviewCount: 32,
    owner: {
      id: "u3",
      name: "Emma Davis",
      avatar: "https://i.pravatar.cc/150?img=5",
      verified: true,
      rating: 4.8,
    },
    availability: ["2025-11-16", "2025-11-17", "2025-11-18"],
  },
  {
    id: "4",
    name: "PlayStation 5",
    description:
      "Latest gaming console with controller and popular games. Perfect for gaming enthusiasts.",
    category: "Electronics",
    pricePerDay: 35,
    deposit: 400,
    image:
      "https://images.unsplash.com/photo-1604846887565-640d2f52d564?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1604846887565-640d2f52d564?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    distance: 1.5,
    rating: 5.0,
    reviewCount: 15,
    owner: {
      id: "u4",
      name: "Alex Turner",
      avatar: "https://i.pravatar.cc/150?img=8",
      verified: true,
      rating: 4.9,
    },
    availability: ["2025-11-20", "2025-11-21"],
  },
  {
    id: "5",
    name: "Bluetooth Speaker",
    description:
      "High-quality portable speaker with amazing sound. Waterproof and 20-hour battery life.",
    category: "Electronics",
    pricePerDay: 10,
    deposit: 50,
    image:
      "https://images.unsplash.com/photo-1629555258982-b920af8da52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1629555258982-b920af8da52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    distance: 0.5,
    rating: 4.6,
    reviewCount: 28,
    owner: {
      id: "u5",
      name: "Jessica Lee",
      avatar: "https://i.pravatar.cc/150?img=9",
      verified: false,
      rating: 4.7,
    },
    availability: ["2025-11-14", "2025-11-15", "2025-11-16"],
  },
  {
    id: "6",
    name: "Camping Tent (4-person)",
    description:
      "4-person weatherproof tent with easy setup. Includes stakes and carrying bag.",
    category: "Sports",
    pricePerDay: 20,
    deposit: 150,
    image:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    distance: 3.2,
    rating: 4.8,
    reviewCount: 12,
    owner: {
      id: "u6",
      name: "Tom Wilson",
      avatar: "https://i.pravatar.cc/150?img=13",
      verified: true,
      rating: 4.9,
    },
    availability: ["2025-11-18", "2025-11-19", "2025-11-20"],
  },
  {
    id: "7",
    name: "Extension Ladder",
    description:
      "20ft aluminum extension ladder. Great for painting, cleaning gutters, and home maintenance.",
    category: "Tools",
    pricePerDay: 12,
    deposit: 80,
    image:
      "https://images.unsplash.com/photo-1696650500692-77616e993c24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1696650500692-77616e993c24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    distance: 1.8,
    rating: 4.9,
    reviewCount: 8,
    owner: {
      id: "u7",
      name: "David Brown",
      avatar: "https://i.pravatar.cc/150?img=14",
      verified: true,
      rating: 5.0,
    },
    availability: ["2025-11-15", "2025-11-16"],
  },
];

export const mockRentals = [
  {
    id: "r1",
    product: mockProducts[0],
    startDate: "2025-11-15",
    endDate: "2025-11-17",
    totalPrice: 135,
    status: "in-use",
    meetupLocation: "Central Park, Main Entrance",
  },
  {
    id: "r2",
    product: mockProducts[1],
    startDate: "2025-11-20",
    endDate: "2025-11-21",
    totalPrice: 30,
    status: "approved",
    meetupLocation: "Starbucks, 5th Avenue",
  },
  {
    id: "r3",
    product: mockProducts[4],
    startDate: "2025-11-10",
    endDate: "2025-11-12",
    totalPrice: 30,
    status: "completed",
    meetupLocation: "Downtown Library",
  },
];

export const categories = [
  { id: "all", name: "All", icon: "🏷️" },
  { id: "electronics", name: "Electronics", icon: "💻" },
  { id: "tools", name: "Tools", icon: "🔧" },
  { id: "furniture", name: "Furniture", icon: "🪑" },
  { id: "fashion", name: "Fashion", icon: "👔" },
  { id: "sports", name: "Sports", icon: "⚽" },
  { id: "outdoor", name: "Outdoor", icon: "🏕️" },
];
