"use client"

import { useMemo, useState } from "react"
import { usePlannerStore } from "@/lib/store"
import { dateKey } from "@/lib/utils"
import { useMounted } from "@/hooks/use-mounted"
import type { TimeBlock } from "@/lib/types"
import { PageHeader } from "@/components/page-header"
import { DateNav } from "@/components/date-nav"
import { TimeBlockGrid } from "@/components/features/time-block-grid"
import { BlockEditor, type BlockDraft } from "@/components/features/block-editor"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function PlannerPage() {
  const mounted = useMounted()
  const [date, setDate] = useState(() => new Date())
  const [draft, setDraft] = useState<BlockDraft | null>(null)
  const blocks = usePlannerStore((s) => s.blocks)

  const key = dateKey(date)
  const dayBlocks = useMemo(() => blocks.filter((b) => b.date === key), [blocks, key])

  return (
    <div>
      <PageHeader title="시간 계획" en="Schedule" description="드래그하여 10분 단위로 타임블록을 만드세요">
        <DateNav date={date} onChange={setDate} />
      </PageHeader>

      <Card>
        <CardContent className="p-4 sm:p-6">
          {!mounted ? (
            <Skeleton className="h-[600px] w-full" />
          ) : (
            <div className="max-h-[70vh] overflow-y-auto no-scrollbar">
              <TimeBlockGrid
                date={date}
                blocks={dayBlocks}
                onCreate={(start, end) =>
                  setDraft({ date: key, start, end, title: "", category: "study" })
                }
                onEdit={(b: TimeBlock) =>
                  setDraft({
                    id: b.id,
                    date: b.date,
                    start: b.start,
                    end: b.end,
                    title: b.title,
                    category: b.category,
                  })
                }
              />
            </div>
          )}
        </CardContent>
      </Card>

      <BlockEditor draft={draft} onClose={() => setDraft(null)} />
    </div>
  )
}
