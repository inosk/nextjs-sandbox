import type { Meta, StoryObj } from "@storybook/react";
import Card, { CardHeader, Content as CardContent, CardFooter } from "./card";
import { Button } from "./button";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <div className="text-title font-semibold">Card Title</div>
        <div className="text-caption text-foreground/70">Optional description</div>
      </CardHeader>
      <CardContent>
        <p className="text-body text-foreground/80">
          Card content goes here. Uses <code className="font-mono">rounded-card</code> and
          <code className="font-mono"> shadow-card</code> tokens.
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex gap-3">
          <Button>Confirm</Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </CardFooter>
    </Card>
  ),
};

