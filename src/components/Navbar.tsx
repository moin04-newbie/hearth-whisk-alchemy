
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Menu, X, ChefHat, Home, BookOpen, Users, Calendar } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'text-purple-500 border-b-2 border-purple-500' : '';
  };

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-purple-500" />
            <span className="font-bold text-2xl">Hearth & Whisk</span>
          </Link>
          
          {!isMobile && (
            <div className="hidden md:flex items-center space-x-1">
              <Link to="/" className={`px-4 py-2 font-medium hover:text-purple-500 transition-colors ${isActive('/')}`}>
                <Home className="h-4 w-4 inline mr-2" />
                Home
              </Link>
              <Link to="/recipes" className={`px-4 py-2 font-medium hover:text-purple-500 transition-colors ${isActive('/recipes')}`}>
                <BookOpen className="h-4 w-4 inline mr-2" />
                Recipes
              </Link>
              <Link to="/chefs" className={`px-4 py-2 font-medium hover:text-purple-500 transition-colors ${isActive('/chefs')}`}>
                <Users className="h-4 w-4 inline mr-2" />
                Chefs
              </Link>
              <Link to="/meal-planning" className={`px-4 py-2 font-medium hover:text-purple-500 transition-colors ${isActive('/meal-planning')}`}>
                <Calendar className="h-4 w-4 inline mr-2" />
                Meal Planning
              </Link>
            </div>
          )}
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input 
                type="text" 
                placeholder="Search recipes..."
                className="pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              />
            </div>
            
            {!isMobile && (
              <div className="flex items-center space-x-3">
                <Button className="bg-purple-500 text-white hover:bg-purple-600">
                  Sign In
                </Button>
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </div>
            )}
            
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            )}
          </div>
        </div>
        
        {isMobile && isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className={`flex items-center font-medium px-4 py-2 hover:bg-purple-50 rounded ${location.pathname === '/' ? 'text-purple-500' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-5 w-5 mr-3" />
                Home
              </Link>
              <Link 
                to="/recipes" 
                className={`flex items-center font-medium px-4 py-2 hover:bg-purple-50 rounded ${location.pathname === '/recipes' ? 'text-purple-500' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpen className="h-5 w-5 mr-3" />
                Recipes
              </Link>
              <Link 
                to="/chefs" 
                className={`flex items-center font-medium px-4 py-2 hover:bg-purple-50 rounded ${location.pathname === '/chefs' ? 'text-purple-500' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Users className="h-5 w-5 mr-3" />
                Chefs
              </Link>
              <Link 
                to="/meal-planning" 
                className={`flex items-center font-medium px-4 py-2 hover:bg-purple-50 rounded ${location.pathname === '/meal-planning' ? 'text-purple-500' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Calendar className="h-5 w-5 mr-3" />
                Meal Planning
              </Link>
              
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input 
                  type="text" 
                  placeholder="Search recipes..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                />
              </div>
              
              <div className="flex gap-2 mt-2">
                <Button className="bg-purple-500 text-white hover:bg-purple-600 flex-1">
                  Sign In
                </Button>
                <Button variant="outline" className="flex-1">
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
