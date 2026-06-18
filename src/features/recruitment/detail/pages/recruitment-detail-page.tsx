import { Box } from "@components/shared-components/box"
import { Content } from "@features/recruitment/detail/components/content"
import { DetailHeader } from "@features/recruitment/detail/components/header"

export default function RecruitmentDetailPage() {
  return (
    <Box backgroundColor="DEFAULT" minHeight="100vh">
      <DetailHeader />
      <Content />
    </Box>
  )
}
