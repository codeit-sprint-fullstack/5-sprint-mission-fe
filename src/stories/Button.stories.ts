import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/components/Button";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "로그인",
  },
};
