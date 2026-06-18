import { TextField } from "@components/form/text-field"
import { Text } from "@components/shared-components/text"
import { intervalToDuration } from "date-fns"
import { noop } from "es-toolkit"
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import type { ComponentProps } from "react"

export type VerifyRef = {
  startTimer: () => void
  verifySuccess: () => void
}

export type VerifyState = "idle" | "verifying" | "success" | "timeout" | "error"

type VerifyProps = ComponentProps<typeof TextField.Control> & {
  state: VerifyState
  onStateChange?: (state: VerifyState) => void
}

const VERIFY_WAIT_TIME = 60 * 3

export const Verify = forwardRef<VerifyRef, VerifyProps>(
  ({ state, onStateChange = noop, ...props }, ref) => {
    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const [leftTime, setLeftTime] = useState(0)

    useEffect(function handleUnMount() {
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current)
        }
      }
    }, [])

    useEffect(
      function handleTimeout() {
        if (timerRef.current) {
          if (leftTime <= 0) {
            onStateChange("timeout")
            clearInterval(timerRef.current)
          }
        }
      },
      [leftTime, onStateChange],
    )

    function startTimer() {
      setLeftTime(VERIFY_WAIT_TIME)
      onStateChange("verifying")

      if (timerRef.current) {
        clearInterval(timerRef.current)
      }

      timerRef.current = setInterval(() => {
        setLeftTime((prev) => (prev > 0 ? prev - 1 : 0))
      }, 1000)
    }

    function verifySuccess() {
      onStateChange("success")
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }

    useImperativeHandle(ref, () => ({
      startTimer,
      verifySuccess,
    }))

    const duration = intervalToDuration({
      start: 0,
      end: leftTime * 1000,
    })

    return (
      <TextField.Root>
        <TextField.Control disabled={state !== "verifying"} {...props} />
        <TextField.Slot direction="right">
          {state === "verifying" && (
            <Text color="DANGER">
              {duration.minutes?.toString().padStart(2, "0")}:
              {duration.seconds?.toString().padStart(2, "0")}
            </Text>
          )}
        </TextField.Slot>
      </TextField.Root>
    )
  },
)

Verify.displayName = "Verify"
