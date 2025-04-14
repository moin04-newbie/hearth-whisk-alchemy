
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getBadgeIcon } from "@/lib/mockData";
import type { Chef } from "@/lib/mockData";

interface ChefStatsProps {
  chef: Chef;
}

const ChefStats = ({ chef }: ChefStatsProps) => {
  return (
    <Card className="bg-white shadow-md">
      <CardContent className="p-6">
        <h3 className="font-playfair text-xl font-semibold mb-4">Chef Stats</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-muted rounded-md p-3 text-center">
            <p className="text-gray-600 text-sm">Recipes</p>
            <p className="text-2xl font-semibold">{chef.stats.recipesMade}</p>
          </div>
          <div className="bg-muted rounded-md p-3 text-center">
            <p className="text-gray-600 text-sm">Followers</p>
            <p className="text-2xl font-semibold">{chef.stats.followers}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="font-medium text-sm text-gray-600 mb-2">Cuisines</h4>
          <div className="flex flex-wrap gap-2">
            {chef.stats.cuisines.map((cuisine, index) => (
              <Badge key={index} variant="outline" className="bg-cream">
                {cuisine}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-sm text-gray-600 mb-2">Badges</h4>
          <div className="flex flex-wrap gap-2">
            {chef.stats.badges.map((badge, index) => {
              const BadgeIcon = getBadgeIcon(badge);
              return (
                <div key={index} className="flex items-center bg-warm-oak/10 rounded-full px-3 py-1">
                  <BadgeIcon className="h-4 w-4 mr-1 text-warm-oak" />
                  <span className="text-xs">{badge}</span>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChefStats;
