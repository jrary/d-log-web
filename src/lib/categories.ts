import type { CategoryKey, MoodScore } from "./types"

export interface CategoryMeta {
  key: CategoryKey
  label: string
  color: string
}

export const CATEGORIES: Record<CategoryKey, CategoryMeta> = {
  study: { key: "study", label: "공부", color: "var(--category-study)" },
  exercise: { key: "exercise", label: "운동", color: "var(--category-exercise)" },
  work: { key: "work", label: "업무", color: "var(--category-work)" },
  personal: { key: "personal", label: "개인", color: "var(--category-personal)" },
  rest: { key: "rest", label: "휴식", color: "var(--category-rest)" },
}

export const CATEGORY_LIST = Object.values(CATEGORIES)

export interface MoodMeta {
  score: MoodScore
  emoji: string
  label: string
  color: string
}

export const MOODS: Record<MoodScore, MoodMeta> = {
  1: { score: 1, emoji: "😢", label: "최악", color: "var(--mood-1)" },
  2: { score: 2, emoji: "😕", label: "별로야", color: "var(--mood-2)" },
  3: { score: 3, emoji: "😐", label: "평범해", color: "var(--mood-3)" },
  4: { score: 4, emoji: "🙂", label: "좋아요", color: "var(--mood-4)" },
  5: { score: 5, emoji: "😄", label: "최고야", color: "var(--mood-5)" },
}

export const MOOD_LIST = Object.values(MOODS)
