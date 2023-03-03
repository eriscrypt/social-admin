<script setup lang="ts">
const { isAuthenticated } = storeToRefs(useAuthStore());
</script>

<template>
  <div class="layout">
    <template v-if="isAuthenticated">
      <TheNav v-motion-slide-left />
    </template>
    <router-view></router-view>
  </div>

  <template v-if="isAuthenticated">
    <NotificationsList />
  </template>
</template>
