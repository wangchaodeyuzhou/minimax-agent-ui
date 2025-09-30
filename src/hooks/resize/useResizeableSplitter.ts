import { ref, onBeforeUnmount, computed } from "vue"

export function useResizableSplitter(
  containerRef: () => HTMLElement | null,
  opts?: {
    defaultPercent?: number
    minPercent?: number
    maxPercent?: number
  }
) {
  const leftPercent = ref(opts?.defaultPercent ?? 60)
  const isDragging = ref(false)

  let startX = 0
  let startPercent = 0

  const min = opts?.minPercent ?? 25
  const max = opts?.maxPercent ?? 75

  function clamp(v: number) {
    return Math.max(min, Math.min(max, v))
  }

  function onMouseDown(e: MouseEvent) {
    if (e.button !== 0) return
    isDragging.value = true
    startX = e.clientX
    startPercent = leftPercent.value
    document.body.classList.add("dragging")
    window.addEventListener("mousemove", onMouseMove, { passive: false })
    window.addEventListener("mouseup", onMouseUp, { passive: false })
  }

  function onMouseMove(e: MouseEvent) {
    if (!isDragging.value) return
    e.preventDefault()

    const container = containerRef()
    if (!container) return

    const delta = e.clientX - startX
    const percentDelta = (delta / container.clientWidth) * 100
    leftPercent.value = clamp(startPercent + percentDelta)
  }

  function onMouseUp() {
    isDragging.value = false
    document.body.classList.remove("dragging")
    window.removeEventListener("mousemove", onMouseMove)
    window.removeEventListener("mouseup", onMouseUp)
  }

  function onResize() {
    leftPercent.value = clamp(leftPercent.value)
  }

  window.addEventListener("resize", onResize)

  onBeforeUnmount(() => {
    window.removeEventListener("mousemove", onMouseMove)
    window.removeEventListener("mouseup", onMouseUp)
    window.removeEventListener("resize", onResize)
  })

  const rightPercent = computed(() => 100 - leftPercent.value)

  return { leftPercent, rightPercent, isDragging, onMouseDown }
}
