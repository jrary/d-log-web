"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { CheckCircle2, Flame, Smile } from "lucide-react"
import { dateKey } from "@/lib/utils"
import { usePlannerStore } from "@/lib/store"
import { MOODS } from "@/lib/categories"
import { useMounted } from "@/hooks/use-mounted"
import { DateNav } from "@/components/date-nav"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import {
  GratitudeWidget,
  HabitWidget,
  MoodWidget,
  PlannerPreviewWidget,
  StatsWidget,
  TodoWidget,
} from "@/components/dashboard/widgets"

function SummaryChip({
  icon: Icon,
  children,
}: {
  icon: typeof CheckCircle2
  children: React.ReactNode
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
      <Icon className="h-3.5 w-3.5 text-primary" />
      {children}
    </span>
  )
}

export default function DashboardPage() {
  const mounted = useMounted()
  const [date, setDate] = useState(() => new Date())
  const key = dateKey(date)

  const todos = usePlannerStore((s) => s.todos)
  const habits = usePlannerStore((s) => s.habits)
  const moods = usePlannerStore((s) => s.moods)

  const dayTodos = todos.filter((t) => t.date === key)
  const todoDone = dayTodos.filter((t) => t.done).length
  const habitDone = habits.filter((h) => h.history.includes(key)).length
  const mood = moods.find((m) => m.date === key)

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-serif text-sm italic text-muted-foreground">My Daily Record</p>
          <h1 className="text-2xl font-bold tracking-tight">
            {format(date, "M월 d일, eeee", { locale: ko })}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <DateNav date={date} onChange={setDate} />
          <Avatar className="hidden h-10 w-10 sm:flex">
            <AvatarFallback>나</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {mounted ? (
        <div className="mb-6 flex flex-wrap gap-2">
          <SummaryChip icon={CheckCircle2}>
            할 일 {todoDone}/{dayTodos.length}
          </SummaryChip>
          <SummaryChip icon={Flame}>
            습관 {habitDone}/{habits.length}
          </SummaryChip>
          <SummaryChip icon={Smile}>
            기분 {mood ? MOODS[mood.score].emoji : "미기록"}
          </SummaryChip>
        </div>
      ) : null}

      {!mounted ? (
        <div className="grid gap-4 md:grid-cols-2">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <MoodWidget dateKey={key} />
          <TodoWidget dateKey={key} />
          <HabitWidget dateKey={key} />
          <PlannerPreviewWidget dateKey={key} />
          <GratitudeWidget dateKey={key} />
          <StatsWidget dateKey={key} />
        </div>
      )}
    </div>
  )
}
