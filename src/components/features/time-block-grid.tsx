"use client"

import { useEffect, useRef, useState } from "react"
import { CATEGORIES } from "@/lib/categories"
import type { TimeBlock } from "@/lib/types"
import { minutesToLabel, isSameDay } from "@/lib/date"
import { cn } from "@/lib/utils"

const SLOT_MIN = 10
const SLOT_H = 14 // px per 10 minutes
const SLOTS = (24 * 60) / SLOT_MIN // 144
const HOUR_H = SLOT_H * 6

function slotFromY(y: number) {
  return Math.max(0, Math.min(SLOTS - 1, Math.floor(y / SLOT_H)))
}

export function TimeBlockGrid({
  date,
  blocks,
  onCreate,
  onEdit,
}: {
  date: Date
  blocks: TimeBlock[]
  onCreate: (startMin: number, endMin: number) => void
  onEdit: (block: TimeBlock) => void
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [sel, setSel] = useState<{ a: number; b: number } | null>(null)
  const dragging = useRef(false)
  const [nowMin, setNowMin] = useState<number | null>(null)

  useEffect(() => {
    const update = () => {
      const d = new Date()
      setNowMin(d.getHours() * 60 + d.getMinutes())
    }
    update()
    const id = setInterval(update, 60_000)
    return () => clearInterval(id)
  }, [])

  function pointerSlot(clientY: number) {
    const rect = trackRef.current!.getBoundingClientRect()
    return slotFromY(clientY - rect.top)
  }

  function handleDown(e: React.PointerEvent) {
    if (e.button !== 0) return
    dragging.current = true
    const s = pointerSlot(e.clientY)
    setSel({ a: s, b: s })
    trackRef.current?.setPointerCapture(e.pointerId)
  }

  function handleMove(e: React.PointerEvent) {
    if (!dragging.current) return
    const s = pointerSlot(e.clientY)
    setSel((prev) => (prev ? { ...prev, b: s } : { a: s, b: s }))
  }

  function handleUp() {
    if (!dragging.current || !sel) return
    dragging.current = false
    const start = Math.min(sel.a, sel.b)
    const end = Math.max(sel.a, sel.b) + 1
    setSel(null)
    onCreate(start * SLOT_MIN, end * SLOT_MIN)
  }

  const showNow = nowMin !== null && isSameDay(date, new Date())

  return (
    <div className="flex select-none">
      {/* hour gutter */}
      <div className="w-14 shrink-0">
        {Array.from({ length: 24 }, (_, h) => (
          <div
            key={h}
            style={{ height: HOUR_H }}
            className="relative -top-2 pr-2 text-right text-xs text-muted-foreground"
          >
            {String(h).padStart(2, "0")}:00
          </div>
        ))}
      </div>

      {/* track */}
      <div
        ref={trackRef}
        className="relative flex-1 cursor-pointer rounded-md border bg-card"
        style={{ height: SLOTS * SLOT_H }}
        onPointerDown={handleDown}
        onPointerMove={handleMove}
        onPointerUp={handleUp}
      >
        {/* hour lines */}
        {Array.from({ length: 24 }, (_, h) => (
          <div
            key={h}
            className="absolute inset-x-0 border-t border-border/60"
            style={{ top: h * HOUR_H }}
          />
        ))}

        {/* selection preview */}
        {sel ? (
          <div
            className="pointer-events-none absolute inset-x-1 rounded-md bg-primary/20 ring-1 ring-primary/40"
            style={{
              top: Math.min(sel.a, sel.b) * SLOT_H,
              height: (Math.abs(sel.a - sel.b) + 1) * SLOT_H,
            }}
          />
        ) : null}

        {/* blocks */}
        {blocks.map((block) => {
          const meta = CATEGORIES[block.category]
          const top = (block.start / SLOT_MIN) * SLOT_H
          const height = ((block.end - block.start) / SLOT_MIN) * SLOT_H
          return (
            <button
              key={block.id}
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => onEdit(block)}
              className="absolute inset-x-1 overflow-hidden rounded-md px-2 py-1 text-left text-xs font-medium text-white shadow-sm transition-transform hover:brightness-105"
              style={{ top, height, backgroundColor: meta.color, minHeight: SLOT_H }}
            >
              <span className="block truncate">{block.title}</span>
              {height >= SLOT_H * 2 ? (
                <span className="block truncate opacity-80">
                  {minutesToLabel(block.start)} – {minutesToLabel(block.end)}
                </span>
              ) : null}
            </button>
          )
        })}

        {/* current time line */}
        {showNow ? (
          <div
            className="pointer-events-none absolute inset-x-0 z-10 flex items-center"
            style={{ top: (nowMin! / SLOT_MIN) * SLOT_H }}
          >
            <div className="h-2 w-2 -translate-x-1 rounded-full bg-red-500" />
            <div className="h-px flex-1 bg-red-500" />
          </div>
        ) : null}
      </div>
    </div>
  )
}
