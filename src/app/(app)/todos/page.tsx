"use client"

import { useMemo, useState } from "react"
import { CATEGORY_LIST } from "@/lib/categories"
import type { CategoryKey } from "@/lib/types"
import { usePlannerStore } from "@/lib/store"
import { dateKey } from "@/lib/utils"
import { useMounted } from "@/hooks/use-mounted"
import { PageHeader } from "@/components/page-header"
import { DateNav } from "@/components/date-nav"
import { AddTodo } from "@/components/features/add-todo"
import { TodoItem } from "@/components/features/todo-item"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TodosPage() {
  const mounted = useMounted()
  const [date, setDate] = useState(() => new Date())
  const [filter, setFilter] = useState<CategoryKey | "all">("all")
  const todos = usePlannerStore((s) => s.todos)

  const key = dateKey(date)
  const dayTodos = useMemo(
    () =>
      todos
        .filter((t) => t.date === key)
        .sort((a, b) => a.order - b.order),
    [todos, key],
  )
  const filtered = filter === "all" ? dayTodos : dayTodos.filter((t) => t.category === filter)
  const doneCount = dayTodos.filter((t) => t.done).length

  return (
    <div>
      <PageHeader title="할 일" en="Tasks & To-Do" description="오늘 해야 할 일을 관리하세요">
        <DateNav date={date} onChange={setDate} />
      </PageHeader>

      <Card>
        <CardContent className="space-y-4 p-4 sm:p-6">
          <AddTodo date={key} />

          <Tabs value={filter} onValueChange={(v) => setFilter(v as CategoryKey | "all")}>
            <TabsList className="flex w-full flex-wrap justify-start">
              <TabsTrigger value="all">전체</TabsTrigger>
              {CATEGORY_LIST.map((c) => (
                <TabsTrigger key={c.key} value={c.key}>
                  {c.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {!mounted ? (
            <div className="space-y-2">
              {[0, 1, 2].map((i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              할 일이 없습니다. 위에서 추가해보세요.
            </p>
          ) : (
            <div className="divide-y">
              {filtered.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </div>
          )}

          {mounted && dayTodos.length > 0 ? (
            <p className="text-right text-xs text-muted-foreground">
              {dayTodos.length}개 중 {doneCount}개 완료
            </p>
          ) : null}
        </CardContent>
      </Card>
    </div>
  )
}
