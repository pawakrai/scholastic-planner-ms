// Third-party
import { AxiosError } from "axios";

// API
import { setToken, httpClient, getRefreshToken } from "@/pages/api/httpClient";

interface Token {
  accessToken: string;
  refreshToken: string;
}

interface ISignIn {
  username: string;
  password: string;
}

interface ErrorResponse {
  code: string;
  message: string;
}

/**
 * Signs in the user with the provided credentials and returns the response.
 * @param {object} form - The user's credentials.
 *    - `username` (string): The user's username.
 *    - `password` (string): The user's password.
 * @returns The response from the sign-in request.
 * @throws An Axios error with the code and message properties if the request fails.
 */
export const signIn = async (form: ISignIn): Promise<{id: string, token: string}> => {
  try {
    const response = await httpClient.post<{id: string, token: string}>("/login", {
      email: form.username,
      password: form.password,
    });
    const { id, token } = response.data;
    setToken(token, token);
    return response.data;
  } catch (error) {
    const e = error as AxiosError<{ code: string; message: string }>;
    throw e;
  }
};

/**
 * Sends a request to the server to log the user out.
 * @param _ Unused parameter, included for consistency with other functions.
 * @returns Promise that resolves to the server response.
 * @throws If the request fails, an AxiosError is thrown with additional error information.
 */
export const signOut = async (_: any): Promise<void> => {
  try {
    await httpClient.post("/users/logout");
  } catch (error) {
    const e = error as AxiosError<ErrorResponse>;
    throw e;
  }
};

/**
 * Refreshes the access token by sending a request to the server with the refresh token.
 * @returns Promise that resolves to the new access token and refresh token.
 * @throws If the request fails, an AxiosError is thrown with additional error information.
 */
export const refreshAccessToken = async (): Promise<Token> => {
  try {
    const refreshToken = getRefreshToken();
    const response = await httpClient.post<Token>(
      "/authentication/refresh-token",
      { refreshToken }
    );

    const token = <Token>response.data;
    setToken(token.accessToken, token.refreshToken);

    return response.data;
  } catch (error) {
    const e = error as AxiosError<ErrorResponse>;
    throw e;
  }
};
