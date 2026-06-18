import { Text } from "@components/shared-components/text"
import { COLOR } from "@components/shared-components/tokens/color"
import { useEffect, useRef } from "react"
import styled from "styled-components"

type ActionModalProps = {
  isOpen: boolean
  onClose: () => void
  onEdit: () => void
  onDelete: () => void
}

export default function ActionModal({
  isOpen,
  onClose,
  onEdit,
  onDelete,
}: ActionModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleEdit = () => {
    onEdit()
    onClose()
  }

  const handleDelete = () => {
    onDelete()
    onClose()
  }

  return (
    <ModalWrapper ref={modalRef}>
      <ActionButton onClick={handleEdit}>
        <Text typo="caption" weight="medium">
          수정
        </Text>
      </ActionButton>
      <ActionButton onClick={handleDelete}>
        <Text typo="caption" weight="medium" color={COLOR.RED_500}>
          삭제
        </Text>
      </ActionButton>
    </ModalWrapper>
  )
}

const ModalWrapper = styled.div`
  position: absolute;
  top: calc(100% + 1px);
  right: 0;

  display: flex;
  flex-direction: column;

  min-width: 80px;
  background-color: ${COLOR.NEUTRAL_100};
  border: 1px solid ${COLOR.NEUTRAL_300};
  border-radius: 4px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
`

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  padding: 8px 12px;

  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${COLOR.NEUTRAL_200};
  }

  &:first-child {
    border-bottom: 1px solid ${COLOR.NEUTRAL_300};
  }
`
