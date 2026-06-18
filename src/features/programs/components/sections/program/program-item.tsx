import { HighlightText } from "@components/highlight-text"
import { Text } from "@components/shared-components/text"
import * as Styled from "./program-item.styled"
import type { Program } from "@features/programs/components/sections/program"

type ProgramItemProps = {
  program: Program
}

export function ProgramItem({ program }: ProgramItemProps) {
  return (
    <Styled.Container>
      <Styled.Content>
        <Styled.TextContent>
          <Styled.Title>
            <HighlightText
              highlightRegex={program.content.title.highlight}
              HighlightComponent={Styled.Highlight}>
              {program.content.title.text}
            </HighlightText>
          </Styled.Title>
          <Styled.Description>{program.content.description}</Styled.Description>
        </Styled.TextContent>

        <Styled.Tags>
          {program.content.tags.map((tag) => (
            <Styled.Tag key={tag}>
              <Text typo="body3">{tag}</Text>
            </Styled.Tag>
          ))}
        </Styled.Tags>
      </Styled.Content>
      <Styled.Card>
        <Styled.CardThumbnail
          bgColor={program.card.color.background}
          textColor={program.card.color.text}>
          {program.card.logo}
          <Styled.CardTitle>{program.card.title}</Styled.CardTitle>
        </Styled.CardThumbnail>
        <Styled.CardContent>
          <Styled.CardTextContainer>
            <Styled.CardHeader>프로그램 설명</Styled.CardHeader>
            <Styled.CardDescription>
              {program.card.description}
            </Styled.CardDescription>
          </Styled.CardTextContainer>

          <Styled.CardLink to={program.card.link} target="_blank">
            <Styled.CardLinkText>도전하기</Styled.CardLinkText>
          </Styled.CardLink>
        </Styled.CardContent>
      </Styled.Card>
    </Styled.Container>
  )
}
