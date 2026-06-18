"use client"

import { useEffect, useState } from "react"
import { Trash2 } from "lucide-react"
import { CATEGORY_LIST } from "@/lib/categories"
import type { CategoryKey, TimeBlock } from "@/lib/types"
import { usePlannerStore } from "@/lib/store"
import { minutesToLabel } from "@/lib/date"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

export interface BlockDraft {
  id?: string
  date: string
  start: number
  end: number
  title?: string
  category?: CategoryKey
}

const STEP = 10
const TIME_OPTIONS = Array.from({ length: (24 * 60) / STEP + 1 }, (_, i) => i * STEP)

export function BlockEditor({
  draft,
  onClose,
}: {
  draft: BlockDraft | null
  onClose: () => void
}) {
  const addBlock = usePlannerStore((s) => s.addBlock)
  const updateBlock = usePlannerStore((s) => s.updateBlock)
  const removeBlock = usePlannerStore((s) => s.removeBlock)

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState<CategoryKey>("study")
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(STEP)

  useEffect(() => {
    if (!draft) return
    setTitle(draft.title ?? "")
    setCategory(draft.category ?? "study")
    setStart(draft.start)
    setEnd(draft.end)
  }, [draft])

  const isEdit = Boolean(draft?.id)

  function save() {
    if (!draft) return
    const s = Math.min(start, end - STEP)
    const e = Math.max(end, s + STEP)
    const finalTitle = title.trim() || "(제목 없음)"
    if (draft.id) {
      updateBlock(draft.id, { title: finalTitle, category, start: s, end: e })
    } else {
      addBlock({ date: draft.date, title: finalTitle, category, start: s, end: e })
    }
    onClose()
  }

  function handleDelete() {
    if (draft?.id) removeBlock(draft.id)
    onClose()
  }

  return (
    <Sheet open={Boolean(draft)} onOpenChange={(o) => !o && onClose()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{isEdit ? "타임블록 편집" : "타임블록 추가"}</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="block-title">제목</Label>
            <Input
              id="block-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="무엇을 할 계획인가요?"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label>카테고리</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as CategoryKey)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_LIST.map((c) => (
                  <SelectItem key={c.key} value={c.key}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>시작</Label>
              <Select value={String(start)} onValueChange={(v) => setStart(Number(v))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-72">
                  {TIME_OPTIONS.slice(0, -1).map((m) => (
                    <SelectItem key={m} value={String(m)}>
                      {minutesToLabel(m)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>종료</Label>
              <Select value={String(end)} onValueChange={(v) => setEnd(Number(v))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-72">
                  {TIME_OPTIONS.slice(1).map((m) => (
                    <SelectItem key={m} value={String(m)}>
                      {minutesToLabel(m)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <SheetFooter className="mt-8 flex-row gap-2">
          {isEdit ? (
            <Button variant="outline" onClick={handleDelete} className="text-destructive">
              <Trash2 className="h-4 w-4" />
              삭제
            </Button>
          ) : null}
          <Button onClick={save} className="flex-1">
            저장
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
