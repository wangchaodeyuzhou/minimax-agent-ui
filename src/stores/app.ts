import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    sidebarCollapsed: false,
    isTyping: false,
    theme: 'system' as 'light' | 'dark' | 'system',
  }),
  actions: {
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
    },
    setSidebarCollapsed(value: boolean) {
      this.sidebarCollapsed = value
    },
    setTyping(value: boolean) {
      this.isTyping = value
    },
    setTheme(theme: 'light' | 'dark' | 'system') {
      this.theme = theme
    },
  },
})

