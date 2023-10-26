"use client";

import { createContext } from "react";

export type DiscordAuthResponse = {
  accessToken: string;
  expiresIn: number;
  signedRequest: string;
  userID: string;
};

export type DiscordAuthLoginResponse = {
  authResponse: DiscordAuthResponse;
};

export const DiscordContext = createContext<{
  login: (connect?: boolean) => void;
}>({
  login: async () => {
    throw new Error("DiscordAuthProvider not mounted");
  },
});
