import bannerImageMobile from "@features/home/components/sections/discord/assets/ic_worker_m_discord.png"
import icon from "@features/home/components/sections/discord/assets/ic_worry.png"
import bannerImage from "@features/home/components/sections/discord/assets/img_banner_seventh.png"
import * as Styled from "./styled"

const TEXT = {
  title:
    "프로젝트 하다가 어려움이 있다면?\n24시간 온라인 리모트 워커들에게 질문하세요.",
  subtitle: "G 워커는 일도 쉽게, 질문도 쉽게!",
  description:
    "기획자, 개발자, 디자이너 약 2000명이 모여있는 커뮤니티가 있어요.\n질문이 필요하다면 언제든 상시대기!",
}

const button = {
  text: "커뮤니티 입장하기",
  link: "https://discord.gg/G3wXNBndNp",
}

export function Discord() {
  return (
    <Styled.Section>
      <Styled.Icon src={icon} alt="icon-discord" />
      <Styled.SubTitle>{TEXT.subtitle}</Styled.SubTitle>
      <Styled.Title>{TEXT.title}</Styled.Title>
      <Styled.Description>{TEXT.description}</Styled.Description>
      <Styled.Button to="https://discord.com/invite/G3wXNBndNp">
        {button.text}
      </Styled.Button>
      <Styled.BannerImage src={bannerImage} alt="banner-img-discord" />
      <Styled.BannerImageMobile
        src={bannerImageMobile}
        alt="banner-img-mobile-discord"
      />
    </Styled.Section>
  )
}
