"use client";

import { useContext } from "react";
import { TwitterContext } from "./twitter-context";

export default function useTwitterAuth() {
  return useContext(TwitterContext);
}
