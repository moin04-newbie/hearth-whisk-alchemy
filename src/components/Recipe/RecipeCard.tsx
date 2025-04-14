
import { Link } from 'react-router-dom';
import { Clock, Utensils, ChefHat } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { Recipe } from '@/lib/mockData';

interface RecipeCardProps {
  recipe: Recipe;
  featured?: boolean;
}

const RecipeCard = ({ recipe, featured = false }: RecipeCardProps) => {
  return (
    <Link to={`/recipe/${recipe.id}`}>
      <Card className={`recipe-card h-full ${featured ? 'md:flex' : ''}`}>
        <div className={`${featured ? 'md:w-2/5' : 'w-full'} relative overflow-hidden`}>
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className={`w-full aspect-[4/3] object-cover ${featured ? 'md:h-full md:aspect-auto' : ''}`}
          />
          {recipe.creator.badges.length > 0 && (
            <Badge className="absolute top-2 right-2 bg-sage text-white">
              {recipe.creator.badges[0]}
            </Badge>
          )}
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
            {recipe.tags.slice(0, 3).map((tag, index) => (
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
            <div className="flex items-center">
              <img 
                src={recipe.creator.avatar} 
                alt={recipe.creator.name}
                className="h-6 w-6 rounded-full mr-2"
              />
              <span className="text-xs">{recipe.creator.name}</span>
            </div>
            
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
