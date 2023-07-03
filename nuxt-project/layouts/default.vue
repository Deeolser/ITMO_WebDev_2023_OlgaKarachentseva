<script lang="ts" setup>
const props = defineProps<{ menuLinks: Array<any> }>();
</script>
<template>
  <div>
    <small> Desktop / Default</small>
    <AppMenu :links="props.menuLinks"/>
    <slot/>
  </div>

</template>

