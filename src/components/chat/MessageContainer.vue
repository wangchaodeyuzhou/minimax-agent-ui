<script setup lang="ts">
import MessageItem from '@/components/chat/MessageItem.vue'
import { MessageItemTypes } from '@/components/chat/types.ts'
import { ref } from 'vue'

const MessageItems = ref([
  {
    messageType: MessageItemTypes.User,
    markdownContent: '使用 vue + ts + tailwindcss 实现上面的UI样式组件，请尽可能的还原上面的样式效果',
    attachments:
      [
        {
          name: 'image.png',
          url: 'https://cdn.hailuoai.video/moss/prod/2025-09-29-14/user/multi_chat_file/7c344673-90e8-483e-b318-861f6978aea6.image/png',
        },
      ]
  },
  {
    messageType: MessageItemTypes.Assistant,
    thinkTime: '2.25s',
    markdownContent: `我需要先查看您提供的图片，了解要实现的UI样式效果。`,
    toolMessageTitle: '已完成图片读取',
    thinkContent: `用户要求使用 Vue + TypeScript + TailwindCSS 实现一个UI样式组件，并要求尽可能还原图片中的样式效果。
      用户提到了 "上面的UI样式组件"，但我需要先查看用户提供的图片来了解具体的UI设计要求。
      <p>首先，我需要查看用户提供的图片文件 <code>user_input_files/image.png</code> 来了解具体的UI设计。</p>`,
  },
  {
    messageType: MessageItemTypes.Assistant,
    markdownContent: `通过图片分析，我可以看到这是一个文件管理器或代码编辑器的界面，类似于 VS Code 或其他代码编辑器的界面。主要包含以下几个部分：

1. **左侧边栏**：包含文件树结构，显示项目文件和文件夹。
2. **中间主要区域**：显示代码编辑器或文档内容，当前显示的是一些中文文本内容。
3. **右侧边栏**：显示文件列表，包含各种文件格式（\`.js\`、\`.vue\`、\`.ts\` 等文件）。
4. **顶部工具栏**：显示应用标题 **“MiniMax 存储器”** 以及一些操作按钮。

---

### 具体的界面特点：

- 左侧文件树有展开/折叠功能
- 中间区域有文本编辑功能
- 右侧文件列表显示文件图标和文件名
- 整体采用深色主题
- 界面布局是三栏式布局

---

现在我需要使用 **Vue 3 + TypeScript + TailwindCSS** 来实现这个界面。我会创建一个组件来还原这个设计。
`,
    thinkContent: `<p>
            我看到了这是一个类似VS
            Code的代码编辑器界面，包含左侧文件树、中间编辑区域和右侧文件列表的三栏布局。我将使用Vue
            3 + TypeScript + TailwindCSS来实现这个UI组件。
          </p>
          <p>让我创建这个组件：</p>`,
    toolMessageTitle: '已完成文件写入',
    toolMessageDesc: 'CodeEditor.vue; FileTree.vue; FileList.vue',
  },
  {
    messageType: MessageItemTypes.Assistant,
    thinkTime: '2.23s',
    thinkContent: ` 现在我已经创建了主要的组件文件。接下来我还需要创建一些补充文件来完整实现这个UI：
            <ol class="target pending">
              <div class="target pending mb-2 flex flex-row last:mb-0 md:mb-[12px]">
                                <span class="mr-2 min-w-6 text-right text-[#14151A80]">1.</span
                                ><span class="flex-1 overflow-hidden"
              >package.json - 包含必要的依赖</span
              >
              </div>
              <div class="target pending mb-2 flex flex-row last:mb-0 md:mb-[12px]">
                                <span class="mr-2 min-w-6 text-right text-[#14151A80]">2.</span
                                ><span class="flex-1 overflow-hidden"
              >tailwind.config.js - TailwindCSS配置</span
              >
              </div>
              <div class="target pending mb-2 flex flex-row last:mb-0 md:mb-[12px]">
                                <span class="mr-2 min-w-6 text-right text-[#14151A80]">3.</span
                                ><span class="flex-1 overflow-hidden"
              >main.ts - Vue应用入口文件</span
              >
              </div>
              <div class="target pending mb-2 flex flex-row last:mb-0 md:mb-[12px]">
                                <span class="mr-2 min-w-6 text-right text-[#14151A80]">4.</span
                                ><span class="flex-1 overflow-hidden">index.html - HTML模板</span>
              </div>
              <div class="target pending mb-2 flex flex-row last:mb-0 md:mb-[12px]">
                                <span class="mr-2 min-w-6 text-right text-[#14151A80]">5.</span
                                ><span class="flex-1 overflow-hidden"
              >vite.config.ts - Vite配置</span
              >
              </div>
            </ol>
            <p>这样用户就可以直接运行这个项目了。</p>`,
    markdownContent: ``,
    toolMessageTitle: '已完成文件写入',
    toolMessageDesc: `package.json; tailwind.config.js; postcss.config.js; vite.config.ts;
            index.html; main.ts; style.css; tsconfig.json; tsconfig.node.json`,
  },
  {
    messageType: MessageItemTypes.Assistant,
    thinkTime: '0.86s',
    thinkContent: `因为工具限制每次最多只能写入3个文件，我需要分批创建剩余的文件。`,
    markdownContent: `继续创建剩余的配置文件：`,
    toolMessageTitle: '已完成文件写入',
    toolMessageDesc: `vite.config.ts; index.html; main.ts`,
  },
  {
    messageType: MessageItemTypes.Assistant,
    thinkTime: '5.34s',
    thinkContent: `完美！我已经成功创建了一个完整的Vue 3 + TypeScript +
                  TailwindCSS项目，实现了用户要求的代码编辑器UI界面。项目包含了：
                  <ol class="target pending">
                    <div class="target pending mb-2 flex flex-row last:mb-0 md:mb-[12px]">
                                <span class="mr-2 min-w-6 text-right text-[#14151A80]">1.</span
                                ><span class="flex-1 overflow-hidden"
                    ><div>主要组件文件：</div>
                                  <ul>
                                    <li class="target pending">CodeEditor.vue - 主编辑器组件</li>
                                    <li class="target pending">FileTree.vue - 文件树组件</li>
                                    <li class="target pending">FileList.vue - 文件列表组件</li>
                                  </ul></span
                    >
                    </div>
                    <div class="target pending mb-2 flex flex-row last:mb-0 md:mb-[12px]">
                                <span class="mr-2 min-w-6 text-right text-[#14151A80]">2.</span
                                ><span class="flex-1 overflow-hidden"
                    ><div>配置文件：</div>
                                  <ul>
                                    <li class="target pending">package.json - 项目依赖配置</li>
                                    <li class="target pending">vite.config.ts - Vite构建配置</li>
                                    <li class="target pending">
                                      tailwind.config.js - TailwindCSS配置
                                    </li>
                                    <li class="target pending">tsconfig.json - TypeScript配置</li>
                                    <li class="target pending">postcss.config.js - PostCSS配置</li>
                                  </ul></span
                    >
                    </div>
                    <div class="target pending mb-2 flex flex-row last:mb-0 md:mb-[12px]">
                                <span class="mr-2 min-w-6 text-right text-[#14151A80]">3.</span
                                ><span class="flex-1 overflow-hidden"
                    ><div>样式和入口文件：</div>
                                  <ul>
                                    <li class="target pending">
                                      style.css - 全局样式（包含TailwindCSS和自定义滚动条）
                                    </li>
                                    <li class="target pending">main.ts - Vue应用入口</li>
                                    <li class="target pending">index.html - HTML模板</li>
                                  </ul></span
                    >
                    </div>
                    <div class="target pending mb-2 flex flex-row last:mb-0 md:mb-[12px]">
                                <span class="mr-2 min-w-6 text-right text-[#14151A80]">4.</span
                                ><span class="flex-1 overflow-hidden"
                    ><div>说明文档：</div>
                                  <ul>
                                    <li class="target pending">README.md - 项目说明和使用方法</li>
                                  </ul></span
                    >
                    </div>
                  </ol>
                  <p>这个项目完全还原了用户提供图片中的UI设计，包括：</p>
                  <ul>
                    <li class="target pending">
                      三栏布局（左侧文件树、中间编辑区域、右侧文件列表）
                    </li>
                    <li class="target pending">深色主题</li>
                    <li class="target pending">顶部工具栏</li>
                    <li class="target pending">底部状态栏</li>
                    <li class="target pending">文件树的展开/折叠功能</li>
                    <li class="target pending">悬停效果</li>
                    <li class="target pending">自定义滚动条</li>
                  </ul>
                  <p>用户可以直接运行npm install和npm run dev来启动项目。</p>`,
    markdownContent: `我已经完成了使用 **Vue 3 + TypeScript + TailwindCSS** 实现的代码编辑器 UI 组件。
这个项目完全还原了您提供图片中的界面设计，包含以下主要特性：

## 核心功能

🎯 **三栏布局设计**

- 左侧：文件树资源管理器，支持文件夹展开/折叠
- 中间：主编辑区域，包含标签栏和内容编辑器
- 右侧：文件列表，显示文件图标、名称和大小

---

🎨 **界面还原特性**

- 深色主题配色方案
- 顶部工具栏（包含应用标题和操作按钮）
- 底部状态栏（显示 Git 状态、语言信息等）
- 自定义滚动条样式
- 悬停交互效果

---

## 项目结构

主要文件包括：

- **CodeEditor.vue** — 主编辑器组件
- **components/FileTree.vue** — 文件树组件
- **components/FileList.vue** — 文件列表组件
- **package.json** — 项目依赖配置
- **tailwind.config.js** — TailwindCSS 配置
- **style.css** — 全局样式
- **README.md** — 项目说明文档

---

## 快速启动

\`\`\`bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
`,
    toolMessageTitle: '',
    toolMessageDesc: '',
    toolMessageIsComplete: true,
  },
  {
    messageType: MessageItemTypes.Assistant,
    thinkTime: '2.39s',
    thinkContent: `用户指出我没有实现左边的任务列表（新建任务）和中间的需求问答UI组件。让我重新仔细看看原图，看看我遗漏了什么功能。
                  <p>从用户的反馈来看，我需要：</p>
                  <ol class="target pending">
                    <div class="target pending mb-2 flex flex-row last:mb-0 md:mb-[12px]">
                                <span class="mr-2 min-w-6 text-right text-[#14151A80]">1.</span
                                ><span class="flex-1 overflow-hidden"
                    >实现左边的任务列表，包括新建任务功能</span
                    >
                    </div>
                    <div class="target pending mb-2 flex flex-row last:mb-0 md:mb-[12px]">
                                <span class="mr-2 min-w-6 text-right text-[#14151A80]">2.</span
                                ><span class="flex-1 overflow-hidden"
                    >实现中间的需求问答UI组件</span
                    >
                    </div>
                  </ol>
                  <p>我需要重新查看图片，更仔细地分析界面的具体功能。</p>`,
    markdownContent: `您说得对！我重新仔细查看了图片，发现我遗漏了一些重要的功能。
让我重新实现一个更完整的版本，包括：

1. 左侧的任务管理功能（新建任务等）
2. 中间的需求问答界面
3. 更准确的界面布局
`,
    toolMessageTitle: '已完成图片读取',
    toolMessageDesc: '',
  },
  {
    messageType: MessageItemTypes.User,
    markdownContent: '中间的问答部分和右边的视窗都存在的情况下，需要在中间的边框可以左右移动两边的宽度占比，其中最右边的占比最多占全屏宽度70%',
  },
  {
    messageType: MessageItemTypes.Assistant,
    thinkTime: '1.21s',
    thinkContent: ` 代码看起来正确，我已经成功地：
                  <ol class="target pending">
                    <div class="target pending mb-2 flex flex-row last:mb-0 md:mb-[12px]">
                                <span class="mr-2 min-w-6 text-right text-[#14151A80]">1.</span
                                ><span class="flex-1 overflow-hidden"
                    >将折叠按钮移到了标题栏的同一行</span
                    >
                    </div>
                    <div class="target pending mb-2 flex flex-row last:mb-0 md:mb-[12px]">
                                <span class="mr-2 min-w-6 text-right text-[#14151A80]">2.</span
                                ><span class="flex-1 overflow-hidden"
                    >使用了一个更清晰的箭头图标</span
                    >
                    </div>
                    <div class="target pending mb-2 flex flex-row last:mb-0 md:mb-[12px]">
                                <span class="mr-2 min-w-6 text-right text-[#14151A80]">3.</span
                                ><span class="flex-1 overflow-hidden"
                    >在折叠状态下显示一个任务管理的图标</span
                    >
                    </div>
                    <div class="target pending mb-2 flex flex-row last:mb-0 md:mb-[12px]">
                                <span class="mr-2 min-w-6 text-right text-[#14151A80]">4.</span
                                ><span class="flex-1 overflow-hidden"
                    >保持了新建任务按钮在标题下方（仅在展开状态下显示）</span
                    >
                    </div>
                    <div class="target pending mb-2 flex flex-row last:mb-0 md:mb-[12px]">
                                <span class="mr-2 min-w-6 text-right text-[#14151A80]">5.</span
                                ><span class="flex-1 overflow-hidden"
                    >移除了折叠状态下多余的展开按钮</span
                    >
                    </div>
                  </ol>
                  <p>让我创建一个总结来告诉用户完成的改进。</p>`,
    markdownContent: `完美！我已经成功优化了折叠和展开按钮的设计。让我总结一下完成的改进：

## 🎯 UI 优化完成

### ✅ 折叠按钮优化
- **统一图标设计**：使用一个左箭头图标表示折叠/展开状态
- **同行布局**：折叠按钮现在与「资源管理器」标题在同一行显示
- **状态反馈**：图标会根据面板状态自动旋转 180 度
- **简洁美观**：移除了重复的展开按钮，界面更加简洁

### ✅ 布局改进
- **标题栏设计**：\`资源管理器\` 标题与折叠按钮在同一行，右对齐
- **折叠状态图标**：当面板折叠时，显示任务管理的象征性图标
- **按钮位置优化**：新建任务按钮保持在标题下方（仅展开状态显示）
- **交互一致性**：所有状态切换都通过头部的统一按钮控制

### 🔄 状态变化效果

**展开状态：**
\`\`\`text
┌─────────────────────────────┐
│ 资源管理器              ◀   │  ← 折叠按钮
├─────────────────────────────┤
│ [新建AI协同指令]            │  ← 新建按钮
├─────────────────────────────┤
│ 📋 任务列表...              │  ← 任务内容
└─────────────────────────────┘
`,
    toolMessageTitle: '',
    toolMessageDesc: '',
    toolMessageIsComplete: true,
  },
  {
    messageType: MessageItemTypes.User,
    markdownContent: '但是左边的任务列表，新建任务你没有实现，还有中间的需求问答你也没有UI组件',
  },
  {
    messageType: MessageItemTypes.Assistant,
    thinkTime: '0.93s',
    thinkContent: ` <p>看起来代码基本完整了。现在让我创建一个简单的预览来展示更新后的效果。</p>`,
    markdownContent: `# 🎯 更新完成的功能

## ✅ **最新设计优化**

1. **标题修正**：将"任务管理"改为"资源管理器"，与 CodeEditor.vue 保持一致
2. **折叠按钮优化**：使用统一的左箭头图标，与标题在同一行
3. **绿色按钮样式**：新建任务按钮采用绿色设计，匹配主项目
4. **折叠状态图标**：添加了完整的任务图标预览功能

## 🎨 **视觉效果改进**

**展开状态布局：**
\`\`\`text
┌───────────────────────────────┐
│ 资源管理器 ◀ │ ← 标题与折叠按钮同行
├───────────────────────────────┤
│ [新建AI协同指令] │ ← 绿色按钮
├───────────────────────────────┤
│ 🔍 实际项目重点关注 │ ← 任务列表
│ 📋 项目规划 │
│ ⚙️ 支撑建议 │
│ 🎯 数字化思路 │
└───────────────────────────────┘
\`\`\`
**折叠状态布局：**
\`\`\`text
┌─────┐
│ ⚏ │ ← 资源管理器图标
│ ▶ │ ← 折叠按钮(旋转180度)
├─────┤
│ 🔴 │ ← 高优先级任务
│ ✓ │ ← 已完成任务
│ ○ │ ← 普通任务
│ ○ │ ← 普通任务
├─────┤
│ + │ ← 新建任务按钮
└─────┘
\`\`\`

## 🔧 **技术改进**

- **状态管理**：完善的折叠/展开状态切换逻辑
- **交互反馈**：任务图标悬停效果和缩放动画
- **视觉一致性**：颜色、间距、字体与主项目完全匹配
- **功能完整性**：包含所有最新功能的演示

## 📊 **演示功能**

- ✅ 左侧面板折叠/展开切换
- ✅ 可拖拽分割线调整宽度
- ✅ 实时宽度显示和百分比
- ✅ 折叠状态下的任务图标预览
- ✅ 响应式设计适配

现在您可以打开 **demo.html** 文件，在浏览器中体验完整的最新功能！所有的设计改进都已经完美同步，包括：

1. **优化的折叠按钮** - 与标题同行，使用箭头图标
2. **完整的状态切换** - 展开和折叠状态的完整演示
3. **拖拽分割线** - 中间和右侧面板宽度调整
4. **视觉反馈** - 所有交互都有适当的动画和反馈

演示页面现在完全反映了 CodeEditor.vue 的最新设计！🎉
`,
    toolMessageTitle: '',
    toolMessageDesc: '',
    toolMessageIsComplete: true,
  },
])
</script>

<template>
  <div
    id="message-container"
    class="messages-container relative h-full overflow-y-auto overflow-x-hidden pr-[4px] hide-scroll"
  >
    <div class="min-h-[10px] w-full"></div>
    <MessageItem
      v-for="(item, index) in MessageItems"
      :key="index"
      :message-type="item.messageType"
      :attachments="item.attachments"
      :think-content="item.thinkContent"
      :think-time="item.thinkTime"
      :markdown-content="item.markdownContent"
      :tool-message-title="item.toolMessageTitle"
      :tool-message-desc="item.toolMessageDesc"
      :tool-message-is-complete="item.toolMessageIsComplete"
    />
    <div class="h-[80px] w-full"></div>
  </div>
</template>

<style scoped></style>
