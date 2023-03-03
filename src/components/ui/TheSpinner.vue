<script setup lang="ts">
interface Props {
  color?: string;
}

withDefaults(defineProps<Props>(), {
  color: "rgba(255,255,255,0.85)",
});
</script>

<template>
  <span class="spinner"></span>
</template>

<style scoped lang="scss">
.spinner {
  width: 24px;
  height: 24px;
  border: 3px dotted v-bind(color);
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: rotation 2s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
