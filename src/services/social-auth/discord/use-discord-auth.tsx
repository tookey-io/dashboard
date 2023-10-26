"use client";

import { useContext } from "react";
import { DiscordContext } from "./discord-context";

export default function useDiscordAuth() {
  return useContext(DiscordContext);
}
