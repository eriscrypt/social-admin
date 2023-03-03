const rejectError = (error: any) => {
  if (error.code === "ERR_NETWORK") {
    return Promise.reject("Network Error");
  }

  if (error.response.data) {
    return Promise.reject(error.response.data.message);
  }

  return Promise.reject(error);
};

export const httpUpdateAvatar = async (
  userId: string,
  file: File
): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    return await useAPI(`/users/${userId}/avatar`, {
      method: "PATCH",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    return rejectError(error);
  }
};

export const httpAuthLogin = async (address: string): Promise<void> => {
  try {
    const userId = await useAPI("/auth/admin-login", {
      method: "POST",
      body: { address },
    });

    localStorage.setItem("id", userId);
    localStorage.setItem("code-sended", "true");
    localStorage.setItem("code-confirmed", "false");

    await sleep();
    return Promise.resolve();
  } catch (error) {
    localStorage.setItem("code-sended", "false");
    return rejectError(error);
  }
};

export const httpAuthConfirmCode = async (
  code: string | number
): Promise<void> => {
  const userId = localStorage.getItem("id");

  if (!userId) return Promise.reject("User not found");

  try {
    const { accessToken, refreshToken } = await useAPI("/auth/confirm", {
      method: "POST",
      body: { userId, code: code.toString() },
    });

    if (accessToken && refreshToken) {
      localStorage.setItem("access-token", accessToken);
      localStorage.setItem("refresh-token", refreshToken);
      localStorage.setItem("code-sended", "false");
      localStorage.setItem("code-confirmed", "true");

      await sleep();
      return Promise.resolve();
    }

    return Promise.reject("Something went wrong");
  } catch (error: any) {
    if (error.response && error.response.data) {
      if (extractNumberFromString(error.response.data.message) === 0) {
        localStorage.clear();
        window.location.reload();
        return;
      }
    }

    return rejectError(error);
  }
};

export const httpAuthMe = async (): Promise<IUser> => {
  try {
    await refreshTokens();
    return await useAPI("/auth/me");
  } catch (error) {
    return rejectError(error);
  }
};

const refreshTokens = async (): Promise<void> => {
  try {
    const { accessToken, refreshToken } = await useAPI("/auth/refresh-tokens", {
      method: "POST",
      body: {
        refreshToken: localStorage.getItem("refresh-token"),
      },
    });

    if (!accessToken || !refreshToken)
      return Promise.reject("Tokens not found");

    localStorage.setItem("access-token", accessToken);
    localStorage.setItem("refresh-token", refreshToken);

    return Promise.resolve();
  } catch (error) {
    console.log(error);
  }
};

(() => {
  let time = 10 * 60 * 1000; // 10 minutes in milliseconds
  setInterval(async () => {
    await refreshTokens();
  }, time);
})();
