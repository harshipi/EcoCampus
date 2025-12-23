
export interface UserStats {
  carbonCredits: number;
  co2Saved: number; // in kg
  streak: number;
  level: number;
  xp: number;
  lastActionDate: string; // ISO string
}

export interface FriendStreak {
  id: string;
  name: string;
  avatar: string;
  streakDays: number;
  activeToday: boolean;
  isExpiring: boolean; // if less than 2 hours left to maintain streak
}

export interface DormTeam {
  id: string;
  name: string;
  memberCount: number;
  totalCo2Saved: number;
  rank: number;
}

export interface MarketplaceItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'cafeteria' | 'donation' | 'merch' | 'nft' | 'powerup';
  image: string;
}

export interface EcoExchangeItem {
  id: string;
  title: string;
  description: string;
  price: number | 'Free';
  category: 'clothing' | 'books' | 'electronics' | 'household' | 'other';
  condition: 'New' | 'Good' | 'Fair';
  sellerName: string;
  sellerAvatar: string;
  image: string;
  location: string;
}

export interface SustainabilityTip {
  title: string;
  action: string;
  impact: string;
  category: string;
}

export type ViewState = 'dashboard' | 'scanner' | 'leaderboard' | 'marketplace' | 'coach' | 'map' | 'exchange';
