
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Menu, X, ChefHat } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <nav className="bg-cream sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-warm-oak" />
            <span className="font-playfair font-bold text-2xl">Hearth & Whisk</span>
          </Link>
          
          {!isMobile && (
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="font-inter hover:text-sage transition-colors">Home</Link>
              <Link to="/recipes" className="font-inter hover:text-sage transition-colors">Recipes</Link>
              <Link to="/chefs" className="font-inter hover:text-sage transition-colors">Chefs</Link>
              <Link to="/meal-planning" className="font-inter hover:text-sage transition-colors">Meal Planning</Link>
            </div>
          )}
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input 
                type="text" 
                placeholder="Search recipes..."
                className="pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-warm-oak focus:border-transparent"
              />
            </div>
            
            {!isMobile && (
              <Button className="bg-warm-oak text-white hover:bg-warm-oak/90 btn-jiggle">
                Sign In
              </Button>
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
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="font-inter px-4 py-2 hover:bg-warm-oak/10 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/recipes" 
                className="font-inter px-4 py-2 hover:bg-warm-oak/10 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Recipes
              </Link>
              <Link 
                to="/chefs" 
                className="font-inter px-4 py-2 hover:bg-warm-oak/10 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Chefs
              </Link>
              <Link 
                to="/meal-planning" 
                className="font-inter px-4 py-2 hover:bg-warm-oak/10 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Meal Planning
              </Link>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input 
                  type="text" 
                  placeholder="Search recipes..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-warm-oak focus:border-transparent"
                />
              </div>
              <Button className="bg-warm-oak text-white hover:bg-warm-oak/90 w-full">
                Sign In
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
