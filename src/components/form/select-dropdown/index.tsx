import * as Popover from "@radix-ui/react-popover"
import { filterChild, findChild, toChildrenArray } from "@utils/children"
import { find, isArray, noop } from "es-toolkit/compat"
import { cloneElement, Fragment, useEffect, useState } from "react"
import Close from "~icons/local/ic_close"
import * as Styled from "./styled"
import type { ComponentProps, ReactElement, ReactNode } from "react"

type SelectDropdownProps = {
  children: ReactElement[]

  leftContent?: ReactNode
  rightContent?: ReactNode

  onSelect?: (value: number) => void

  hasError?: boolean
} & ComponentProps<"select">

const Root = ({
  value,
  defaultValue,

  disabled,
  onSelect = noop,

  children,

  leftContent = null,
  rightContent = null,

  hasError,
}: SelectDropdownProps) => {
  const [selectedValue, setSelectedValue] = useState(
    value ?? defaultValue ?? null,
  )

  const childArray = toChildrenArray<ReactElement>(children)

  const triggerElem = findChild(childArray, Styled.Trigger) ?? <Fragment />
  const optionsElem = findChild(childArray, Styled.Options) ?? <Fragment />
  const optionElem = filterChild(
    isArray(optionsElem.props.children)
      ? optionsElem.props.children
      : [optionsElem.props.children],
    Styled.Option,
  )

  const selectedElem = find(
    optionElem,
    (option) => option.props.value === selectedValue,
  )

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value)
    }
  }, [value])

  return (
    <Popover.Root>
      <Styled.Container
        data-placeholder={!selectedElem?.props.children}
        data-disabled={disabled}
        data-error={hasError}>
        {leftContent}
        {cloneElement(triggerElem, {
          children: selectedElem?.props.children ?? (
            <Styled.Placeholder>
              {triggerElem?.props.placeholder}
            </Styled.Placeholder>
          ),
        })}
        {rightContent}
        <Close onClick={() => setSelectedValue(null)} />
      </Styled.Container>
      <Popover.Portal>
        <Styled.Content sideOffset={5} align="start" sticky="partial">
          {cloneElement(optionsElem, {
            children: optionElem.map((option, index) => {
              return cloneElement(option, {
                key: index,
                "data-selected": option.props.value === selectedValue,
                onClick: () => {
                  setSelectedValue(option.props.value)
                  onSelect(option.props.value)
                },
              })
            }),
          })}
        </Styled.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export const SelectDropdown = {
  Root,
  Trigger: Styled.Trigger,
  Options: Styled.Options,
  Option: Styled.Option,
}
