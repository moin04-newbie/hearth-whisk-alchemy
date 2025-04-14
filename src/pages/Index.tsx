
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RecipeCard from "@/components/Recipe/RecipeCard";
import { mockRecipes, mockChefs, getCurrentSeason, getSeasonalClass } from "@/lib/mockData";

const Index = () => {
  const [seasonalClass, setSeasonalClass] = useState("");
  
  useEffect(() => {
    setSeasonalClass(getSeasonalClass());
  }, []);
  
  const featuredRecipe = mockRecipes[0];
  const popularRecipes = mockRecipes.slice(1, 4);
  const currentSeason = getCurrentSeason();
  const seasonNames: Record<string, string> = {
    'winter': 'Winter',
    'spring': 'Spring',
    'summer': 'Summer',
    'fall': 'Autumn'
  };
  
  return (
    <div className={`min-h-screen ${seasonalClass}`}>
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-warm-oak/90 to-warm-oak/50 z-10"></div>
          <div className="h-[500px] bg-[url('/placeholder.svg')] bg-cover bg-center"></div>
          <div className="container mx-auto px-4 absolute inset-0 flex items-center z-20">
            <div className="max-w-lg text-white">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
                Discover the joy of homemade cooking
              </h1>
              <p className="text-lg mb-6">
                Explore our collection of handcrafted recipes from passionate chefs around the world.
              </p>
              <div className="flex space-x-4">
                <Button className="bg-sage hover:bg-sage/90 text-white btn-jiggle">
                  Browse Recipes
                </Button>
                <Button variant="outline" className="text-white border-white hover:bg-white/20 btn-jiggle">
                  Meet Our Chefs
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Recipe Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-playfair text-2xl md:text-3xl font-semibold">Featured Recipe</h2>
            <Link to="/recipes" className="text-warm-oak hover:text-warm-oak/80 flex items-center text-sm">
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <RecipeCard recipe={featuredRecipe} featured={true} />
        </section>
        
        {/* Popular Recipes Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-playfair text-2xl md:text-3xl font-semibold">Popular Recipes</h2>
            <Link to="/recipes" className="text-warm-oak hover:text-warm-oak/80 flex items-center text-sm">
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </section>
        
        {/* Seasonal Section */}
        <section className="bg-sage/10 py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-playfair text-2xl md:text-3xl font-semibold">
                {seasonNames[currentSeason]} Favorites
              </h2>
              <Link to="/recipes?tag=seasonal" className="text-warm-oak hover:text-warm-oak/80 flex items-center text-sm">
                View all <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockRecipes.slice(0, 4).map(recipe => (
                <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img 
                    src={recipe.image} 
                    alt={recipe.title} 
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-playfair font-semibold mb-2 line-clamp-1">{recipe.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">{recipe.description}</p>
                    <Link to={`/recipe/${recipe.id}`} className="text-sage hover:text-sage/80 text-sm font-medium">
                      View Recipe
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Meet Our Chefs Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="font-playfair text-2xl md:text-3xl font-semibold mb-6">Meet Our Chefs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mockChefs.map(chef => (
              <Link to={`/chef/${chef.id}`} key={chef.id} className="flex bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:translate-y-[-4px]">
                <div className="w-1/3">
                  <img 
                    src={chef.avatar} 
                    alt={chef.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-2/3 p-4">
                  <h3 className="font-playfair font-semibold text-lg mb-1">{chef.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{chef.location}</p>
                  <p className="text-sm line-clamp-2">{chef.bio}</p>
                  <div className="mt-3 flex">
                    <span className="text-xs text-gray-500">{chef.stats.recipesMade} recipes</span>
                    <span className="text-xs text-gray-500 mx-2">•</span>
                    <span className="text-xs text-gray-500">{chef.stats.followers} followers</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              className="border-warm-oak text-warm-oak hover:bg-warm-oak/5 btn-jiggle"
            >
              View All Chefs
            </Button>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="bg-warm-oak/10 py-16">
          <div className="container mx-auto px-4 max-w-xl text-center">
            <h2 className="font-playfair text-2xl md:text-3xl font-semibold mb-4">
              Join Our Cooking Community
            </h2>
            <p className="mb-6">
              Subscribe to receive seasonal recipes, cooking tips, and exclusive content directly to your inbox.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-l-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-warm-oak focus:border-transparent"
              />
              <Button className="rounded-l-none bg-warm-oak hover:bg-warm-oak/90 text-white btn-jiggle">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
