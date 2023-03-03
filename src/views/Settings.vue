<script setup lang="ts">
const { pushNotification } = useNotificationsStore();

const defaultNotification = () => {
  pushNotification({
    title: "Default!",
    message: "Default notification message",
  });
};

const withCloseIcon = () => {
  pushNotification({
    title: "Default!",
    message: "Default notification message",
    closable: true,
  });
};
</script>

<template>
  <div class="view container">
    <div class="view-title">
      <h1>Settings</h1>
    </div>
    <div class="view-content">
      <div class="settings">
        <div class="settings-item">
          <div class="settings-item-title">
            <h2>Notifications</h2>
          </div>
          <div class="settings-item-content">
            <TheButton @click="defaultNotification">
              <span>default</span>
            </TheButton>
            <TheButton @click="withCloseIcon">
              <span>with icon</span>
            </TheButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.view-content {
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
}

.settings {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.settings-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.settings-item-content {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
