import { findChild, toChildrenArray } from "@utils/children"
import { invariant } from "es-toolkit"
import { cloneElement, useEffect, useState } from "react"
import { useLocation } from "react-router"
import ChevronDown from "~icons/local/ic_chevron_down"
import ChevronUp from "~icons/local/ic_chevron_up"
import Minus from "~icons/local/ic_minus"
import Plus from "~icons/local/ic_plus"
import * as Styled from "./styled"
import type { ReactElement } from "react"

type ContainerProps = {
  depth?: 1 | 2
  defaultOpen?: boolean
  path?: string
  children: ReactElement[]
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const Icon = {
  [1]: {
    true: <Minus />,
    false: <Plus />,
  },
  [2]: {
    true: <ChevronUp />,
    false: <ChevronDown />,
  },
} as const

function Container({
  defaultOpen = false,
  path = `/`,
  depth = 1,
  children,
  open: controlledOpen,
  onOpenChange,
}: ContainerProps) {
  const location = useLocation()
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)

  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const setOpen = (next: boolean) => {
    if (isControlled) {
      onOpenChange?.(next)
    } else {
      setUncontrolledOpen(next)
      onOpenChange?.(next)
    }
  }

  const toggleOpen = () => setOpen(!open)

  const childrenArray = toChildrenArray(children)

  const triggerElement = findChild(childrenArray, Styled.Trigger)
  const contentElement = findChild(childrenArray, Styled.Content)

  invariant(triggerElement, "Collapse.Trigger is required")
  invariant(contentElement, "Collapse.Content is required")

  useEffect(() => {
    if (location.pathname !== path && !isControlled)
      setUncontrolledOpen(location.pathname.includes(path))
  }, [location.pathname, path, isControlled])

  return (
    <Styled.Container data-depth={depth}>
      {cloneElement(triggerElement, {
        onClick: () => {
          toggleOpen()
          triggerElement.props.onClick?.()
        },
        children: (
          <>
            <Styled.TriggerItem>
              {triggerElement.props.children}
            </Styled.TriggerItem>
            {Icon[depth][open ? "true" : "false"]}
          </>
        ),
      })}
      {cloneElement(contentElement, {
        "data-open": open,
      })}
    </Styled.Container>
  )
}

export const Collapse = {
  Root: Container,
  Trigger: Styled.Trigger,
  Content: Styled.Content,
  Link: Styled.Link,
}
