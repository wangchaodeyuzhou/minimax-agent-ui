import { defineStore } from 'pinia'
import type { FileItem } from '@/types'
import { generateId } from '@/utils'

const createFile = (partial: Partial<FileItem> & Pick<FileItem, 'name' | 'path' | 'type'>): FileItem => ({
  id: partial.id ?? generateId(),
  name: partial.name,
  path: partial.path,
  type: partial.type,
  extension: partial.extension ?? partial.name.split('.').pop(),
  size: partial.size ?? 0,
  content: partial.content ?? '',
  language: partial.language,
  lastModified: partial.lastModified ?? new Date(),
  isGenerated: partial.isGenerated ?? false,
  parent: partial.parent,
})

export const useFileStore = defineStore('file', {
  state: () => ({
    files: [] as FileItem[],
    selectedFileId: '' as string,
  }),
  getters: {
    generatedFiles(state) {
      return state.files.filter((file) => file.isGenerated)
    },
  },
  actions: {
    addFile(partial: Partial<FileItem> & Pick<FileItem, 'name' | 'path' | 'type'>) {
      const file = createFile(partial)
      this.files.unshift(file)
      return file
    },
    setFiles(list: FileItem[]) {
      this.files = list.map((file) => ({
        ...file,
        lastModified: new Date(file.lastModified),
      }))
    },
    selectFile(id: string) {
      this.selectedFileId = id
    },
    deleteFile(id: string) {
      const index = this.files.findIndex((file) => file.id === id)
      if (index >= 0) {
        this.files.splice(index, 1)
        if (this.selectedFileId === id) {
          this.selectedFileId = ''
        }
      }
    },
    clearFiles() {
      this.files = []
      this.selectedFileId = ''
    },
    seed() {
      this.files = [
        createFile({
          name: 'postcss.config.js',
          path: '/workspace/postcss.config.js',
          type: 'file',
          extension: 'js',
          content: `module.exports = {\n  plugins: {\n    tailwindcss: {},\n    autoprefixer: {},\n  },\n}`,
          isGenerated: false,
        }),
        createFile({
          name: 'tailwind.config.js',
          path: '/workspace/tailwind.config.js',
          type: 'file',
          extension: 'js',
          content: 'export default { theme: {}, plugins: [] }',
          isGenerated: true,
        }),
      ]
    },
  },
})

