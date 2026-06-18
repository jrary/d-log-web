import { HighlightText } from "@components/highlight-text"
import * as Styled from "./program-item-styled"
import type { ReactNode } from "react"

type ProgramProps = {
  id: string
  name: string
  title: string
  highlightRegex: RegExp
  subTitle: string
  description: string
  categories: string[]
  bgColor: string
  textColor: string
  logo: ReactNode
}

const programText = "프로그램 설명"
const programButton = {
  text: "도전하기",
  navigate: "/program",
}

export function ProgramItem({
  id,
  name,
  title,
  highlightRegex,
  subTitle,
  description,
  categories,
  bgColor,
  textColor,
  logo,
}: ProgramProps) {
  return (
    <Styled.Wrapper id={id}>
      <Styled.Content>
        <Styled.Title>
          <HighlightText
            HighlightComponent={Styled.Highlight}
            highlightRegex={highlightRegex}>
            {title}
          </HighlightText>
        </Styled.Title>
        <Styled.SubTitle>{subTitle}</Styled.SubTitle>
        <Styled.CategoryWrapper>
          {categories.map((item, idx) => (
            <Styled.Category key={idx}>{item}</Styled.Category>
          ))}
        </Styled.CategoryWrapper>
      </Styled.Content>
      <Styled.ProgramBox>
        <Styled.LogoWrapper backgroundColor={bgColor}>
          {logo}
          <Styled.LogoText color={textColor}>{name}</Styled.LogoText>
        </Styled.LogoWrapper>
        <Styled.DescriptionWrapper>
          <Styled.DescriptionTitleWrapper>
            <Styled.DescriptionTitle>{programText}</Styled.DescriptionTitle>
            <Styled.Description>{description}</Styled.Description>
          </Styled.DescriptionTitleWrapper>
          <Styled.ButtonWrapper>
            <Styled.ProgramBtn to="/programs">
              {programButton.text}
            </Styled.ProgramBtn>
          </Styled.ButtonWrapper>
        </Styled.DescriptionWrapper>
      </Styled.ProgramBox>
    </Styled.Wrapper>
  )
}
