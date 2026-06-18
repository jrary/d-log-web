import { HighlightText } from "@components/highlight-text"
import icon from "@features/home/components/sections/worker-intro/assets/ic_camp.png"
import bannerImage from "@features/home/components/sections/worker-intro/assets/img_banner_second.png"
import * as Styled from "./styled"

const TEXT = {
  title: "언제 어디서든,\n원하는 시간대에 일하는\nG워커가 되어보세요.",
  subtitle: "어디서든 자유롭게 일하는 G워커",
  description:
    "그릿지의 G워커로 소속되면 장소, 시간에\n구애받지 않고 원하는 IT 프로젝트를 할 수 있어요.",
  boldDescription: "지금 바로 그릿지 G워커가 되어보세요!",
}

const button = {
  text: "G워커로 일하기",
  navigate: "/nerd/project-worker",
}

export function WorkerIntro() {
  return (
    <Styled.Section id="worker-intro">
      <Styled.Content>
        <Styled.Icon src={icon} alt="icon-worker-intro" />
        <Styled.SubTitle>{TEXT.subtitle}</Styled.SubTitle>
        <Styled.Title>
          <HighlightText highlightRegex={/(G워커)/g}>
            {TEXT.title}
          </HighlightText>
        </Styled.Title>
        <Styled.Description>{TEXT.description}</Styled.Description>
        <Styled.BoldDescription>{TEXT.boldDescription}</Styled.BoldDescription>
        <Styled.WorkerBtn to="/recruitment">{button.text}</Styled.WorkerBtn>
      </Styled.Content>
      <Styled.BannerImage src={bannerImage} alt="banner-img-worker-intro" />
    </Styled.Section>
  )
}
