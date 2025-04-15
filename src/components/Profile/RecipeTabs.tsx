
import { Bookmark, Heart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import RecipeCard from '@/components/Recipe/RecipeCard';
import { Recipe } from '@/lib/mockData';

interface RecipeTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  createdRecipes: Recipe[];
  savedRecipes: Recipe[];
  likedRecipes: Recipe[];
}

const RecipeTabs = ({ 
  activeTab, 
  setActiveTab, 
  createdRecipes, 
  savedRecipes, 
  likedRecipes 
}: RecipeTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="w-full max-w-md mb-6 justify-start">
        <TabsTrigger value="recipes">My Recipes</TabsTrigger>
        <TabsTrigger value="saved">Saved Recipes</TabsTrigger>
        <TabsTrigger value="likes">Liked Recipes</TabsTrigger>
        <TabsTrigger value="cookbooks">Cookbooks</TabsTrigger>
      </TabsList>
      
      <TabsContent value="recipes" className="mt-0">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-playfair text-2xl font-semibold">My Recipes</h2>
          <Button>Create New Recipe</Button>
        </div>
        
        {createdRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {createdRecipes.map(recipe => recipe && (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted rounded-lg">
            <p className="mb-4 text-gray-500">You haven't created any recipes yet.</p>
            <Button>Create Your First Recipe</Button>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="saved" className="mt-0">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-playfair text-2xl font-semibold">Saved Recipes</h2>
          <Button variant="outline">
            <Bookmark className="h-4 w-4 mr-2" />
            New Collection
          </Button>
        </div>
        
        {savedRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {savedRecipes.map(recipe => recipe && (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted rounded-lg">
            <p className="text-gray-500">No saved recipes yet. Browse recipes to save your favorites.</p>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="likes" className="mt-0">
        <h2 className="font-playfair text-2xl font-semibold mb-6">Liked Recipes</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {likedRecipes.map(recipe => recipe && (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="cookbooks" className="mt-0">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-playfair text-2xl font-semibold">My Cookbooks</h2>
          <Button>Create Cookbook</Button>
        </div>
        
        <div className="text-center py-12 bg-muted rounded-lg">
          <p className="mb-4 text-gray-500">You haven't created any cookbooks yet.</p>
          <Button>Create Your First Cookbook</Button>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default RecipeTabs;
