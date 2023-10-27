import { FileEntity } from "./file-entity";
import { RoleEnum } from "./role";

export type DiscordProfile = {
  discordId: string;
  discordTag: string | null;
  email: string | null;
  avatar: string | null;
  locale: string | null;
  verified: boolean | null;
};

export type GoogleProfile = {
  googleId: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
};

export type TelegramProfile = {};
export type TwitterProfile = {
  twitterId: string;
  name: string | null;
  username: string | null;
};
export type GithubProfile = {};

export type User = {
  id: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  role: RoleEnum;
  photo?: FileEntity;

  discord: null | DiscordProfile;
  google: null | GoogleProfile;
  telegram: null | Record<string, unknown>;
  twitter: null | TwitterProfile;
  github: null | Record<string, unknown>;
};
