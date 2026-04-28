# Pandas 数据分析实战训练营 (静态站点版) - 实施计划

## [x] 任务 1: 初始化 Vite + React + TypeScript 项目
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 使用 Vite 创建 React + TypeScript 项目
  - 配置基本的项目结构和依赖
- **Acceptance Criteria Addressed**: AC-7
- **Test Requirements**:
  - `programmatic` TR-1.1: 项目能够成功创建并启动开发服务器
  - `programmatic` TR-1.2: 执行 `npm run build` 能够生成 `dist` 目录
- **Notes**: 选择合适的 UI 组件库（Ant Design 或 Tailwind CSS）

## [x] 任务 2: 集成 Pyodide Web Worker
- **Priority**: P0
- **Depends On**: 任务 1
- **Description**:
  - 创建 Pyodide Web Worker
  - 实现 Pyodide 初始化和代码执行功能
  - 处理标准输出和错误捕获
- **Acceptance Criteria Addressed**: AC-2, AC-3
- **Test Requirements**:
  - `programmatic` TR-2.1: Pyodide 能够成功初始化并加载必要的包
  - `programmatic` TR-2.2: 执行简单的 Python 代码能够返回正确的输出
  - `programmatic` TR-2.3: 执行包含 matplotlib 绘图的代码能够生成图表
- **Notes**: 注意 Pyodide 的加载时间和性能优化

## [x] 任务 3: 实现 CodeMirror 6 代码编辑器
- **Priority**: P0
- **Depends On**: 任务 1
- **Description**:
  - 集成 CodeMirror 6
  - 配置 Python 语法高亮和自动补全
  - 实现编辑器与 Pyodide 的连接
- **Acceptance Criteria Addressed**: AC-2
- **Test Requirements**:
  - `human-judgment` TR-3.1: 编辑器显示正确，支持 Python 语法高亮
  - `programmatic` TR-3.2: 编辑器内容能够被正确传递给 Pyodide 执行
- **Notes**: 考虑代码编辑器的用户体验和性能

## [x] 任务 4: 实现输出面板组件
- **Priority**: P0
- **Depends On**: 任务 2
- **Description**:
  - 创建输出面板组件
  - 支持文本、表格、图表三种输出类型
  - 实现错误信息的友好显示
- **Acceptance Criteria Addressed**: AC-2, AC-3
- **Test Requirements**:
  - `programmatic` TR-4.1: 文本输出能够正确显示
  - `programmatic` TR-4.2: 表格数据能够以 HTML 表格形式显示
  - `programmatic` TR-4.3: 图表能够以图片形式显示
  - `programmatic` TR-4.4: 错误信息能够友好显示
- **Notes**: 考虑输出面板的布局和用户体验

## [x] 任务 5: 实现数据集预览组件
- **Priority**: P1
- **Depends On**: 任务 2
- **Description**:
  - 创建数据集预览组件
  - 实现 CSV 文件的加载和前 5 行数据的显示
- **Acceptance Criteria Addressed**: AC-4
- **Test Requirements**:
  - `programmatic` TR-5.1: 能够正确加载并显示 CSV 文件的前 5 行数据
  - `human-judgment` TR-5.2: 数据表格显示美观易读
- **Notes**: 考虑数据集预览的性能和用户体验

## [x] 任务 6: 实现项目导航功能
- **Priority**: P1
- **Depends On**: 任务 1
- **Description**:
  - 创建左侧导航栏
  - 实现项目列表的展示和切换
  - 配置项目元数据
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `human-judgment` TR-6.1: 导航栏显示正确，项目列表清晰
  - `programmatic` TR-6.2: 点击项目能够正确切换到对应工作区
- **Notes**: 考虑导航栏的响应式设计

## [x] 任务 7: 实现代码保存和重置功能
- **Priority**: P1
- **Depends On**: 任务 3
- **Description**:
  - 实现代码自动保存到 LocalStorage
  - 实现“重置代码”按钮功能
- **Acceptance Criteria Addressed**: AC-5, AC-6
- **Test Requirements**:
  - `programmatic` TR-7.1: 代码修改后能够自动保存到 LocalStorage
  - `programmatic` TR-7.2: 刷新页面后代码能够从 LocalStorage 恢复
  - `programmatic` TR-7.3: 点击“重置”按钮能够恢复初始代码
- **Notes**: 考虑 LocalStorage 的存储限制和错误处理

## [x] 任务 8: 准备 10 个训练项目和数据集
- **Priority**: P1
- **Depends On**: 任务 1
- **Description**:
  - 创建 10 个训练项目的元数据和初始代码
  - 准备对应的 CSV 数据集
  - 配置项目索引
- **Acceptance Criteria Addressed**: AC-1, AC-4
- **Test Requirements**:
  - `programmatic` TR-8.1: 所有项目能够正确加载
  - `programmatic` TR-8.2: 所有数据集能够正确预览
- **Notes**: 参考 `joyful-pandas` 项目的内容，确保数据集质量和大小合适

## [x] 任务 9: 构建和部署配置
- **Priority**: P2
- **Depends On**: 所有任务
- **Description**:
  - 配置 Vite 构建选项
  - 创建部署到 Cloudflare Pages 的配置文档
- **Acceptance Criteria Addressed**: AC-7
- **Test Requirements**:
  - `programmatic` TR-9.1: 执行 `npm run build` 能够成功生成静态文件
  - `human-judgment` TR-9.2: 部署文档清晰完整
- **Notes**: 考虑构建优化和部署最佳实践

## [x] 任务 10: UI 美化和用户体验优化
- **Priority**: P2
- **Depends On**: 所有任务
- **Description**:
  - 优化整体界面设计
  - 改进响应式布局
  - 提升用户交互体验
- **Acceptance Criteria Addressed**: NFR-2
- **Test Requirements**:
  - `human-judgment` TR-10.1: 界面美观专业，适合学习场景
  - `human-judgment` TR-10.2: 操作流程清晰，用户体验良好
- **Notes**: 参考 jupyterlite 的简约风格