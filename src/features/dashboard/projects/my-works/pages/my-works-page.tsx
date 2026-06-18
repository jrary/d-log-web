import { VStack } from "@components/shared-components/stack"
import { Header } from "@features/dashboard/projects/my-works/containers/header"
import { MilestoneNavigate } from "@features/dashboard/projects/my-works/containers/milestone-navigate"
import { Summary } from "@features/dashboard/projects/my-works/containers/summary"
import { Works } from "@features/dashboard/projects/my-works/containers/works"

// 내 작업 기록 페이지
export default function MyWorksPage() {
  return (
    <VStack spacing="1.87rem">
      <Header />
      <VStack spacing="1.25rem">
        <MilestoneNavigate />
        <Summary />
        <Works />
      </VStack>
    </VStack>
  )
}
