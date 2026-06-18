export type CategoryKey = "study" | "exercise" | "work" | "personal" | "rest"

export type MoodScore = 1 | 2 | 3 | 4 | 5

export interface Todo {
  id: string
  title: string
  category: CategoryKey
  done: boolean
  /** YYYY-MM-DD */
  date: string
  order: number
}

export interface TimeBlock {
  id: string
  title: string
  category: CategoryKey
  /** YYYY-MM-DD */
  date: string
  /** minutes from 00:00, multiple of 10 */
  start: number
  /** minutes from 00:00, multiple of 10 (exclusive end) */
  end: number
  todoId?: string
}

export interface Habit {
  id: string
  name: string
  emoji: string
  color: CategoryKey
  createdAt: string
  /** set of YYYY-MM-DD on which the habit was completed */
  history: string[]
}

export interface MoodEntry {
  /** YYYY-MM-DD */
  date: string
  score: MoodScore
  note?: string
}

export interface GratitudeEntry {
  /** YYYY-MM-DD */
  date: string
  items: [string, string, string]
}
