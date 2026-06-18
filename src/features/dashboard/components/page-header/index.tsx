import * as Styled from "./styled"

type Props = {
  title: string
  description: string
}

export function PageHeader({ title, description }: Props) {
  return (
    <Styled.Container id="page-header">
      <Styled.Title>{title}</Styled.Title>
      <Styled.Description>{description}</Styled.Description>
    </Styled.Container>
  )
}
