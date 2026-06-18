import { gridgeQueryKey } from "@queries/gridgeQueryKey"

export const signUpQueryKey = {
  all: () => [...gridgeQueryKey.all(), "sign-up"],
  jobCategoryList: () => [...signUpQueryKey.all(), "job-list"],
  roleList: (jobCategory: number) => [
    ...signUpQueryKey.all(),
    { jobCategory },
    "role-list",
  ],
  frameworkList: () => [...signUpQueryKey.all(), "framework-list"],
  languageList: () => [...signUpQueryKey.all(), "language-list"],
}
