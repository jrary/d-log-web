"use client"

import Link from "next/link"
import { ArrowRight, Flame } from "lucide-react"
import { CATEGORIES, MOODS } from "@/lib/categories"
import type { MoodScore } from "@/lib/types"
import { usePlannerStore } from "@/lib/store"
import { currentStreak, minutesToLabel } from "@/lib/date"
import { dateKey } from "@/lib/utils"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { CircularProgress } from "@/components/circular-progress"
import { MoodSelector } from "@/components/mood-selector"
import { CategoryTag } from "@/components/category-tag"

function En({ children }: { children: React.ReactNode }) {
  return (
    <span className="ml-1.5 font-serif text-base font-normal italic text-muted-foreground">
      {children}
    </span>
  )
}

function CardLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
    >
      더보기 <ArrowRight className="h-3 w-3" />
    </Link>
  )
}

export function MoodWidget({ dateKey: key }: { dateKey: string }) {
  const moods = usePlannerStore((s) => s.moods)
  const setMood = usePlannerStore((s) => s.setMood)
  const entry = moods.find((m) => m.date === key)
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>
          오늘의 무드<En>Mood</En>
        </CardTitle>
        <CardLink href="/mood" />
      </CardHeader>
      <CardContent>
        <MoodSelector
          value={entry?.score}
          onChange={(score: MoodScore) => setMood(key, score, entry?.note)}
        />
      </CardContent>
    </Card>
  )
}

export function TodoWidget({ dateKey: key }: { dateKey: string }) {
  const todos = usePlannerStore((s) => s.todos)
  const toggleTodo = usePlannerStore((s) => s.toggleTodo)
  const dayTodos = todos.filter((t) => t.date === key).sort((a, b) => a.order - b.order)
  const done = dayTodos.filter((t) => t.done).length

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>
          오늘의 할 일<En>Tasks</En>{" "}
          <span className="text-sm font-normal text-muted-foreground">
            {done}/{dayTodos.length}
          </span>
        </CardTitle>
        <CardLink href="/todos" />
      </CardHeader>
      <CardContent className="space-y-1">
        {dayTodos.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">할 일이 없습니다.</p>
        ) : (
          dayTodos.slice(0, 5).map((todo) => (
            <div key={todo.id} className="flex items-center gap-3 py-1">
              <Checkbox checked={todo.done} onCheckedChange={() => toggleTodo(todo.id)} />
              <span className={cn("flex-1 text-sm", todo.done && "text-muted-foreground line-through")}>
                {todo.title}
              </span>
              <CategoryTag category={todo.category} />
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}

export function HabitWidget({ dateKey: key }: { dateKey: string }) {
  const habits = usePlannerStore((s) => s.habits)
  const toggleHabit = usePlannerStore((s) => s.toggleHabit)

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>
          습관 체크리스트<En>Habits</En>
        </CardTitle>
        <CardLink href="/habits" />
      </CardHeader>
      <CardContent className="space-y-1">
        {habits.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">습관이 없습니다.</p>
        ) : (
          habits.slice(0, 5).map((habit) => {
            const done = habit.history.includes(key)
            const streak = currentStreak(habit.history)
            return (
              <div key={habit.id} className="flex items-center gap-3 py-1">
                <Checkbox checked={done} onCheckedChange={() => toggleHabit(habit.id, key)} />
                <span className="text-base">{habit.emoji}</span>
                <span className={cn("flex-1 text-sm", done && "text-muted-foreground")}>
                  {habit.name}
                </span>
                {streak > 0 ? (
                  <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-orange-500">
                    <Flame className="h-3.5 w-3.5" />
                    {streak}
                  </span>
                ) : null}
              </div>
            )
          })
        )}
      </CardContent>
    </Card>
  )
}

export function PlannerPreviewWidget({ dateKey: key }: { dateKey: string }) {
  const blocks = usePlannerStore((s) => s.blocks)
  const dayBlocks = blocks
    .filter((b) => b.date === key)
    .sort((a, b) => a.start - b.start)
    .slice(0, 5)

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>
          시간 계획<En>Schedule</En>
        </CardTitle>
        <CardLink href="/planner" />
      </CardHeader>
      <CardContent className="space-y-2">
        {dayBlocks.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">계획된 블록이 없습니다.</p>
        ) : (
          dayBlocks.map((b) => (
            <div key={b.id} className="flex items-center gap-3">
              <span className="w-24 shrink-0 text-xs tabular-nums text-muted-foreground">
                {minutesToLabel(b.start)}–{minutesToLabel(b.end)}
              </span>
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: CATEGORIES[b.category].color }}
              />
              <span className="truncate text-sm">{b.title}</span>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}

export function GratitudeWidget({ dateKey: key }: { dateKey: string }) {
  const gratitude = usePlannerStore((s) => s.gratitude)
  const entry = gratitude.find((g) => g.date === key)
  const items = entry?.items.filter((i) => i.trim()) ?? []

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>
          감사 일기<En>Gratitude</En>
        </CardTitle>
        <CardLink href="/gratitude" />
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            아직 작성하지 않았어요.
          </p>
        ) : (
          <ol className="space-y-1.5 text-sm">
            {items.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-muted-foreground">{i + 1}.</span>
                <span className="truncate">{item}</span>
              </li>
            ))}
          </ol>
        )}
      </CardContent>
    </Card>
  )
}

export function StatsWidget({ dateKey: key }: { dateKey: string }) {
  const todos = usePlannerStore((s) => s.todos)
  const habits = usePlannerStore((s) => s.habits)
  const dayTodos = todos.filter((t) => t.date === key)
  const todoRate = dayTodos.length
    ? Math.round((dayTodos.filter((t) => t.done).length / dayTodos.length) * 100)
    : 0
  const habitRate = habits.length
    ? Math.round((habits.filter((h) => h.history.includes(key)).length / habits.length) * 100)
    : 0
  const overall = Math.round((todoRate + habitRate) / 2)

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>
          오늘의 달성률<En>Progress</En>
        </CardTitle>
        <CardLink href="/stats" />
      </CardHeader>
      <CardContent className="flex items-center justify-around gap-4">
        <CircularProgress value={overall} size={104} />
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between gap-6">
            <span className="text-muted-foreground">할 일</span>
            <span className="font-semibold">{todoRate}%</span>
          </div>
          <div className="flex items-center justify-between gap-6">
            <span className="text-muted-foreground">습관</span>
            <span className="font-semibold">{habitRate}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
