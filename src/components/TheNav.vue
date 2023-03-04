<script setup lang="ts">
import { Connector } from "vue-dapp-connector";

const connector = inject<Connector>("connector")!;

const { user } = storeToRefs(useAuthStore());
</script>

<template>
  <div class="nav">
    <div class="user">
      <template v-if="user">
        <div class="avatar" v-motion-fade>
          <img :src="`http://localhost:3000/users/${user.id}/avatar`" />
        </div>
        <div class="wallet">
          <span>{{ cutAddress(user.address) }}</span>
        </div>
        <div class="balance">
          <span>{{ parseBalance(user.profile.balance, 4) }}</span>
          <small>ETH</small>
        </div>
      </template>
    </div>

    <div class="menu">
      <router-link to="/roles" class="menu-item">Roles</router-link>
      <router-link to="/users" class="menu-item">Users</router-link>
      <router-link to="/settings" class="menu-item">Settings</router-link>
      <router-link to="/extra" class="menu-item">Extra</router-link>
    </div>

    <div class="foo">
      <TheButton @click.stop="connector.disconnect()">
        <span>logout</span>
      </TheButton>
      <small>Er&Kate 2023 &copy;</small>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav {
  min-width: var(--nav-width);
  max-width: var(--nav-width);
  background: var(--nav-bg);
  backdrop-filter: blur(10px);
  margin: 20px 0 20px 20px;
  border-radius: 10px;

  padding: 10px;

  display: grid;
  grid-template-rows: 160px 1fr auto;
  gap: 30px;
}

.user {
  justify-self: center;
  display: grid;
  place-items: center;
  gap: 10px;
}

.avatar {
  width: var(--nav-avatar-size);
  height: var(--nav-avatar-size);
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.05);

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  border: 2px solid var(--accent);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.balance {
  display: flex;
  align-items: center;
  gap: 5px;

  span {
    color: var(--accent);
    font-size: 24px;
  }

  small {
    font-size: 13px;
    padding-top: 3px;
  }
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.menu-item {
  background: rgba(255, 255, 255, 0.05);
  padding: 10px;
  border-radius: 6px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.menu-item.router-link-active,
.menu-item:hover {
  background: rgba(255, 255, 255, 0.25);
}

.foo {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;

  small {
    font-size: 13px;
  }
}
</style>
