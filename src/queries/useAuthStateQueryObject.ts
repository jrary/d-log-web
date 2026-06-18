import { LOCAL_STORAGE_KEY } from "@constants/localStorageKey"
import { gridgeQueryKey } from "@queries/gridgeQueryKey"
import { queryOptions } from "@tanstack/react-query"
import { isEmpty } from "es-toolkit/compat"

export function useAuthStateQueryObject() {
  return queryOptions({
    queryKey: gridgeQueryKey.user(),
    queryFn: () => {
      return !isEmpty(localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN))
    },
  })
}
