
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockChefs } from "@/lib/mockData";
import { Search } from "lucide-react";

const Chefs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter chefs based on search query
  const filteredChefs = mockChefs.filter(chef => 
    chef.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    chef.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chef.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        {/* Header Section */}
        <section className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white py-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1517073132305-714998366135?auto=format&fit=crop&w=2000&q=80" 
              alt="Chefs at work" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="font-bold text-4xl md:text-5xl mb-4">Meet Our Chefs</h1>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Connect with talented food creators from around the world
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search chefs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full bg-white/90 text-black border-0"
              />
            </div>
          </div>
        </section>
        
        {/* Featured Chef */}
        <section className="container mx-auto px-4 py-8">
          <div className="relative rounded-xl overflow-hidden mb-8">
            <img 
              src="https://images.unsplash.com/photo-1556909211-36987daf7b4d?auto=format&fit=crop&w=1500&q=80"
              alt="Featured chef"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <span className="text-white/80 text-sm mb-1">Featured Chef</span>
              <h2 className="text-white text-2xl font-bold mb-2">Master the Art of Cooking</h2>
              <p className="text-white/90">Learn from the best chefs and elevate your culinary skills</p>
            </div>
          </div>
        
          {/* Chefs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredChefs.length > 0 ? (
              filteredChefs.map(chef => (
                <Link to={`/chef/${chef.id}`} key={chef.id} className="group">
                  <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="h-40 bg-gradient-to-r from-pink-300 to-purple-400 relative">
                      <img 
                        src={chef.specialties && chef.specialties[0] === "Pastry" 
                          ? "https://images.unsplash.com/photo-1597244211919-8a52ab2e40ea?auto=format&fit=crop&w=600&q=80" 
                          : chef.specialties && chef.specialties[0] === "Seafood"
                          ? "https://images.unsplash.com/photo-1534080307588-88e51e4891a1?auto=format&fit=crop&w=600&q=80"
                          : "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?auto=format&fit=crop&w=600&q=80"}
                        alt={chef.specialties && chef.specialties[0]}
                        className="w-full h-full object-cover opacity-50"
                      />
                      <div className="absolute -bottom-10 left-6">
                        <Avatar className="h-20 w-20 border-4 border-white">
                          <AvatarImage src={chef.avatar} alt={chef.name} />
                          <AvatarFallback>{chef.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                    
                    <div className="pt-12 px-6 pb-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg">{chef.name}</h3>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                          {chef.stats.followers} followers
                        </span>
                      </div>
                      
                      <p className="text-gray-500 text-sm mb-3">{chef.location}</p>
                      <p className="line-clamp-3 text-sm mb-4">{chef.bio}</p>
                      
                      <div className="flex gap-2 flex-wrap">
                        {chef.specialties.slice(0, 3).map((specialty, index) => (
                          <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <p className="text-lg font-medium">No chefs found.</p>
                <p className="text-gray-500">Try searching with different keywords.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Chefs;
