# Pandas 数据分析实战训练营 (静态站点版) - 产品需求文档

## Overview
- **Summary**: 基于 `joyful-pandas` 项目的精选内容，构建一个无需后端、可在线交互的数据分析学习平台，最终部署至 Cloudflare Pages。平台包含 10 个核心训练项目，覆盖数据清洗、分组聚合、购物车分析、聚类、可视化、A/B测试等技能。
- **Purpose**: 为用户提供一个无需安装Python环境即可在线学习和实践数据分析技能的平台，通过交互式代码编辑器和实时结果展示，降低学习门槛，提高学习效率。
- **Target Users**: 数据分析师、数据科学初学者、Python学习者、在校学生等希望提升数据分析能力的用户。

## Goals
- 构建一个基于 Pyodide 的浏览器端 Python 运行环境，支持 pandas、numpy、matplotlib 和 scikit-learn 等核心库
- 实现 10 个数据分析训练项目，每个项目包含初始代码模板和配套数据集
- 提供交互式代码编辑器，支持 Python 语法高亮和自动补全
- 实现代码执行、结果展示（文本、表格、图表）的完整交互流程
- 支持代码自动保存到浏览器 LocalStorage
- 最终部署到 Cloudflare Pages，提供公开访问

## Non-Goals (Out of Scope)
- 后端服务器或数据库
- 用户账号系统和云存储
- 实时协作功能
- 复杂的权限管理
- 性能优化到支持大规模数据集（单个CSV文件建议小于2MB）

## Background & Context
- 基于 `joyful-pandas` 项目的精选内容
- 使用 Pyodide 在浏览器中运行 Python 代码，无需后端服务器
- 采用现代前端技术栈：React + TypeScript + Vite
- 目标是构建一个轻量级、可直接部署的静态站点

## Functional Requirements
- **FR-1**: 项目导航功能 - 左侧栏展示10个项目的标题与简介，支持切换
- **FR-2**: 代码实验室功能 - 分屏显示代码编辑器和输出结果（文本/表格/图表）
- **FR-3**: 数据集预览功能 - 每个项目可预览内置的 CSV 数据前 5 行
- **FR-4**: 重置/参考答案功能 - 提供“重置代码”和“查看提示”按钮
- **FR-5**: 进度保存功能 - 代码自动保存至浏览器 LocalStorage
- **FR-6**: Pyodide 集成 - 初始化 Pyodide，加载必要的 Python 包，执行用户代码并捕获输出

## Non-Functional Requirements
- **NFR-1**: 性能要求 - Pyodide 初始化时间控制在合理范围内，代码执行响应速度快
- **NFR-2**: 可用性要求 - 界面简洁专业，适合学习场景，操作流程清晰
- **NFR-3**: 兼容性要求 - 支持主流现代浏览器（Chrome, Firefox, Safari, Edge）
- **NFR-4**: 可部署性要求 - 能够通过 Vite 构建生成纯静态文件，可直接部署到 Cloudflare Pages

## Constraints
- **Technical**: 使用 Pyodide 作为运行时环境，包大小限制（建议单个CSV < 2MB）
- **Business**: 无特殊预算或时间限制，以功能完整性和质量为优先
- **Dependencies**: 依赖 Pyodide、React、TypeScript、Vite、CodeMirror 6、Ant Design 或 Tailwind CSS

## Assumptions
- 用户具备基本的 Python 和数据分析知识
- 浏览器支持 Web Worker 和现代 JavaScript 特性
- Cloudflare Pages 免费计划足以支持项目部署和访问
- 数据集大小在 Pyodide 处理能力范围内

## Acceptance Criteria

### AC-1: 项目导航功能
- **Given**: 用户访问平台
- **When**: 用户点击左侧导航栏中的项目
- **Then**: 右侧工作区加载对应项目的代码和数据集
- **Verification**: `human-judgment`

### AC-2: 代码执行功能
- **Given**: 用户在编辑器中编写代码
- **When**: 用户点击“运行”按钮
- **Then**: 代码通过 Pyodide 执行，输出结果显示在右侧面板
- **Verification**: `programmatic`

### AC-3: 图表显示功能
- **Given**: 用户运行包含 matplotlib 绘图代码
- **When**: 代码执行完成
- **Then**: 生成的图表以图片形式显示在输出区
- **Verification**: `programmatic`

### AC-4: 数据集预览功能
- **Given**: 用户选择一个项目
- **When**: 用户查看数据集预览
- **Then**: 显示对应 CSV 文件的前 5 行数据
- **Verification**: `programmatic`

### AC-5: 代码保存功能
- **Given**: 用户修改编辑器中的代码
- **When**: 用户切换项目或刷新页面
- **Then**: 代码自动保存到 LocalStorage，重新加载后恢复
- **Verification**: `programmatic`

### AC-6: 重置功能
- **Given**: 用户修改了代码
- **When**: 用户点击“重置”按钮
- **Then**: 编辑器恢复为初始代码模板
- **Verification**: `programmatic`

### AC-7: 构建与部署
- **Given**: 项目开发完成
- **When**: 执行 `npm run build` 命令
- **Then**: 生成 `dist` 目录，包含可部署的静态文件
- **Verification**: `programmatic`

## Open Questions
- [ ] 具体选择 Ant Design 还是 Tailwind CSS + shadcn/ui 作为 UI 组件库
- [ ] `joyful-pandas` 项目的具体内容和数据集结构
- [ ] 10个具体训练项目的详细内容和要求