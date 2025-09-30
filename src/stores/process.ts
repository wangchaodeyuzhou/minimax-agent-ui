import { defineStore } from 'pinia'
import type { Process } from '@/types'
import { generateId } from '@/utils'

const createProcess = (partial: Partial<Process> & Pick<Process, 'name' | 'description'>): Process => ({
  id: generateId(),
  name: partial.name,
  description: partial.description,
  type: partial.type ?? 'other',
  status: partial.status ?? 'pending',
  progress: partial.progress ?? 0,
  startTime: partial.startTime ?? new Date(),
  endTime: partial.endTime,
  details: partial.details,
  error: partial.error,
  result: partial.result,
})

export const useProcessStore = defineStore('process', {
  state: () => ({
    processes: [] as Process[],
  }),
  getters: {
    runningProcesses(state) {
      return state.processes.filter((p) => p.status === 'running' || p.status === 'pending')
    },
    completedProcesses(state) {
      return state.processes.filter((p) => p.status === 'completed')
    },
    failedProcesses(state) {
      return state.processes.filter((p) => p.status === 'error')
    },
    recentProcesses(state) {
      return [...state.processes]
        .sort((a, b) => (b.endTime?.getTime() ?? b.startTime.getTime()) - (a.endTime?.getTime() ?? a.startTime.getTime()))
        .slice(0, 20)
    },
  },
  actions: {
    addProcess(partial: Partial<Process> & Pick<Process, 'name' | 'description'>) {
      const process = createProcess(partial)
      this.processes.unshift(process)
      return process
    },
    updateProcess(id: string, partial: Partial<Process>) {
      const process = this.processes.find((item) => item.id === id)
      if (!process) return
      Object.assign(process, partial)
      if (partial.status && ['completed', 'error', 'cancelled'].includes(partial.status)) {
        process.endTime = partial.endTime ?? new Date()
        process.progress = partial.progress ?? 100
      }
    },
    clearCompletedProcesses() {
      this.processes = this.processes.filter((p) => p.status !== 'completed')
    },
    seed() {
      this.processes = [
        createProcess({
          name: '构建 UI 预览',
          description: '正在生成组件和样式预览',
          status: 'running',
          progress: 65,
          type: 'code_generation',
        }),
        createProcess({
          name: '整理文件树',
          description: '扫描 workspace 并生成结构',
          status: 'completed',
          progress: 100,
          type: 'analysis',
          endTime: new Date(),
        }),
      ]
    },
  },
})

