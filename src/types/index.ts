export type UserRole = 'student' | 'faculty' | 'hod' | 'admin';

export type FoodType = 'veg' | 'non-veg';

export interface User {
  id: string;
  name: string;
  role: UserRole;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  type: FoodType;
  available: boolean;
  image: string;
}

export interface CartItem {
  id: string;
  foodId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  items: CartItem[];
  status: 'pending' | 'ready' | 'completed' | 'cancelled';
  total: number;
  pickupTime: string;
  createdAt: string;
  feedback?: Feedback;
}

export interface Feedback {
  rating: number;
  comment: string;
  createdAt: string;
}

export interface WeatherStatus {
  isBad: boolean;
  updatedAt: string;
  updatedBy: string;
}