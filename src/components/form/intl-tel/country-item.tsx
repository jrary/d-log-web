import { CountryFlag } from "@components/form/intl-tel/styled"
import { HighlightText } from "@components/highlight-text"
import { memo } from "react"
import * as Styled from "./country-item.styled"

type CountryItemProps = {
  onClick: () => void
  query: string
  country: {
    code: string
    name: string
    dial: string
    icon: string
  }
}

export const CountryItem = memo(
  ({ country, onClick, query }: CountryItemProps) => {
    const queryEnabled = query.length >= 2

    return (
      <Styled.Container key={country.code} onClick={onClick}>
        <CountryFlag>{country.icon}</CountryFlag>
        <Styled.Name>
          {!queryEnabled ? (
            country.name
          ) : (
            <HighlightText
              highlightRegex={new RegExp(`(${query})`, "gi")}
              HighlightComponent={Styled.NameHighlight}>
              {country.name}
            </HighlightText>
          )}
        </Styled.Name>
        <Styled.Dial>+{country.dial}</Styled.Dial>
      </Styled.Container>
    )
  },
  (prev, next) => prev.query === next.query,
)
