
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Clock, Users, ChefHat, Printer, Share2, Expand, BookmarkPlus, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MeasurementToggle from "@/components/ui/MeasurementToggle";
import RecipeSteps from "@/components/Recipe/RecipeSteps";
import RecipeComments from "@/components/Recipe/RecipeComments";
import { mockRecipes, Recipe as RecipeType } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const recipe = mockRecipes.find(r => r.id === id) as RecipeType;
  
  const [isMetric, setIsMetric] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [cookMode, setCookMode] = useState(false);
  
  if (!recipe) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="font-bold text-3xl mb-4">Recipe Not Found</h2>
          <p className="mb-8">The recipe you're looking for doesn't exist or has been removed.</p>
          <Link to="/">
            <Button>
              Return to Home
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed from likes" : "Added to likes",
      description: isLiked ? "Recipe removed from your liked recipes" : "Recipe added to your liked recipes",
    });
  };
  
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from saved" : "Saved recipe",
      description: isBookmarked ? "Recipe removed from your saved collection" : "Recipe saved to your collection",
    });
  };
  
  const handleShare = () => {
    toast({
      title: "Link copied!",
      description: "Recipe link has been copied to your clipboard.",
    });
  };
  
  const toggleCookMode = () => {
    setCookMode(!cookMode);
    if (!cookMode) {
      toast({
        title: "Cook Mode Activated",
        description: "Instructions shown in fullscreen for easier cooking.",
      });
    }
  };
  
  const mainContent = (
    <>
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-purple-500 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to recipes
        </Link>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="relative">
            <img 
              src={recipe.image} 
              alt={recipe.title} 
              className="w-full h-[400px] object-cover"
            />
            
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60"></div>
            
            <div className="absolute bottom-0 left-0 w-full p-6 text-white">
              <div className="flex flex-wrap gap-2 mb-4">
                {recipe.tags.map((tag, index) => (
                  <Badge key={index} className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{recipe.title}</h1>
              
              <div className="flex items-center">
                <Link to={`/chef/${recipe.creator.id}`} className="flex items-center">
                  <img 
                    src={recipe.creator.avatar} 
                    alt={recipe.creator.name}
                    className="h-8 w-8 rounded-full border-2 border-white mr-2"
                  />
                  <span className="font-medium">{recipe.creator.name}</span>
                </Link>
                <span className="mx-2">•</span>
                <span>{recipe.cuisine} Cuisine</span>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="recipe" className="p-6">
            <TabsList className="mb-6">
              <TabsTrigger value="recipe">Recipe</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recipe">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <p className="text-gray-600 mb-6">{recipe.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-6 mb-6 text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-purple-500 mr-2" />
                      <span>Prep: {recipe.prepTime}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-purple-500 mr-2" />
                      <span>Cook: {recipe.cookTime}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-purple-500 mr-2" />
                      <span>Servings: {recipe.servings}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <ChefHat className="h-4 w-4 text-purple-500 mr-2" />
                      <span>Difficulty: {recipe.difficulty}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-gray-200 hover:bg-gray-50"
                        onClick={handleLike}
                      >
                        <Heart 
                          className={`h-4 w-4 mr-2 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} 
                        />
                        <span>{isLiked ? 'Liked' : 'Like'}</span>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-gray-200 hover:bg-gray-50"
                        onClick={handleBookmark}
                      >
                        {isBookmarked ? (
                          <>
                            <BookmarkCheck className="h-4 w-4 mr-2 text-purple-500" />
                            <span>Saved</span>
                          </>
                        ) : (
                          <>
                            <BookmarkPlus className="h-4 w-4 mr-2 text-gray-500" />
                            <span>Save</span>
                          </>
                        )}
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-gray-200 hover:bg-gray-50"
                        onClick={handleShare}
                      >
                        <Share2 className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Share</span>
                      </Button>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-gray-200 hover:bg-gray-50"
                      >
                        <Printer className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="hidden md:inline">Print</span>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-gray-200 hover:bg-gray-50"
                        onClick={toggleCookMode}
                      >
                        <Expand className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="hidden md:inline">Cook Mode</span>
                      </Button>
                    </div>
                  </div>
                  
                  <Separator className="mb-8" />
                  
                  <MeasurementToggle onToggle={setIsMetric} />
                  
                  <div className="mb-8">
                    <h3 className="font-bold text-xl mb-4">Ingredients</h3>
                    <ul className="space-y-2">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-purple-500 mr-3"></span>
                          <span>
                            {isMetric ? ingredient.amountMetric : ingredient.amount} {ingredient.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <RecipeSteps steps={recipe.steps} />
                </div>
                
                <div className="lg:col-span-1">
                  <div className="bg-purple-50 rounded-xl p-6 mb-6 sticky top-20">
                    <h3 className="font-bold text-xl mb-4">Pro Tips</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">👉</span>
                        <span>Read the recipe completely before starting to cook.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">🧰</span>
                        <span>Prepare all ingredients before you begin (mise en place).</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">🧂</span>
                        <span>Adjust seasonings to your taste preferences.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">⏱️</span>
                        <span>Use a timer to avoid overcooking.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">😋</span>
                        <span>Let the dish rest before serving for best flavor.</span>
                      </li>
                    </ul>
                    
                    <Separator className="my-6" />
                    
                    <h3 className="font-bold text-xl mb-4">You might also like</h3>
                    <div className="space-y-4">
                      {mockRecipes
                        .filter(r => r.id !== recipe.id)
                        .slice(0, 3)
                        .map(relatedRecipe => (
                          <Link 
                            key={relatedRecipe.id} 
                            to={`/recipe/${relatedRecipe.id}`}
                            className="flex hover:bg-purple-100 rounded-lg p-2 transition-colors"
                          >
                            <img 
                              src={relatedRecipe.image} 
                              alt={relatedRecipe.title}
                              className="w-20 h-20 rounded-md object-cover mr-3"
                            />
                            <div>
                              <h4 className="font-medium line-clamp-2">{relatedRecipe.title}</h4>
                              <p className="text-xs text-gray-500">{relatedRecipe.cuisine}</p>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="comments">
              <RecipeComments recipeId={recipe.id} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
  
  const cookModeContent = (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      <div className="max-w-3xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-bold text-2xl">{recipe.title}</h1>
          <Button 
            variant="ghost"
            className="text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            onClick={toggleCookMode}
          >
            Exit Cook Mode
          </Button>
        </div>
        
        <Separator className="mb-6" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-xl mb-4">Ingredients</h3>
            <MeasurementToggle onToggle={setIsMetric} defaultMetric={isMetric} />
            <ul className="space-y-3 text-lg">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-purple-500 mr-3"></span>
                  <span>
                    {isMetric ? ingredient.amountMetric : ingredient.amount} {ingredient.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-6">
            <h3 className="font-bold text-xl">Preparation Steps</h3>
            {recipe.steps.map((step, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold mb-2">Step {index + 1}</p>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-gray-50">
      {!cookMode && <Navbar />}
      {cookMode ? cookModeContent : mainContent}
      {!cookMode && <Footer />}
    </div>
  );
};

export default RecipeDetail;
