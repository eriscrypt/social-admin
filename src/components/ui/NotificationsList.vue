<script setup lang="ts">
const { notifications } = storeToRefs(useNotificationsStore());
const { removeNotification } = useNotificationsStore();
</script>

<template>
  <div class="notifications" v-if="notifications.length">
    <NotificationsListItem
      v-for="(notification, index) in notifications"
      :key="index"
      :id="notification.id!"
      :closable="notification.closable"
      v-motion-slide-bottom
    >
      <template #title>
        <h3>{{ notification.title }}</h3>
      </template>
      <template #message>
        <p>{{ notification.message }}</p>
      </template>
    </NotificationsListItem>
  </div>
</template>

<style scoped lang="scss">
.notifications {
  position: fixed;
  z-index: 1;
  top: 20px;
  right: 15px;

  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
