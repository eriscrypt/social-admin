import axios, { AxiosError } from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("access-token"),
  },
});

/**
 * Fetch data from API
 * @param {string} url
 * @example useAPI("/users")
 */
export const useAPI = async (url: string, params?: ApiParams): Promise<any> => {
  try {
    const {
      method = "GET",
      body,
      headers = { "Content-Type": "application/json" },
    } = params || {};

    const response = await instance(`http://localhost:3000${url}`, {
      method,
      data: body,
      headers,
    });

    return response.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

instance.interceptors.request.use(function (config) {
  const token = `Bearer ${localStorage.getItem("access-token")}`;
  config.headers.Authorization = token;
  return config;
});
