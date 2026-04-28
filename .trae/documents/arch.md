## 1. Architecture Design

```mermaid
flowchart TB
    subgraph Frontend[前端层]
        A[React@18 组件]
        B[Vite 构建工具]
        C[TailwindCSS 样式系统]
        D[CodeMirror 代码编辑器]
        E[Pyodide Python运行时]
    end
    
    subgraph StaticAssets[静态资源]
        F[CSV数据集]
        G[配置文件]
    end
    
    A -->|使用| D
    A -->|集成| E
    A -->|加载| F
    B -->|构建| A
    C -->|样式化| A
```

## 2. Technology Description
- **前端框架**：React@18 + TypeScript@5 + Vite@5
- **样式系统**：TailwindCSS@3 + PostCSS
- **代码编辑器**：CodeMirror@6
- **Python运行时**：Pyodide@0.25
- **图标库**：lucide-react
- **状态管理**：React内置 useState + useEffect
- **部署**：Cloudflare Pages（静态网站）

## 3. Route Definitions
| Route | Purpose |
|-------|---------|
| / | 项目列表页（首页） |
| /project/:id | 训练工作区页面 |

## 4. File Structure
```
/workspace
├── public/
│   └── data/              # CSV数据集文件
├── src/
│   ├── components/        # 可复用组件
│   │   ├── CodeEditor/
│   │   ├── OutputPanel/
│   │   ├── DataPreview/
│   │   └── ProjectCard/
│   ├── pages/             # 页面组件
│   │   ├── ProjectList.tsx
│   │   └── ProjectWorkspace.tsx
│   ├── pyodide/           # Pyodide集成
│   ├── App.tsx            # 应用主组件
│   ├── main.tsx           # 入口文件
│   └── index.css          # 全局样式
├── .trae/documents/       # 项目文档
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 5. Key Components

### 5.1 ProjectList（项目列表页）
- 功能：展示所有训练项目卡片
- 布局：Hero区域 + 项目网格
- 交互：卡片悬停效果、点击进入详情

### 5.2 ProjectWorkspace（训练工作区）
- 功能：提供代码编辑和运行环境
- 布局：左侧信息栏 + 右侧工作区
- 交互：运行代码、重置代码、自动保存

### 5.3 CodeEditor（代码编辑器）
- 功能：Python代码编辑
- 技术：CodeMirror 6 + Python语法高亮
- 特性：深色主题、自动保存

### 5.4 OutputPanel（输出面板）
- 功能：显示代码执行结果
- 特性：支持文本输出和matplotlib图表展示

## 6. State Management
- 使用 React 内置的 `useState` 和 `useEffect`
- 代码持久化：localStorage
- 无后端，所有状态在前端管理

## 7. Performance Optimization
- Pyodide延迟加载
- 代码编辑器按需渲染
- 响应式图片加载
- 组件懒加载（可选）
