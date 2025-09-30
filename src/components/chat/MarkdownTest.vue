<script setup lang="ts">
import { ref } from 'vue'
import MarkdownBlock from '@/components/chat/MarkdownBlock.vue'
import TodoListPanel from '@/components/chat/TodoListDisplay.vue'
import CommandExecution from '@/components/c-command/CommandExecution.vue'
const markdownContent = ref(`
# AI Pet - 智能桌面宠物 🐱

AI Pet 是一款基于 Electron、Vue 3 和 TypeScript 开发的智能桌面宠物应用。它集成了 Live2D 动画、AI 聊天、语音合成等丰富的交互功能,为用户创造一个有趣的桌面伴侣体验。
> ddd
## ✨ 主要功能

# 欢迎使用 \`Arya\` 在线 Markdown 编辑器

[Arya](https://markdown.lovejade.cn/?ref=markdown.lovejade.cn)，是一款基于 \`Vue\`、\`Vditor\`，为未来而构建的在线 Markdown 编辑器；轻量且强大：内置粘贴 HTML 自动转换为 Markdown，支持流程图、甘特图、时序图、任务列表，可导出携带样式的图片、PDF、微信公众号特制的 HTML 等等。

---

> cdsjbjbkjv

## 如何使用

**微注**：清空目前这份默认文档，即处于可使用态。[Arya](https://markdown.lovejade.cn/?ref=markdown.lovejade.cn) 另一大优点在于：编辑内容只会在您本地进行保存，不会上传您的数据至服务器，**绝不窥测用户个人隐私，可放心使用**；Github 源码：[markdown-online-editor](https://github.com/nicejade/markdown-online-editor)，部分功能仍在开发🚧，敬请期待。

默认为[所见即所得](https://hacpai.com/article/1577370404903?ref=github.com)模式，可通过 \`⌘-⇧-M\`（\`Ctrl-⇧-M\`）进行切换；或通过以下方式：

- 所见即所得：\`⌘-⌥-7\`（\`Ctrl-alt-7\`）；
- 即时渲染：\`⌘-⌥-8\`（\`Ctrl-alt-8\`）；
- 分屏渲染：\`⌘-⌥-9\`（\`Ctrl-alt-9\`）；

### PPT 预览

如果您用作 \`PPT\` 预览（入口在\`设置\`中），需要注意，这里暂还不能支持各种图表的渲染；您可以使用 \`---\` 来定义水平方向上幻灯片，用 \`--\` 来定义垂直幻灯片；更多设定可以参见 [RevealJs 文档](https://github.com/hakimel/reveal.js#table-of-contents)。

---

## 什么是 Markdown

\`Markdown\` 是一种方便记忆、书写的纯文本标记语言，用户可以使用这些标记符号，以最小的输入代价，生成极富表现力的文档：譬如您正在阅读的这份文档。它使用简单的符号标记不同的标题，分割不同的段落，**粗体**、*斜体* 或者[超文本链接](https://vue-cli3.lovejade.cn/explore/)，更棒的是，它还可以：

---

### 1. 制作待办事宜 \`Todo\` 列表

- [x] 🎉 通常 \`Markdown\` 解析器自带的基本功能；
- [x] 🍀 支持**流程图**、**甘特图**、**时序图**、**任务列表**；
- [x] 🏁 支持粘贴 HTML 自动转换为 Markdown；
- [x] 💃🏻 支持插入原生 Emoji、设置常用表情列表；
- [x] 🚑 支持编辑内容保存**本地存储**，防止意外丢失；
- [x] 📝 支持**实时预览**，主窗口大小拖拽，字符计数；
- [x] 🛠 支持常用快捷键(**Tab**)，及代码块添加复制
- [x] ✨ 支持**导出**携带样式的 PDF、PNG、JPEG 等；
- [x] ✨ 升级 Vditor，新增对 \`echarts\` 图表的支持；
- [x] 👏 支持检查并格式化 Markdown 语法，使其专业；
- [x] 🦑 支持五线谱、及[部分站点、视频、音频解析](https://github.com/b3log/vditor/issues/117?ref=hacpai.com#issuecomment-526986052)；
- [x] 🌟 增加对**所见即所得**编辑模式的支持(\`⌘-⇧-M\`)；

---
- [ ] ddd
### 2. 书写一个质能守恒公式[^LaTeX]

$$
E=mc^2
$$

---

### 3. 高亮一段代码[^code]

\`\`\`js
// 给页面里所有的 DOM 元素添加一个 1px 的描边（outline）;
[].forEach.call($$("*"),function(a){
  a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16);
})
\`\`\`

---

### 4. 高效绘制[流程图](https://github.com/knsv/mermaid#flowchart)

\`\`\`mermaid
graph TD
    A[用户请求] --> B[语义解析]
    B --> C[RAG检索]

    C -->|✅ 知识库匹配| D[上下文增强]
    C -->|❌ 无匹配| E[任务分解]

    D --> E

    E --> F{工具选择}

    F -->|🛠️ 核心工具| G{基础操作}
    F -->|🔌 MCP扩展服务| H{MCP操作}

    G -->|✏️ 文件操作| I[读写/替换]
    G -->|🖥️ 系统命令执行| J[执行命令]
    G -->|🔍 代码分析| K[代码分析]

    H -->|⚙️ 使用MCP工具| L[使用MCP工具]
    H -->|📦 访问MCP资源| M[访问MCP资源]

    I --> N[结果验证]
    J --> N
    K --> N
    L --> N
    M --> N

    N --> O{完成判断}

    O -->|✅| P[提交最终结果]
    O -->|❌| E
\`\`\`

---

### 5. 高效绘制[序列图](https://github.com/knsv/mermaid#sequence-diagram)

\`\`\`mermaid
sequenceDiagram
  participant Alice
  participant Bob
  Alice->John: Hello John, how are you?
  loop Healthcheck
      John->John: Fight against hypochondria
  end
  Note right of John: Rational thoughts <br/>prevail...
  John-->Alice: Great!
  John->Bob: How about you?
  Bob-->John: Jolly good!
\`\`\`

---

### 6. 高效绘制[甘特图](https://github.com/knsv/mermaid#gantt-diagram)

> **甘特图**内在思想简单。基本是一条线条图，横轴表示时间，纵轴表示活动（项目），线条表示在整个期间上计划和实际的活动完成情况。它直观地表明任务计划在什么时候进行，及实际进展与计划要求的对比。

\`\`\`mermaid
gantt
  title 项目开发流程
  section 项目确定
    需求分析       :a1, 2019-06-22, 3d
    可行性报告     :after a1, 5d
    概念验证       : 5d
  section 项目实施
    概要设计      :2019-07-05  , 5d
    详细设计      :2019-07-08, 10d
    编码          :2019-07-15, 10d
    测试          :2019-07-22, 5d
  section 发布验收
    发布: 2d
    验收: 3d
\`\`\`

### 7. 支持图表

\`\`\`echarts
{
  "backgroundColor": "#212121",
  "title": {
    "text": "「晚晴幽草轩」访问来源",
    "subtext": "2019 年 6 月份",
    "x": "center",
    "textStyle": {
      "color": "#f2f2f2"
    }
  },
  "tooltip": {
    "trigger": "item",
    "formatter": "{a} <br/>{b} : {c} ({d}%)"
  },
  "legend": {
    "orient": "vertical",
    "left": "left",
    "data": [
      "搜索引擎",
      "直接访问",
      "推荐",
      "其他",
      "社交平台"
    ],
    "textStyle": {
      "color": "#f2f2f2"
    }
  },
  "series": [
    {
      "name": "访问来源",
      "type": "pie",
      "radius": "55%",
      "center": [
        "50%",
        "60%"
      ],
      "data": [
        {
          "value": 10440,
          "name": "搜索引擎",
          "itemStyle": {
            "color": "#ef4136"
          }
        },
        {
          "value": 4770,
          "name": "直接访问"
        },
        {
          "value": 2430,
          "name": "推荐"
        },
        {
          "value": 342,
          "name": "其他"
        },
        {
          "value": 18,
          "name": "社交平台"
        }
      ],
      "itemStyle": {
        "emphasis": {
          "shadowBlur": 10,
          "shadowOffsetX": 0,
          "shadowColor": "rgba(0, 0, 0, 0.5)"
        }
      }
    }
  ]
}
\`\`\`

> **备注**：上述 echarts 图表📈，其数据，须使用严格的 **JSON** 格式；您可使用 JSON.stringify(data)，将对象传换从而得标准数据，即可正常使用。

---

### 8. 绘制表格

| 作品名称        | 在线地址   |  上线日期  |
| :--------  | :-----  | :----:  |
| 逍遥自在轩 | [https://niceshare.site](https://niceshare.site/?ref=markdown.lovejade.cn) |2024-04-26|
| 玉桃文飨轩 | [https://share.lovejade.cn](https://share.lovejade.cn/?ref=markdown.lovejade.cn) |2022-08-26|
| 缘知随心庭 | [https://fine.niceshare.site](https://fine.niceshare.site/?ref=markdown.lovejade.cn) |2022-02-26|
| 静轩之别苑 | [http://quickapp.lovejade.cn](http://quickapp.lovejade.cn/?ref=markdown.lovejade.cn) |2019-01-12|
| 晚晴幽草轩 | [https://www.jeffjade.com](https://www.jeffjade.com/?ref=markdown.lovejade.cn) |2014-09-20|

---

### 9. 更详细语法说明

想要查看更详细的语法说明，可以参考这份 [Markdown 资源列表](https://github.com/nicejade/nice-front-end-tutorial/blob/master/tutorial/markdown-tutorial.md)，涵盖入门至进阶教程，以及资源、平台等信息，能让您对她有更深的认知。

总而言之，不同于其它**所见即所得**的编辑器：你只需使用键盘专注于书写文本内容，就可以生成印刷级的排版格式，省却在键盘和工具栏之间来回切换，调整内容和格式的麻烦。**Markdown 在流畅的书写和印刷级的阅读体验之间找到了平衡。** 目前它已经成为世界上最大的技术分享网站 \`GitHub\` 和 技术问答网站 \`StackOverFlow\` 的御用书写格式，而且越发流行，正在在向各行业渗透。

最新更新于 2025.04.16


### 🎭 Live2D 桌面宠物
- 支持 Live2D 模型显示和动画播放
- 可自定义宠物模型和动作
- 实时交互响应

### 🤖 AI 智能对话
- 集成多个 AI 服务 (OpenAI 等)
- 支持文本和语音对话
- 智能上下文记忆

### 🎵 语音合成 (TTS)
- 集成火山引擎语音合成
- 多种音色选择
- 实时语音播放

### 👥 社交功能
- 用户注册和登录系统
- 群聊创建和管理
- 朋友圈动态分享

### 📁 文件管理
- 图片上传和压缩
- 音频文件处理
- 本地文件存储

## 🛠️ 技术栈

- **框架**: Electron 28.2.0
- **前端**: Vue 3.5 + TypeScript 5.8
- **UI 组件**: Element Plus 2.10
- **状态管理**: Pinia 3.0
- **数据库**: Better-sqlite3 12.2
- **构建工具**: Electron-vite 3.1
- **动画**: Live2D + PixiJS 6.5
- **样式**: TailwindCSS 4.1

## 📦 项目结构

\`\`\`
ai-pet/
├── src/
│   ├── main/                 # Electron 主进程
│   │   ├── services/         # 后端服务
│   │   ├── manager/          # 管理器模块
│   │   └── api/             # API 接口
│   ├── renderer/            # Vue 前端渲染进程
│   │   ├── components/      # Vue 组件
│   │   ├── stores/          # Pinia 状态管理
│   │   └── utils/           # 工具函数
│   └── preload/             # 预加载脚本
├── resources/               # 静态资源
│   ├── live2d/             # Live2D 模型
│   ├── audio/              # 音频文件
│   └── image/              # 图片资源
└── build/                  # 构建配置
\`\`\`

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0 (推荐)

### 安装依赖

\`\`\`bash
# 推荐使用 pnpm
pnpm install

# 或使用 npm
npm install
\`\`\`

### 开发模式

\`\`\`bash
# Windows 开发
pnpm dev

# macOS 开发
pnpm dev-mac

# 热重载开发模式
pnpm dev-hot-test
\`\`\`

### 构建应用

\`\`\`bash
# Windows 构建
pnpm build:win

# macOS 构建
pnpm build:mac

# Linux 构建
pnpm build:linux

# 仅构建不打包
pnpm build:unpack
\`\`\`

### 代码检查

\`\`\`bash
# ESLint 检查
pnpm lint

# TypeScript 类型检查
pnpm typecheck

# 代码格式化
pnpm format
\`\`\`

## ⚙️ 配置说明

### 应用配置

在 \`config/\` 目录下:
- \`config.json\` - 开发环境配置
- \`config-production.json\` - 生产环境配置

### Live2D 模型配置

在 \`resources/live2d/models/\` 目录下放置模型文件，并配置 \`model.conf.json\`。

### AI 服务配置

在应用设置中配置 AI 服务的 API Key 和端点。

## 🔧 开发工具推荐

- **IDE**: [VSCode](https://code.visualstudio.com/)
- **扩展**:
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
  - [TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)

## 📝 开发指南

### 添加新功能

1. 在 \`src/renderer/src/components/\` 中创建组件
2. 在 \`src/main/services/\` 中添加后端服务
3. 使用 \`src/preload/\` 暴露 API 给渲染进程
4. 更新路由和状态管理

### 调试技巧

\`\`\`bash
# 启用开发者工具
pnpm dev

# 查看日志
tail -f out/logs/desktop-pet.log
\`\`\`

## 🤝 贡献指南

1. Fork 本项目
2. 创建特性分支 (\`git checkout -b feature/AmazingFeature\`)
3. 提交更改 (\`git commit -m 'Add some AmazingFeature'\`)
4. 推送到分支 (\`git push origin feature/AmazingFeature\`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 [MIT License](LICENSE) 许可证。

## 🙏 致谢

- [Electron](https://electronjs.org/) - 跨平台桌面应用框架
- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Live2D](https://www.live2d.com/) - 2D 动画技术
- [Element Plus](https://element-plus.org/) - Vue 3 组件库

## 📞 联系方式

- 项目地址: [GitHub Repository](https://github.com/your-username/ai-pet)
- 问题反馈: [Issues](https://github.com/your-username/ai-pet/issues)
- 邮箱: your-email@example.com

---

⭐ 如果这个项目对您有帮助，请给个 Star 支持一下！

# Hello World

This is **bold** text and this is *italic* text.

\`\`\`javascript
console.log('Hello, World!')
console.log('Hello, World!')
console.log('Hello, World!')
console.log('Hello, World!')
console.log('Hello, World!')
\`\`\`

| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |
`)
const todos: any[] = [
  { id: 1, text: '实现用户登录功能', status: 'completed' },
  { id: 2, text: '编写单元测试', status: 'in_progress' },
  { id: 3, text: '优化数据库查询性能', status: 'not_started' },
  { id: 4, text: '完善文档说明', status: 'not_started' },
  { id: 5, text: '部署到生产环境', status: 'in_progress' },
]

</script>

<template>
  <CommandExecution execution-id="test-1" text="npm install"/>
  <TodoListPanel :todoList="todos" />
  <MarkdownBlock :markdown="markdownContent" />
</template>
