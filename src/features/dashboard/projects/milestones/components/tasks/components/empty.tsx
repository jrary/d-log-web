import emptyImage from "@features/dashboard/projects/milestones/assets/empty.png"
import Add from "~icons/local/ic_add"
import * as Styled from "./empty.styled"

const TEXT = {
  title:
    "등록된 태스크가 없습니다.\n새로운 태스크를 생성해 마일스톤을 진행해 주세요.",
}

export function Empty() {
  return (
    <Styled.Container>
      <Styled.Content>
        <Styled.Image src={emptyImage} alt="태스크가 없습니다." />
        <Styled.Title>{TEXT.title}</Styled.Title>
      </Styled.Content>

      <Styled.Create to="create">
        태스크 생성하기
        <Add />
      </Styled.Create>
    </Styled.Container>
  )
}
