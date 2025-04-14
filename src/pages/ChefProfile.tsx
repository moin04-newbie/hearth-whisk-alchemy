
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RecipeCard from "@/components/Recipe/RecipeCard";
import ChefStats from "@/components/Chef/ChefStats";
import { mockChefs, mockRecipes } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

const ChefProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const chef = mockChefs.find(c => c.id === id);
  
  const chefRecipes = mockRecipes.filter(recipe => 
    chef?.recipes.includes(recipe.id)
  );
  
  if (!chef) {
    return (
      <div className="min-h-screen bg-cream">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="font-playfair text-3xl mb-4">Chef Not Found</h2>
          <p className="mb-8">The chef profile you're looking for doesn't exist.</p>
          <Link to="/">
            <Button className="bg-warm-oak hover:bg-warm-oak/90 text-white">
              Return to Home
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  const handleFollow = () => {
    toast({
      title: "Following Chef",
      description: `You are now following ${chef.name}`,
    });
  };
  
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-warm-oak mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to home
        </Link>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="h-48 bg-sage/20"></div>
          
          <div className="p-6 relative">
            <img 
              src={chef.avatar} 
              alt={chef.name}
              className="absolute w-24 h-24 rounded-full border-4 border-white object-cover -top-12"
            />
            
            <div className="pt-16 md:pt-0 md:ml-32 flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <h1 className="font-playfair text-3xl font-semibold mb-1">{chef.name}</h1>
                <div className="flex flex-wrap items-center text-gray-500 text-sm mb-4">
                  <div className="flex items-center mr-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{chef.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Joined {chef.joined}</span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 max-w-2xl">{chef.bio}</p>
              </div>
              
              <Button 
                className="bg-warm-oak hover:bg-warm-oak/90 text-white btn-jiggle mb-4 md:mb-0"
                onClick={handleFollow}
              >
                Follow Chef
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="recipes" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="recipes" className="data-[state=active]:bg-warm-oak data-[state=active]:text-white">Recipes</TabsTrigger>
                <TabsTrigger value="about" className="data-[state=active]:bg-warm-oak data-[state=active]:text-white">About</TabsTrigger>
              </TabsList>
              
              <TabsContent value="recipes">
                <h2 className="font-playfair text-2xl font-semibold mb-6">{chef.name}'s Recipes</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {chefRecipes.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
                
                {chefRecipes.length === 0 && (
                  <div className="text-center py-12 bg-muted rounded-lg">
                    <p className="text-gray-500">No recipes to display yet.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="about">
                <h2 className="font-playfair text-2xl font-semibold mb-6">About {chef.name}</h2>
                
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h3 className="font-playfair text-xl font-semibold mb-4">Biography</h3>
                  <p className="text-gray-700 mb-6">{chef.bio}</p>
                  
                  <h3 className="font-playfair text-xl font-semibold mb-4">Culinary Background</h3>
                  <p className="text-gray-700 mb-4">
                    {chef.name} specializes in {chef.stats.cuisines.join(", ")} cuisine, with particular expertise 
                    in traditional cooking methods and seasonal ingredients.
                  </p>
                  <p className="text-gray-700">
                    With {chef.stats.recipesMade} recipes developed and shared with our community, {chef.name} has 
                    earned badges for {chef.stats.badges.join(", ")}.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-1">
            <ChefStats chef={chef} />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ChefProfile;
