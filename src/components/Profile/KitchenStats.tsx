
import { Clock, Trophy, Medal, ChefHat } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface KitchenStatsProps {
  stats: {
    totalCookingTime: string;
    favoriteCuisine: string;
    mostUsedIngredient: string;
    completedRecipes: number;
    points: number;
    level: number;
  };
}

const KitchenStats = ({ stats }: KitchenStatsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="font-playfair text-xl font-semibold mb-4">Kitchen Stats</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <Clock className="h-6 w-6 mx-auto mb-2 text-purple-500" />
          <p className="text-sm text-gray-500">Cooking Time</p>
          <p className="font-semibold">{stats.totalCookingTime}</p>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <Trophy className="h-6 w-6 mx-auto mb-2 text-blue-500" />
          <p className="text-sm text-gray-500">Recipes Completed</p>
          <p className="font-semibold">{stats.completedRecipes}</p>
        </div>
        
        <div className="bg-amber-50 rounded-lg p-4 text-center">
          <Medal className="h-6 w-6 mx-auto mb-2 text-amber-500" />
          <p className="text-sm text-gray-500">Points Earned</p>
          <p className="font-semibold">{stats.points}</p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <ChefHat className="h-6 w-6 mx-auto mb-2 text-green-500" />
          <p className="text-sm text-gray-500">Favorite Cuisine</p>
          <p className="font-semibold">{stats.favoriteCuisine}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Level {stats.level}</span>
          <span className="text-sm text-gray-500">{stats.points}/{stats.level * 100} points</span>
        </div>
        <Progress 
          value={stats.points % (stats.level * 100) / (stats.level * 100) * 100} 
          className="h-2 bg-gray-100"
        />
      </div>
    </div>
  );
};

export default KitchenStats;
