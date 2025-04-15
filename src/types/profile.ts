
import { ReactNode } from 'react';

export interface UserAchievement {
  name: string;
  description: string;
  icon: ReactNode;
}

export interface UserStats {
  totalCookingTime: string;
  favoriteCuisine: string;
  mostUsedIngredient: string;
  completedRecipes: number;
  points: number;
  level: number;
}

export interface UserData {
  id: string;
  name: string;
  username: string;
  avatar: string;
  coverPhoto: string;
  bio: string;
  location: string;
  website: string;
  joined: string;
  followers: number;
  following: number;
  recipesCreated: number;
  savedRecipes: number[];
  likedRecipes: number[];
  achievements: UserAchievement[];
  stats: UserStats;
}
