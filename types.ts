
export enum UserRole {
  PERSON = 'person',
  BUSINESS = 'business'
}

export enum BookingStatus {
  WAIT = 'wait',
  CONFIRMED = 'confirmed',
  DENIED = 'denied',
  CANCELLED = 'cancelled'
}

export interface CatInfoImage {
  image_url: string;
  tmb_url: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Activity {
  id: string;
  user_id?: string;
  category_id?: number;
  title: string;
  start_date: string;
  end_date?: string;
  description: string;
  conditions?: string;
  address: string;
  x: number;
  y: number;
  is_private: boolean;
  is_active: boolean;
  price: number;
  amount: number;
  age: number;
  image_ids: string[];
  images: CatInfoImage[];
  created_at?: string;
  dates?: string[];
}

export interface User {
  id: string;
  login: string;
  email: string;
  phone: string;
  role: UserRole;
  first_name?: string;
  last_name?: string;
  business_name?: string;
  city?: string;
  image?: CatInfoImage;
  is_verified: boolean;
}

export interface Booking {
  id: number;
  user_id: string;
  activity_id: string;
  tariff_id?: number;
  status: BookingStatus;
  comment?: string;
  created_at: string;
  activity?: Activity;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender_id: string;
  created_at: string;
}

export interface Chat {
  id: string;
  type: 'personal' | 'group' | 'booking' | 'business';
  title?: string;
  name?: string;
  photo_uri?: string;
  last_message?: string;
  last_time?: string;
  unread_count?: number;
  messages?: ChatMessage[];
}
