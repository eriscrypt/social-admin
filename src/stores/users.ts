export const useUsersStore = defineStore("users-module", () => {
  const users = ref<IUser[]>([]);
  const process = ref(false);
  const search = ref("");
  const pagination = ref<IPagination>();

  const setSearch = (e: Event) => {
    const target = e.target as HTMLInputElement;
    search.value = target.value;
  };

  const fetchUsers = async (page: number = 1, take: number = 10) => {
    process.value = true;
    users.value = [];

    try {
      const response = await httpFetchUsers(page, take);
      users.value = response.data;
      pagination.value = response.pagination;
    } catch (error) {
      console.log(error);
    } finally {
      process.value = false;
    }
  };

  const fetchUser = async (id: string) => {
    return await useAPI(`/users/${id}`);
  };

  const updateAvatar = async (userId: string, body: FormData) => {
    await fetch(`http://localhost:3000/users/${userId}/avatar`, {
      method: "PATCH",
      body,
    });
  };

  const updateUser = async (
    userId: string,
    body: UpdateUserDto
  ): Promise<void> => {
    const { pushNotification } = useNotificationsStore();

    try {
      await httpUpdateUser(userId, body);
      pushNotification({
        title: "Success",
        message: "User updated successfully",
      });
    } catch (error: any) {
      pushNotification({
        title: "Error",
        message: error,
      });
    }
  };

  const filteredUsers = computed(() => {
    const { user } = storeToRefs(useAuthStore());

    if (!user.value) {
      return [];
    }

    const arr = users.value.filter(
      (u) => u.address.toLowerCase() !== user.value?.address.toLowerCase()
    );

    if (!search.value) {
      return arr;
    }

    return arr.filter((u) => {
      return u.address.toLowerCase().includes(search.value.toLowerCase());
    });
  });

  return {
    process,
    users,
    search,
    pagination,
    filteredUsers,
    setSearch,
    fetchUsers,
    fetchUser,
    updateAvatar,
    updateUser,
  };
});
