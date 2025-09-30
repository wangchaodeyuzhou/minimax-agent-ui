import { defineStore } from 'pinia'
import type { PanelType, PanelState } from '@/types'

const initialPanels: Record<PanelType, PanelState> = {
  processes: { type: 'processes', visible: true, width: 420, minimized: false },
  files: { type: 'files', visible: false, width: 420, minimized: false },
  tools: { type: 'tools', visible: false, width: 420, minimized: false },
  settings: { type: 'settings', visible: false, width: 420, minimized: false },
}

export const usePanelStore = defineStore('panel', {
  state: () => ({
    activePanelType: 'processes' as PanelType,
    rightPanelVisible: true,
    panels: structuredClone(initialPanels) as Record<PanelType, PanelState>,
  }),
  getters: {
    activePanel(state): PanelState {
      return state.panels[state.activePanelType]
    },
  },
  actions: {
    toggleRightPanel() {
      this.rightPanelVisible = !this.rightPanelVisible
    },
    setActivePanelType(type: PanelType) {
      this.activePanelType = type
      this.showPanel(type)
    },
    showPanel(type: PanelType) {
      Object.values(this.panels).forEach((panel) => {
        panel.visible = panel.type === type
      })
      this.activePanelType = type
      this.rightPanelVisible = true
    },
    hidePanel(type: PanelType) {
      if (this.panels[type]) {
        this.panels[type].visible = false
      }
      const fallback = (Object.keys(this.panels) as PanelType[]).find(
        (panelType) => this.panels[panelType].visible,
      )
      this.activePanelType = fallback ?? 'processes'
      this.rightPanelVisible = fallback != null
    },
    updatePanelWidth(type: PanelType, width: number) {
      const panel = this.panels[type]
      if (!panel) return
      const clamped = Math.min(Math.max(width, 280), Math.floor(window.innerWidth * 0.7))
      panel.width = clamped
    },
    togglePanelMinimized(type: PanelType) {
      const panel = this.panels[type]
      if (!panel) return
      panel.minimized = !panel.minimized
    },
    reset() {
      this.panels = structuredClone(initialPanels)
      this.activePanelType = 'processes'
      this.rightPanelVisible = true
    },
  },
})

