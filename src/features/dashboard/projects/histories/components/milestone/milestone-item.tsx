import * as Styled from "./milestone-item.styled"

type MilestoneItemProps = {
  objective: string
  isSelected: boolean
  onClick: () => void
}

export default function MilestoneItem({
  objective,
  isSelected,
  onClick,
}: MilestoneItemProps) {
  return (
    <Styled.Container onClick={onClick} isSelected={isSelected}>
      <Styled.Milestone isSelected={isSelected}>{objective}</Styled.Milestone>
    </Styled.Container>
  )
}
