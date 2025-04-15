
import { useState } from 'react';
import { Trophy, Heart, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import KitchenStats from '@/components/Profile/KitchenStats';
import Achievements from '@/components/Profile/Achievements';
import RecipeTabs from '@/components/Profile/RecipeTabs';
import { mockRecipes } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';
import { UserData } from '@/types/profile';

// Mock user data for the profile page
const userData: UserData = {
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
    mockRecipes.find(recipe => recipe.id === id.toString())
  ).filter(Boolean);
  
  // Fetch recipes created by the user
  const createdRecipes = mockRecipes.slice(0, 3); // Mock data for created recipes
  
  // Fetch liked recipes (using mock data for now)
  const likedRecipes = mockRecipes.slice(2, 5);
  
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
        <ProfileHeader 
          userData={userData}
          handleProfileEdit={handleProfileEdit}
          handleFollow={handleFollow}
        />
        
        <div className="container mx-auto px-4">
          <KitchenStats stats={userData.stats} />
          <Achievements achievements={userData.achievements} />
          
          <RecipeTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            createdRecipes={createdRecipes}
            savedRecipes={savedRecipes}
            likedRecipes={likedRecipes}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserProfile;
