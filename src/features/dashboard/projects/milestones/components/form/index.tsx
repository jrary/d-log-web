import { InformationFields } from "@features/dashboard/projects/milestones/components/form/fields/information"
import * as Styled from "./styled"

export function MilestoneFields() {
  return (
    <Styled.Fields>
      <InformationFields />
      <Styled.Line />
    </Styled.Fields>
  )
}
