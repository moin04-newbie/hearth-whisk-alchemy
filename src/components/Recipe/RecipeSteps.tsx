
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

interface RecipeStepsProps {
  steps: string[];
}

const RecipeSteps = ({ steps }: RecipeStepsProps) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [expandedStep, setExpandedStep] = useState<string | null>("step-1");
  
  const toggleStepCompleted = (stepIndex: number) => {
    if (completedSteps.includes(stepIndex)) {
      setCompletedSteps(completedSteps.filter(s => s !== stepIndex));
    } else {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
  };
  
  return (
    <div className="recipe-steps mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-xl">Preparation Steps</h3>
        <div className="text-sm text-gray-500">
          {completedSteps.length} of {steps.length} completed
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
          const isCompleted = completedSteps.includes(index);
          const stepNumber = index + 1;
          return (
            <AccordionItem 
              key={index} 
              value={`step-${stepNumber}`}
              className={`mb-3 border border-gray-200 rounded-lg overflow-hidden ${isCompleted ? 'bg-gray-50' : 'bg-white'}`}
            >
              <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                <div className="flex items-center">
                  <div className={`flex items-center justify-center h-7 w-7 rounded-full mr-3 ${isCompleted ? 'bg-green-500 text-white' : 'bg-purple-100 text-purple-500'}`}>
                    {isCompleted ? <Check className="h-4 w-4" /> : stepNumber}
                  </div>
                  <span className={`font-medium ${isCompleted ? 'text-gray-500 line-through' : ''}`}>
                    Step {stepNumber}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3 text-gray-700">
                <div className="pl-10">
                  <p className={isCompleted ? 'text-gray-500' : ''}>{step}</p>
                  <div className="mt-4 flex justify-end">
                    <Button 
                      variant={isCompleted ? "outline" : "default"}
                      size="sm"
                      className={isCompleted ? "border-gray-300 text-gray-500" : "bg-purple-500 hover:bg-purple-600"}
                      onClick={() => toggleStepCompleted(index)}
                    >
                      {isCompleted ? "Mark as not done" : "Mark as done"}
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
      
      <div className="flex justify-between mt-4">
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
          <ChevronUp className="h-4 w-4 mr-1" /> Previous step
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
          Next step <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default RecipeSteps;
