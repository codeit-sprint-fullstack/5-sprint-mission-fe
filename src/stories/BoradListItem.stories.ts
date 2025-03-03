import type { Meta, StoryObj } from "@storybook/react";
import BoardListItem from "@/components/BoardListItem";

const meta: Meta<typeof BoardListItem> = {
  title: "BoardListItem",
  component: BoardListItem,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
