import { Badge } from "@components/badge.styled"
import { Box } from "@components/shared-components/box"
import { HStack, VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { COLOR } from "@components/shared-components/tokens/color"
import { Date } from "@features/recruitment/components/date"
import { useGetRecruitmentDetailQueryObject } from "@features/recruitment/detail/queries/useGetRecruitmentDetailQueryObject"
import { useUpdateLikeProjectMutation } from "@features/recruitment/list/queries/useUpdateLikeProjectMutation"
import { recruitmentQueryKey } from "@features/recruitment/queries/recruitmentQueryKey"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { toNumber } from "es-toolkit/compat"
import { useParams } from "react-router"
import Heart from "~icons/local/ic_heart"
import * as Styled from "./header.styled"

const TEXT = {
  pinned: "관심 프로젝트",
  wage: {
    label: "예상수입",
    format: (wage = 0) => `${wage.toLocaleString()}원`,
  },
  leftCount: {
    label: "모집마감",
    format: (count = 0) => `${count}명 남음`,
  },
}

export function DetailHeader() {
  const { recruitmentId = "0" } = useParams()
  const { data: information } = useQuery(
    useGetRecruitmentDetailQueryObject(toNumber(recruitmentId)),
  )

  const queryClient = useQueryClient()
  const { mutate: updateRecruitmentStatus } = useUpdateLikeProjectMutation(
    toNumber(recruitmentId),
  )

  return (
    <Box backgroundColor="WHITE">
      <Styled.Container>
        <Styled.Left>
          <Styled.Information>
            <HStack spacing="0.5rem">
              <Badge colorVariant="disabled">
                {information?.role.jobCategoryName}
              </Badge>
              <Badge colorVariant="disabled">
                {information?.role.roleName}
              </Badge>
            </HStack>

            <VStack spacing="0.25rem">
              <Styled.Title>{information?.title}</Styled.Title>
              <Date
                startDate={information?.contractStartDate}
                endDate={information?.contractEndDate}
              />
            </VStack>
          </Styled.Information>

          <Styled.Role
            status={information?.recruitmentStatus}
            role={information?.role.roleName}
          />
        </Styled.Left>

        <Styled.Right>
          <Styled.Pinned
            data-liked={information?.isLiked}
            onClick={() => {
              updateRecruitmentStatus()
              queryClient.invalidateQueries({
                queryKey: recruitmentQueryKey.detail(toNumber(recruitmentId)),
              })
            }}>
            <Heart />
            <Text color="inherit">{TEXT.pinned}</Text>
          </Styled.Pinned>

          <Styled.Summary>
            <HStack as="dl" spacing="1.5rem" align="center" justify="between">
              <Text as="dt">{TEXT.wage.label}</Text>
              <Text as="dd">{TEXT.wage.format(information?.expectedWage)}</Text>
            </HStack>

            <HStack as="dl" spacing="1.5rem" align="center" justify="between">
              <Text as="dt">{TEXT.leftCount.label}</Text>
              <Text as="dd" color={COLOR.GREEN_400}>
                {TEXT.leftCount.format(information?.leftApplyCnt)}
              </Text>
            </HStack>
          </Styled.Summary>
        </Styled.Right>
      </Styled.Container>
    </Box>
  )
}
