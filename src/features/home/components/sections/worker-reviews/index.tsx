import heroBackground from "@features/home/assets/hero-background.png"
import icon from "@features/home/components/sections/worker-reviews/assets/ic_money.png"
import reviewImage01 from "@features/home/components/sections/worker-reviews/assets/img_review_profile_01.png"
import reviewImage02 from "@features/home/components/sections/worker-reviews/assets/img_review_profile_02.png"
import reviewImage03 from "@features/home/components/sections/worker-reviews/assets/img_review_profile_03.png"
import { ReviewItem } from "@features/home/components/sections/worker-reviews/review-item"
import * as Styled from "./styled"

const TEXT = {
  title: "G워커들은 그릿지에서\n이렇게 벌고 있어요.",
  subtitle: "G워커들의 후기",
  description:
    "무려 1600명이 넘는 G-Worker가 그릿지 내에 있어요!\n자유롭게 일하는 G워커들의 이야기를 확인해 보세요.",
}

const review = [
  {
    id: "review-01",
    name: "윤대현",
    position: "Server developer",
    profileImg: reviewImage01,
    title:
      "그릿지가 커뮤니케이션을 담당해줘서,\n프로젝트에만 집중할 수 있었습니다.",
    highlightRegex: /(커뮤니케이션을 담당)/g,
    description:
      "처음에는 외주라는 것에 부담감을 조금 느꼈었는데, 그릿지는 외주 처음부터 끝까지 이뤄지는 커뮤니케이션을 담당해 주고, 모든 과정이 당사자들에게 투명하게 공유되어서 무척 맘에 들었습니다.",
  },
  {
    id: "review-02",
    name: "김보인",
    position: "Front-end developer",
    profileImg: reviewImage02,
    title: "그릿지를 시작하면서,\n가평에서 놀면서 일했어요!",
    highlightRegex: /(놀면서 일)/g,
    description:
      "평소에 개발할 때는 대부분 집에서 일했었는데, 그릿지를 시작하면서 원하는 시간에, 원하는 장소에서 일할 수 있다는 게 좋았어요. 작업도 하면서 원하는 만큼 여행을 할 수 있었습니다.",
  },
  {
    id: "review-03",
    name: "박지원",
    position: "Server developer",
    profileImg: reviewImage03,
    title:
      "그릿지가 커뮤니케이션을 담당해줘서,\n프로젝트에만 집중할 수 있었습니다.",
    highlightRegex: /(커뮤니케이션을 담당)/g,
    description:
      "그릿지는 프로젝트를 관리해 주는 PM이 따로 있기 때문에 협업하면서 생기는 어려운 점이나, 궁금한 점을 해결할 수 있어서 좋았습니다. 특히 나 혼자가 아닌 여러 파트의 전문가분들과 함께 협업할 수 있어서 성장하게 되는 계기였습니다!",
  },
]

export function WorkerReviews() {
  return (
    <Styled.Section>
      <Styled.Background src={heroBackground} />
      <Styled.Content>
        <Styled.Icon src={icon} alt="icon-worker-desc" />
        <Styled.SubTitle>{TEXT.subtitle}</Styled.SubTitle>
        <Styled.Title>{TEXT.title}</Styled.Title>
        <Styled.Description>{TEXT.description}</Styled.Description>
        <Styled.Review>
          {review.map((item, idx) => (
            <ReviewItem
              key={idx}
              id={item.id}
              name={item.name}
              profileImg={item.profileImg}
              position={item.position}
              title={item.title}
              highlightRegex={item.highlightRegex}
              description={item.description}
            />
          ))}
        </Styled.Review>
      </Styled.Content>
    </Styled.Section>
  )
}
