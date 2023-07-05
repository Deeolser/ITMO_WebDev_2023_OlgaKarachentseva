<script lang="ts" setup>
defineProps({
  bgColor: {
    type: String,
    default: "transparent",
    required: true,
  },
  links: {
    type: Array,
    default: () => [],
    required: true,
  },
});
</script>
<template>
  <div :style="{ 'background-color': bgColor }">
    <template v-for="menuItem in links" :key="menuItem.name">
      <NuxtLink
        v-if="menuItem.canRender"
        :to="menuItem.link"
        class="menu-item"
        @click="menuItem.onClick"
      >
        {{ menuItem.name }}
      </NuxtLink>
    </template>
  </div>
</template>
<style>
.menu-item:not(:last-child) {
  padding: 0 1rem 0 0;
}
</style>