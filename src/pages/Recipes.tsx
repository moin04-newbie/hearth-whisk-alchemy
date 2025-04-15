
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import RecipeCard from "@/components/Recipe/RecipeCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockRecipes } from "@/lib/mockData";
import { Filter, Search } from "lucide-react";

const Recipes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter recipes based on search query and active tab
  const filteredRecipes = mockRecipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && recipe.tags.includes(activeTab);
  });
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        {/* Header Section */}
        <section className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=2000&q=80" 
              alt="Food background" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="font-bold text-4xl md:text-5xl mb-4">Discover Recipes</h1>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Find your next favorite dish from our collection of trending recipes
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full bg-white/90 text-black border-0"
                />
              </div>
              <Button variant="outline" className="bg-white/20 border-white text-white hover:bg-white/30">
                <Filter className="h-4 w-4 mr-2" /> Filters
              </Button>
            </div>
          </div>
        </section>
        
        {/* Category Images */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="relative rounded-xl overflow-hidden h-32 group cursor-pointer" onClick={() => setActiveTab("breakfast")}>
              <img 
                src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=500&q=80" 
                alt="Breakfast" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white font-bold text-xl">Breakfast</span>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden h-32 group cursor-pointer" onClick={() => setActiveTab("lunch")}>
              <img 
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=500&q=80" 
                alt="Lunch" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white font-bold text-xl">Lunch</span>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden h-32 group cursor-pointer" onClick={() => setActiveTab("dinner")}>
              <img 
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=500&q=80" 
                alt="Dinner" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white font-bold text-xl">Dinner</span>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden h-32 group cursor-pointer" onClick={() => setActiveTab("dessert")}>
              <img 
                src="https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=500&q=80" 
                alt="Dessert" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white font-bold text-xl">Dessert</span>
              </div>
            </div>
          </div>
        
          {/* Recipe Categories */}
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full max-w-md mx-auto mb-8 bg-gray-100 overflow-x-auto flex whitespace-nowrap">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
              <TabsTrigger value="lunch">Lunch</TabsTrigger>
              <TabsTrigger value="dinner">Dinner</TabsTrigger>
              <TabsTrigger value="dessert">Dessert</TabsTrigger>
              <TabsTrigger value="snack">Snacks</TabsTrigger>
              <TabsTrigger value="vegan">Vegan</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.length > 0 ? (
                  filteredRecipes.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-16">
                    <p className="text-lg font-medium">No recipes found.</p>
                    <p className="text-gray-500">Try changing your search or filter criteria.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  );
};

export default Recipes;
