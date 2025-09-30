<template>
  <div class="demo-right">
    <div class="toolbar">
      <div>
        <h3>postcss.config.js</h3>
        <span class="subtitle">module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } }</span>
      </div>
      <div class="actions">
        <button title="上一个"><svg viewBox="0 0 24 24" class="icon"><path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg></button>
        <button title="下一个"><svg viewBox="0 0 24 24" class="icon"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg></button>
        <button class="primary" title="运行">运行</button>
      </div>
    </div>

    <div class="editor">
      <div class="tabs">
        <button class="tab active"><span class="dot js"></span>postcss.config.js</button>
        <button class="tab"><span class="dot config"></span>tailwind.config.js</button>
        <button class="tab"><span class="dot file"></span>CodeEditor.vue</button>
      </div>
      <div class="preview">
        <div class="code">
          <pre><code>module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}</code></pre>
        </div>
        <div class="notes">
          <div class="note">  使用 vue + ts 实现 IDE 布局</div>
          <div class="note success">  已完成：拖拽调整宽度</div>
          <div class="note info">  提示：右侧最大 70% 宽度</div>
        </div>
      </div>
    </div>

    <aside class="meta">
      <div class="meta-section">
        <div class="meta-title">MiniMax 的视窗</div>
        <div class="meta-sub">当前进程 / 文件</div>
        <ul class="meta-list">
          <li><span class="badge success">已思考</span> 使用 vue + ts + tailwindcss 实现 IDE 工作区布局</li>
          <li><span class="badge muted">已完成</span> /workspace/CodeEditor.vue</li>
          <li><span class="badge muted">已完成</span> /workspace/demo.html</li>
        </ul>
      </div>

      <div class="meta-section">
        <div class="meta-title">文件</div>
        <div class="file-list">
          <div class="file active">
            <span class="name">postcss.config.js</span>
            <span class="path">/workspace/postcss.config.js</span>
          </div>
          <div class="file">
            <span class="name">tailwind.config.js</span>
            <span class="path">/workspace/tailwind.config.js</span>
          </div>
          <div class="file">
            <span class="name">CodeEditor.vue</span>
            <span class="path">/workspace/components/CodeEditor.vue</span>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
// 纯视觉演示，不依赖 store
</script>

<style scoped>
.demo-right {
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr 220px;
  grid-template-areas:
    "toolbar toolbar"
    "editor meta";
  height: 100%;
  background: color-mix(in oklab, var(--background) 96%, #0f172a);
  border-left: 1px solid var(--border);
}

.toolbar {
  grid-area: toolbar;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  border-bottom: 1px solid var(--border);
  background: color-mix(in oklab, var(--background) 92%, #111827);
}
.toolbar h3 { margin: 0; font-size: 14px; font-weight: 600; color: var(--foreground); }
.subtitle { font-size: 12px; color: var(--muted-foreground); }

.actions { display: flex; align-items: center; gap: 8px; }
.actions button {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid color-mix(in oklab, var(--border) 70%, transparent);
  background: transparent;
  color: var(--muted-foreground);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;
}
.actions button:hover { background: color-mix(in oklab, var(--primary) 12%, transparent); color: var(--primary); }
.actions .primary {
  width: auto;
  padding: 0 14px;
  border: none;
  background: var(--primary);
  color: var(--primary-foreground);
  font-weight: 600;
}
.icon { width: 16px; height: 16px; }

.editor {
  grid-area: editor;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--border);
}
.tabs {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  background: color-mix(in oklab, var(--background) 96%, #0b1120);
  border-bottom: 1px solid var(--border);
}
.tab {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 10px;
  font-size: 12px;
  color: var(--muted-foreground);
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
}
.tab.active {
  background: color-mix(in oklab, var(--primary) 18%, transparent);
  border-color: color-mix(in oklab, var(--primary) 50%, var(--border));
  color: var(--primary);
}
.dot { width: 8px; height: 8px; border-radius: 999px; display: inline-flex; }
.dot.js { background: #facc15; }
.dot.config { background: #22c55e; }
.dot.file { background: #38bdf8; }

.preview {
  flex: 1;
  display: grid;
  grid-template-columns: 2fr 1fr;
  border-top: 1px solid color-mix(in oklab, var(--border) 70%, transparent);
  background: color-mix(in oklab, var(--background) 94%, #0f172a);
}

.code {
  padding: 16px;
  border-right: 1px solid color-mix(in oklab, var(--border) 60%, transparent);
  font-family: "JetBrains Mono", "Fira Code", Menlo, Consolas, monospace;
}
.code pre {
  margin: 0;
  font-size: 12px;
  line-height: 1.6;
  color: color-mix(in oklab, var(--foreground) 90%, #f8fafc);
}

.notes { display: flex; flex-direction: column; gap: 10px; padding: 16px; }
.note {
  font-size: 12px;
  color: var(--muted-foreground);
  padding: 8px 10px;
  border-radius: 10px;
  background: color-mix(in oklab, var(--background) 92%, #111827);
  border: 1px solid color-mix(in oklab, var(--border) 70%, transparent);
}
.note.success { border-color: color-mix(in oklab, #22c55e 40%, transparent); color: #4ade80; }
.note.info { border-color: color-mix(in oklab, #38bdf8 40%, transparent); color: #38bdf8; }

.meta {
  grid-area: meta;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 16px;
  background: color-mix(in oklab, var(--background) 98%, #020617);
}

.meta-section {
  border-radius: 14px;
  padding: 14px;
  background: color-mix(in oklab, var(--background) 94%, #0b1120);
  box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--border) 60%, transparent);
}

.meta-title { font-size: 13px; font-weight: 600; margin-bottom: 6px; color: var(--foreground); }
.meta-sub { font-size: 12px; color: var(--muted-foreground); margin-bottom: 10px; }
.meta-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; font-size: 12px; color: var(--muted-foreground); }

.badge { display: inline-flex; align-items: center; justify-content: center; padding: 2px 6px; border-radius: 999px; font-size: 11px; margin-right: 6px; }
.badge.success { background: color-mix(in oklab, #22c55e 18%, transparent); color: #22c55e; }
.badge.muted { background: color-mix(in oklab, var(--border) 40%, transparent); color: var(--muted-foreground); }

.file-list { display: flex; flex-direction: column; gap: 10px; }
.file { padding: 10px; border-radius: 10px; border: 1px solid color-mix(in oklab, var(--border) 60%, transparent); background: transparent; display: flex; flex-direction: column; gap: 4px; font-size: 12px; color: var(--muted-foreground); }
.file.active { background: color-mix(in oklab, var(--primary) 14%, transparent); border-color: color-mix(in oklab, var(--primary) 50%, var(--border)); color: var(--primary); }
.file .name { font-weight: 600; color: var(--foreground); }
.file .path { font-size: 11px; }

@media (max-width: 1120px) {
  .preview { grid-template-columns: 1fr; }
  .notes { border-top: 1px solid color-mix(in oklab, var(--border) 60%, transparent); }
}
</style>
