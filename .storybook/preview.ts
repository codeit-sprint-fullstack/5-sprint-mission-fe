import type { Preview } from "@storybook/react";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        xs: {
          name: "xs",
          styles: {
            width: "479px", // 480px - 1px
            height: "100%",
          },
        },
        md: {
          name: "md",
          styles: {
            width: "767px", // 768px - 1px
            height: "100%",
          },
        },
        xl: {
          name: "xl",
          styles: {
            width: "1199px", // 1200px - 1px
            height: "100%",
          },
        },
        "2xl": {
          name: "2xl",
          styles: {
            width: "1535px", // 1536px - 1px
            height: "100%",
          },
        },
      },
    },
  },

  tags: ["autodocs"],
};

export default preview;
