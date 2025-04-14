
import { Link } from 'react-router-dom';
import { ChefHat, Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-warm-oak/10 pt-12 pb-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <ChefHat className="h-8 w-8 text-warm-oak" />
              <span className="font-playfair font-bold text-2xl">Hearth & Whisk</span>
            </div>
            <p className="text-sm mb-4">
              A cozy space for cooking enthusiasts to discover, share, and remix recipes from around the world.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-gray-600 hover:text-warm-oak transition-colors" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-gray-600 hover:text-warm-oak transition-colors" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-gray-600 hover:text-warm-oak transition-colors" />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-playfair font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-warm-oak transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/recipes" className="text-sm hover:text-warm-oak transition-colors">All Recipes</Link>
              </li>
              <li>
                <Link to="/chefs" className="text-sm hover:text-warm-oak transition-colors">Meet the Chefs</Link>
              </li>
              <li>
                <Link to="/meal-planning" className="text-sm hover:text-warm-oak transition-colors">Meal Planning</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-playfair font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/recipes?cuisine=swedish" className="text-sm hover:text-warm-oak transition-colors">Swedish</Link>
              </li>
              <li>
                <Link to="/recipes?cuisine=nordic" className="text-sm hover:text-warm-oak transition-colors">Nordic</Link>
              </li>
              <li>
                <Link to="/recipes?tag=breakfast" className="text-sm hover:text-warm-oak transition-colors">Breakfast</Link>
              </li>
              <li>
                <Link to="/recipes?tag=dessert" className="text-sm hover:text-warm-oak transition-colors">Desserts</Link>
              </li>
              <li>
                <Link to="/recipes?tag=seasonal" className="text-sm hover:text-warm-oak transition-colors">Seasonal</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-playfair font-semibold text-lg mb-4">Subscribe</h3>
            <p className="text-sm mb-4">Join our newsletter for seasonal recipes and cooking tips.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-l-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-warm-oak focus:border-transparent text-sm"
              />
              <button className="bg-warm-oak text-white px-4 py-2 rounded-r-md hover:bg-warm-oak/90 transition-colors btn-jiggle">
                <Mail className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-10 pt-6">
          <p className="text-center text-sm text-gray-600">
            © {currentYear} Hearth & Whisk. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
