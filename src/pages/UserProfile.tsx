
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Settings, Bookmark, Heart, Calendar, Trophy, Clock, Medal, Edit, Camera } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RecipeCard from '@/components/Recipe/RecipeCard';
import { mockRecipes, mockChefs } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

// Mock user data for the profile page
const userData = {
  id: "user1",
  name: "Jamie Oliver",
  username: "@jamieoliver",
  avatar: "https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=500&q=80",
  coverPhoto: "https://images.unsplash.com/photo-1518291344630-4857135fb581?auto=format&fit=crop&w=1200&q=80",
  bio: "Food enthusiast and home cook. I love creating simple and flavorful dishes that anyone can make!",
  location: "London, UK",
  website: "foodieblog.com",
  joined: "January 2022",
  followers: 1243,
  following: 567,
  recipesCreated: 24,
  savedRecipes: [1, 3, 5, 7],
  likedRecipes: [2, 4, 6, 8],
  achievements: [
    { name: "Recipe Master", description: "Created 20+ recipes", icon: <Trophy className="h-5 w-5 text-yellow-500" /> },
    { name: "Quick Cook", description: "5+ recipes under 30 minutes", icon: <Clock className="h-5 w-5 text-blue-500" /> },
    { name: "Community Favorite", description: "Received 100+ likes", icon: <Heart className="h-5 w-5 text-red-500" /> },
  ],
  stats: {
    totalCookingTime: "42 hours",
    favoriteCuisine: "Italian",
    mostUsedIngredient: "Garlic",
    completedRecipes: 68,
    points: 1250,
    level: 15
  }
};

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('recipes');
  const { toast } = useToast();
  
  // Fetch saved recipes based on user data
  const savedRecipes = userData.savedRecipes.map(id => 
    mockRecipes.find(recipe => recipe.id === id)
  ).filter(Boolean);
  
  // Fetch recipes created by the user
  const createdRecipes = mockRecipes.slice(0, 3); // Mock data for created recipes
  
  const handleProfileEdit = () => {
    toast({
      title: "Edit Profile",
      description: "Profile editing functionality will be added soon!"
    });
  };
  
  const handleFollow = () => {
    toast({
      title: "Success!",
      description: "You are now following this chef",
    });
  };
  
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      
      <main className="pb-12">
        {/* Hero Section with Cover Photo */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img 
            src={userData.coverPhoto} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          <div className="absolute top-4 left-4">
            <Link to="/" className="text-white hover:text-white/80 flex items-center">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Link>
          </div>
          
          <div className="absolute top-4 right-4">
            <Button variant="outline" size="sm" className="bg-white/20 backdrop-blur-sm border-white/40 text-white">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
        
        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-md relative -mt-20 mb-8">
            <div className="p-6 md:p-8">
              <div className="md:flex">
                <div className="relative mb-6 md:mb-0">
                  <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md relative">
                    <img 
                      src={userData.avatar} 
                      alt={userData.name}
                      className="w-full h-full object-cover"
                    />
                    <button className="absolute bottom-0 right-0 bg-purple-500 text-white p-1 rounded-full">
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="md:ml-6 md:flex-1">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div>
                      <h1 className="font-playfair text-2xl font-semibold">{userData.name}</h1>
                      <p className="text-gray-500 text-sm mb-2">{userData.username}</p>
                      
                      <div className="flex items-center text-sm text-gray-500 space-x-4 mb-4">
                        <span>{userData.location}</span>
                        <span>·</span>
                        <span>Joined {userData.joined}</span>
                      </div>
                      
                      <p className="text-gray-600 mb-4 max-w-2xl">{userData.bio}</p>
                      
                      <div className="flex space-x-4 mb-4">
                        <div>
                          <span className="font-semibold">{userData.followers}</span>
                          <span className="text-gray-500 ml-1">Followers</span>
                        </div>
                        <div>
                          <span className="font-semibold">{userData.following}</span>
                          <span className="text-gray-500 ml-1">Following</span>
                        </div>
                        <div>
                          <span className="font-semibold">{userData.recipesCreated}</span>
                          <span className="text-gray-500 ml-1">Recipes</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3 mt-4 md:mt-0">
                      <Button onClick={handleProfileEdit} className="flex items-center">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                      <Button variant="outline" onClick={handleFollow}>Follow</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Kitchen Stats Card */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="font-playfair text-xl font-semibold mb-4">Kitchen Stats</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <Clock className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                <p className="text-sm text-gray-500">Cooking Time</p>
                <p className="font-semibold">{userData.stats.totalCookingTime}</p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <Trophy className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                <p className="text-sm text-gray-500">Recipes Completed</p>
                <p className="font-semibold">{userData.stats.completedRecipes}</p>
              </div>
              
              <div className="bg-amber-50 rounded-lg p-4 text-center">
                <Medal className="h-6 w-6 mx-auto mb-2 text-amber-500" />
                <p className="text-sm text-gray-500">Points Earned</p>
                <p className="font-semibold">{userData.stats.points}</p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <ChefHat className="h-6 w-6 mx-auto mb-2 text-green-500" />
                <p className="text-sm text-gray-500">Favorite Cuisine</p>
                <p className="font-semibold">{userData.stats.favoriteCuisine}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Level {userData.stats.level}</span>
                <span className="text-sm text-gray-500">{userData.stats.points}/{userData.stats.level * 100} points</span>
              </div>
              <Progress value={userData.stats.points % (userData.stats.level * 100) / (userData.stats.level * 100) * 100} className="h-2 bg-gray-100" indicatorClassName="bg-purple-500" />
            </div>
          </div>
          
          {/* Achievements Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="font-playfair text-xl font-semibold mb-4">Achievements</h2>
            
            <div className="flex flex-wrap gap-4">
              {userData.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center bg-muted p-3 rounded-lg">
                  <div className="mr-3 bg-white p-2 rounded-full">
                    {achievement.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{achievement.name}</h3>
                    <p className="text-xs text-gray-500">{achievement.description}</p>
                  </div>
                </div>
              ))}
              
              <div className="flex items-center bg-muted/50 p-3 rounded-lg border border-dashed border-gray-300">
                <div className="mr-3 bg-white p-2 rounded-full">
                  <Trophy className="h-5 w-5 text-gray-300" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Next Achievement</h3>
                  <p className="text-xs text-gray-500">Create 10 more recipes</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs for Different Content Types */}
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
                {mockRecipes.slice(2, 5).map(recipe => (
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserProfile;
