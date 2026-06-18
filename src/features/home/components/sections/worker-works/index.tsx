import { HighlightText } from "@components/highlight-text"
import icon from "@features/home/components/sections/worker-works/assets/ic_sunglass.png"
import bannerImage from "@features/home/components/sections/worker-works/assets/img_banner_fifth.png"
import bannerImageMobile from "@features/home/components/sections/worker-works/assets/img_worker_m_projectlist.png"
import * as Styled from "./styled"

const TEXT = {
  mainContent: {
    title: "IT 프로젝트\n쉽게 지원하고, 쉽게 시작해보세요.",
    highlightRegex: /(쉽게 지원|쉽게 시작)/g,
    subtitle: "G worker가 일하는 방식",
    description: "그릿지는 G워커에게 맞춤형 프로젝트를 추천해드려요.",
    boldDescription: "G워커분들은 취향에 맞는 프로젝트만 하세요.",
  },
  subContent: {
    title:
      "그릿지가 딱맞는 프로젝트만 알려드릴게요.\n지원하기만 눌러서 빠르게 시작해보세요!",
    highlightRegex: /(딱맞는 프로젝트|지원하기)/g,
    description:
      "내가 가능한 프로젝트를 먼저 보여줘요. 나의 라이프 스타일에 맞춰서 작업할 수 있어요!\n학교 다니면서, 회사 다니면서 원하는 시간대에 편하게 작업할 수 있어요.",
    descriptionMobile:
      "내가 가능한 프로젝트를 먼저 보여줘요.\n나의 라이프 스타일에 맞춰서 작업할 수 있어요!\n학교 다니면서, 회사 다니면서 원하는 시간대에\n편하게 작업할 수 있어요.",
  },
}

const button = {
  text: "프로젝트 지원하러 가기",
}

export function WorkerWorks() {
  return (
    <Styled.Section>
      <Styled.Icon src={icon} alt="icon-worker-works" />
      <Styled.SubTitle>{TEXT.mainContent.subtitle}</Styled.SubTitle>
      <Styled.Title>
        <HighlightText highlightRegex={TEXT.mainContent.highlightRegex}>
          {TEXT.mainContent.title}
        </HighlightText>
      </Styled.Title>
      <Styled.Description>{TEXT.mainContent.description}</Styled.Description>
      <Styled.DescriptionBold>
        {TEXT.mainContent.boldDescription}
      </Styled.DescriptionBold>
      <Styled.Content>
        <Styled.TextContainer>
          <Styled.Title>
            <HighlightText highlightRegex={TEXT.subContent.highlightRegex}>
              {TEXT.subContent.title}
            </HighlightText>
          </Styled.Title>
          <Styled.SubDescription>
            {TEXT.subContent.description}
          </Styled.SubDescription>
          <Styled.SubDescriptionMobile>
            {TEXT.subContent.descriptionMobile}
          </Styled.SubDescriptionMobile>
          <Styled.Button to="/recruitment">{button.text}</Styled.Button>
        </Styled.TextContainer>

        <Styled.BannerImage src={bannerImage} alt="banner-img-worker-works" />
        <Styled.BannerImageMobile
          src={bannerImageMobile}
          alt="banner-img-mobile-worker-works"
        />
      </Styled.Content>
    </Styled.Section>
  )
}
