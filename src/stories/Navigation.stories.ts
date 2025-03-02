import type { Meta, StoryObj } from "@storybook/react";

import Navigation from "@/components/Navigaion";

const meta: Meta<typeof Navigation> = {
  title: "Navigation",
  component: Navigation,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
