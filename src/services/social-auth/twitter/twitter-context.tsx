"use client";

import { createContext } from "react";

export type TwitterAuthResponse = {
  accessToken: string;
  expiresIn: number;
  signedRequest: string;
  userID: string;
};

export type TwitterAuthLoginResponse = {
  authResponse: TwitterAuthResponse;
};

export const TwitterContext = createContext<{
  login: (connect?: boolean) => void;
}>({
  login: async () => {
    throw new Error("TwitterAuthProvider not mounted");
  },
});
