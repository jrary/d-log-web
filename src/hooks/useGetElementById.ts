import { useEffect, useState } from "react"

export function useGetElementById(id: string) {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const element = document.getElementById(id)
    if (element) {
      setPortalRoot(element)
    }
  }, [id])

  return portalRoot
}
