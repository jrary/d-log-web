import * as Styled from "./styled"

type TitleProps = {
  title: string
  description: string
}

export default function Title({ title, description }: TitleProps) {
  return (
    <Styled.Container>
      <Styled.Title>{title}</Styled.Title>
      <Styled.Description>{description}</Styled.Description>
    </Styled.Container>
  )
}
