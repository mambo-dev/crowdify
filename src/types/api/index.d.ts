import { User } from "@prisma/client";

export interface CreatedUserAccount {
  error: string | ZodIssue[] | null;
  success: boolean;
}

export interface Verification {
  error: string | ZodIssue[] | null;
  success: boolean;
}

export interface LoggedInUser {
  error: string | ZodIssue[] | null;
  success: boolean;
}

export interface LogOut {
  success: boolean;
}

export interface AuthorizedUser {
  error: string | ZodIssue[] | null;
  user: User | null;
}

export type DecodedToken = {
  id: number;
  email: string;
  image: string | null;
  iat: number;
  exp: number;
};
