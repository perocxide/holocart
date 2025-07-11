export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  addedBy: string;
  addedAt: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  text: string;
  author: string;
  authorName: string;
  timestamp: number;
}

export interface ShoppingGroup {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  createdAt: number;
  members: { [uid: string]: User };
  cart: { [itemId: string]: CartItem };
  budget: number;
  totalSpent: number;
  activity: ActivityLog[];
}

export interface ActivityLog {
  id: string;
  type: 'item_added' | 'item_removed' | 'item_updated' | 'member_joined' | 'member_left';
  message: string;
  user: string;
  userName: string;
  timestamp: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
}