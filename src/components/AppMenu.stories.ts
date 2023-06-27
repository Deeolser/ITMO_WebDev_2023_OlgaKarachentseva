import type { Meta, StoryObj } from '@storybook/vue3';
import AppMenu from './AppMenu.vue';

const meta = {
  title: 'App/Menu',
  component: AppMenu,
  argTypes: {
    bgColor: { control: 'color' },
    onClick: { action: 'clicked' },
  },
  render: (args: any) => ({
    components: { AppMenu },
    setup() {
      return { args };
    },
    template: '<app-menu :bgColor="args.bgColor" :links="args.links" />',
  }),
} satisfies Meta<typeof AppMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SingleLink: Story = {
  args: {
    links: [{ name: 'Home', link: '/index', canRender: true }],
  },
};

