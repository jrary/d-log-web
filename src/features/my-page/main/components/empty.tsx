import * as Styled from "./empty.styled"

const TEXT = {
  icon: "🥺",
  title: `아직 진행중인 프로젝트가 없어요!\n오늘도 수만개의 프로젝트들이 G워커 분들을 기다리고 있습니다.`,
  description: "다양한 프로젝트들을 지금 바로 둘러보세요!",
  button: "프로젝트 둘러보기",
}

export function Empty() {
  return (
    <Styled.Container>
      <Styled.Content>
        <Styled.Icon>{TEXT.icon}</Styled.Icon>
        <Styled.Title>{TEXT.title}</Styled.Title>
        <Styled.Description>{TEXT.description}</Styled.Description>
      </Styled.Content>
      <Styled.Button to="/recruitment">{TEXT.button}</Styled.Button>
    </Styled.Container>
  )
}
