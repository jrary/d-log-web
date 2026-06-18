import { HighlightText } from "@components/highlight-text"
import * as Styled from "./styled"

const TEXT = {
  title: "그릿지가 지원하는\n다양한 프로그램을 만나보세요.",
  description:
    "그릿지는 G워커들의 긱워킹뿐만 아니라 개개인의 성장도 돕고 있어요.\nG워커분들의 취향에 맞는 프로그램에 지원해보세요!",
}

export function Hero() {
  return (
    <Styled.Container>
      <Styled.Title>
        <HighlightText highlightRegex={/(다양한 프로그램)/i}>
          {TEXT.title}
        </HighlightText>
      </Styled.Title>
      <Styled.Description>{TEXT.description}</Styled.Description>
    </Styled.Container>
  )
}
