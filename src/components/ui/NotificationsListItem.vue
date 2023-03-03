<script setup lang="ts">
const { removeNotification } = useNotificationsStore();

interface Props {
  id: string;
  closable?: boolean;
}

const props = defineProps<Props>();
const clicked = ref(false);

const handleRemoveNotification = async (id: string) => {
  removeNotification(id);
};
</script>

<template>
  <div
    class="notification"
    :class="{ hide: clicked }"
    @click="props.closable ? null : handleRemoveNotification(id)"
  >
    <div class="wrapper">
      <slot name="title"></slot>
      <slot name="message"></slot>

      <div
        class="close"
        v-if="props.closable"
        @click.stop="handleRemoveNotification(id)"
      >
        <i class="fa-solid fa-times"></i>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.notification {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 20px 25px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  width: 300px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  cursor: pointer;
  z-index: 1;
}

.notification.hide {
  animation: hide 0.3s ease forwards;
}

.close {
  position: absolute;
  top: 7.5px;
  right: 7.5px;
  cursor: pointer;
  opacity: 0.5;

  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
  }
}

.bar {
  position: absolute;
  left: 0;
  bottom: 0;

  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.25);
}

.bar span {
  width: 0;
  height: 100%;
  background: var(--accent);
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.3s ease;
}

@keyframes hide {
  50% {
    opacity: 0.5;
    transform: translateX(40px);
  }
  100% {
    opacity: 0;
  }
}
</style>
