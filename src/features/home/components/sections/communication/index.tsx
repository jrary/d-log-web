import { HighlightText } from "@components/highlight-text"
import icon from "@features/home/components/sections/communication/assets/ic_bubble.png"
import bannerImageMobile from "@features/home/components/sections/communication/assets/ic_worker_m_communication.png"
import bannerImage from "@features/home/components/sections/communication/assets/img_banner_sixth.png"
import * as Styled from "./styled"

const TEXT = {
  title: "작업에 몰입할 수 있도록,\n커뮤니케이션은 그릿지가 도와드릴게요.",
  highlightRegex: /(작업에 몰입|그릿지가)/g,
  subtitle: "그릿지의 커뮤니케이션 매니징",
  description:
    "G워커분들이 작업에 집중할 수 있도록,\n클라이언트와의 커뮤니케이션은 그릿지의 컴시트로 이루어집니다.",
}

export function Communication() {
  return (
    <Styled.Section>
      <Styled.Icon src={icon} alt="icon-communication" />
      <Styled.SubTitle>{TEXT.subtitle}</Styled.SubTitle>
      <Styled.Title>
        <HighlightText highlightRegex={TEXT.highlightRegex}>
          {TEXT.title}
        </HighlightText>
      </Styled.Title>
      <Styled.Description>{TEXT.description}</Styled.Description>
      <Styled.BannerImage src={bannerImage} alt="banner-img-communication" />
      <Styled.BannerImageMobile
        src={bannerImageMobile}
        alt="banner-img-mobile-communication"
      />
    </Styled.Section>
  )
}
