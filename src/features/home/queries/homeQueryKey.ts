import { gridgeQueryKey } from "@queries/gridgeQueryKey"

export const homeQueryKey = {
  userInProgressProjectCnt: () =>
    [...gridgeQueryKey.user(), "in-progress-project-cnt"] as const,
  userInProgressProgramCnt: () =>
    [...gridgeQueryKey.user(), "in-progress-program-cnt"] as const,
}
