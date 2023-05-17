export interface CreatedUserAccount {
  error: string | ZodIssue[] | null;
  success: boolean;
}

export interface Verification {
  error: string | ZodIssue[] | null;
  success: boolean;
}
