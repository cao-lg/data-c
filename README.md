# Pandas 数据分析实战训练营 (静态站点版)

## 项目概述

基于 `joyful-pandas` 项目的精选内容，构建的一个无需后端、可在线交互的数据分析学习平台。平台包含 10 个核心训练项目，覆盖数据清洗、分组聚合、购物车分析、聚类、可视化、A/B测试等技能。

## 核心技术选型

- **运行时环境**：Pyodide (在浏览器中运行 Python 3.11 + pandas/numpy/matplotlib/scikit-learn)
- **前端框架**：React + TypeScript + Vite
- **代码编辑器**：CodeMirror 6 (支持 Python 语法高亮、自动补全)
- **UI 组件库**：Tailwind CSS
- **构建与部署**：Vite 构建静态文件，Cloudflare Pages 托管

## 项目结构

```
pandas-training-platform/
├── public/
│   └── data/                    # 所有项目的 CSV 数据集
│       ├── retail_orders.csv
│       ├── user_logs.csv
│       ├── market_basket.csv
│       └── ab_test.csv
├── src/
│   ├── components/
│   │   ├── CodeEditor/          # CodeMirror 封装组件
│   │   ├── OutputPanel/         # 结果展示组件（文本、表格、图表切换）
│   │   └── DataPreview/         # 数据集预览组件
│   ├── pages/
│   │   ├── ProjectList.tsx      # 项目选择页
│   │   └── ProjectWorkspace.tsx # 核心实验区
│   ├── pyodide/                 # Pyodide 集成
│   ├── App.tsx
│   └── main.tsx
├── .gitignore
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 安装与运行

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

### 3. 构建生产版本

```bash
npm run build
```

构建完成后，静态文件将生成在 `dist` 目录中。

## 部署到 Cloudflare Pages

1. 登录 Cloudflare 账户
2. 创建一个新的 Pages 项目
3. 选择你的 GitHub 仓库（如果使用 GitHub）
4. 配置构建设置：
   - **构建命令**：`npm run build`
   - **输出目录**：`dist`
5. 点击“部署”按钮

## 功能特性

- **项目导航**：左侧栏展示10个项目的标题与简介，支持切换
- **代码实验室**：分屏显示：左侧为代码编辑器，右侧为输出结果（文本/表格/图表）
- **数据集预览**：每个项目可预览内置的 CSV 数据前 5 行
- **重置/参考答案**：提供“重置代码”按钮
- **进度保存**：代码自动保存至浏览器 LocalStorage
- **Pyodide 集成**：在浏览器中运行 Python 代码，支持 pandas、numpy、matplotlib 和 scikit-learn

## 训练项目

1. **项目01：电商订单数据清洗** - 处理缺失值、异常值，格式化时间列，计算总价
2. **项目02：销售数据分组聚合** - 按产品、地区、时间进行分组，计算销售统计指标
3. **项目03：购物篮分析** - 分析商品关联规则，识别热销组合
4. **项目04：客户聚类分析** - 使用K-means算法对客户进行聚类，识别不同客户群体
5. **项目05：销售数据可视化** - 使用matplotlib绘制销售趋势图、分布图等
6. **项目06：A/B测试分析** - 分析不同方案的效果差异，进行显著性检验
7. **项目07：时间序列分析** - 分析销售数据的时间趋势，进行简单预测
8. **项目08：特征工程** - 创建新特征，优化数据结构，为机器学习做准备
9. **项目09：异常值检测** - 使用统计方法和机器学习算法检测异常数据
10. **项目10：多数据集合并** - 合并多个数据集，进行综合分析

## 注意事项

- Pyodide 核心文件较大（~40MB），首次加载可能需要一些时间
- 所有数据集文件将被打包进 `dist/assets`，单个 CSV 文件建议小于 2MB
- 代码执行在浏览器中进行，复杂计算可能会影响浏览器性能

## 浏览器兼容性

支持主流现代浏览器：
- Chrome
- Firefox
- Safari
- Edge

## 许可证

MIT