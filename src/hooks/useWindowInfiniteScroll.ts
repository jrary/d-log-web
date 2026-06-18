import { noop, throttle } from "es-toolkit"
import { useEffect } from "react"

export function useWindowInfiniteScroll(
  fn = noop,
  condition = true,
  threshold = 1,
) {
  useEffect(
    function addScrollEventListener() {
      const handleScroll = throttle(() => {
        const { scrollY, innerHeight } = window
        if (scrollY + innerHeight >= document.body.scrollHeight) {
          fn()
        }
      }, threshold)

      window.addEventListener("scroll", handleScroll)

      return () => {
        window.removeEventListener("scroll", handleScroll)
      }
    },
    [condition, fn, threshold],
  )
}
