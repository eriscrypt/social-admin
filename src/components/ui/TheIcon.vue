<script setup lang="ts">
interface Props {
  name: string;
  disabled?: boolean;
  bgVisible?: boolean;
  onHoverClass?: string;
}
withDefaults(defineProps<Props>(), {
  disabled: false,
  onHoverClass: "",
  bgVisible: true,
});
</script>

<template>
  <div
    class="icon"
    :class="[onHoverClass, { 'bg-visible': bgVisible }, { disabled }]"
  >
    <i :class="name"></i>
  </div>
</template>

<style scoped lang="scss">
.icon {
  width: var(--icon-size);
  height: var(--icon-size);
  border-radius: 6px;
  border: 1px solid transparent;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.3s ease;

  i {
    opacity: 0.5;
    transition: all 0.3s ease;
  }
}

.icon.bg-visible {
  background: rgba(255, 255, 255, 0.05);
}

.icon:hover {
  cursor: pointer;
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--accent);

  i {
    opacity: 1;
  }
}

.icon:active,
.icon:focus {
  scale: 0.96;
}

.icon.rotate:hover {
  i {
    rotate: 15deg;
  }
}

.icon.disabled {
  opacity: 0.5;
  // background: transparent;
  // border-color: transparent;
  pointer-events: none;

  i {
    opacity: 0.5;
  }
}
</style>
