import rocketImage from "@features/dashboard/projects/milestones/assets/icons/rocket-iso-color.png"
import * as Styled from "./create-milestone.styled"

export function CreateMilestone() {
  return (
    <Styled.Container>
      <Styled.Image src={rocketImage} alt="" />
      <Styled.Title>[마일스톤] 생성 중...</Styled.Title>
    </Styled.Container>
  )
}
