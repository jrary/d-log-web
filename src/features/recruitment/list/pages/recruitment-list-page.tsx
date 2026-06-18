import { Box } from "@components/shared-components/box"
import { Header } from "@features/recruitment/list/components/header"
import { RelatedList } from "@features/recruitment/list/components/related-list"
import { SuggestedList } from "@features/recruitment/list/components/suggested-list"
import { useAuthStateQueryObject } from "@queries/useAuthStateQueryObject"
import { useSuspenseQuery } from "@tanstack/react-query"

export default function RecruitmentListPage() {
  const { data: isLogin } = useSuspenseQuery(useAuthStateQueryObject())

  return (
    <>
      <Header />
      <Box backgroundColor="DEFAULT">
        {isLogin && <RelatedList />}
        <SuggestedList />
      </Box>
    </>
  )
}
