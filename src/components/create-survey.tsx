import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { CardContainer } from "./ui/card-container";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const CreateSurvey = () => {
  return (
    <div className="flex flex-col gap-3">
      <Card className="w-full">
        <CardContainer>
          <Input type="text" placeholder="Title" className="text-2xl h-15" />
          <Input type="text" placeholder="Description" />
        </CardContainer>
      </Card>
      <Card className="w-full">
        <CardContainer>
          <Input type="text" placeholder="Question" className="text-lg h-12" />
          <Input type="text" placeholder="Answer" />
        </CardContainer>
      </Card>
      <Card className="w-full">
        <CardContainer>
          <Input type="text" placeholder="Question" className="text-xl h-12" />
          <Input type="text" placeholder="Option 1" />
          <Input type="text" placeholder="Option 2" />
          <Input type="text" placeholder="Option 3" />
        </CardContainer>
      </Card>
      <div className="flex justify-center gap-3">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select an element" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="choice">Choice</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button variant={"secondary"}>Add Element</Button>
      </div>
      <div>
        <Button>Generate!</Button>
      </div>
    </div>
  );
};
