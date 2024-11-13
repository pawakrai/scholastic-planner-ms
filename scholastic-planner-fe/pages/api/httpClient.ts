import getConfig from "next/config";

// Third-party
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";

// API
import { refreshAccessToken } from "@/pages/api/auth";

const { publicRuntimeConfig } = getConfig();

export const httpClient = axios.create({
  baseURL: `${publicRuntimeConfig.api}`,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
  timeout: 180000, // 3 minutes
});

// This interceptor adds the access token to the Authorization header of every outgoing request, if it exists.
httpClient.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = getToken();
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

// This interceptor handles errors from responses and attempts to refresh the access token if it has expired.
httpClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const token = getToken();
    if (!token) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      try {
        const { accessToken } = await refreshAccessToken();

        setToken(accessToken);

        if (error.config.headers) {
          error.config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return httpClient(error.config);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

/**
 * Returns the access token stored in the local storage under the key "act".
 * @returns {string|null} The access token, or null if not found.
 */
export function getToken(): string | undefined {
  return Cookies.get("act");
}

/**
 * Returns the refresh token stored in the local storage under the key "rt".
 * @returns {string|null} The refresh token, or null if not found.
 */
export function getRefreshToken(): string | undefined {
  return Cookies.get("rt");
}

/**
 * Saves the access token and refresh token to the local storage under the keys "act" and "rt", respectively.
 * If either token is not provided, removes both tokens from the local storage.
 * @param {string|undefined} token - The access token.
 * @param {string|undefined} refreshToken - The refresh token.
 * @returns {void}
 */
export function setToken(token?: string, refreshToken?: string): void {
  if (token && refreshToken) {
    const expiresAccessTokenAt = jwtDecode<{ exp: number }>(token).exp;
    const expiresRefreshTokenAt = jwtDecode<{ exp: number }>(refreshToken).exp;
    Cookies.set("rt", refreshToken, {
      expires: expiresRefreshTokenAt,
      sameSite: "strict",
    });
    Cookies.set("act", token, {
      expires: expiresAccessTokenAt,
      sameSite: "strict",
    });
  } else {
    Cookies.remove("rt");
    Cookies.remove("act");
  }
}
