import type { Meta, StoryObj } from "@storybook/react";

import BestBoardCard from "@/components/BestBoardCard";

const meta: Meta<typeof BestBoardCard> = {
  title: "BestBoardCard",
  component: BestBoardCard,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
