
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface MeasurementToggleProps {
  onToggle: (isMetric: boolean) => void;
  defaultMetric?: boolean;
}

const MeasurementToggle = ({ 
  onToggle, 
  defaultMetric = false 
}: MeasurementToggleProps) => {
  const [isMetric, setIsMetric] = useState<boolean>(defaultMetric);

  const handleToggle = (checked: boolean) => {
    setIsMetric(checked);
    onToggle(checked);
  };

  return (
    <div className="flex items-center space-x-4 justify-end mb-4">
      <Label htmlFor="measurement-toggle" className="text-sm font-medium cursor-pointer">
        {isMetric ? 'Metric' : 'Imperial'}
      </Label>
      <Switch
        id="measurement-toggle"
        checked={isMetric}
        onCheckedChange={handleToggle}
        className="data-[state=checked]:bg-sage"
      />
    </div>
  );
};

export default MeasurementToggle;
