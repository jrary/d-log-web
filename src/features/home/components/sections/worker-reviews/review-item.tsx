import { HighlightText } from "@components/highlight-text"
import * as Styled from "./review-item-styled"

type ReviewProps = {
  id: string
  name: string
  profileImg: string
  position: string
  title: string
  highlightRegex: RegExp
  description: string
}

export function ReviewItem({
  id,
  name,
  profileImg,
  position,
  title,
  highlightRegex,
  description,
}: ReviewProps) {
  return (
    <Styled.Wrapper id={id}>
      <Styled.ProfileWrapper>
        <Styled.ProfileImg src={profileImg} />
        <Styled.ProfileInfoWrapper>
          <Styled.Name>{name}님</Styled.Name>
          <Styled.Position>{position}</Styled.Position>
        </Styled.ProfileInfoWrapper>
      </Styled.ProfileWrapper>
      <Styled.Title>
        <HighlightText highlightRegex={highlightRegex}>{title}</HighlightText>
      </Styled.Title>
      <Styled.Description>{description}</Styled.Description>
    </Styled.Wrapper>
  )
}
