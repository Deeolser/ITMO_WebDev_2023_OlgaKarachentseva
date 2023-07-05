<template>
  <div>
    <NuxtLayout :menu-links="menuLinks" :name="layout">
      <h1 style="font-family: Raleway">
        {{ appConfig.title }}
      </h1>
      <button @click="onChangeLayout">Change Layout</button>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script lang="ts" setup>
const LAYOUTS = ["default", "mobile"];
const appConfig = useAppConfig();
const layout = ref<string>(LAYOUTS[0]);

const menuLinks = reactive([
  { name: "Index", link: "ROUTES.INDEX", canRender: computed(() => true) },
  { name: "Books", link: "ROUTES.BOOKS", canRender: computed(() => true) },
  { name: "Sign In", link: "ROUTES.SIGNIN", canRender: computed(() => true) },
  {
    name: "Sign Out",
    link: "ROUTES.INDEX",
    canRender: computed(() => true),
    onClick: () => {
      console.log("SignOUT");
    },
  },
]);

const onChangeLayout = () => {
  const indexOfCurrentLayout = LAYOUTS.indexOf(layout.value);
  layout.value = LAYOUTS[(indexOfCurrentLayout + 1) % LAYOUTS.length];
};
</script>
