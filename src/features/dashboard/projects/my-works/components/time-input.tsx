import { TextField } from "@components/form/text-field"
import { useRef } from "react"

type Props = {
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  onFocus?: () => void
  placeholder?: string
}

export function TimeInput({
  value,
  onChange,
  onBlur,
  onFocus,
  placeholder,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const formatTime = (input: string, cursorPosition: number) => {
    // 숫자만 남기고 필터링합니다.
    let digits = input.replace(/\D/g, "")

    // 최대 4자리까지만 허용합니다.
    if (digits.length > 4) {
      // 4자리가 전부 입력되지 않았다면 최근에 입력한 4자리 기준으로 반영
      if (digits[0] === "0") {
        digits = digits.slice(-4)
      }
      // 4자리가 전부 입력된 상태라면 뒤로 밀려난 0을 삭제
      else {
        digits = digits.slice(0, 4)
      }
    }

    let formatted = digits
    let newCursorPosition = cursorPosition

    if (digits.length >= 3) {
      formatted = digits.slice(0, 2) + ":" + digits.slice(2)
      if (cursorPosition > 2 && !input.includes(":")) {
        newCursorPosition = cursorPosition + 1
      }
    } else if (digits.length === 1) {
      formatted = "0" + digits + ":00"
      newCursorPosition = cursorPosition + 1
    }

    return { formatted, newCursorPosition }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = event.target.value
    const cursorPosition = event.target.selectionStart || 0

    const { formatted, newCursorPosition } = formatTime(
      userInput,
      cursorPosition,
    )
    onChange(formatted)

    // React 상태 업데이트 후 커서 위치 복원
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.setSelectionRange(newCursorPosition, newCursorPosition)
      }
    }, 0)
  }

  return (
    <TextField.Control
      ref={inputRef}
      type="text"
      value={value}
      onChange={handleChange}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder={placeholder}
      style={{
        width: "100%",
      }}
    />
  )
}
