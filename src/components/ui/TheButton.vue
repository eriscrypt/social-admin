<script setup lang="ts">
interface Props {
  type?: any | string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "button" as "button" | "submit" | "reset",
  disabled: false,
});
</script>

<template>
  <button class="btn" :type="props.type" :disabled="props.disabled">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
.btn {
  height: var(--btn-height);
  appearance: none;
  border: none;
  outline: none;
  position: relative;
  background: var(--btn-bg);
  padding: 0 1.5rem;
  border-radius: 10px;
  border: 2px solid var(--accent);
  text-transform: uppercase;
  font-weight: 600;
  transition: all 0.3s ease;
  transform-origin: center;

  max-width: 200px;
  min-width: 140px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.btn:hover {
  cursor: pointer;
  background: var(--accent);
}

.btn:active {
  transform: scale(0.95);
}

.btn:disabled {
  opacity: 0.5;
  pointer-events: none;
  user-select: none;
}
</style>
