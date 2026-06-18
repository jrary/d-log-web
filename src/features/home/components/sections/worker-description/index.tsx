import { HighlightText } from "@components/highlight-text"
import icon from "@features/home/components/sections/worker-description/assets/ic_macbook.png"
import bannerImage from "@features/home/components/sections/worker-description/assets/img_banner_third.png"
import * as Styled from "./styled"

const TEXT = {
  title: "G워커는\n이런 집단이에요.",
  highlight: /(G워커)/g,
  subtitle: "그릿지의 G워커란?",
  description:
    "G워커는 자신이 일하고 싶을 때,\n일하고 싶은 공간에서 자유롭게 일하는 긱워커를 뜻합니다.\n그릿지는 이런 G워커를 위한 플랫폼 환경을 제공하고 있습니다",
  descriptionMobile:
    "G워커는 자신이 일하고 싶을 때,\n일하고 싶은 공간에서 자유롭게 일하는\n긱워커를 뜻합니다.\n그릿지는 이런 G워커를 위한\n플랫폼 환경을 제공하고 있습니다",
}

export function WorkerDescription() {
  return (
    <Styled.Section>
      <Styled.Icon src={icon} alt="icon-worker-desc" />
      <Styled.SubTitle>{TEXT.subtitle}</Styled.SubTitle>
      <Styled.Title>
        <HighlightText highlightRegex={TEXT.highlight}>
          {TEXT.title}
        </HighlightText>
      </Styled.Title>
      <Styled.Description>{TEXT.description}</Styled.Description>
      <Styled.DescriptionMobile>
        {TEXT.descriptionMobile}
      </Styled.DescriptionMobile>
      <Styled.BannerImage src={bannerImage} alt="banner-img-worker-desc" />
    </Styled.Section>
  )
}
