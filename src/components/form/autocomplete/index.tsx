import { Text } from "@components/shared-components/text"
import CloseIcon from "@mui/icons-material/Close"
import { Paper } from "@mui/material"
import useAutocomplete from "@mui/material/useAutocomplete"
import { useFormikContext } from "formik"
import { useState } from "react"
import * as Styled from "./styled"
import type { AutocompleteGetTagProps } from "@mui/material/useAutocomplete"

type AutocompleteProps = {
  name: string
  options: string[]
  placeholder: string
  value?: string
}

// 입력받으면 input 창 위에 tag를 보여주기
export type TagProps = {
  label: string
} & ReturnType<AutocompleteGetTagProps>

export function Tag(props: TagProps) {
  const { label, onDelete, ...other } = props
  return (
    <Styled.TagBox {...other}>
      <Text typo="body3" color="DEFAULT">
        {label}
      </Text>
      <CloseIcon onClick={onDelete} />
    </Styled.TagBox>
  )
}

export default function Autocomplete({
  name,
  options,
  value,
  placeholder,
}: AutocompleteProps) {
  const { setFieldValue } = useFormikContext()
  const [inputValue, setInputValue] = useState("")
  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: `${name}-autocomplete`,
    multiple: false,
    options,
    getOptionLabel: (option) => option,
    onChange: (_, newValue) => {
      setFieldValue(name, newValue)
      setInputValue("")
    },
    inputValue,
    onInputChange: (_, newInputValue) => setInputValue(newInputValue),
  })

  // 작업 내용 입력 로직
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && inputValue) {
      if (event.nativeEvent.isComposing) {
        return
      }
      event.preventDefault()
      setFieldValue(name, inputValue)
      setInputValue("")
    }
  }

  return (
    <>
      <div {...getRootProps()}>
        <Styled.InputWrapper
          ref={setAnchorEl}
          className={focused ? "focused" : ""}>
          {value && (
            <Tag
              key={0}
              label={value}
              onDelete={() => setFieldValue(name, "")}
              data-tag-index={0}
              tabIndex={-1}
            />
          )}
          <input
            {...getInputProps()}
            placeholder={placeholder}
            onKeyDown={handleKeyDown}
            disabled={Boolean(value)}
            value={value ? "" : inputValue}
          />
        </Styled.InputWrapper>
      </div>
      {focused && !value && (
        <Paper>
          <Styled.Listbox {...getListboxProps()}>
            <Styled.Info>직접 입력 또는 목록에서 선택</Styled.Info>
            {inputValue && (
              <Styled.Preview>
                <Text typo="body3" color="DEFAULT">
                  {inputValue}
                </Text>
                <Styled.ConfirmButton
                  onClick={() => {
                    if (inputValue.trim()) {
                      setFieldValue(name, inputValue.trim())
                      setInputValue("")
                    }
                  }}>
                  입력
                </Styled.ConfirmButton>
              </Styled.Preview>
            )}
            {groupedOptions.map((option, index) => {
              const { key, ...optionProps } = getOptionProps({ option, index })
              return (
                <li key={key} {...optionProps}>
                  <span>{option}</span>
                </li>
              )
            })}
          </Styled.Listbox>
        </Paper>
      )}
    </>
  )
}
