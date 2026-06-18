import * as Styled from "./summary-card.styled"
import type { PropsWithChildren, ReactNode } from "react"

type Props = {
  title: string
  icon?: ReactNode
}

export function SummaryCard({
  title,
  icon,
  children,
}: PropsWithChildren<Props>) {
  return (
    <Styled.Container>
      <Styled.TitleContainer>
        <Styled.Title>{title}</Styled.Title>
        {icon}
      </Styled.TitleContainer>
      <Styled.Value>{children}</Styled.Value>
    </Styled.Container>
  )
}
