
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockRecipes } from "@/lib/mockData";
import { Calendar, Plus, ShoppingBag, Utensils, X } from "lucide-react";

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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
        <section className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-16">
          <div className="container mx-auto px-4 text-center">
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
        
        {/* Meal Planning Tool */}
        <section className="container mx-auto px-4 py-12">
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
                              <p className="text-sm font-medium pr-6 line-clamp-1">{recipe.title}</p>
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
      
      <Footer />
    </div>
  );
};

export default MealPlanning;
