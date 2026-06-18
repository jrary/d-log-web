import { ICON } from "@components/shared-components/tokens/color"
import { format } from "date-fns"
import DocumentIcon from "~icons/local/ic_document.svg"
import * as Styled from "./dashboard-styled"
import type { ReactNode } from "react"

type DashboardProps = {
  id: string
  title: string
  icon: ReactNode
  count: number
  emptyMessage: string
  detailText: string
  detailHref: string
}

export function Dashboard({
  id,
  title,
  icon,
  count,
  emptyMessage,
  detailText,
  detailHref,
}: DashboardProps) {
  if (count === 0) {
    return (
      <Styled.Section id={id}>
        <Styled.Icon bgColor={ICON.TERTIARY}>{icon}</Styled.Icon>
        <Styled.Title>{title}</Styled.Title>
        <Styled.Content>
          <Styled.EmptyMessage>{emptyMessage}</Styled.EmptyMessage>
          {detailHref === "/dashboard" ? (
            <Styled.DetailLink to="/recruitment">
              {detailText}
            </Styled.DetailLink>
          ) : (
            <Styled.DetailLinkDisabled to={detailHref}>
              {detailText}
            </Styled.DetailLinkDisabled>
          )}
        </Styled.Content>
      </Styled.Section>
    )
  }

  return (
    <Styled.Section id={id}>
      <Styled.Icon bgColor={ICON.HIGHLIGHT}>{icon}</Styled.Icon>
      <Styled.Title>{title}</Styled.Title>
      <Styled.Content>
        <Styled.Count>
          <Styled.DocIcon>
            <DocumentIcon />
          </Styled.DocIcon>
          {`${count}개`}
        </Styled.Count>
        <Styled.Today>{format(new Date(), "yyyy.MM.dd 기준")}</Styled.Today>
        <Styled.DetailLink to={detailHref}>{detailText}</Styled.DetailLink>
      </Styled.Content>
    </Styled.Section>
  )
}
