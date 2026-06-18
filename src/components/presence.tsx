import { toChildrenArray } from "@utils/children"
import { isEmpty } from "es-toolkit/compat"
import { useEffect, useReducer, useRef } from "react"
import type { ReactElement } from "react"

type Props = {
  children: ReactElement | null
}

export function Presence({ children }: Props) {
  const child = useRef<ReactElement | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const [_, forceUpdate] = useReducer((x) => x + 1, 0)

  useEffect(() => {
    const clear = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }

    if (!isEmpty(children)) {
      clear()
      child.current = toChildrenArray([children])[0]
      forceUpdate()

      return clear
    }

    timeoutRef.current = setTimeout(() => {
      child.current = null
      forceUpdate()
    }, 300)
    return clear
  }, [children])

  return child.current
}
