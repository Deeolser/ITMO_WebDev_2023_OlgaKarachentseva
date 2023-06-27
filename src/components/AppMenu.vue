<script lang="ts" setup>
defineProps({
  bgColor: {
    type: String,
    default: 'transparent',
    required: true
  },
  links: {
    type: Array,
    default: () => [],
    required: true
  }
});
</script>
<template>
  <div :style="{ 'background-color': bgColor }">
    <template
      v-for="menuItem in links"
      :key="menuItem.name"
    >
      <router-link
        v-if="menuItem.canRender"
        :to="menuItem.link"
        @click="menuItem.onClick"
      >
        {{ menuItem.name }}
      </router-link>
    </template>
  </div>
</template>