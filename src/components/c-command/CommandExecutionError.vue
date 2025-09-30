<template>
  <div
    role="alert"
    class="text-sm bg-vscode-editor-background border border-vscode-border rounded-xs p-2"
  >
    <div class="flex flex-col gap-2">
      <div class="flex items-center">
        <i class="codicon codicon-warning mr-1 text-vscode-editorWarning-foreground" />
        <span class="text-vscode-editorWarning-foreground font-medium">
          {{ t('chat:shellIntegration.title') }}
        </span>
      </div>

      <div>
        <span v-html="descriptionWithLink"></span>
      </div>

      <a :href="docLink" class="underline" style="color: inherit">
        {{ t('chat:shellIntegration.troubleshooting') }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { buildDocLink } from '@/utils/docLinks.ts'

const { t } = useI18n()

const settingsLink = `<a href="#" onclick="(function(e){e.preventDefault();window.postMessage({ type: 'action', action: 'settingsButtonClicked', values: { section: 'terminal' } }, '*') })(event)" class="underline">${t('chat:shellIntegration.settingsLink')}</a>`

const descriptionWithLink = computed(() => {return t('chat:shellIntegration.description', { settingsLink: settingsLink }) as string
})

const docLink = buildDocLink('troubleshooting/shell-integration/', 'error_tooltip')
</script>

<style scoped>
/* 如需自定义样式请写在此处 */
</style>
