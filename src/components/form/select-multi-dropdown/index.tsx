import * as Popover from "@radix-ui/react-popover"
import { filterChild, findChild, toChildrenArray } from "@utils/children"
import { isArray, noop } from "es-toolkit/compat"
import { cloneElement, Fragment, useEffect, useState } from "react"
import Close from "~icons/local/ic_close"
import * as Styled from "./styled"
import type { ReactElement, ReactNode } from "react"

type SelectDropdownProps = {
  children: ReactElement[]

  value?: number[]
  defaultValue?: number[]

  disabled?: boolean

  leftContent?: ReactNode
  rightContent?: ReactNode

  onSelect?: (value: number[]) => void

  hasError?: boolean
}

const Root = ({
  value = [],
  defaultValue = [],
  disabled,
  onSelect = noop,
  children,
  leftContent = null,
  rightContent = null,
  hasError,
}: SelectDropdownProps) => {
  const [selectedValues, setSelectedValues] = useState<number[]>(
    value.length ? value : defaultValue,
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

  const selectedElems = optionElem.filter((option) =>
    selectedValues.includes(option.props.value),
  )

  useEffect(() => {
    if (value.length > 0) {
      setSelectedValues(value)
    }
  }, [value])

  const handleSelect = (optionValue: number) => {
    const newValues = selectedValues.includes(optionValue)
      ? selectedValues.filter((v) => v !== optionValue)
      : [...selectedValues, optionValue]

    setSelectedValues(newValues)
    onSelect(newValues)
  }

  return (
    <Popover.Root>
      <Styled.Container
        data-placeholder={selectedElems.length === 0}
        data-disabled={disabled}
        data-error={hasError}>
        {leftContent}
        {cloneElement(triggerElem, {
          children:
            selectedElems.length > 0 ? (
              <Styled.SelectedList>
                {selectedElems.map((selectedElem) => (
                  <Styled.Items key={selectedElem.props.value}>
                    {selectedElem.props.children}
                    <Close
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSelect(selectedElem.props.value)
                      }}
                    />
                  </Styled.Items>
                ))}
              </Styled.SelectedList>
            ) : (
              <Styled.Placeholder>
                {triggerElem?.props.placeholder}
              </Styled.Placeholder>
            ),
        })}
        {rightContent}
      </Styled.Container>
      <Popover.Portal>
        <Styled.Content sideOffset={5} align="start" sticky="partial">
          {cloneElement(optionsElem, {
            children: optionElem.map((option, index) => {
              const isSelected = selectedValues.includes(option.props.value)

              return cloneElement(option, {
                key: index,
                "data-selected": isSelected,
                onClick: () => {
                  handleSelect(option.props.value)
                },
              })
            }),
          })}
        </Styled.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export const SelectMultiDropdown = {
  Root,
  Trigger: Styled.Trigger,
  Options: Styled.Options,
  Option: Styled.Option,
}
