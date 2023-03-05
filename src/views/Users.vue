<script setup lang="ts">
const store = useUsersStore();
const usersPerPage = 2;

const { fetchUsers, setSearch } = store;
const { users, pagination } = storeToRefs(store);

const handleNext = () => {
  if (!pagination.value || !pagination.value.next) return;
  fetchUsers(pagination.value.next, usersPerPage);
};

const handlePrev = () => {
  if (!pagination.value || !pagination.value.prev) return;
  fetchUsers(pagination.value.prev, usersPerPage);
};

onMounted(async () => {
  await fetchUsers(pagination.value?.page, usersPerPage);
});
</script>

<template>
  <div class="view container">
    <div class="view-title">
      <h1>Users</h1>
    </div>

    <div class="view-content">
      <div class="bar">
        <div class="refresh">
          <TheIcon
            name="fa-solid fa-rotate-right"
            on-hover-class="rotate"
            @click="fetchUsers(pagination?.page, usersPerPage)"
          />
          <span>Refresh</span>
        </div>

        <div class="search">
          <input
            type="text"
            placeholder="Search by address"
            @input="setSearch"
          />
        </div>
      </div>

      <!--A possible optimization to the code provided-->
      <TheTable v-motion-fade>
        <div class="head">
          <span>#</span>
          <span>avatar</span>
          <span>email</span>
          <span>confirmed</span>
          <span>first name</span>
          <span>last name</span>
          <span>address</span>
          <span>balance</span>
        </div>

        <div class="users" v-if="users.length">
          <router-link
            v-for="(user, index) in users"
            :key="user.id"
            :to="`/users/${user.id}`"
            class="user"
          >
            <span>{{ index + 1 }}</span>
            <span>
              <img
                :src="`http://localhost:3000/users/${user.id}/avatar`"
                @error="loadDefaultAvatar($event)"
              />
            </span>
            <span>{{ user.profile.email ?? "null" }}</span>
            <span>{{ user.profile.confirmed }}</span>
            <span>{{ user.profile.firstName ?? "null" }}</span>
            <span>{{ user.profile.lastName ?? "null" }}</span>
            <span>{{ cutAddress(user.address) }}</span>
            <span>{{ parseBalance(user.profile.balance, 4) }}</span>
          </router-link>
        </div>

        <div class="no-users" v-else>
          <TheSpinner color="var(--accent)" />
        </div>

        <template #foo>
          <div class="total">
            Total users: <span>{{ pagination?.total }}</span>
          </div>
          <div class="pagination" v-if="pagination">
            <TheIcon
              name="fa-solid fa-chevron-left"
              :disabled="!pagination.prev"
              @click.stop="handlePrev()"
            />
            <TheIcon
              name="fa-solid fa-chevron-right"
              :disabled="!pagination.next"
              @click.stop="handleNext()"
            />
          </div>
        </template>
      </TheTable>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.refresh {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search {
  display: flex;
  align-items: center;

  input {
    width: 420px;
  }
}

.users {
  display: grid;
  gap: 10px;
}

.head,
.user {
  display: grid;
  grid-template-columns: 40px 1fr 1fr 1fr 1fr 1fr 1fr 1fr;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
  }
}

.user {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  border: 1px solid transparent;
  transition: all 0.3s ease;

  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
}

.user:hover {
  cursor: pointer;
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--accent);
}

.user:active {
  background: rgba(255, 255, 255, 0.2);
  scale: 0.98;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;

  span {
    user-select: none;
  }
}

.total {
  span {
    font-weight: bold;
    color: var(--accent);
  }
}

.no-users {
  padding: 20px;
  text-align: center;
}
</style>
