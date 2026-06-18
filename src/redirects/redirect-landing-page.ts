import { LOCAL_STORAGE_KEY } from "@constants/localStorageKey"
import { redirect } from "react-router"

export async function _redirectLandingPage() {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)

  if (!token) {
    return redirect("/")
  }
}

export const redirectLandingPage = {
  index: true,
  loader: _redirectLandingPage,
}
