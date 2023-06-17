
<template>
  <h3>
    <slot />
  </h3>
  <div>
    <small>
      <slot name="sub-header" />
    </small>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'AppHeader',
});
</script>

