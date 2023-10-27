import { useCallback } from "react";
import { API_URL } from "../config";
import { User } from "../types/user";
import useFetch from "../use-fetch";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";

export type UsersRequest = {
  page: number;
  limit: number;
};

export type UsersResponse = User[];

export function useGetUsersService() {
  const fetch = useFetch();

  return useCallback(
    (data: UsersRequest) => {
      const requestUrl = new URL(`${API_URL}/api/admin/users`);
      requestUrl.searchParams.append("page", data.page.toString());
      requestUrl.searchParams.append("limit", data.limit.toString());

      return fetch(requestUrl, {
        method: "GET",
      }).then(wrapperFetchJsonResponse<UsersResponse>);
    },
    [fetch]
  );
}

export type UserOtpRequest = {
  id: number;
}
export type UserOtpRequestResponse = {
  userId: number;
  token: string;
  validUntil: string;
  id: number
}

export function useGetUserOtpService() {
  const fetch = useFetch();

  return useCallback(
    (data: UserOtpRequest) => {
      const requestUrl = new URL(`${API_URL}/api/admin/user/${data.id}/otp`);
      return fetch(requestUrl, {
        method: "GET",
      }).then(wrapperFetchJsonResponse<UserOtpRequestResponse>);
    },
    [fetch]
  );

}

export type UserRequest = {
  id: User["id"];
};

export type UserResponse = User;

export function useGetUserService() {
  const fetch = useFetch();

  return useCallback(
    (data: UserRequest) => {
      return fetch(`${API_URL}/v1/users/${data.id}`, {
        method: "GET",
      }).then(wrapperFetchJsonResponse<UserResponse>);
    },
    [fetch]
  );
}

export type UserPostRequest = Pick<
  User,
  "email" | "firstName" | "lastName" | "photo" | "role"
> & {
  password: string;
};

export type UserPostResponse = User;

export function usePostUserService() {
  const fetch = useFetch();

  return useCallback(
    (data: UserPostRequest) => {
      return fetch(`${API_URL}/v1/users`, {
        method: "POST",
        body: JSON.stringify(data),
      }).then(wrapperFetchJsonResponse<UserPostResponse>);
    },
    [fetch]
  );
}

export type UserPatchRequest = {
  id: User["id"];
  data: Partial<
    Pick<User, "email" | "firstName" | "lastName" | "photo" | "role"> & {
      password: string;
    }
  >;
};

export type UserPatchResponse = User;

export function usePatchUserService() {
  const fetch = useFetch();

  return useCallback(
    (data: UserPatchRequest) => {
      return fetch(`${API_URL}/v1/users/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify(data.data),
      }).then(wrapperFetchJsonResponse<UserPatchResponse>);
    },
    [fetch]
  );
}

export type UsersDeleteRequest = {
  id: User["id"];
};

export type UsersDeleteResponse = undefined;

export function useDeleteUsersService() {
  const fetch = useFetch();

  return useCallback(
    (data: UsersDeleteRequest) => {
      return fetch(`${API_URL}/v1/users/${data.id}`, {
        method: "DELETE",
      }).then(wrapperFetchJsonResponse<UsersDeleteResponse>);
    },
    [fetch]
  );
}
