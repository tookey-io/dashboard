import { useCallback } from "react";
import { API_URL, AUTH_ME_URL } from "../config";
import { Tokens } from "../types/tokens";
import { User } from "../types/user";
import useFetch from "../use-fetch";
import useFetchBase from "../use-fetch-base";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";

export type AuthLoginRequest = {
  email: string;
  password: string;
};

export type AuthLoginResponse = {
  user: User;
  access: {
    token: string;
    validUntil: string;
  };
  refresh: {
    token: string;
    validUntil: string;
  };
};

export function useAuthLoginService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data: AuthLoginRequest) => {
      return fetchBase(`${API_URL}/api/auth/email/login`, {
        method: "POST",
        body: JSON.stringify(data),
      }).then(wrapperFetchJsonResponse<AuthLoginResponse>);
    },
    [fetchBase]
  );
}

export type AuthGoogleLoginRequest = {
  idToken: string;
};

export type AuthGoogleLoginResponse = {
  user: User;
  access: {
    token: string;
    validUntil: string;
  };
  refresh: {
    token: string;
    validUntil: string;
  };
};

export function useAuthGoogleLoginService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data: AuthGoogleLoginRequest) => {
      return fetchBase(`${API_URL}/api/auth/google`, {
        method: "POST",
        body: JSON.stringify(data),
      }).then(wrapperFetchJsonResponse<AuthGoogleLoginResponse>);
    },
    [fetchBase]
  );
}

export type AuthFacebookLoginRequest = {
  accessToken: string;
};

export type AuthFacebookLoginResponse = Tokens & {
  user: User;
};

export function useAuthFacebookLoginService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data: AuthFacebookLoginRequest) => {
      return fetchBase(`${API_URL}/api/auth/facebook`, {
        method: "POST",
        body: JSON.stringify(data),
      }).then(wrapperFetchJsonResponse<AuthFacebookLoginResponse>);
    },
    [fetchBase]
  );
}

export type AuthDiscordLoginRequest = {
  code: string;
};

export type AuthDiscordLoginResponse = {
  user: User;
  access: {
    token: string;
    validUntil: string;
  };
  refresh: {
    token: string;
    validUntil: string;
  };
};
export function useAuthDiscordLoginService(connect?: boolean) {
  const fetch = useFetch();

  return useCallback(
    (data: AuthDiscordLoginRequest) => {
      return fetch(
        `${API_URL}/api/auth/discord${connect ? "/connect" : ""}`,
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      ).then(wrapperFetchJsonResponse<AuthDiscordLoginResponse>);
    },
    [fetch, connect]
  );
}


export type AuthTwitterLoginRequest = {
  code: string;
  codeVerifier: string;
};

export type AuthTwitterLoginResponse = {
  user: User;
  access: {
    token: string;
    validUntil: string;
  };
  refresh: {
    token: string;
    validUntil: string;
  };
};
export function useAuthTwitterLoginService(connect?: boolean) {
  const fetch = useFetch();

  return useCallback(
    (data: AuthTwitterLoginRequest) => {
      return fetch(
        `${API_URL}/api/auth/twitter${connect ? "/connect" : ""}`,
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      ).then(wrapperFetchJsonResponse<AuthTwitterLoginResponse>);
    },
    [fetch, connect]
  );
}

export type AuthSignUpRequest = {
  email: string;
  password: string;
};

export type AuthSignUpResponse = void;

export function useAuthSignUpService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data: AuthSignUpRequest) => {
      return fetchBase(`${API_URL}/api/auth/email/register`, {
        method: "POST",
        body: JSON.stringify(data),
      }).then(wrapperFetchJsonResponse<AuthSignUpResponse>);
    },
    [fetchBase]
  );
}

export type AuthConfirmEmailRequest = {
  hash: string;
};

export type AuthConfirmEmailResponse = void;

export function useAuthConfirmEmailService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data: AuthConfirmEmailRequest) => {
      return fetchBase(`${API_URL}/api/auth/email/confirm`, {
        method: "POST",
        body: JSON.stringify(data),
      }).then(wrapperFetchJsonResponse<AuthConfirmEmailResponse>);
    },
    [fetchBase]
  );
}

export type AuthForgotPasswordRequest = {
  email: string;
};

export type AuthForgotPasswordResponse = void;

export function useAuthForgotPasswordService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data: AuthForgotPasswordRequest) => {
      return fetchBase(`${API_URL}/api/auth/email/forgot-password`, {
        method: "POST",
        body: JSON.stringify(data),
      }).then(wrapperFetchJsonResponse<AuthForgotPasswordResponse>);
    },
    [fetchBase]
  );
}

export type AuthResetPasswordRequest = {
  password: string;
  hash: string;
};

export type AuthResetPasswordResponse = void;

export function useAuthResetPasswordService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data: AuthResetPasswordRequest) => {
      return fetchBase(`${API_URL}/api/auth/email/reset`, {
        method: "POST",
        body: JSON.stringify(data),
      }).then(wrapperFetchJsonResponse<AuthResetPasswordResponse>);
    },
    [fetchBase]
  );
}

export type AuthPatchMeRequest =
  | Partial<Pick<User, "firstName" | "lastName">>
  | { password: string; oldPassword: string };

export type AuthPatchMeResponse = User;

export function useAuthPatchMeService() {
  const fetch = useFetch();

  return useCallback(
    (data: AuthPatchMeRequest) => {
      return fetch(AUTH_ME_URL, {
        method: "PATCH",
        body: JSON.stringify(data),
      }).then(wrapperFetchJsonResponse<AuthPatchMeResponse>);
    },
    [fetch]
  );
}
