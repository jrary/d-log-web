import { Text } from "@components/shared-components/text"
import * as Popover from "@radix-ui/react-popover"
import { formatDateDifference, formatDateRange } from "@styles/date"
import { forwardRef, useImperativeHandle, useRef, useState } from "react"
import * as Styled from "./styled"
import type { ReactNode } from "react"
import type { DayPickerProps, PropsBase, PropsRange } from "react-day-picker"

type Props = {
  content?: ReactNode
  placeholder?: string
  highlight?: boolean
  triggerDisabled?: boolean
  align?: "start" | "center" | "end"
  usePortal?: boolean
}

export type DayPickerRef = {
  closePopover: () => void
}

export const DayPicker = forwardRef<DayPickerRef, Props & DayPickerProps>(
  function (
    {
      content,
      placeholder,
      highlight,
      align = "end",
      usePortal = false,
      ...props
    },
    ref,
  ) {
    const [open, setOpen] = useState(false)

    useImperativeHandle(ref, () => ({
      closePopover: () => setOpen(false),
    }))

    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Styled.Trigger
          data-placeholder={!content}
          data-highlight={highlight}
          disabled={Boolean(props.triggerDisabled)}>
          {content ?? <Styled.Placeholder>{placeholder}</Styled.Placeholder>}
        </Styled.Trigger>

        {usePortal ? (
          <Popover.Portal>
            <Styled.Content align={align}>
              <Styled.DayPicker {...props} />
            </Styled.Content>
          </Popover.Portal>
        ) : (
          <Styled.Content align={align}>
            <Styled.DayPicker {...props} />
          </Styled.Content>
        )}
      </Popover.Root>
    )
  },
)

export function RangeDayPicker(
  props: Props & Omit<PropsRange, "mode"> & Omit<PropsBase, "mode">,
) {
  const ref = useRef<DayPickerRef>(null)

  return (
    <DayPicker
      {...props}
      mode="range"
      ref={ref}
      content={
        props.content ??
        (props.selected?.from && props.selected?.to ? (
          <Text>
            {`${formatDateRange(props.selected.from, props.selected.to)} (${formatDateDifference(props.selected.from, props.selected.to)})`}
          </Text>
        ) : undefined)
      }
    />
  )
}

export function OpenedRangeDayPicker(
  props: Props & Omit<PropsRange, "mode"> & Omit<PropsBase, "mode">,
) {
  return <Styled.DayPicker {...props} mode="range" />
}
