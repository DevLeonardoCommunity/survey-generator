import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { CardContainer } from "./ui/card-container";
import { Input } from "./ui/input";

export const CreateSurvey = () => {
  return (
    <div>
      <Card>
        <CardContainer>
          <Input type="text" placeholder="Title" className="text-xl h-12" />
          <Input type="text" placeholder="Description" />
        </CardContainer>
      </Card>
      <Button>Add Element</Button>
    </div>
  );
};
