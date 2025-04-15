
import { Link } from 'react-router-dom';
import { ArrowLeft, Settings, Edit, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProfileHeaderProps {
  userData: {
    name: string;
    username: string;
    avatar: string;
    coverPhoto: string;
    bio: string;
    location: string;
    joined: string;
    followers: number;
    following: number;
    recipesCreated: number;
  };
  handleProfileEdit: () => void;
  handleFollow: () => void;
}

const ProfileHeader = ({ userData, handleProfileEdit, handleFollow }: ProfileHeaderProps) => {
  return (
    <>
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
      
      {/* Profile Info */}
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
    </>
  );
};

export default ProfileHeader;
