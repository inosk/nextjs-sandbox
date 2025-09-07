import type { Meta, StoryObj } from "@storybook/react";
import HeaderNavigation, {
  HeaderNavigationLeft,
  HeaderNavigationRight,
} from "./header-navigation";
import { Button } from "./button";

const meta: Meta<typeof HeaderNavigation> = {
  title: "UI/HeaderNavigation",
  component: HeaderNavigation,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof HeaderNavigation>;

export const Basic: Story = {
  render: () => (
    <HeaderNavigation>
      <HeaderNavigationLeft>
        <div className="text-title font-semibold">MyApp</div>
        <nav className="hidden md:flex gap-4 text-body text-foreground/80">
          <a href="#">Dashboard</a>
          <a href="#">Projects</a>
          <a href="#">Team</a>
        </nav>
      </HeaderNavigationLeft>
      <HeaderNavigationRight>
        <Button size="sm" variant="outline">Invite</Button>
        <Button size="sm">Sign in</Button>
      </HeaderNavigationRight>
    </HeaderNavigation>
  ),
};

export const LeftOnly: Story = {
  render: () => (
    <HeaderNavigation>
      <HeaderNavigationLeft>
        <div className="text-title font-semibold">Left Area</div>
      </HeaderNavigationLeft>
    </HeaderNavigation>
  ),
};

export const RightOnly: Story = {
  render: () => (
    <HeaderNavigation>
      <HeaderNavigationRight>
        <Button size="sm" variant="outline">Settings</Button>
        <Button size="sm">Save</Button>
      </HeaderNavigationRight>
    </HeaderNavigation>
  ),
};

export const WithManyItems: Story = {
  render: () => (
    <HeaderNavigation>
      <HeaderNavigationLeft>
        <div className="text-title font-semibold">Brand</div>
        <nav className="flex gap-3 text-body text-foreground/80">
          {Array.from({ length: 5 }).map((_, i) => (
            <a key={i} href="#">Link {i + 1}</a>
          ))}
        </nav>
      </HeaderNavigationLeft>
      <HeaderNavigationRight>
        <div className="text-body text-foreground/70 hidden sm:block">Help</div>
        <Button size="sm" variant="outline">Docs</Button>
        <Button size="sm">Account</Button>
      </HeaderNavigationRight>
    </HeaderNavigation>
  ),
};

