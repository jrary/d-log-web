import heroBackground from "@features/home/assets/hero-background.png"
import heroImage from "@features/home/components/sections/hero-no-login/assets/hero.png"
import * as Styled from "./styled"

const TEXT = {
  title:
    "언제 어디서든\n원하는 IT 작업만 하세요.\n\n커뮤니케이션은\n그릿지가 대신 할게요!",
  description:
    "그릿지는 프로젝트 작업자들에게 맞춤형\nIT프로젝트를 추천해드리며, 커뮤니케이션을\n대행하는 플랫폼입니다.",
}

export function HeroNoLogin() {
  return (
    <Styled.Section id="hero-login">
      <Styled.Background src={heroBackground} />
      <Styled.Content>
        <Styled.Title>{TEXT.title}</Styled.Title>
        <Styled.Description>{TEXT.description}</Styled.Description>
      </Styled.Content>
      <Styled.HeroImage src={heroImage} alt="hero" />
    </Styled.Section>
  )
}
