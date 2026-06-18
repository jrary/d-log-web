import { create } from "zustand"
import { persist } from "zustand/middleware"
import { dateKey } from "./utils"
import type {
  CategoryKey,
  GratitudeEntry,
  Habit,
  MoodEntry,
  MoodScore,
  TimeBlock,
  Todo,
} from "./types"

function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4)
}

function addDays(base: Date, days: number) {
  const d = new Date(base)
  d.setDate(d.getDate() + days)
  return d
}

interface PlannerState {
  todos: Todo[]
  blocks: TimeBlock[]
  habits: Habit[]
  moods: MoodEntry[]
  gratitude: GratitudeEntry[]

  // todos
  addTodo: (input: { title: string; category: CategoryKey; date: string }) => void
  toggleTodo: (id: string) => void
  updateTodo: (id: string, patch: Partial<Todo>) => void
  removeTodo: (id: string) => void
  reorderTodos: (date: string, orderedIds: string[]) => void

  // time blocks
  addBlock: (input: Omit<TimeBlock, "id">) => void
  updateBlock: (id: string, patch: Partial<TimeBlock>) => void
  removeBlock: (id: string) => void

  // habits
  addHabit: (input: { name: string; emoji: string; color: CategoryKey }) => void
  updateHabit: (id: string, patch: Partial<Habit>) => void
  removeHabit: (id: string) => void
  toggleHabit: (id: string, date: string) => void

  // mood
  setMood: (date: string, score: MoodScore, note?: string) => void

  // gratitude
  setGratitude: (date: string, items: [string, string, string]) => void
}

function buildSeed() {
  const today = new Date()
  const t = dateKey(today)
  const yesterday = dateKey(addDays(today, -1))

  const todos: Todo[] = [
    { id: uid(), title: "알고리즘 문제 3개 풀기", category: "study", done: false, date: t, order: 0 },
    { id: uid(), title: "운동 30분", category: "exercise", done: true, date: t, order: 1 },
    { id: uid(), title: "프로젝트 회의", category: "work", done: false, date: t, order: 2 },
    { id: uid(), title: "책 30페이지 읽기", category: "personal", done: false, date: t, order: 3 },
  ]

  const blocks: TimeBlock[] = [
    { id: uid(), title: "알고리즘 문제 풀기", category: "study", date: t, start: 9 * 60, end: 9 * 60 + 30 },
    { id: uid(), title: "프로젝트 회의", category: "work", date: t, start: 11 * 60, end: 12 * 60 },
    { id: uid(), title: "점심 식사", category: "rest", date: t, start: 12 * 60, end: 13 * 60 },
    { id: uid(), title: "운동", category: "exercise", date: t, start: 18 * 60, end: 18 * 60 + 30 },
  ]

  // habits with a few days of streak history
  const exerciseHistory = [0, 1, 2, 3].map((d) => dateKey(addDays(today, -d)))
  const readHistory = [0, 1, 2, 3, 4].map((d) => dateKey(addDays(today, -d)))
  const habits: Habit[] = [
    {
      id: uid(),
      name: "운동하기",
      emoji: "🏃",
      color: "exercise",
      createdAt: dateKey(addDays(today, -30)),
      history: exerciseHistory,
    },
    {
      id: uid(),
      name: "책 읽기",
      emoji: "📚",
      color: "study",
      createdAt: dateKey(addDays(today, -30)),
      history: readHistory,
    },
    {
      id: uid(),
      name: "물 2L 마시기",
      emoji: "💧",
      color: "personal",
      createdAt: dateKey(addDays(today, -30)),
      history: [1, 2, 4].map((d) => dateKey(addDays(today, -d))),
    },
  ]

  const moods: MoodEntry[] = [
    { date: yesterday, score: 4, note: "괜찮은 하루였다" },
    { date: dateKey(addDays(today, -2)), score: 3 },
    { date: dateKey(addDays(today, -3)), score: 5, note: "최고의 하루!" },
    { date: dateKey(addDays(today, -4)), score: 4 },
  ]

  const gratitude: GratitudeEntry[] = [
    {
      date: yesterday,
      items: ["오늘 날씨가 좋아서 산책했다", "맛있는 점심을 먹었다", "친구에게 좋은 소식을 들었다"],
    },
  ]

  return { todos, blocks, habits, moods, gratitude }
}

export const usePlannerStore = create<PlannerState>()(
  persist(
    (set) => ({
      ...buildSeed(),

      addTodo: ({ title, category, date }) =>
        set((s) => ({
          todos: [
            ...s.todos,
            {
              id: uid(),
              title,
              category,
              done: false,
              date,
              order: s.todos.filter((td) => td.date === date).length,
            },
          ],
        })),
      toggleTodo: (id) =>
        set((s) => ({
          todos: s.todos.map((td) => (td.id === id ? { ...td, done: !td.done } : td)),
        })),
      updateTodo: (id, patch) =>
        set((s) => ({
          todos: s.todos.map((td) => (td.id === id ? { ...td, ...patch } : td)),
        })),
      removeTodo: (id) => set((s) => ({ todos: s.todos.filter((td) => td.id !== id) })),
      reorderTodos: (date, orderedIds) =>
        set((s) => ({
          todos: s.todos.map((td) =>
            td.date === date && orderedIds.includes(td.id)
              ? { ...td, order: orderedIds.indexOf(td.id) }
              : td,
          ),
        })),

      addBlock: (input) => set((s) => ({ blocks: [...s.blocks, { ...input, id: uid() }] })),
      updateBlock: (id, patch) =>
        set((s) => ({
          blocks: s.blocks.map((b) => (b.id === id ? { ...b, ...patch } : b)),
        })),
      removeBlock: (id) => set((s) => ({ blocks: s.blocks.filter((b) => b.id !== id) })),

      addHabit: ({ name, emoji, color }) =>
        set((s) => ({
          habits: [
            ...s.habits,
            { id: uid(), name, emoji, color, createdAt: dateKey(new Date()), history: [] },
          ],
        })),
      updateHabit: (id, patch) =>
        set((s) => ({
          habits: s.habits.map((h) => (h.id === id ? { ...h, ...patch } : h)),
        })),
      removeHabit: (id) => set((s) => ({ habits: s.habits.filter((h) => h.id !== id) })),
      toggleHabit: (id, date) =>
        set((s) => ({
          habits: s.habits.map((h) => {
            if (h.id !== id) return h
            const has = h.history.includes(date)
            return {
              ...h,
              history: has ? h.history.filter((d) => d !== date) : [...h.history, date],
            }
          }),
        })),

      setMood: (date, score, note) =>
        set((s) => {
          const exists = s.moods.some((m) => m.date === date)
          return {
            moods: exists
              ? s.moods.map((m) => (m.date === date ? { date, score, note } : m))
              : [...s.moods, { date, score, note }],
          }
        }),

      setGratitude: (date, items) =>
        set((s) => {
          const exists = s.gratitude.some((g) => g.date === date)
          return {
            gratitude: exists
              ? s.gratitude.map((g) => (g.date === date ? { date, items } : g))
              : [...s.gratitude, { date, items }],
          }
        }),
    }),
    {
      name: "d-log-store",
      version: 1,
    },
  ),
)
