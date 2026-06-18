import emptyImage from "@features/dashboard/projects/milestones/assets/empty.png"
import Add from "~icons/local/ic_add"
import * as Styled from "./empty.styled"

const TEXT = {
  title:
    "진행 중인 마일스톤이 없습니다.\n새로운 마일스톤을 생성해 프로젝트를 시작해보세요.",
}

export function Empty() {
  return (
    <Styled.Container>
      <Styled.Content>
        <Styled.Image src={emptyImage} alt="마일스톤이 없습니다." />
        <Styled.Title>{TEXT.title}</Styled.Title>
      </Styled.Content>

      <Styled.Create to="create">
        새 마일스톤 생성하기
        <Add />
      </Styled.Create>
    </Styled.Container>
  )
}
