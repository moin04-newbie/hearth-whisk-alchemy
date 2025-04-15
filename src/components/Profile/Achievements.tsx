
import { Trophy } from 'lucide-react';
import React from 'react';

interface Achievement {
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface AchievementsProps {
  achievements: Achievement[];
}

const Achievements = ({ achievements }: AchievementsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="font-playfair text-xl font-semibold mb-4">Achievements</h2>
      
      <div className="flex flex-wrap gap-4">
        {achievements.map((achievement, index) => (
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
  );
};

export default Achievements;
