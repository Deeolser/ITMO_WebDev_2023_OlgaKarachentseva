import type { StorybookConfig } from "@storybook/vue3-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  // refs: {
  //   'design-system': {
  //     title: 'Storybook Design System',
  //     url: 'https://master--5ccbc373887ca40020446347.chromatic.com/',
  //   },
  // },
};
export default config;
