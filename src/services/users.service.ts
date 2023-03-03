export const httpFetchUsers = async (page: number, take: number) => {
  try {
    return await useAPI(`/users?page=${page}&take=${take}`);
  } catch (error) {
    console.log(error);
  }
};

export const httpUpdateUser = async (userId: string, body: UpdateUserDto) => {
  try {
    return await useAPI(`/users/${userId}`, {
      method: "PATCH",
      body,
    });
  } catch (error) {
    console.log(error);
  }
};
