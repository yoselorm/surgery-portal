import axios from "axios";
import { api_url_v1 } from "./config";
import toast from "../components/Toast";

const api = axios.create({
  baseURL: api_url_v1,
  // Removed withCredentials: true since your backend relies entirely 
  // on custom headers and body properties rather than HTTP-Only cookies.
});

// Add access token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-refresh tokens
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 Unauthorized and not retried yet → try token rotation
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/refresh-access-token") // Make sure this matches your exact backend endpoint
    ) {
      originalRequest._retry = true;

      try {
        const storedRefreshToken = localStorage.getItem("refreshToken");

        if (!storedRefreshToken) {
          throw new Error("No refresh token found");
        }

        // Hit the refresh endpoint passing the token in the body as expected by the backend
        const res = await axios.post(`${api_url_v1}/refresh-access-token`, {
          refreshToken: storedRefreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = res.data;

        // Save rotated tokens back to localStorage
        localStorage.setItem("accessToken", accessToken);
        if (newRefreshToken) {
          localStorage.setItem("refreshToken", newRefreshToken);
        }

        // Retry the original failed request with the fresh token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error("Token rotation failed:", err);
        
        // Wipe local auth footprints cleanly
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");

        // Notify user and drop them back to login page
        toast.warning('Session Expired. Please log in again.');
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;