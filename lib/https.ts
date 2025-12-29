import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from "axios";

// Using the provided API URL
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://5ns6rzl5-8017.inc1.devtunnels.ms/api/v1/";

/**
 * Attach Authorization header from localStorage.
 * Used by both userApi and adminApi.
 */
function attachAuth(
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken"); // Matches the key set in Login page
    if (token) {
      if (!config.headers) {
        config.headers = new AxiosHeaders();
      }
      const headers = config.headers;
      if (headers instanceof AxiosHeaders) {
        headers.set("Authorization", `Bearer ${token}`);
      } else {
        (headers as Record<string, string | undefined>)["Authorization"] = `Bearer ${token}`;
      }
    }
  }
  return config;
}

/** Generic API instance (can be used in server or client code) */
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// No custom request headers here to avoid CORS preflight issues.

/** Regular user API */
export const userApi = axios.create({
  baseURL: BASE_URL,
});

// Alias (some pages/imports expect this exact name)
export const userapi = userApi;

/** Admin API */
export const adminApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    // keep empty to avoid CORS "header not allowed" issues
  },
});

// REQUEST interceptors
userApi.interceptors.request.use(attachAuth);
adminApi.interceptors.request.use(attachAuth);

// RESPONSE interceptor for user (redirect to login on 401)
userApi.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status === 401 && typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

// You can re-enable this later if you want auto redirects for admin errors
adminApi.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status === 401 && typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);
