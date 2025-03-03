import type { Meta, StoryObj } from "@storybook/react";
import SortSelection from "@/components/SortSelection";

const meta: Meta<typeof SortSelection> = {
  title: "SortSelection",
  component: SortSelection,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
