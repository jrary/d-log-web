import { Liked } from "@components/liked"
import { Date } from "@features/recruitment/components/date"
import { Apply } from "@features/recruitment/list/components/project-item/sections/apply"
import { Badges } from "@features/recruitment/list/components/project-item/sections/badges"
import * as Styled from "./styled"
import type { ProjectWorkerRecruitmentListDto } from "@apis/model"

type ProjectItemProps = {
  item: ProjectWorkerRecruitmentListDto
}

export function ProjectItem({ item }: ProjectItemProps) {
  return (
    <Styled.Container>
      <Styled.BadgesAndLiked>
        <Badges
          status={item.recruitmentStatus}
          job={item.role.jobCategoryName}
        />
        <Liked id={item.id} liked={item.isLiked} count={item.likeCnt} />
      </Styled.BadgesAndLiked>

      <Styled.Information>
        <Styled.TitleAndDate>
          <Styled.Title>{item.title}</Styled.Title>
          <Date
            startDate={item.contractStartDate}
            endDate={item.contractEndDate}
          />
        </Styled.TitleAndDate>
        <Styled.GridRole
          status={item.recruitmentStatus}
          role={item.role.roleName}
        />
        <Styled.GridDetail
          status={item.recruitmentStatus}
          wage={item.expectedWage}
          count={item.leftApplyCnt}
        />
      </Styled.Information>

      <Apply
        recruitmentId={item.id}
        status={item.recruitmentStatus}
        count={item.applyCnt}
        firstApplicant={item.firstApplicant}
      />
    </Styled.Container>
  )
}
