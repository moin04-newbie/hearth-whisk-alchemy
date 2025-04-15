
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockRecipes } from "@/lib/mockData";
import { Calendar, Plus, ShoppingBag, Utensils, X } from "lucide-react";

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Background images for different meal types
const mealTypeImages = {
  breakfast: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=300&q=80",
  lunch: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=300&q=80",
  dinner: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=300&q=80",
  snack: "https://images.unsplash.com/photo-1593001872095-7d5b3868eb2a?auto=format&fit=crop&w=300&q=80"
};

const MealPlanning = () => {
  const [selectedMeals, setSelectedMeals] = useState<Record<string, string[]>>({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  });
  
  const addMeal = (day: string, recipeId: string) => {
    setSelectedMeals({
      ...selectedMeals,
      [day]: [...selectedMeals[day], recipeId]
    });
  };
  
  const removeMeal = (day: string, recipeId: string) => {
    setSelectedMeals({
      ...selectedMeals,
      [day]: selectedMeals[day].filter(id => id !== recipeId)
    });
  };
  
  const getRecipeById = (id: string) => {
    return mockRecipes.find(recipe => recipe.id === id) || null;
  };
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        {/* Header Section */}
        <section className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?auto=format&fit=crop&w=2000&q=80" 
              alt="Meal planning" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="font-bold text-4xl md:text-5xl mb-4">Meal Planning</h1>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Plan your weekly meals and save time with our easy meal planning tool
            </p>
            
            <div className="flex gap-4 justify-center">
              <Button className="bg-white text-green-600 hover:bg-white/90">
                <Calendar className="h-4 w-4 mr-2" /> Plan Your Week
              </Button>
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/20">
                <ShoppingBag className="h-4 w-4 mr-2" /> Generate Shopping List
              </Button>
            </div>
          </div>
        </section>
        
        {/* Visual Guide to Meal Planning */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Card className="overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=500&q=80" 
                alt="Step 1" 
                className="w-full h-40 object-cover"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-2">1. Choose Your Recipes</h3>
                <p className="text-sm text-gray-600">Browse our collection and select recipes that match your dietary needs and preferences.</p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=500&q=80" 
                alt="Step 2" 
                className="w-full h-40 object-cover"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-2">2. Plan Your Week</h3>
                <p className="text-sm text-gray-600">Drag and drop meals into your weekly calendar to organize your cooking schedule.</p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=500&q=80" 
                alt="Step 3" 
                className="w-full h-40 object-cover"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-2">3. Get Shopping List</h3>
                <p className="text-sm text-gray-600">Generate a complete shopping list based on your meal plan with just one click.</p>
              </CardContent>
            </Card>
          </div>
        
          {/* Meal Planning Tool */}
          <Tabs defaultValue="planner" className="w-full">
            <TabsList className="w-full max-w-md mx-auto mb-8">
              <TabsTrigger value="planner" className="flex-1">Weekly Planner</TabsTrigger>
              <TabsTrigger value="browse" className="flex-1">Browse Recipes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="planner">
              <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                {DAYS_OF_WEEK.map(day => (
                  <Card key={day} className="overflow-hidden">
                    <CardHeader className="bg-gray-50 py-3">
                      <CardTitle className="text-center text-base">{day}</CardTitle>
                    </CardHeader>
                    
                    <CardContent className="p-3 min-h-[200px]">
                      {selectedMeals[day].length > 0 ? (
                        selectedMeals[day].map(recipeId => {
                          const recipe = getRecipeById(recipeId);
                          return recipe ? (
                            <div key={recipeId} className="mb-2 p-2 bg-gray-50 rounded-md relative group">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                                  <img 
                                    src={recipe.image} 
                                    alt={recipe.title} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <p className="text-sm font-medium pr-6 line-clamp-1">{recipe.title}</p>
                              </div>
                              <button 
                                onClick={() => removeMeal(day, recipeId)}
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-3 w-3 text-gray-500 hover:text-red-500" />
                              </button>
                            </div>
                          ) : null;
                        })
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                          No meals planned
                        </div>
                      )}
                    </CardContent>
                    
                    <CardFooter className="p-3 pt-0 flex justify-center">
                      <Button variant="ghost" size="sm" className="w-full text-xs">
                        <Plus className="h-3 w-3 mr-1" /> Add Meal
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="browse">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {mockRecipes.slice(0, 8).map(recipe => (
                  <Card key={recipe.id} className="overflow-hidden">
                    <img 
                      src={recipe.image} 
                      alt={recipe.title} 
                      className="w-full h-32 object-cover"
                    />
                    
                    <CardContent className="p-3">
                      <h3 className="font-medium text-sm mb-1 line-clamp-2">{recipe.title}</h3>
                      <div className="flex items-center text-xs text-gray-500">
                        <Utensils className="h-3 w-3 mr-1" />
                        <span>{recipe.difficulty}</span>
                        <span className="mx-1">•</span>
                        <span>{recipe.prepTime}</span>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="p-3 pt-0 flex justify-center">
                      <select 
                        className="w-full text-xs p-1 border rounded"
                        onChange={(e) => {
                          if (e.target.value) addMeal(e.target.value, recipe.id);
                          e.target.value = "";
                        }}
                      >
                        <option value="">Add to day...</option>
                        {DAYS_OF_WEEK.map(day => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  );
};

export default MealPlanning;
