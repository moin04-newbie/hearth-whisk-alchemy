import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Heart, MessageCircle, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import RecipeCard from "@/components/Recipe/RecipeCard";
import { mockRecipes, mockChefs, getCurrentSeason } from "@/lib/mockData";
import { useRecipeTasks } from "@/lib/taskUtils";
const Index = () => {
  const [trendingRecipes, setTrendingRecipes] = useState(mockRecipes.slice(0, 3));
  const {
    points
  } = useRecipeTasks();
  const featuredRecipe = mockRecipes[0];
  const currentSeason = getCurrentSeason();
  const seasonNames: Record<string, string> = {
    'winter': 'Winter',
    'spring': 'Spring',
    'summer': 'Summer',
    'fall': 'Autumn'
  };
  return <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        {/* Hero Section - More Compact */}
        <section className="relative h-[70vh] flex items-center">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10"></div>
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src="https://assets.mixkit.co/videos/preview/mixkit-cooking-with-wooden-utensils-30593-large.mp4" type="video/mp4" />
          </video>
          
          <div className="container mx-auto px-4 relative z-20 text-white">
            <div className="max-w-2xl">
              <div className="flex items-center mb-4 bg-white/10 backdrop-blur-sm w-fit px-3 py-1 rounded-full">
                <Trophy className="h-4 w-4 mr-2 text-yellow-400" />
                <span className="text-sm font-medium">{points} points earned</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Get <span className="text-purple-400">Inspired</span>, Get Cooking
              </h1>
              <p className="text-lg mb-6">
                Complete recipes, earn points, share with friends.
              </p>
              <div className="flex flex-wrap gap-3">
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
        
        {/* Trending Section - More Compact */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Trending Now 🔥</h2>
              <Link to="/recipes" className="text-purple-500 hover:text-purple-700 flex items-center text-sm">
                See all <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {trendingRecipes.map(recipe => <div key={recipe.id} className="group">
                  <RecipeCard recipe={recipe} />
                  <div className="mt-2 flex justify-between items-center px-1">
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-500">
                        <Heart className="h-4 w-4" /> {Math.floor(Math.random() * 100)}
                      </button>
                      <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-500">
                        <MessageCircle className="h-4 w-4" /> {Math.floor(Math.random() * 20)}
                      </button>
                    </div>
                    <span className="text-xs text-gray-500">{Math.floor(Math.random() * 1000)} shares</span>
                  </div>
                </div>)}
            </div>
          </div>
        </section>
        
        {/* Categories Section - More Compact */}
        <section className="py-10 bg-gradient-to-r from-purple-100 to-pink-100">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Find Your Vibe 💯</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Link to="/recipes?category=quick-meals" className="group">
                <div className="aspect-square bg-white rounded-xl shadow-sm flex flex-col items-center justify-center p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=300&q=80" alt="Quick Meals" className="w-16 h-16 object-cover rounded-full mb-4" />
                  <h3 className="font-bold text-base mb-1">Quick Meals</h3>
                  <p className="text-xs text-gray-500 text-center">Ready in under 30 mins</p>
                </div>
              </Link>
              
              <Link to="/recipes?category=plant-based" className="group">
                <div className="aspect-square bg-white rounded-xl shadow-sm flex flex-col items-center justify-center p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <img src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=300&q=80" alt="Plant-Based" className="w-16 h-16 object-cover rounded-full mb-4" />
                  <h3 className="font-bold text-base mb-1">Plant-Based</h3>
                  <p className="text-xs text-gray-500 text-center">Delicious vegan options</p>
                </div>
              </Link>
              
              <Link to="/recipes?category=snacks" className="group">
                <div className="aspect-square bg-white rounded-xl shadow-sm flex flex-col items-center justify-center p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <img src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=300&q=80" alt="Snacks" className="w-16 h-16 object-cover rounded-full mb-4" />
                  <h3 className="font-bold text-base mb-1">Snacks</h3>
                  <p className="text-xs text-gray-500 text-center">Perfect for movie nights</p>
                </div>
              </Link>
              
              <Link to="/recipes?category=desserts" className="group">
                <div className="aspect-square bg-white rounded-xl shadow-sm flex flex-col items-center justify-center p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <img src="https://images.unsplash.com/photo-1616690710400-a16d146927c5?auto=format&fit=crop&w=300&q=80" alt="Desserts" className="w-16 h-16 object-cover rounded-full mb-4" />
                  <h3 className="font-bold text-base mb-1">Desserts</h3>
                  <p className="text-xs text-gray-500 text-center">Sweet treats to share</p>
                </div>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Featured Creators Section - More Compact */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Creators to Follow ✨</h2>
              <Link to="/chefs" className="text-purple-500 hover:text-purple-700 flex items-center text-sm">
                See all <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {mockChefs.slice(0, 4).map(chef => <Link to={`/chef/${chef.id}`} key={chef.id} className="group">
                  <div className="bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="aspect-square relative">
                      <img src={chef.avatar} alt={chef.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                        <div className="p-3 text-white">
                          <h3 className="font-bold text-base">{chef.name}</h3>
                          <p className="text-xs text-white/80">{chef.location}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-white">
                      <div className="flex justify-between text-xs">
                        <span>{chef.stats.recipesMade} recipes</span>
                        <span>{chef.stats.followers} followers</span>
                      </div>
                    </div>
                  </div>
                </Link>)}
            </div>
          </div>
        </section>
        
        {/* Community Section - More Compact */}
        <section className="py-10 bg-purple-500 text-white">
          <div className="container mx-auto px-4 md:flex items-center">
            <div className="md:w-1/2 text-center md:text-left md:pr-8 mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-3">Join Our Food Community</h2>
              <p className="text-lg mb-6">
                Share your creations, earn points, and connect with other food lovers.
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <Button size="lg" className="bg-white text-purple-500 hover:bg-white/90">
                  Create Account
                </Button>
                <Button size="lg" variant="outline" className="border-white hover:bg-white/20 text-gray-950">
                  Learn More
                </Button>
              </div>
              
              <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4 md:gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold">10K+</div>
                  <div className="text-white/80 text-sm">Active Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">5K+</div>
                  <div className="text-white/80 text-sm">Recipes Shared</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">2K+</div>
                  <div className="text-white/80 text-sm">Daily Visitors</div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <img src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80" alt="Community cooking together" className="rounded-lg shadow-lg w-full h-auto" />
            </div>
          </div>
        </section>
      </main>
    </div>;
};
export default Index;