import router from "../router";

export const useAuthStore = defineStore("auth-module", () => {
  const user = ref<IUser | null>(null);

  const isAuthenticated = ref(false);
  const codeSended = ref(localStorage.getItem("code-sended") === "true");
  const process = ref(false);
  const message = ref("Please authorize your wallet");

  const login = async (address: string): Promise<void> => {
    process.value = true;
    try {
      await httpAuthLogin(address);
      codeSended.value = true;
    } catch (error: any) {
      message.value = error;
      process.value = false;
      codeSended.value = false;
    } finally {
      process.value = false;
    }
  };

  const confirm = async (code: string) => {
    process.value = true;

    try {
      await httpAuthConfirmCode(code);
      await me();

      process.value = false;
      router.push("/users");
    } catch (error: any) {
      message.value = error;
      process.value = false;
    }
  };

  const me = async () => {
    try {
      user.value = await httpAuthMe();
      isAuthenticated.value = true;
    } catch (error: any) {
      message.value = error;
      isAuthenticated.value = false;
    }
  };

  const clearMessage = () => {
    message.value = "";
  };

  return {
    user,
    isAuthenticated,
    codeSended,
    process,
    message,
    login,
    confirm,
    me,
    clearMessage,
  };
});
