<script setup lang="ts">
interface Props {
  error?: boolean;
  success?: boolean;
}

withDefaults(defineProps<Props>(), {
  error: false,
  success: false,
});
</script>

<template>
  <div class="badge" :class="[{ error }, { success }]">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.badge {
  background: rgba(255, 255, 255, 0.15);
  padding: 3px 10px;
  border-radius: 6px;

  display: flex;
  align-items: center;
}

.badge.error {
  background: rgba(255, 87, 87, 0.5);
}

.badge.success {
  background: rgba(122, 253, 157, 0.5);
}
</style>
