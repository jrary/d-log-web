import { VStack } from "@components/shared-components/stack"
import heroBackground from "@features/home/assets/hero-background.png"
import defaultProfile from "@features/home/assets/profile_default.svg"
import { Dashboard } from "@features/home/components/sections/hero-login/dashboard"
import { useGetUserInProgressProjectCntQueryObject } from "@features/home/queries/useGetUserInProgressProjectCntQueryObject"
import { useGetUserInfoQueryObject } from "@features/user-info/queries/useGetUserInfoQueryObject"
import { useQueries } from "@tanstack/react-query"
import ProgramIcon from "~icons/local/ic_program.svg"
import ProjectIcon from "~icons/local/ic_project.svg"
import * as Styled from "./styled"
import type { UserInfoDto } from "@apis/model"

export const TEXT = {
  welcomeMessage: (user?: UserInfoDto) =>
    `${user?.nickname} 워커님!\n그릿지에 오신걸 환영해요.`,
  dashboard: "Dashboard",
  goToMyPage: "마이페이지로 이동",
  workingProjects: {
    title: "진행중인 프로젝트",
    emptyMessage:
      "아직 진행중인 프로젝트가 없으시군요.\n그릿지가 추천하는 맞춤 IT 프로젝트를 만나보세요!",
    detail: "프로젝트 보러가기",
  },
  workingPrograms: {
    title: "진행중인 프로그램",
    emptyMessage:
      "아직 진행중인 프로그램이 없어요.\n프로그램이 시작되면 만나요!",
    detail: "프로그램 보러가기",
  },
}

export function HeroLogin() {
  const [{ data: user }, { data: inProgressProjectCnt = 1 }] = useQueries({
    queries: [
      useGetUserInfoQueryObject(),
      useGetUserInProgressProjectCntQueryObject(),
    ],
  })

  return (
    <Styled.Section id="hero-login">
      <Styled.Background src={heroBackground} />

      <Styled.Content>
        <Styled.Welcome>
          <VStack spacing="0.5rem" width="fit-content">
            <Styled.ProfilePicture
              src={user?.profileImgUrl || defaultProfile}
              onError={(e) => (e.currentTarget.src = defaultProfile)}
            />
            <Styled.WelcomeMessage>
              {TEXT.welcomeMessage(user)}
            </Styled.WelcomeMessage>
          </VStack>
          <Styled.MyPageLink to="/my-page">{TEXT.goToMyPage}</Styled.MyPageLink>
        </Styled.Welcome>

        <Styled.Dashboard>
          <Styled.DashboardTitle>{TEXT.dashboard}</Styled.DashboardTitle>
          <Styled.DashboardContainer>
            <Dashboard
              id="dashboard-working-projects"
              icon={<ProjectIcon />}
              title={TEXT.workingProjects.title}
              count={inProgressProjectCnt}
              emptyMessage={TEXT.workingProjects.emptyMessage}
              detailHref="/dashboard"
              detailText={TEXT.workingProjects.detail}
            />

            <Dashboard
              id="dashboard-working-programs"
              icon={<ProgramIcon />}
              title={TEXT.workingPrograms.title}
              count={0}
              emptyMessage={TEXT.workingPrograms.emptyMessage}
              detailHref="/programs"
              detailText={TEXT.workingPrograms.detail}
            />
          </Styled.DashboardContainer>
        </Styled.Dashboard>
      </Styled.Content>
    </Styled.Section>
  )
}
