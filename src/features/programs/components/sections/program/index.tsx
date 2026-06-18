import { ProgramItem } from "@features/programs/components/sections/program/program-item"
import CmcLogo from "~icons/local/logo_cmc.svg"
import RcLogo from "~icons/local/logo_rc.svg"
import UmcLogo from "~icons/local/logo_umc.svg"
import * as Styled from "./styled"

export type Program = (typeof PROGRAMS)[number]
const PROGRAMS = [
  {
    id: "umc",
    content: {
      title: {
        text: "대학교 내 동아리 스터디를 통해\n직무 역량을 키우고 싶은\nG워커를 위한 동아리 프로그램",
        highlight: /(직무 역량)/g,
      },
      description:
        "전국 대학생 연합동아리 UMC는 IT 대학생들의 역량을 하나로 모아\nMobile App 또는 Web 런칭에 도전합니다.",
      tags: ["기획자", "디자이너", "개발자"],
    },
    card: {
      logo: <UmcLogo />,
      color: {
        background: "#74FA7F",
        text: "#000000",
      },
      title: "유니버시티 메이커스 (UMC)",
      description:
        "앱, 웹, 런칭까지 단 2달 만에!\n개발자부터 디자이너까지 전국의 모든 UMC 부원들이 학기 중 역량을 쌓고 방학동안 팀을 이뤄 Mobile App 또는 Web 런칭에 도전합니다. 이후 서비스를 이어나가 창업 또는 외주 프로젝트에 도전할 수 있습니다.",
      link: "https://bit.ly/41eF1Q9",
    },
  },
  {
    id: "cmc",
    content: {
      title: {
        text: "사이드 프로젝트를 통해 성장하고 싶은\nG워커를 위한 앱 런칭 프로그램",
        highlight: /(사이드 프로젝트)/g,
      },
      description:
        "전국 유일무이 실력자들만 모인\n외주 연계 사이드 프로젝트 런칭 모임 CMC",
      tags: ["기획자", "디자이너", "개발자"],
    },
    card: {
      logo: <CmcLogo />,
      color: {
        background: "#5A25F2",
        text: "#FFFFFF",
      },
      title: "센트럴 메이커스 (CMC)",
      description:
        "저희는 무임승차가 없습니다. 3개월 동안 자신의 아이디어를 담아 책임감을 가지고 앱 런칭에 도전합니다. 수료 이후 자신의 업무를 진행하며 언제든지 사이드 프로젝트(외주, 창업 등)를 개발하는 이상적인 프리랜서의 삶을 살 수 있습니다.",
      link: "https://bit.ly/3Vl3yiL",
    },
  },
  {
    id: "rc",
    content: {
      title: {
        text: "개발 역량을 더 키우고 싶은\nG워커를 위한 교육 프로그램",
        highlight: /(개발 역량)/g,
      },
      description:
        "8주 동안 실무하는 개발자로 성장,\n실제 기업의 프로젝트까지 도맡아 하는 ‘진짜’ 부트캠프 입니다.",
      tags: ["개발자"],
    },
    card: {
      logo: <RcLogo />,
      color: {
        background: "#EA5829",
        text: "#D1F04D",
      },
      title: "라이징 캠프",
      description:
        "Web, iOS, Android, Server 4개의 플랫폼을 타이트하게 훈련합니다. 8주라는 짧은 시간 동안 어떤 환경이든 극복가능한 개발자가 됩니다.\n수료 후, ‘진짜' 기업 프로젝트(외주)를 진행하여 압도적인 포트폴리오를 통해 취업하실 수 있습니다.",
      link: "https://bit.ly/49jfbwk",
    },
  },
]

export function Program() {
  return (
    <Styled.Container>
      {PROGRAMS.map((program) => (
        <ProgramItem key={program.id} program={program} />
      ))}
    </Styled.Container>
  )
}
