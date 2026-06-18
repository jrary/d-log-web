import { CountryItem } from "@components/form/intl-tel/country-item"
import { TextField } from "@components/form/text-field"
import { ICON } from "@components/shared-components/tokens/color"
import countryInfo from "@features/auth/sign-up/constants/country-info.json"
import * as Popover from "@radix-ui/react-popover"
import { useField } from "formik"
import { useMemo, useState } from "react"
import ArrowDown from "~icons/local/ic_arrow_down"
import Search from "~icons/local/ic_search"
import * as Styled from "./styled"

type IntlTelProps = {
  disabled?: boolean
  "data-error"?: boolean

  regionCode?: string
  onChangeRegionCode: (regionCode: string) => void

  number?: string
  onChangeNumber: (number: string) => void

  placeholder?: string
}

export function IntlTel({
  regionCode = "KR",
  "data-error": error,
  disabled,
  onChangeRegionCode,
  number,
  onChangeNumber,
  placeholder,
}: IntlTelProps) {
  const [query, setQuery] = useState<string>("")

  const country = useMemo(
    () => countryInfo.find((country) => country.code === regionCode),
    [regionCode],
  )

  const reset = () => {
    setQuery("")
  }

  const [, , helpers] = useField("phone")

  return (
    <Popover.Root onOpenChange={reset}>
      <TextField.Root>
        <TextField.Slot direction="left">
          <Popover.Trigger asChild>
            <Styled.Button type="button">
              <Styled.CountryFlag>{country?.icon ?? "🏳️"}</Styled.CountryFlag>
              <ArrowDown color={ICON.TERTIARY} />
            </Styled.Button>
          </Popover.Trigger>
        </TextField.Slot>
        <TextField.Control
          type="tel"
          disabled={disabled}
          data-error={error}
          value={number}
          placeholder={placeholder}
          onChange={(e) => {
            onChangeNumber(e.target.value)
          }}
          onBlur={() => {
            helpers.setTouched(true)
          }}
        />
      </TextField.Root>

      <Popover.Portal>
        <Styled.PopoverContent sideOffset={20} alignOffset={-17} align="start">
          <Styled.SearchForm>
            <TextField.Root>
              <TextField.Slot direction="left">
                <Search color={ICON.TERTIARY} />
              </TextField.Slot>
              <TextField.Control
                value={query}
                placeholder="검색어를 입력해주세요."
                onChange={(e) => setQuery(e.target.value)}
              />
            </TextField.Root>
          </Styled.SearchForm>
          <Styled.CountryList>
            {countryInfo
              .filter((country) => {
                if (query.length < 2) {
                  return true
                }
                return country.name.toLowerCase().includes(query.toLowerCase())
              })
              .map((country) => (
                <CountryItem
                  key={country.code}
                  query={query}
                  country={country}
                  onClick={() => {
                    onChangeRegionCode(country.code)
                  }}
                />
              ))}
          </Styled.CountryList>
        </Styled.PopoverContent>
      </Popover.Portal>
    </Popover.Root>
  )
}
