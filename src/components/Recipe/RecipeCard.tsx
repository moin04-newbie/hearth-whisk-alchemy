
import { Link } from 'react-router-dom';
import { Clock, Utensils, ChefHat, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import type { Recipe } from '@/lib/mockData';
import { useState } from 'react';

interface RecipeCardProps {
  recipe: Recipe;
  featured?: boolean;
}

const RecipeCard = ({ recipe, featured = false }: RecipeCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Ensure recipe.id exists before trying to create a link
  if (!recipe || !recipe.id) {
    console.error('Recipe or recipe.id is undefined:', recipe);
    return null; // Don't render anything if there's no valid recipe
  }

  return (
    <Link to={`/recipe/${recipe.id}`}>
      <Card 
        className={`recipe-card h-full ${featured ? 'md:flex' : ''} overflow-hidden transform transition-all duration-300 hover:shadow-lg ${isHovered ? 'scale-[1.02]' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`${featured ? 'md:w-2/5' : 'w-full'} relative overflow-hidden`}>
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className={`w-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'} ${
              featured ? 'md:h-full md:aspect-auto' : 'aspect-[4/3]'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
          
          {recipe.creator && recipe.creator.badges && recipe.creator.badges.length > 0 && (
            <HoverCard>
              <HoverCardTrigger asChild>
                <Badge className="absolute top-2 right-2 bg-purple-500 text-white cursor-pointer">
                  {recipe.creator.badges[0]}
                </Badge>
              </HoverCardTrigger>
              <HoverCardContent className="w-64">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">{recipe.creator.badges[0]} Badge</h4>
                  <p className="text-xs">This chef has been recognized for exceptional recipes and contributions.</p>
                </div>
              </HoverCardContent>
            </HoverCard>
          )}
          
          <div className="absolute bottom-2 left-2">
            <Badge variant="outline" className="bg-white/80 text-black text-xs">
              {recipe.cookTime}
            </Badge>
          </div>
        </div>
        <CardContent 
          className={`p-4 ${featured ? 'md:w-3/5' : ''} flex flex-col h-full`}
        >
          <h3 className="font-playfair font-semibold text-lg mb-2 line-clamp-2">{recipe.title}</h3>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{recipe.description}</p>
          
          <div className="flex items-center text-xs text-gray-500 mb-3">
            <Clock className="h-3 w-3 mr-1" />
            <span className="mr-3">{recipe.prepTime} prep</span>
            <Utensils className="h-3 w-3 mr-1" />
            <span>{recipe.difficulty}</span>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {recipe.tags && recipe.tags.slice(0, 3).map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline"
                className="text-xs bg-muted hover:bg-muted"
              >
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="mt-auto flex items-center pt-2 border-t border-gray-100">
            {recipe.creator && (
              <div className="flex items-center">
                <img 
                  src={recipe.creator.avatar} 
                  alt={recipe.creator.name}
                  className="h-6 w-6 rounded-full mr-2 object-cover border border-gray-100"
                />
                <span className="text-xs">{recipe.creator.name}</span>
              </div>
            )}
            
            <div className="ml-auto flex items-center text-xs text-gray-500">
              <ChefHat className="h-3 w-3 mr-1" />
              <span>{recipe.cuisine}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RecipeCard;
