import type { Meta, StoryObj } from "@storybook/react";
import BestBoardSection from "@/components/BestBoardSection";

const meta: Meta<typeof BestBoardSection> = {
  title: "BestBoardSection",
  component: BestBoardSection,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
