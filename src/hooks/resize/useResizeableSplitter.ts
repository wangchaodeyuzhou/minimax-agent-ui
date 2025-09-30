import { ref, onBeforeUnmount, computed } from "vue"

export function useResizableSplitter(
  containerRef: () => HTMLElement | null,
  opts?: {
    defaultPercent?: number
    minPercent?: number
    maxPercent?: number
    leftElement?: () => HTMLElement | null
    rightElement?: () => HTMLElement | null
  }
) {
  const leftPercent = ref(opts?.defaultPercent ?? 60)
  const isDragging = ref(false)

  let startX = 0
  let startPercent = 0

  const min = opts?.minPercent ?? 25
  const max = opts?.maxPercent ?? 75
  const EPS = 1e-6

  function clamp(v: number) {
    return Math.max(min, Math.min(max, v))
  }

  function applyPixelWidths(leftPx: number, rightPx: number) {
    const leftEl = opts?.leftElement?.()
    const rightEl = opts?.rightElement?.()
    if (leftEl) leftEl.style.width = leftPx + 'px'
    if (rightEl) rightEl.style.width = rightPx + 'px'
  }

  let rafId: number | null = null
  let lastClientX = 0

  function scheduleUpdate() {
    if (rafId != null) return
    rafId = window.requestAnimationFrame(() => {
      rafId = null

      const container = containerRef()
      if (!container) return

      const delta = lastClientX - startX
      const percentDelta = (delta / container.clientWidth) * 100
      const newPercent = clamp(startPercent + percentDelta)

      // ---------- 新增：到达边界时重锚，保证“到边界就不能再移” ----------
      if (newPercent <= min + EPS || newPercent >= max - EPS) {
        // 锚定到边界，之后的 delta 会以边界为起点计算，达到“冻结”的效果
        startPercent = newPercent
        startX = lastClientX
      }
      // -----------------------------------------------------------------

      leftPercent.value = newPercent

      if (opts?.leftElement || opts?.rightElement) {
        const leftPx = Math.round((container.clientWidth * newPercent) / 100)
        const rightPx = container.clientWidth - leftPx
        applyPixelWidths(leftPx, rightPx)
      }
    })
  }

  function onMouseDown(e: MouseEvent) {
    if (e.button !== 0) return
    isDragging.value = true
    startX = e.clientX
    // 保证起始百分比在合法区间内（以防外部改动导致越界）
    startPercent = clamp(leftPercent.value)
    lastClientX = e.clientX
    document.body.classList.add("dragging")
    window.addEventListener("mousemove", onMouseMove, { passive: false })
    window.addEventListener("mouseup", onMouseUp, { passive: false })
  }

  function onMouseMove(e: MouseEvent) {
    if (!isDragging.value) return
    e.preventDefault()
    lastClientX = e.clientX
    scheduleUpdate()
  }

  function onMouseUp() {
    isDragging.value = false
    document.body.classList.remove("dragging")
    window.removeEventListener("mousemove", onMouseMove)
    window.removeEventListener("mouseup", onMouseUp)

    if (rafId != null) {
      window.cancelAnimationFrame(rafId)
      rafId = null
    }

    const container = containerRef()
    if (container) {
      void container.clientWidth
    }
  }

  function onResize() {
    leftPercent.value = clamp(leftPercent.value)
  }

  window.addEventListener("resize", onResize)

  onBeforeUnmount(() => {
    window.removeEventListener("mousemove", onMouseMove)
    window.removeEventListener("mouseup", onMouseUp)
    window.removeEventListener("resize", onResize)
    if (rafId != null) {
      window.cancelAnimationFrame(rafId)
      rafId = null
    }
  })

  const rightPercent = computed(() => 100 - leftPercent.value)

  const leftPx = computed(() => {
    const c = containerRef()
    const w = c ? c.clientWidth : 0
    return Math.round((w * leftPercent.value) / 100)
  })

  const rightPx = computed(() => {
    const c = containerRef()
    const w = c ? c.clientWidth : 0
    return Math.round((w * rightPercent.value) / 100)
  })

  return { leftPercent, rightPercent, leftPx, rightPx, isDragging, onMouseDown }
}
