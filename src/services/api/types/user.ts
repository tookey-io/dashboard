import { FileEntity } from "./file-entity";
import { RoleEnum } from "./role";

export type User = {
  id: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  role: RoleEnum;
  photo?: FileEntity;

  discord: null | Record<string, unknown>
  telegram: null | Record<string, unknown>
  twitter: null | Record<string, unknown>
  github: null | Record<string, unknown>
};
