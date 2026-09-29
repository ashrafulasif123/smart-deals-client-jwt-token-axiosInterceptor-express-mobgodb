import axios from "axios";
import { useAuth } from "./useAuth";
import { useEffect } from "react";

const axiosSecureInstance = axios.create({
  baseURL: "http://localhost:3000/",
});
export const useAxiosSecure = () => {
  const { logOut } = useAuth();
  // Add a request interceptor
  useEffect(() => {
    const requestInterceptors = axiosSecureInstance.interceptors.request.use(
      (config) => {
        config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
        return config;
      },
    );

    // Add a response interceptor
    const responseInterceptors = axiosSecureInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          logOut();
        }
        return Promise.reject(error);
      },
    );
    return () => {
      axiosSecureInstance.interceptors.request.eject(requestInterceptors);
      axiosSecureInstance.interceptors.response.eject(responseInterceptors);
    };
  }, [logOut]);
  return axiosSecureInstance;
};
