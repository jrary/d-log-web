import { TEXT } from "@components/shared-components/tokens/color"
import * as Popover from "@radix-ui/react-popover"
import { filterChild, findChild, toChildrenArray } from "@utils/children"
import { find, isArray, noop } from "es-toolkit/compat"
import { cloneElement, Fragment, useState } from "react"
import ChevronDown from "~icons/local/ic_select_arrow"
import * as Styled from "./styled"
import type { ComponentProps, ReactElement, ReactNode } from "react"

type SelectProps = {
  children: ReactElement[]

  leftContent?: ReactNode
  rightContent?: ReactNode

  onSelect?: (value: string) => void

  placeholderColor?: string
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

  placeholderColor = TEXT.PLACEHOLDER,
  hasError,
}: SelectProps) => {
  const [selectedValue, setSelectedValue] = useState(value ?? defaultValue)

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

  return (
    <Popover.Root>
      <Styled.Container
        data-placeholder={!selectedElem?.props.children}
        data-disabled={disabled}
        data-error={hasError}>
        {leftContent}
        {cloneElement(triggerElem, {
          children: triggerElem?.props.children ??
            selectedElem?.props.children ?? (
              <Styled.Placeholder placeholderColor={placeholderColor}>
                {triggerElem?.props.placeholder}
              </Styled.Placeholder>
            ),
        })}
        {rightContent}
        <ChevronDown />
      </Styled.Container>
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
    </Popover.Root>
  )
}

export const Select = {
  Root,
  Trigger: Styled.Trigger,
  Options: Styled.Options,
  Option: Styled.Option,
}
