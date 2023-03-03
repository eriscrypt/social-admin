<script setup lang="ts">
import { Connector } from "vue-dapp-connector";
const connector = inject<Connector>("connector")!;

const store = useAuthStore();
const { clearMessage } = store;
const { codeSended, process, message } = storeToRefs(store);

const code = ref("");

const login = async () => {
  const { wallet } = await connector.connect();
  await store.login(wallet.address);
};

const confirmCode = async () => {
  await store.confirm(code.value);
};
</script>

<template>
  <div class="vector">
    <img src="@/assets/img/vector.svg" alt="vector" />
  </div>

  <div class="view auth-view container">
    <h1 class="form-title">Auth</h1>

    <!-- not connected -->
    <form class="form" v-if="!codeSended" @submit.prevent="login" v-motion-fade>
      <p class="error">
        <span v-if="message" v-motion-pop>
          {{ message }}
        </span>
      </p>
      <div class="form-group foo">
        <TheButton type="submit" :disabled="process">
          <span v-if="!process">Connect</span>
          <TheSpinner v-if="process" />
        </TheButton>
      </div>
    </form>

    <!-- code sended -->
    <form
      class="form"
      v-if="codeSended"
      @submit.prevent="confirmCode"
      v-motion-pop
    >
      <p class="error">
        <span v-if="message" v-motion-pop>
          {{ message }}
        </span>
      </p>

      <div class="form-group">
        <input
          type="number"
          id="code"
          required
          placeholder="Enter code"
          v-model.trim="code"
          @input="clearMessage"
          :disabled="process"
          autofocus
        />
      </div>
      <div class="form-group foo">
        <TheButton type="submit" :disabled="code.length < 6 || process">
          <span v-if="!process">submit</span>
          <TheSpinner v-if="process" />
        </TheButton>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.vector {
  position: fixed;
  top: 5%;
  left: -40%;
  width: 160%;
  height: 100%;
  rotate: 15deg;

  img {
    width: 100%;
    height: 100%;
  }
}
.auth-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.form-title {
  text-transform: uppercase;
  text-shadow: 3px 3px 3px var(--accent);
  letter-spacing: 0.1rem;
}

.form {
  display: grid;
  gap: 20px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(30px);
  border-radius: 20px;
  padding: 2rem 2rem;
  width: 360px;

  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;

  img {
    width: 40px;
  }
}

.foo {
  flex-direction: row;
  justify-content: center;
}

.error {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 20px;
}
</style>
