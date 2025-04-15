
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RecipeCard from "@/components/Recipe/RecipeCard";
import { mockRecipes, mockChefs, getCurrentSeason } from "@/lib/mockData";

const Index = () => {
  const [trendingRecipes, setTrendingRecipes] = useState(mockRecipes.slice(0, 3));
  
  const featuredRecipe = mockRecipes[0];
  const currentSeason = getCurrentSeason();
  const seasonNames: Record<string, string> = {
    'winter': 'Winter',
    'spring': 'Spring',
    'summer': 'Summer',
    'fall': 'Autumn'
  };
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        {/* Hero Section - Modern and Clean */}
        <section className="relative h-[80vh] flex items-center">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10"></div>
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-cooking-with-wooden-utensils-30593-large.mp4" type="video/mp4" />
          </video>
          
          <div className="container mx-auto px-4 relative z-20 text-white">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Get <span className="text-purple-400">Inspired</span>, Get Cooking
              </h1>
              <p className="text-xl mb-8">
                Join our community of food lovers sharing recipes that vibe with your taste.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-purple-500 hover:bg-purple-600 text-white">
                  Explore Recipes
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  Join Community
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Trending Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Trending Now 🔥</h2>
              <Link to="/recipes" className="text-purple-500 hover:text-purple-700 flex items-center text-sm">
                See all <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trendingRecipes.map(recipe => (
                <div key={recipe.id} className="group">
                  <RecipeCard recipe={recipe} />
                  <div className="mt-3 flex justify-between items-center px-2">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-500">
                        <Heart className="h-4 w-4" /> {Math.floor(Math.random() * 100)}
                      </button>
                      <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-500">
                        <MessageCircle className="h-4 w-4" /> {Math.floor(Math.random() * 20)}
                      </button>
                    </div>
                    <span className="text-xs text-gray-500">{Math.floor(Math.random() * 1000)} shares</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Categories Section - Visual with emojis */}
        <section className="py-16 bg-gradient-to-r from-purple-100 to-pink-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Find Your Vibe 💯</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/recipes?category=quick-meals" className="group">
                <div className="aspect-square bg-white rounded-2xl shadow-sm flex flex-col items-center justify-center p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <div className="text-4xl mb-4">⏱️</div>
                  <h3 className="font-bold text-lg mb-2">Quick Meals</h3>
                  <p className="text-sm text-gray-500 text-center">Ready in under 30 mins</p>
                </div>
              </Link>
              
              <Link to="/recipes?category=plant-based" className="group">
                <div className="aspect-square bg-white rounded-2xl shadow-sm flex flex-col items-center justify-center p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <div className="text-4xl mb-4">🥦</div>
                  <h3 className="font-bold text-lg mb-2">Plant-Based</h3>
                  <p className="text-sm text-gray-500 text-center">Delicious vegan options</p>
                </div>
              </Link>
              
              <Link to="/recipes?category=snacks" className="group">
                <div className="aspect-square bg-white rounded-2xl shadow-sm flex flex-col items-center justify-center p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <div className="text-4xl mb-4">🍿</div>
                  <h3 className="font-bold text-lg mb-2">Snacks</h3>
                  <p className="text-sm text-gray-500 text-center">Perfect for movie nights</p>
                </div>
              </Link>
              
              <Link to="/recipes?category=desserts" className="group">
                <div className="aspect-square bg-white rounded-2xl shadow-sm flex flex-col items-center justify-center p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <div className="text-4xl mb-4">🍰</div>
                  <h3 className="font-bold text-lg mb-2">Desserts</h3>
                  <p className="text-sm text-gray-500 text-center">Sweet treats to share</p>
                </div>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Featured Creators Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Creators to Follow ✨</h2>
              <Link to="/chefs" className="text-purple-500 hover:text-purple-700 flex items-center text-sm">
                See all <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockChefs.slice(0, 4).map(chef => (
                <Link to={`/chef/${chef.id}`} key={chef.id} className="group">
                  <div className="bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="aspect-square relative">
                      <img 
                        src={chef.avatar} 
                        alt={chef.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                        <div className="p-4 text-white">
                          <h3 className="font-bold text-lg">{chef.name}</h3>
                          <p className="text-sm text-white/80">{chef.location}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-white">
                      <div className="flex justify-between text-sm">
                        <span>{chef.stats.recipesMade} recipes</span>
                        <span>{chef.stats.followers} followers</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Community Section */}
        <section className="py-16 bg-purple-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Food Community</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Share your creations, get inspired, and connect with other food lovers.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-purple-500 hover:bg-white/90">
                Create Account
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                Learn More
              </Button>
            </div>
            
            <div className="mt-12 flex flex-wrap justify-center gap-4 md:gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold">10K+</div>
                <div className="text-white/80">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">5K+</div>
                <div className="text-white/80">Recipes Shared</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">2K+</div>
                <div className="text-white/80">Daily Visitors</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
