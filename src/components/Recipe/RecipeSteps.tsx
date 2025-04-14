
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface RecipeStepsProps {
  steps: string[];
}

const RecipeSteps = ({ steps }: RecipeStepsProps) => {
  return (
    <div className="recipe-steps mb-8">
      <h3 className="font-playfair text-xl font-semibold mb-4">Preparation Steps</h3>
      <Accordion type="single" collapsible className="w-full">
        {steps.map((step, index) => (
          <AccordionItem key={index} value={`step-${index + 1}`}>
            <AccordionTrigger className="font-inter">
              Step {index + 1}
            </AccordionTrigger>
            <AccordionContent className="text-gray-700">
              {step}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default RecipeSteps;
