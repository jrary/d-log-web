import { Text } from "@components/shared-components/text"
import { COLOR, TEXT } from "@components/shared-components/tokens/color"
import Edit from "~icons/local/ic_edit2"
import More from "~icons/local/ic_more3"
import Trash from "~icons/local/ic_trash"
import * as Styled from "./index.styled"

type MenuProps = {
  editName: string
  onEdit: () => void
  onRemove: () => void
}
// 태스크 관리 메뉴 Styled (수정, 삭제)
export default function WbsStyledMenu({
  editName,
  onEdit,
  onRemove,
}: MenuProps) {
  return (
    <Styled.Root>
      <Styled.Trigger onClick={(e) => e.stopPropagation()}>
        <Styled.TriggerButton>
          <More width={12} height={12} color={COLOR.NEUTRAL_600} />
        </Styled.TriggerButton>
      </Styled.Trigger>
      <Styled.Portal>
        <Styled.Content
          side="bottom"
          sideOffset={0}
          align="end"
          onClick={(e) => e.stopPropagation()}>
          <Styled.MenuActionButton onClick={() => onEdit()}>
            <Edit width={20} height={20} color={TEXT.SECONDARY} />
            <Text typo="body3" color="SECONDARY">
              {editName}
            </Text>
          </Styled.MenuActionButton>
          <Styled.MenuActionButton onClick={() => onRemove()}>
            <Trash width={20} height={20} color={TEXT.DANGER} />
            <Text typo="body3" color="DANGER">
              삭제
            </Text>
          </Styled.MenuActionButton>
        </Styled.Content>
      </Styled.Portal>
    </Styled.Root>
  )
}
