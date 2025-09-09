export const passwordRequirements = [
  { label: "At least 8 characters", test: (pw: string): boolean => pw.length >= 8 },
  { label: "At least one letter", test: (pw: string): boolean => /[A-Za-z]/u.test(pw) },
  { label: "At least one digit", test: (pw: string): boolean => /\d/u.test(pw) },
  {
    label: "At least one special character",
    test: (pw: string): boolean => /[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?`~]/u.test(pw),
  },
] as const;
