
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, ChevronUp, Award } from "lucide-react";
import { useRecipeTasks } from "@/lib/taskUtils";
import { useToast } from "@/hooks/use-toast";

interface RecipeStepsProps {
  steps: string[];
  recipeId: string;
}

const RecipeSteps = ({ steps, recipeId }: RecipeStepsProps) => {
  const [expandedStep, setExpandedStep] = useState<string | null>("step-1");
  const { toast } = useToast();
  
  const { 
    isTaskCompleted, 
    addCompletedTask, 
    removeCompletedTask, 
    getCompletedTasksCount,
    points
  } = useRecipeTasks();
  
  const toggleStepCompleted = (stepIndex: number) => {
    const completed = isTaskCompleted(recipeId, stepIndex);
    
    if (completed) {
      removeCompletedTask(recipeId, stepIndex);
      toast({
        title: "Task unmarked",
        description: "You've removed this task from your completed list",
      });
    } else {
      addCompletedTask(recipeId, stepIndex);
      toast({
        title: "Task completed! +10 points",
        description: "Keep going to earn more points!",
      });
    }
  };
  
  const completedCount = getCompletedTasksCount(recipeId);
  
  return (
    <div className="recipe-steps mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-xl">Preparation Steps</h3>
        <div className="flex items-center space-x-3">
          <div className="text-sm text-gray-500">
            {completedCount} of {steps.length} completed
          </div>
          <div className="flex items-center bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">
            <Award className="h-4 w-4 mr-1" />
            <span>{points} points</span>
          </div>
        </div>
      </div>
      
      <Accordion 
        type="single" 
        collapsible 
        className="w-full"
        value={expandedStep}
        onValueChange={setExpandedStep}
      >
        {steps.map((step, index) => {
          const completed = isTaskCompleted(recipeId, index);
          const stepNumber = index + 1;
          return (
            <AccordionItem 
              key={index} 
              value={`step-${stepNumber}`}
              className={`mb-2 border border-gray-200 rounded-lg overflow-hidden ${completed ? 'bg-gray-50' : 'bg-white'}`}
            >
              <AccordionTrigger className="px-3 py-2 hover:bg-gray-50">
                <div className="flex items-center">
                  <div className={`flex items-center justify-center h-6 w-6 rounded-full mr-2 ${completed ? 'bg-green-500 text-white' : 'bg-purple-100 text-purple-500'}`}>
                    {completed ? <Check className="h-3 w-3" /> : stepNumber}
                  </div>
                  <span className={`font-medium ${completed ? 'text-gray-500 line-through' : ''}`}>
                    Step {stepNumber}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-3 py-2 text-gray-700">
                <div className="pl-8">
                  <p className={completed ? 'text-gray-500' : ''}>{step}</p>
                  <div className="mt-3 flex justify-end">
                    <Button 
                      variant={completed ? "outline" : "default"}
                      size="sm"
                      className={completed ? "border-gray-300 text-gray-500" : "bg-purple-500 hover:bg-purple-600"}
                      onClick={() => toggleStepCompleted(index)}
                    >
                      {completed ? "Mark as not done" : "Mark as done"}
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
      
      <div className="flex justify-between mt-3">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-sm"
          onClick={() => {
            const currentStep = expandedStep ? parseInt(expandedStep.split('-')[1]) : 1;
            if (currentStep > 1) {
              setExpandedStep(`step-${currentStep - 1}`);
            }
          }}
          disabled={expandedStep === "step-1" || !expandedStep}
        >
          <ChevronUp className="h-3 w-3 mr-1" /> Previous
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="text-sm"
          onClick={() => {
            const currentStep = expandedStep ? parseInt(expandedStep.split('-')[1]) : 1;
            if (currentStep < steps.length) {
              setExpandedStep(`step-${currentStep + 1}`);
            }
          }}
          disabled={expandedStep === `step-${steps.length}` || !expandedStep}
        >
          Next <ChevronDown className="h-3 w-3 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default RecipeSteps;
