"use client";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const AUTH_REFRESH_URL = API_URL + "/api/auth/refresh";
export const AUTH_ME_URL = API_URL + "/api/users/me";
export const AUTH_LOGOUT_URL = API_URL + "/api/auth/logout";
export const AUTH_OPT = API_URL + "/api/auth/access";