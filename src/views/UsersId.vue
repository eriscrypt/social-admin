<script setup lang="ts">
import { useRoute } from "vue-router";

const user = ref(null as IUser | null);
const userId = useRoute().params.id as string;
const { fetchUser, updateUser } = useUsersStore();

const processAvatar = ref(false);
const processUpdate = ref(false);

const avatarFile = ref("" as any);
const avatarFileInput = ref();

const edited = ref(false);

const getUser = async (userId: string): Promise<void> => {
  processUpdate.value = true;
  try {
    user.value = await fetchUser(userId);
  } catch (error) {
    console.log(error);
  } finally {
    processUpdate.value = false;
  }
};

const updateAvatar = async (e: Event) => {
  processAvatar.value = true;

  const target = e.target as EventTarget & { files: FileList };
  const file = target.files[0];
  const reader = new FileReader();

  try {
    const result: any = await httpUpdateAvatar(userId, file);
    const updated = new File([result], "avatar.png", { type: "image/png" });

    avatarFile.value = reader.readAsDataURL(updated);
  } catch (error) {
    console.log(error);
  } finally {
    processAvatar.value = false;
  }
};

const update = async () => {
  processUpdate.value = true;

  if (!user.value?.profile) return;

  try {
    const { firstName, lastName } = user.value.profile;
    await updateUser(userId, { firstName, lastName });
  } catch (error) {
    console.log(error);
  } finally {
    edited.value = false;
    processUpdate.value = false;
  }
};

const clear = async () => {
  processUpdate.value = true;
  user.value = await fetchUser(userId);
  processUpdate.value = false;
  edited.value = false;
};

onMounted(() => getUser(userId));
</script>

<template>
  <div class="view container">
    <div class="view-title">
      <div class="top-actions">
        <router-link to="/users" class="back" v-motion-slide-right>
          <TheIcon name="fa-solid fa-chevron-left" />
        </router-link>
        <TheIcon
          name="fa-solid fa-rotate-right"
          on-hover-class="rotate"
          @click="getUser(userId)"
        />
      </div>
      <h1>Profile</h1>
    </div>

    <div class="view-content">
      <template v-if="user">
        <div class="user" v-motion-fade>
          <div class="info">
            <div class="avatar">
              <img
                v-if="!avatarFile && !processAvatar"
                :src="`http://localhost:3000/users/${user.id}/avatar`"
                @error="loadDefaultAvatar($event)"
                @click="avatarFileInput.click()"
                v-motion-pop
              />

              <img
                v-if="avatarFile && !processAvatar"
                :src="avatarFile"
                @click="avatarFileInput.click()"
                v-motion-pop
              />

              <input
                type="file"
                accept="image/png, image/jpeg"
                hidden
                ref="avatarFileInput"
                @change="updateAvatar($event)"
              />

              <TheSpinner v-if="processAvatar" />
            </div>

            <div class="name">
              <div class="head">
                <span>Confirmed:</span>
                <TheBadge
                  :error="!user.profile.confirmed"
                  :success="user.profile.confirmed"
                  >{{ user.profile.confirmed }}</TheBadge
                >
              </div>
              <span>{{ user.address }}</span>
            </div>

            <div class="balance">
              <span>{{ parseBalance(user.profile.balance, 4) }}</span>
              <small>ETH</small>
            </div>
          </div>

          <div class="profile" :class="{ freeze: processUpdate }">
            <div class="form">
              <div class="form-item">
                <label for="firstName">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Enter first name"
                  v-model="user.profile.firstName"
                  @input="edited = true"
                />
              </div>

              <div class="form-item">
                <label for="lastName">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Enter last name"
                  v-model="user.profile.lastName"
                  @input="edited = true"
                />
              </div>
            </div>

            <template v-if="edited && !processUpdate">
              <div class="actions" v-motion-pop>
                <div class="clear">
                  <TheIcon name="fa-solid fa-xmark" @click.stop="clear" />
                </div>
                <div class="save">
                  <TheIcon name="fa-solid fa-check" @click.stop="update" />
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="loading" v-motion-pop>
          <div class="loading-box">
            <TheSpinner color="var(--accent)" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.view-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.view-content {
  display: grid;
}

.top-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  padding-top: 10px;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 20px);
  width: 100%;

  &-box {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;

    width: 60px;
    height: 60px;

    display: grid;
    place-items: center;
  }
}

.user {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info {
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid transparent;
  transition: all 0.2s ease;

  display: grid;
  place-items: center;
  background-color: rgba(255, 255, 255, 0.05);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    border-color: var(--accent);
    cursor: pointer;
  }

  &:focus,
  &:active {
    scale: 0.96;
  }
}

.name {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.name .head {
  display: flex;
  align-items: center;
  gap: 10px;
}

.balance {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: var(--accent);

  span {
    font-size: 24px;
    color: var(--accent);
  }
}

.profile {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.profile.freeze {
  opacity: 0.5;
  user-select: none;
  pointer-events: none;
}

.profile .form {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.profile .form-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.profile .actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
</style>
