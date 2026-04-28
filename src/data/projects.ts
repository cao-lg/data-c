export interface StepDetail {
  title: string;
  icon: string;
  color: string;
  summary: string;
  explanation: string;
  codeExample?: string;
  tips?: string;
  commonMistakes?: string;
}

export interface TutorialSection {
  title: string;
  icon: string;
  color: string;
  steps: StepDetail[];
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  dataset: string;
  starterCode: string;
  referenceCode: string;
  tutorials: TutorialSection[];
}

export const projectsData: ProjectData[] = [
  {
    id: '01-cleaning',
    title: '数据清洗实战',
    description: '掌握Pandas数据清洗的核心技能，包括处理缺失值、重复值、异常值等关键步骤。',
    difficulty: '入门',
    duration: '30分钟',
    dataset: 'retail_orders.csv',
    starterCode: '',
    referenceCode: `import pandas as pd
import numpy as np

print("=" * 50)
print("📊 Pandas 数据清洗全流程教程（小白版）")
print("=" * 50)

df = pd.read_csv('retail_orders.csv')
print("\\n📖 数据形状:", df.shape)
print("列名:", list(df.columns))
print("\\n前5行:")
print(df.head())

# 处理重复值
duplicates = df.duplicated().sum()
print(f"\\n发现 {duplicates} 条重复数据")
if duplicates > 0:
    df = df.drop_duplicates(keep='first')
    print("已删除重复数据")

# 处理缺失值
missing = df.isnull().sum()
print("\\n缺失值统计:")
print(missing)

# 添加衍生列
df['total_amount'] = df['quantity'] * df['price']
print("\\n✅ 订单金额: total_amount = quantity * price")

# 处理日期格式
df['order_date'] = pd.to_datetime(df['order_date'], errors='coerce')
df['order_month'] = df['order_date'].dt.to_period('M')
print("\\n✅ 日期格式转换完成")

print("\\n最终数据预览:")
print(df.head())
print("\\n🎉 恭喜！数据清洗完成！")`,
    tutorials: [
      {
        title: '数据清洗全流程概述',
        icon: 'Trophy',
        color: 'from-blue-500 to-purple-600',
        steps: [
          {
            title: '什么是数据清洗？',
            icon: 'BookOpen',
            color: 'from-blue-400 to-indigo-500',
            summary: '数据清洗是数据分析的第一步，解决数据质量问题',
            explanation: `数据清洗（Data Cleaning）是指发现并纠正数据文件中可识别的错误的最后一道程序，包括检查数据一致性，处理无效值和缺失值等。

为什么需要数据清洗？
- 现实数据通常是不完整的（缺少值）、可能有噪声（错误值）
- 数据清洗确保数据分析结果的准确性和可靠性
- 好的数据清洗可以提高模型的性能和预测准确度`,
            tips: '数据清洗通常占用数据分析项目的60-80%的时间，不要轻视！',
            commonMistakes: '不要过度清洗！删除太多数据可能会丢失重要信息。'
          }
        ]
      },
      {
        title: '一、数据清洗前的准备',
        icon: 'BookOpen',
        color: 'from-emerald-500 to-teal-600',
        steps: [
          {
            title: '1.1 导入必要工具库',
            icon: 'Database',
            color: 'from-green-400 to-emerald-500',
            summary: '学习导入 Pandas 和 NumPy 库',
            explanation: `Pandas 是 Python 数据分析的核心库，提供了高效的数据操作工具。

为什么选择 Pandas？
- 强大的数据结构：Series 和 DataFrame
- 灵活的数据操作：筛选、分组、合并
- 丰富的 IO 工具：读写 CSV、Excel 等
- 优秀的数据清洗功能`,
            codeExample: `import pandas as pd  # 处理表格数据的核心库
import numpy as np   # 处理数值计算的库`,
            tips: '习惯上 pd 和 np 是标准简写，这是业内约定俗成的做法。',
            commonMistakes: '不要用 from pandas import *，这会污染命名空间。'
          },
          {
            title: '1.2 读取原始数据',
            icon: 'FileText',
            color: 'from-yellow-400 to-orange-500',
            summary: '使用 pd.read_csv() 读取 CSV 文件',
            explanation: `CSV（Comma-Separated Values）是最常见的数据格式。

pd.read_csv() 参数详解：
- filepath_or_buffer：文件路径或文件对象
- sep：分隔符，默认是逗号
- header：表头所在的行数
- index_col：索引列
- na_values：NA 值的列表

常见的错误处理：
- FileNotFoundError：检查文件路径是否正确
- UnicodeDecodeError：尝试 encoding='utf-8' 或 'gbk'
- ParserError：可能需要指定 sep 参数`,
            codeExample: `df = pd.read_csv('retail_orders.csv')  # 读取CSV文件

# 常见读取方式
df = pd.read_csv('data.csv', encoding='utf-8')  # 指定编码
df = pd.read_csv('data.csv', sep=';')  # 分号分隔
df = pd.read_excel('data.xlsx')  # Excel 文件`,
            tips: '可以使用 print(df.info()) 快速查看数据基本信息。',
            commonMistakes: '忘记检查文件路径是否正确！使用绝对路径更安全。'
          },
          {
            title: '1.3 初步了解数据',
            icon: 'Info',
            color: 'from-cyan-400 to-blue-500',
            summary: '使用4个关键命令快速认识数据',
            explanation: `初步了解数据是数据清洗的第一步，让我们知道数据的规模、结构和质量。

关键探索命令：
- df.shape：查看数据形状（行数,列数）
- df.columns：查看所有列名
- df.dtypes：查看每列的数据类型
- df.head()/df.tail()：查看前/后5行
- df.info()：查看数据基本信息
- df.describe()：统计性描述`,
            codeExample: `df.shape  # 查看数据形状
df.columns  # 查看列名
df.dtypes  # 查看数据类型
df.head()  # 查看前5行
df.tail()  # 查看后5行
df.info()  # 完整信息
df.describe()  # 统计性描述`,
            tips: '可以使用 df.sample(10) 随机查看10行数据，更全面了解数据。',
            commonMistakes: '只看head()就开始工作，可能错过数据的真实问题！'
          }
        ]
      },
      {
        title: '二、9步完整数据清洗流程',
        icon: 'Target',
        color: 'from-amber-500 to-orange-600',
        steps: [
          {
            title: '2.1 处理重复值',
            icon: 'RotateCcw',
            color: 'from-red-400 to-pink-500',
            summary: '删除完全相同的行，避免重复统计',
            explanation: `重复值会导致统计结果出现偏差，必须处理。

处理方法：
1. 检测重复值：df.duplicated()
2. 统计重复值数量：df.duplicated().sum()
3. 删除重复值：df.drop_duplicates()

参数说明：
- keep='first'：保留第一次出现的，删除后续重复
- keep='last'：保留最后一次出现的
- keep=False：删除所有重复值`,
            codeExample: `# 检查重复值
duplicates = df.duplicated().sum()
print(f"发现 {duplicates} 条重复数据")

# 删除重复值
if duplicates > 0:
    df = df.drop_duplicates(keep='first')
    print("已删除重复数据")

# 按某列去重
df = df.drop_duplicates(subset=['customer_id'], keep='first')`,
            tips: '去重前先检查一下重复的原因，有时候重复是业务场景，不是错误！',
            commonMistakes: '不分青红皂白就去重，可能丢失重要信息！'
          },
          {
            title: '2.2 处理缺失值',
            icon: 'Info',
            color: 'from-blue-400 to-cyan-500',
            summary: '填补空值（NaN），避免分析出错',
            explanation: `缺失值（Missing Values）是最常见的数据质量问题。

常见缺失值处理策略：
1. 删除：df.dropna() - 适用于缺失值较少的情况
2. 填充：df.fillna() - 适用于缺失值较多的情况
3. 插值：df.interpolate() - 时间序列的线性插值

填充策略选择：
- 文本列：用"未知"或最常见值填充
- 数值列：用均值/中位数/众数填充
- 时间列：用前向填充（ffill）或后向填充（bfill）`,
            codeExample: `# 检查缺失值
missing = df.isnull().sum()
print("缺失值统计:")
print(missing)

# 填充文本列
df['city'] = df['city'].fillna('未知')

# 填充数值列
df['price'] = df['price'].fillna(df['price'].median())

# 删除缺失值
df = df.dropna(subset=['customer_id'])`,
            tips: '对于数值列，中位数比均值更稳健，不受极端值影响。',
            commonMistakes: '统一用0填充缺失值！这会严重扭曲数据分布。'
          },
          {
            title: '2.3 处理文本列格式',
            icon: 'FileText',
            color: 'from-purple-400 to-indigo-500',
            summary: '统一文本格式，避免"北京"和"北京 "被当成不同值',
            explanation: `文本数据格式不统一是常见问题，需要标准化处理。

常见文本处理：
1. 去除空格：str.strip()、str.lstrip()、str.rstrip()
2. 大小写转换：str.lower()、str.upper()
3. 替换：str.replace()
4. 拆分/合并：str.split()、str.join()
5. 提取：str.extract()`,
            codeExample: `# 去除首尾空格
df['product'] = df['product'].str.strip()

# 统一大小写
df['city'] = df['city'].str.lower()

# 统一名称
df['city'] = df['city'].replace('beijing', '北京')

# 拆分列
df[['first_name', 'last_name']] = df['name'].str.split(' ', expand=True)`,
            tips: "可以使用 df['col'].value_counts() 查看有哪些不同值，再决定如何统一。",
            commonMistakes: '处理前不检查数据就开始统一，可能导致重要信息丢失！'
          },
          {
            title: '2.4 处理数值列异常值',
            icon: 'AlertCircle',
            color: 'from-orange-400 to-red-500',
            summary: '修正不合理的数值（比如价格为负数、数量为0）',
            explanation: `异常值（Outliers）会严重影响统计分析结果。

异常值检测方法：
1. IQR方法（四分位距）：最常用
2. Z-score方法
3. 业务经验判断

处理策略：
1. 删除异常值
2. 替换为上下限
3. 使用中位数/均值替换
4. 保留并分析原因`,
            codeExample: `# 检查负值
neg_count = (df['price'] < 0).sum()
print(f"发现 {neg_count} 个负值")

# IQR方法检测异常值
Q1 = df['price'].quantile(0.25)
Q3 = df['price'].quantile(0.75)
IQR = Q3 - Q1
lower = Q1 - 1.5 * IQR
upper = Q3 + 1.5 * IQR
outliers = df[(df['price'] < lower) | (df['price'] > upper)]

# 处理异常值
df['price'] = np.where(df['price'] < 0, 0, df['price'])`,
            tips: '异常值不一定是坏数据！先理解异常原因再决定处理方案。',
            commonMistakes: '看到异常值就删除，可能丢失重要的业务信号！'
          },
          {
            title: '2.5 处理日期列格式',
            icon: 'Clock',
            color: 'from-teal-400 to-green-500',
            summary: '将文本格式的日期转换为datetime格式',
            explanation: `时间序列数据需要正确的日期格式才能进行时间分析。

常用日期操作：
1. 转换日期：pd.to_datetime()
2. 提取日期组件：dt.year、dt.month、dt.day
3. 提取星期：dt.dayofweek、dt.day_name()
4. 日期运算：加减日期`,
            codeExample: `# 转换日期
df['order_date'] = pd.to_datetime(df['order_date'], errors='coerce')

# 提取日期组件
df['order_year'] = df['order_date'].dt.year
df['order_month'] = df['order_date'].dt.to_period('M')
df['day_of_week'] = df['order_date'].dt.day_name()
df['is_weekend'] = df['order_date'].dt.dayofweek.isin([5, 6]).astype(int)

# 日期运算
df['days_since_order'] = (pd.Timestamp.now() - df['order_date']).dt.days`,
            tips: "使用 errors='coerce' 可以把无法解析的日期转换成 NaT（Not a Time），避免报错。",
            commonMistakes: '忘记处理日期解析错误，导致后续代码全部崩溃！'
          },
          {
            title: '2.6 数据类型优化',
            icon: 'Database',
            color: 'from-indigo-400 to-purple-500',
            summary: '减少内存占用，提高计算速度',
            explanation: `数据类型优化可以显著提高性能，特别是处理大数据集时。

类型优化策略：
1. 整数列：int64 → int32/int16
2. 浮点数列：float64 → float32
3. 文本列：category类型（基数较低时）
4. 布尔列：object → bool

Pandas 提供的工具：
- df.info(memory_usage='deep')：查看详细内存使用
- pd.to_numeric(downcast=...)：自动向下转换`,
            codeExample: `# 查看当前内存使用
print(df.info(memory_usage='deep'))

# 数值列优化
df['quantity'] = pd.to_numeric(df['quantity'], downcast='integer')
df['price'] = pd.to_numeric(df['price'], downcast='float')

# 类别列优化
df['city'] = df['city'].astype('category')
df['membership'] = df['membership'].astype('category')`,
            tips: '使用 category 类型可以节省大量内存，特别是在数据重复较多的列。',
            commonMistakes: '对基数很高的列使用 category，反而可能增加内存！'
          },
          {
            title: '2.7 添加衍生列',
            icon: 'PlusCircle',
            color: 'from-pink-400 to-rose-500',
            summary: '创建对分析有用的新字段（这一步很重要！）',
            explanation: `特征工程（Feature Engineering）是数据清洗最有创造力的部分！

常见衍生列：
1. 数学运算：加减乘除
2. 日期衍生：月、季、星期等
3. 文本衍生：长度、关键词等
4. 分组衍生：分组统计、排名等
5. 业务逻辑：会员等级、促销活动等`,
            codeExample: `# 订单金额
df['total_amount'] = df['price'] * df['quantity']

# 价格区间
df['price_tier'] = pd.qcut(df['price'], q=4, labels=['低', '中', '高', '很高'])

# 客户生命周期
df['is_recent'] = df['order_date'] > pd.Timestamp.now() - pd.Timedelta(days=30)`,
            tips: '基于业务知识创建的特征，往往比数学运算更有价值！',
            commonMistakes: '创造太多特征，造成维度灾难！'
          },
          {
            title: '2.8 数据质量验证',
            icon: 'CheckCircle',
            color: 'from-green-400 to-emerald-500',
            summary: '最后检查清洗效果，确保数据没问题',
            explanation: `数据质量验证是确保清洗工作成功的关键步骤。

验证清单：
1. 缺失值和重复值处理完成
2. 数据类型正确
3. 数值范围合理
4. 日期格式统一
5. 文本格式标准化
6. 统计性描述检查`,
            codeExample: `# 检查剩余缺失值
print("剩余缺失值:")
print(df.isnull().sum())

# 检查数值合理性
print("\\n数值范围检查:")
print(df[['quantity', 'price', 'total_amount']].describe())

# 检查数据形状
print(f"\\n清洗后数据形状: {df.shape}")

# 抽样检查
print("\\n数据抽样检查:")
print(df.sample(5))`,
            tips: '建议编写数据质量检查函数，在项目中复用！',
            commonMistakes: '认为"差不多就行"，数据质量问题会在分析时被放大！'
          },
          {
            title: '2.9 保存清洗后的数据',
            icon: 'Save',
            color: 'from-blue-400 to-indigo-500',
            summary: '将干净的数据保存为新文件，方便后续分析',
            explanation: `清洗完成后，妥善保存数据成果。

保存格式选择：
- CSV：通用格式，人可读，但文件较大
- Parquet：高效的列式存储，文件小，读取快
- Excel：便于人工查看
- Pickle：Python专用格式

重要参数：
- index=False：不要保存索引
- encoding='utf-8'：避免编码问题`,
            codeExample: `# 保存为CSV
df.to_csv('cleaned_retail_orders.csv', index=False, encoding='utf-8')

# 保存为Parquet
df.to_parquet('cleaned_retail_orders.parquet', index=False)

# 保存为Excel
df.to_excel('cleaned_retail_orders.xlsx', index=False, sheet_name='cleaned')

print("✅ 数据保存成功！")`,
            tips: '同时保存数据清洗的代码和文档，便于复现和审查！',
            commonMistakes: '保存后忘记检查，可能保存了错误的数据！'
          }
        ]
      }
    ]
  },
  {
    id: '02-aggregation',
    title: '分组聚合分析',
    description: '学习使用Pandas进行数据分组和聚合操作，从多个维度分析数据。',
    difficulty: '入门',
    duration: '30分钟',
    dataset: 'retail_orders.csv',
    starterCode: '',
    referenceCode: `import pandas as pd

df = pd.read_csv('retail_orders.csv')
df['total_amount'] = df['quantity'] * df['price']

# 城市分组
city_sales = df.groupby('city')['total_amount'].sum().sort_values(ascending=False)
print("各城市销售额:")
print(city_sales)

# 类别分组
category_stats = df.groupby('category').agg({
    'total_amount': ['sum', 'mean', 'count'],
    'quantity': 'sum'
})
print("\\n类别分析:")
print(category_stats)`,
    tutorials: [
      {
        title: '分组聚合基础概念',
        icon: 'Trophy',
        color: 'from-blue-500 to-cyan-600',
        steps: [
          {
            title: '什么是分组聚合？',
            icon: 'Database',
            color: 'from-blue-400 to-cyan-500',
            summary: '分组聚合是数据分析的核心技能',
            explanation: `分组聚合（Group Aggregation）是SQL中的经典操作，在Pandas中同样强大。

核心思想：
1. 拆分（Split）：按某列的值分组
2. 应用（Apply）：对每组应用函数
3. 组合（Combine）：将结果组合起来

常见聚合函数：
- 数值函数：sum、mean、median、std、var、min、max
- 计数函数：count、size、nunique

Pandas的groupby操作返回一个GroupBy对象，它是惰性的，只有在调用聚合函数时才会真正计算。`,
            codeExample: `# 简单分组
df.groupby('category')['sales'].sum()

# 多字段分组
df.groupby(['category', 'city']).agg({'sales': ['sum', 'mean']})`,
            tips: 'groupby 是懒加载的，真正计算在调用聚合函数时才会发生。',
            commonMistakes: '忘记重置索引（.reset_index()）导致结果索引混乱！'
          }
        ]
      },
      {
        title: '一、基础分组操作',
        icon: 'Target',
        color: 'from-indigo-500 to-purple-600',
        steps: [
          {
            title: '1.1 单字段分组',
            icon: 'Layers',
            color: 'from-indigo-400 to-purple-500',
            summary: '按单一字段进行分组',
            explanation: `单字段分组是最基础的分组操作，按某一列的值将数据分成若干组。

语法：df.groupby('column_name')['target_column'].agg_function()

常用场景：
- 按城市分组统计销售额
- 按类别分组统计订单数
- 按月份分组统计用户数量`,
            codeExample: `# 按城市分组统计销售额
city_sales = df.groupby('city')['total_amount'].sum()

# 按类别分组统计订单数
category_counts = df.groupby('category')['order_id'].count()

# 按产品名称分组统计总销量
product_sales = df.groupby('product_name')['quantity'].sum()`,
            tips: 'groupby后可以直接调用聚合函数，也可以用agg()方法。',
            commonMistakes: '在groupby后没有调用聚合函数就尝试查看结果！'
          },
          {
            title: '1.2 多字段分组',
            icon: 'Layers',
            color: 'from-purple-400 to-pink-500',
            summary: '按多个字段进行嵌套分组',
            explanation: `多字段分组可以实现更细粒度的分析，形成层级索引。

语法：df.groupby(['col1', 'col2'])['target'].agg_function()

结果会有多层索引，外层是第一个分组字段，内层是第二个分组字段。`,
            codeExample: `# 按类别和城市分组
category_city = df.groupby(['category', 'city'])['total_amount'].sum()

# 三级分组
grouped = df.groupby(['category', 'city', 'product_name'])['quantity'].sum()

# 查看特定分组
result.loc['电子']['北京']  # 查看电子类在北京的销售`,
            tips: '多字段分组后，可以用 .loc 访问特定组合。',
            commonMistakes: '分组字段顺序错误，导致结果不符合预期！'
          },
          {
            title: '1.3 聚合函数详解',
            icon: 'BarChart',
            color: 'from-pink-400 to-rose-500',
            summary: '掌握常用的聚合函数',
            explanation: `Pandas提供了丰富的聚合函数：

数值聚合：
- sum()：求和
- mean()：平均值
- median()：中位数
- min()/max()：最小/最大值
- std()/var()：标准差/方差

计数聚合：
- count()：非空值数量
- size()：每组大小（包括空值）
- nunique()：唯一值数量

统计聚合：
- describe()：统计摘要
- agg()：自定义聚合`,
            codeExample: `# 常用聚合函数
df.groupby('category')['total_amount'].sum()
df.groupby('category')['total_amount'].mean()
df.groupby('category')['total_amount'].max()
df.groupby('category')['total_amount'].count()

# 一次性计算多个统计量
df.groupby('category')['total_amount'].agg(['sum', 'mean', 'count'])`,
            tips: '使用 agg() 可以同时计算多个聚合函数！',
            commonMistakes: '混淆 count() 和 size()！count不包含空值，size包含。'
          }
        ]
      },
      {
        title: '二、高级聚合技巧',
        icon: 'Sparkles',
        color: 'from-amber-500 to-orange-600',
        steps: [
          {
            title: '2.1 使用agg()进行复杂聚合',
            icon: 'Plus',
            color: 'from-amber-400 to-orange-500',
            summary: '对不同列应用不同的聚合函数',
            explanation: `agg()方法支持灵活的聚合操作，可以为不同列指定不同的聚合函数。

语法：df.groupby('col').agg({
    'col1': ['sum', 'mean'],
    'col2': 'count',
    'col3': ['min', 'max']
})`,
            codeExample: `# 多列多聚合函数
category_stats = df.groupby('category').agg({
    'total_amount': ['sum', 'mean', 'count'],
    'quantity': 'sum',
    'price': ['min', 'max']
})

# 重命名聚合结果列
result = df.groupby('category').agg(
    总销售额=('total_amount', 'sum'),
    平均订单金额=('total_amount', 'mean'),
    订单数=('order_id', 'count')
)`,
            tips: '使用字典形式的agg可以对不同列应用不同聚合函数！',
            commonMistakes: '列名拼写错误导致KeyError！'
          },
          {
            title: '2.2 使用transform()进行广播',
            icon: 'RefreshCw',
            color: 'from-orange-400 to-red-500',
            summary: '将聚合结果广播回原始数据',
            explanation: `transform()方法可以将聚合结果广播到每个原始行，保持数据行数不变。

常用场景：
- 计算每个组的均值并添加到每行
- 计算每个用户的累计消费
- 计算每行相对于组均值的偏差`,
            codeExample: `# 计算每个类别的平均价格，并广播到每行
df['category_avg_price'] = df.groupby('category')['price'].transform('mean')

# 计算每行价格相对于类别的偏差
df['price_deviation'] = df['price'] - df['category_avg_price']

# 计算每个用户的累计订单金额
df['cumulative_total'] = df.groupby('customer_id')['total_amount'].cumsum()`,
            tips: 'transform()返回的结果长度与原数据相同！',
            commonMistakes: '误用transform()代替agg()！'
          },
          {
            title: '2.3 使用filter()筛选组',
            icon: 'Search',
            color: 'from-red-400 to-pink-500',
            summary: '根据组的聚合结果筛选组',
            explanation: `filter()方法可以根据组级别的条件筛选出满足条件的组。

语法：df.groupby('col').filter(lambda x: condition)

返回的是原始行，而不是聚合结果。`,
            codeExample: `# 筛选订单数大于10的类别
filtered = df.groupby('category').filter(lambda x: len(x) > 10)

# 筛选总销售额大于10000的城市
high_sales = df.groupby('city').filter(lambda x: x['total_amount'].sum() > 10000)

# 筛选平均价格在某个范围内的类别
mid_price = df.groupby('category').filter(
    lambda x: (x['price'].mean() >= 100) & (x['price'].mean() <= 1000)
)`,
            tips: 'filter()返回的是原始数据行，不是聚合结果！',
            commonMistakes: '在filter中返回聚合结果而不是布尔值！'
          },
          {
            title: '2.4 使用apply()进行自定义操作',
            icon: 'Wrench',
            color: 'from-pink-400 to-rose-500',
            summary: '对每个组应用自定义函数',
            explanation: `apply()方法提供了最大的灵活性，可以对每个组应用任意自定义函数。

语法：df.groupby('col').apply(custom_function)

自定义函数接收一个DataFrame（每个组），返回任意类型的结果。`,
            codeExample: `# 自定义聚合函数
def analyze_group(group):
    return pd.Series({
        'total_sales': group['total_amount'].sum(),
        'avg_price': group['price'].mean(),
        'max_quantity': group['quantity'].max(),
        'unique_customers': group['customer_id'].nunique()
    })

# 应用自定义函数
result = df.groupby('category').apply(analyze_group)

# 复杂的自定义分析
def top_products(group, n=3):
    return group.sort_values('total_amount', ascending=False).head(n)

top3 = df.groupby('category').apply(top_products)`,
            tips: 'apply()功能最强，但性能不如agg()，简单操作尽量用agg()！',
            commonMistakes: '在apply中修改原始数据！'
          }
        ]
      },
      {
        title: '三、分组结果处理',
        icon: 'FileText',
        color: 'from-teal-500 to-green-600',
        steps: [
          {
            title: '3.1 重置索引',
            icon: 'RotateCcw',
            color: 'from-teal-400 to-green-500',
            summary: '将多级索引转换为普通列',
            explanation: `groupby的结果通常是多级索引（MultiIndex），需要重置索引以便进一步处理。

使用 reset_index() 将索引列转换为普通列。`,
            codeExample: `# 分组后重置索引
result = df.groupby('category')['total_amount'].sum().reset_index()

# 多字段分组后重置索引
result = df.groupby(['category', 'city'])['total_amount'].sum().reset_index()

# 设置名称
result.columns = ['类别', '城市', '总销售额']`,
            tips: '重置索引后更容易进行后续的数据操作！',
            commonMistakes: '忘记重置索引导致后续操作失败！'
          },
          {
            title: '3.2 排序结果',
            icon: 'ArrowUpDown',
            color: 'from-green-400 to-emerald-500',
            summary: '对聚合结果进行排序',
            explanation: `排序可以帮助我们更好地理解数据分布。

使用 sort_values() 进行排序。`,
            codeExample: `# 按销售额降序排序
sorted_result = df.groupby('city')['total_amount'].sum().sort_values(ascending=False)

# 多列排序
result = df.groupby(['category', 'city'])['total_amount'].sum().reset_index()
result = result.sort_values(['total_amount', 'category'], ascending=[False, True])`,
            tips: '排序可以让重要的数据更突出！',
            commonMistakes: '排序后索引混乱，记得重置索引！'
          }
        ]
      }
    ]
  },
  {
    id: '03-market-basket',
    title: '购物篮分析',
    description: '通过分析顾客的购买行为，发现商品之间的关联关系。',
    difficulty: '进阶',
    duration: '45分钟',
    dataset: 'market_basket.csv',
    starterCode: '',
    referenceCode: `import pandas as pd

df = pd.read_csv('market_basket.csv')

print(f"总订单数: {df['InvoiceNo'].nunique()}")
print(f"商品种类数: {df['Description'].nunique()}")

# 商品销售排行
product_sales = df.groupby('Description')['Quantity'].sum().sort_values(ascending=False)
print("\\n销量最高的商品:")
print(product_sales.head(10))`,
    tutorials: [
      {
        title: '购物篮分析基础',
        icon: 'Trophy',
        color: 'from-amber-500 to-orange-600',
        steps: [
          {
            title: '什么是购物篮分析？',
            icon: 'ShoppingCart',
            color: 'from-amber-400 to-orange-500',
            summary: '发现商品之间的关联关系',
            explanation: `购物篮分析（Market Basket Analysis）是零售业的经典数据挖掘技术。

核心思想：通过分析顾客的购买行为，发现哪些商品经常一起被购买。

应用场景：
- 商品推荐："购买了A的顾客还购买了B"
- 货架布局：将关联商品放在一起
- 促销策略：捆绑销售、套餐优惠
- 库存管理：优化补货策略`,
            tips: '购物篮分析是亚马逊"Customers who bought this also bought"功能的基础！',
            commonMistakes: '过度解读偶然出现的关联！'
          },
          {
            title: '核心概念：项集',
            icon: 'Package',
            color: 'from-orange-400 to-red-500',
            summary: '理解项集的概念',
            explanation: `项集（Itemset）是购物篮分析的基本概念：

- 项（Item）：单个商品，如"牛奶"
- 项集（Itemset）：多个项的集合，如{牛奶, 面包}
- k-项集：包含k个项的项集

频繁项集（Frequent Itemset）：
- 支持度（Support）大于某个阈值的项集
- 支持度 = 包含该项集的交易数 / 总交易数`,
            codeExample: `# 计算单个商品的支持度
total_orders = df['InvoiceNo'].nunique()
product_support = df.groupby('Description')['InvoiceNo'].nunique() / total_orders

# 找出高支持度商品
high_support = product_support[product_support > 0.1]`,
            tips: '支持度是衡量商品受欢迎程度的重要指标！',
            commonMistakes: '将支持度和销量混淆！'
          },
          {
            title: '核心指标：支持度、置信度、提升度',
            icon: 'BarChart3',
            color: 'from-red-400 to-pink-500',
            summary: '理解三个核心评估指标',
            explanation: `购物篮分析有三个核心指标：

1. 支持度（Support）：
   P(A ∩ B) = 同时购买A和B的交易数 / 总交易数

2. 置信度（Confidence）：
   P(B|A) = P(A ∩ B) / P(A)
   购买A的顾客中同时购买B的概率

3. 提升度（Lift）：
   Lift = P(B|A) / P(B) = 支持度(A,B) / (支持度(A) × 支持度(B))
   衡量关联规则的强度`,
            codeExample: `# 计算支持度
support_ab = len(orders_with_a_and_b) / total_orders

# 计算置信度
confidence_ab = support_ab / support_a

# 计算提升度
lift_ab = confidence_ab / support_b`,
            tips: '提升度大于1表示正相关，小于1表示负相关！',
            commonMistakes: '只看置信度不看提升度，可能得出错误结论！'
          }
        ]
      },
      {
        title: '一、数据准备',
        icon: 'Target',
        color: 'from-purple-500 to-pink-600',
        steps: [
          {
            title: '1.1 数据格式要求',
            icon: 'Database',
            color: 'from-purple-400 to-pink-500',
            summary: '了解购物篮数据的格式',
            explanation: `购物篮分析需要特定的数据格式：

事务格式（Transaction Format）：
- 每行代表一个订单（事务）
- 包含订单ID和商品信息

常见格式：
1. 宽格式：每个订单一行，商品用逗号分隔
2. 长格式：每个商品一行，重复订单ID

准备步骤：
1. 读取数据
2. 检查数据质量
3. 转换为合适的格式`,
            codeExample: `# 读取购物篮数据
df = pd.read_csv('market_basket.csv')

# 查看数据结构
print(df.head())
print(f"总订单数: {df['InvoiceNo'].nunique()}")
print(f"商品种类数: {df['Description'].nunique()}")

# 转换为事务格式
transactions = df.groupby('InvoiceNo')['Description'].apply(list).tolist()`,
            tips: '确保数据中没有缺失值和异常值！',
            commonMistakes: '数据格式不正确导致分析失败！'
          },
          {
            title: '1.2 探索性分析',
            icon: 'Search',
            color: 'from-pink-400 to-rose-500',
            summary: '了解数据的基本特征',
            explanation: `在进行关联分析前，先了解数据的基本特征：

- 总订单数
- 商品种类数
- 平均每单商品数
- 商品销售排行
- 订单大小分布`,
            codeExample: `# 商品销售排行
product_counts = df['Description'].value_counts()
print("销量最高的商品:")
print(product_counts.head(10))

# 订单大小分布
order_sizes = df.groupby('InvoiceNo')['Description'].count()
print(f"平均每单商品数: {order_sizes.mean():.2f}")
print(f"订单大小分布:")
print(order_sizes.value_counts().sort_index())`,
            tips: '探索性分析可以帮助设置合理的支持度阈值！',
            commonMistakes: '跳过探索性分析直接进行关联挖掘！'
          }
        ]
      },
      {
        title: '二、关联规则挖掘',
        icon: 'Sparkles',
        color: 'from-blue-500 to-cyan-600',
        steps: [
          {
            title: '2.1 Apriori算法简介',
            icon: 'Algorithm',
            color: 'from-blue-400 to-cyan-500',
            summary: '了解经典的关联规则挖掘算法',
            explanation: `Apriori是最经典的关联规则挖掘算法：

核心思想：
1. 频繁项集的子集也是频繁的（先验性质）
2. 非频繁项集的超集也是非频繁的

算法步骤：
1. 找出所有1-项集的支持度
2. 筛选出频繁1-项集
3. 用频繁k-项集生成候选(k+1)-项集
4. 重复步骤2-3直到没有新的频繁项集

优点：简单易理解
缺点：效率较低，适合中小规模数据`,
            codeExample: `# Apriori算法流程（伪代码）
# 1. 生成1-项集
c1 = create_c1(transactions)

# 2. 筛选频繁1-项集
l1 = scan_d(transactions, c1, min_support)

# 3. 迭代生成更高阶项集
L = [l1]
k = 2
while (len(L[k-2]) > 0):
    Ck = apriori_gen(L[k-2], k)
    Lk = scan_d(transactions, Ck, min_support)
    L.append(Lk)
    k += 1`,
            tips: 'Apriori算法的关键在于利用先验性质剪枝！',
            commonMistakes: '支持度阈值设置过高导致找不到有用的关联！'
          },
          {
            title: '2.2 实现简单的关联规则',
            icon: 'Code',
            color: 'from-cyan-400 to-teal-500',
            summary: '手动实现简单的关联规则挖掘',
            explanation: `对于小规模数据，可以手动实现简单的关联规则挖掘：

步骤：
1. 计算单个商品的支持度
2. 生成所有2-项集并计算支持度
3. 计算置信度和提升度
4. 筛选有意义的规则`,
            codeExample: `# 计算支持度
def calculate_support(itemset, transactions):
    count = 0
    for transaction in transactions:
        if set(itemset).issubset(set(transaction)):
            count += 1
    return count / len(transactions)

# 生成2-项集
products = df['Description'].unique()
pair_rules = []

for i in range(len(products)):
    for j in range(i+1, len(products)):
        itemset = [products[i], products[j]]
        support = calculate_support(itemset, transactions)
        if support >= min_support:
            pair_rules.append({
                'itemset': itemset,
                'support': support
            })`,
            tips: '对于大规模数据，建议使用专业库如mlxtend！',
            commonMistakes: '手动实现效率太低，导致程序卡死！'
          },
          {
            title: '2.3 使用mlxtend库',
            icon: 'Library',
            color: 'from-teal-400 to-green-500',
            summary: '使用专业库进行关联规则挖掘',
            explanation: `mlxtend是一个常用的机器学习扩展库，包含关联规则挖掘功能。

安装：pip install mlxtend

主要功能：
- apriori：生成频繁项集
- association_rules：生成关联规则`,
            codeExample: `from mlxtend.preprocessing import TransactionEncoder
from mlxtend.frequent_patterns import apriori, association_rules

# 转换数据格式
te = TransactionEncoder()
te_ary = te.fit(transactions).transform(transactions)
df_encoded = pd.DataFrame(te_ary, columns=te.columns_)

# 生成频繁项集
frequent_itemsets = apriori(df_encoded, min_support=0.05, use_colnames=True)

# 生成关联规则
rules = association_rules(frequent_itemsets, metric='lift', min_threshold=1)

# 筛选有意义的规则
interesting_rules = rules[(rules['lift'] > 1.5) & (rules['confidence'] > 0.3)]`,
            tips: 'mlxtend提供了高效的Apriori实现！',
            commonMistakes: '支持度阈值设置不当导致结果过多或过少！'
          }
        ]
      },
      {
        title: '三、结果解读与应用',
        icon: 'FileText',
        color: 'from-indigo-500 to-purple-600',
        steps: [
          {
            title: '3.1 解读关联规则',
            icon: 'Eye',
            color: 'from-indigo-400 to-purple-500',
            summary: '理解和筛选有意义的规则',
            explanation: `关联规则的解读需要结合业务知识：

规则格式：{A} -> {B}
表示购买A的顾客很可能也购买B

解读要点：
1. 支持度：规则的普遍程度
2. 置信度：规则的可靠性
3. 提升度：规则的强度（最重要）

筛选策略：
- 提升度 > 1：正相关
- 提升度越高越好
- 结合业务场景判断`,
            codeExample: `# 查看规则
print(rules[['antecedents', 'consequents', 'support', 'confidence', 'lift']])

# 筛选强关联规则
strong_rules = rules[
    (rules['lift'] > 2) & 
    (rules['confidence'] > 0.4) & 
    (rules['support'] > 0.01)
]

# 按提升度排序
sorted_rules = strong_rules.sort_values('lift', ascending=False)`,
            tips: '提升度是判断关联强度的最重要指标！',
            commonMistakes: '只看置信度不看提升度！'
          },
          {
            title: '3.2 实际应用场景',
            icon: 'ShoppingBag',
            color: 'from-purple-400 to-pink-500',
            summary: '将分析结果应用到业务中',
            explanation: `购物篮分析的结果可以应用到多个业务场景：

1. 商品推荐：基于关联规则推荐互补商品
2. 货架布局：将关联商品放在相邻位置
3. 促销策略：捆绑销售、买A送B
4. 库存管理：优化补货计划
5. 产品组合：开发套餐产品

案例：
- 啤酒和尿布的经典案例
- 超市收银台的口香糖摆放`,
            codeExample: `# 找出某商品的关联商品
def find_associations(product, rules, top_n=5):
    # 找出包含该商品的规则
    mask = rules['antecedents'].apply(lambda x: product in x)
    related = rules[mask].sort_values('lift', ascending=False)
    return related.head(top_n)[['consequents', 'lift', 'confidence']]

# 找出iPhone 15的关联商品
iphone_associations = find_associations('iPhone 15', rules)
print("与iPhone 15相关的商品：")
print(iphone_associations)`,
            tips: '将分析结果转化为可执行的业务行动！',
            commonMistakes: '分析结果束之高阁，没有实际应用！'
          }
        ]
      }
    ]
  },
  {
    id: '04-clustering',
    title: '客户聚类分析',
    description: '使用聚类分析将客户分成不同的群体，制定差异化营销策略。',
    difficulty: '进阶',
    duration: '45分钟',
    dataset: 'customer_features.csv',
    starterCode: '',
    referenceCode: `import pandas as pd

df = pd.read_csv('customer_features.csv')
print("客户数据预览:")
print(df.head())
print("\\n数据信息:")
print(df.info())

# 选择用于聚类的特征
cluster_features = df[['age', 'total_orders', 'total_spent', 
                      'avg_order_value', 'avg_purchase_interval', 
                      'product_categories', 'browse_frequency']]

print("\\n聚类特征统计:")
print(cluster_features.describe())`,
    tutorials: [
      {
        title: '客户聚类基础',
        icon: 'Trophy',
        color: 'from-purple-500 to-pink-600',
        steps: [
          {
            title: '什么是客户聚类？',
            icon: 'Users',
            color: 'from-purple-400 to-pink-500',
            summary: '将客户分成不同的群体',
            explanation: `客户聚类分析是一种无监督学习方法，用于将客户分成具有相似特征的群体。

核心思想：
- 根据客户的行为特征进行分组
- 组内客户相似，组间客户差异大
- 无需预先知道分组数量

应用场景：
- 客户分群管理
- 差异化营销策略
- 客户生命周期管理
- 个性化推荐`,
            tips: '聚类分析是客户细分的核心技术！',
            commonMistakes: '将聚类结果当作绝对真理，而不是参考！'
          },
          {
            title: 'RFM模型简介',
            icon: 'BarChart3',
            color: 'from-pink-400 to-rose-500',
            summary: '理解客户价值分析的经典框架',
            explanation: `RFM模型是客户价值分析的经典框架：

R (Recency)：最近一次消费距今时间
- 值越小越好，表示客户越活跃

F (Frequency)：消费频率
- 值越大越好，表示客户忠诚度高

M (Monetary)：消费金额
- 值越大越好，表示客户价值高

经典客户分群：
- VIP客户：R低、F高、M高
- 潜力客户：R低、F中、M中
- 重要挽留客户：R高、F高、M高
- 新客户：R低、F低、M低`,
            codeExample: `# RFM指标计算示例
current_date = pd.Timestamp.now()
df['last_purchase_date'] = pd.to_datetime(df['last_purchase_date'])
df['recency'] = (current_date - df['last_purchase_date']).dt.days

rfm = df[['customer_id', 'recency', 'total_orders', 'total_spent']]
rfm.columns = ['customer_id', 'recency', 'frequency', 'monetary']`,
            tips: 'RFM模型简单但非常有效！',
            commonMistakes: '只用一种指标就给客户贴标签！'
          },
          {
            title: '常用聚类算法',
            icon: 'Algorithm',
            color: 'from-rose-400 to-red-500',
            summary: '了解不同的聚类方法',
            explanation: `常用的聚类算法：

1. K-Means：最常用的聚类算法
   - 基于距离的聚类
   - 需要预先指定聚类数量
   - 适合球形分布的数据

2. DBSCAN：基于密度的聚类
   - 不需要指定聚类数量
   - 可以发现任意形状的簇
   - 对噪声数据鲁棒

3. Hierarchical Clustering：层次聚类
   - 构建聚类树
   - 可以选择任意层次的聚类结果
   - 适合小数据量`,
            codeExample: `# K-Means聚类
from sklearn.cluster import KMeans

kmeans = KMeans(n_clusters=4, random_state=42)
clusters = kmeans.fit_predict(rfm[['recency', 'frequency', 'monetary']])

# DBSCAN聚类
from sklearn.cluster import DBSCAN

dbscan = DBSCAN(eps=0.5, min_samples=5)
clusters = dbscan.fit_predict(rfm[['recency', 'frequency', 'monetary']])`,
            tips: 'K-Means是最常用的聚类算法！',
            commonMistakes: '使用K-Means处理非球形分布的数据！'
          }
        ]
      },
      {
        title: '一、客户特征构建',
        icon: 'Target',
        color: 'from-blue-500 to-cyan-600',
        steps: [
          {
            title: '1.1 数据准备',
            icon: 'Database',
            color: 'from-blue-400 to-cyan-500',
            summary: '查看客户数据特征',
            explanation: `客户聚类需要准备客户级别的特征数据：

常用特征：
- 人口统计：年龄、性别
- 消费行为：订单数、消费金额、平均订单价值
- 活跃度：浏览频率、购买间隔
- 购买偏好：购买品类数量
- 客户属性：会员等级、所在城市、设备类型

本数据集已包含丰富的客户特征，可直接用于聚类分析。`,
            codeExample: `# 读取客户数据
df = pd.read_csv('customer_features.csv')

# 查看数据结构
print(df.head())
print(df.info())

# 选择聚类特征
cluster_features = df[['age', 'total_orders', 'total_spent', 
                      'avg_order_value', 'avg_purchase_interval', 
                      'product_categories', 'browse_frequency']]`,
            tips: '特征质量决定聚类效果！',
            commonMistakes: '特征过多导致维度灾难！'
          },
          {
            title: '1.2 特征标准化',
            icon: 'Scale',
            color: 'from-cyan-400 to-teal-500',
            summary: '对特征进行标准化处理',
            explanation: `聚类算法对特征尺度敏感，需要进行标准化：

标准化方法：
1. Min-Max Scaling：缩放到[0,1]范围
2. Standardization：标准化为均值0，标准差1
3. Robust Scaling：对异常值鲁棒

推荐使用Standardization，除非有特殊需求。`,
            codeExample: `from sklearn.preprocessing import StandardScaler

# 选择数值特征
numeric_features = ['age', 'total_orders', 'total_spent', 
                   'avg_order_value', 'avg_purchase_interval', 
                   'product_categories', 'browse_frequency']

# 标准化
scaler = StandardScaler()
scaled_features = scaler.fit_transform(df[numeric_features])

# 创建标准化后的DataFrame
scaled_df = pd.DataFrame(scaled_features, columns=numeric_features)`,
            tips: '标准化是聚类前的必要步骤！',
            commonMistakes: '忘记标准化导致聚类结果被尺度大的特征主导！'
          }
        ]
      },
      {
        title: '二、K-Means聚类实践',
        icon: 'Sparkles',
        color: 'from-amber-500 to-orange-600',
        steps: [
          {
            title: '2.1 选择聚类数量',
            icon: 'Target',
            color: 'from-amber-400 to-orange-500',
            summary: '确定最佳的聚类数量K',
            explanation: `选择合适的K值是K-Means的关键：

方法1：手肘法（Elbow Method）
- 计算不同K值的SSE（平方误差和）
- SSE随K增加而减小
- 找到下降速度明显变慢的点（手肘点）

方法2：轮廓系数（Silhouette Score）
- 衡量聚类质量
- 值越接近1越好
- 找到最大值对应的K`,
            codeExample: `from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

# 手肘法
sse = []
k_range = range(2, 10)

for k in k_range:
    kmeans = KMeans(n_clusters=k, random_state=42)
    kmeans.fit(scaled_df)
    sse.append(kmeans.inertia_)

# 绘制手肘图
plt.plot(k_range, sse, 'bo-')
plt.xlabel('Number of clusters')
plt.ylabel('SSE')
plt.title('Elbow Method')
plt.show()`,
            tips: '手肘法是最简单有效的K值选择方法！',
            commonMistakes: '凭感觉选择K值！'
          },
          {
            title: '2.2 执行聚类',
            icon: 'Play',
            color: 'from-orange-400 to-red-500',
            summary: '执行K-Means聚类',
            explanation: `执行K-Means聚类的步骤：

1. 创建KMeans对象
2. 拟合数据
3. 获取聚类标签
4. 将标签添加到原始数据`,
            codeExample: `# 创建并拟合K-Means
kmeans = KMeans(n_clusters=4, random_state=42)
customer_features['cluster'] = kmeans.fit_predict(scaled_df)

# 查看聚类结果分布
print("聚类结果分布:")
print(customer_features['cluster'].value_counts())

# 查看每个聚类的特征中心
centers = pd.DataFrame(scaler.inverse_transform(kmeans.cluster_centers_), 
                      columns=numeric_features)
print("\\n聚类中心:")
print(centers)`,
            tips: '设置random_state保证结果可复现！',
            commonMistakes: '没有设置随机种子导致每次结果不同！'
          },
          {
            title: '2.3 分析聚类结果',
            icon: 'Search',
            color: 'from-red-400 to-pink-500',
            summary: '解读每个聚类的特征',
            explanation: `分析聚类结果的步骤：

1. 计算每个聚类的统计特征
2. 为每个聚类命名
3. 描述每个聚类的特征
4. 制定针对性策略`,
            codeExample: `# 分析每个聚类
cluster_analysis = customer_features.groupby('cluster')[numeric_features].mean()

# 添加聚类大小
cluster_analysis['size'] = customer_features['cluster'].value_counts().sort_index()

print("各聚类特征分析:")
print(cluster_analysis)

# 为聚类命名
cluster_names = {
    0: 'VIP客户',
    1: '普通客户',
    2: '新客户',
    3: '流失客户'
}
customer_features['cluster_name'] = customer_features['cluster'].map(cluster_names)`,
            tips: '结合业务知识为聚类命名！',
            commonMistakes: '只看统计数据不结合业务！'
          }
        ]
      },
      {
        title: '三、聚类结果应用',
        icon: 'FileText',
        color: 'from-teal-500 to-green-600',
        steps: [
          {
            title: '3.1 制定营销策略',
            icon: 'Target',
            color: 'from-teal-400 to-green-500',
            summary: '针对不同客户群体制定策略',
            explanation: `基于聚类结果制定差异化策略：

VIP客户：
- 专属客服
- 优先发货
- 专属优惠
- 生日礼包

普通客户：
- 积分奖励计划
- 定期促销活动
- 个性化推荐

新客户：
- 新人礼包
- 首单优惠
- 引导购买

流失客户：
- 召回邮件/短信
- 专属折扣
- 问卷调查`,
            codeExample: `# 针对不同聚类制定策略
strategies = {
    'VIP客户': '专属客服+优先发货+生日礼包',
    '普通客户': '积分奖励+定期促销+个性化推荐',
    '新客户': '新人礼包+首单优惠+引导购买',
    '流失客户': '召回邮件+专属折扣+问卷调查'
}

# 将策略应用到客户
customer_features['strategy'] = customer_features['cluster_name'].map(strategies)`,
            tips: '策略要具体可执行！',
            commonMistakes: '策略过于笼统无法执行！'
          },
          {
            title: '3.2 可视化聚类结果',
            icon: 'BarChart',
            color: 'from-green-400 to-emerald-500',
            summary: '用图表展示聚类结果',
            explanation: `可视化有助于理解聚类结果：

常用图表：
- 雷达图：展示各聚类的特征对比
- 散点图：展示二维分布
- 柱状图：展示各聚类的特征均值
- 饼图：展示聚类大小分布`,
            codeExample: `import seaborn as sns

# 绘制雷达图
import plotly.express as px

fig = px.line_polar(cluster_analysis, r='total_amount_sum', theta='cluster', 
                    line_close=True)
fig.show()

# 绘制聚类分布
sns.countplot(data=customer_features, x='cluster_name')
plt.title('客户聚类分布')
plt.xticks(rotation=45)
plt.show()`,
            tips: '可视化让结果更直观！',
            commonMistakes: '过度可视化导致信息过载！'
          }
        ]
      }
    ]
  },
  {
    id: '05-visualization',
    title: '数据可视化',
    description: '学习使用Matplotlib进行数据可视化。',
    difficulty: '进阶',
    duration: '45分钟',
    dataset: 'retail_orders.csv',
    starterCode: '',
    referenceCode: `import pandas as pd

df = pd.read_csv('retail_orders.csv')
df['total_amount'] = df['quantity'] * df['price']

# 数据统计
city_sales = df.groupby('city')['total_amount'].sum().sort_values(ascending=False)
print("各城市销售额:")
print(city_sales)`,
    tutorials: [
      {
        title: '数据可视化基础',
        icon: 'Trophy',
        color: 'from-emerald-500 to-green-600',
        steps: [
          {
            title: '为什么需要数据可视化？',
            icon: 'BarChart',
            color: 'from-emerald-400 to-green-500',
            summary: '数据可视化是数据分析的重要工具',
            explanation: `数据可视化的重要性：

1. 直观展示数据：将复杂数据转化为直观图表
2. 发现规律：通过图表发现数据中的模式和趋势
3. 有效沟通：图表比文字更易理解和记忆
4. 辅助决策：可视化结果帮助做出数据驱动的决策

好的可视化原则：
- 清晰：一目了然
- 简洁：不冗余
- 准确：不误导
- 美观：专业耐看`,
            tips: '可视化是讲述数据故事的最佳方式！',
            commonMistakes: '为了美观牺牲准确性！'
          },
          {
            title: '常用图表类型',
            icon: 'PieChart',
            color: 'from-green-400 to-emerald-500',
            summary: '选择合适的图表类型',
            explanation: `不同场景选择不同的图表类型：

比较关系：
- 柱状图（Bar Chart）：比较类别数据
- 横向柱状图（Horizontal Bar）：类别名称较长时
- 分组柱状图：比较多个维度

趋势变化：
- 折线图（Line Chart）：展示时间序列
- 面积图（Area Chart）：强调数量变化

部分整体：
- 饼图（Pie Chart）：展示比例
- 环形图（Donut Chart）：空心饼图

分布情况：
- 直方图（Histogram）：数值分布
- 箱线图（Box Plot）：统计分布
- 密度图（Density Plot）：概率密度

相关关系：
- 散点图（Scatter Plot）：两个变量关系
- 热力图（Heatmap）：矩阵数据`,
            codeExample: `import matplotlib.pyplot as plt
import seaborn as sns

# 柱状图
plt.bar(city_sales.index, city_sales.values)

# 折线图
plt.plot(dates, sales)

# 直方图
plt.hist(df['price'], bins=20)

# 散点图
plt.scatter(df['quantity'], df['total_amount'])`,
            tips: '根据数据类型和分析目的选择图表！',
            commonMistakes: '使用错误的图表类型！'
          }
        ]
      },
      {
        title: '一、Matplotlib基础',
        icon: 'Target',
        color: 'from-blue-500 to-cyan-600',
        steps: [
          {
            title: '1.1 基本语法',
            icon: 'Code',
            color: 'from-blue-400 to-cyan-500',
            summary: 'Matplotlib的基本使用方法',
            explanation: `Matplotlib是Python最常用的可视化库：

基本结构：
1. 创建画布：plt.figure()
2. 绘制图表：plt.plot(), plt.bar()等
3. 添加标题和标签：plt.title(), plt.xlabel(), plt.ylabel()
4. 添加图例：plt.legend()
5. 显示图表：plt.show()

面向对象接口（推荐）：
- fig, ax = plt.subplots()
- ax.plot()
- ax.set_title()`,
            codeExample: `import matplotlib.pyplot as plt

# 基本用法
plt.figure(figsize=(10, 6))
plt.bar(city_sales.index, city_sales.values, color='skyblue')
plt.title('各城市销售额对比')
plt.xlabel('城市')
plt.ylabel('销售额')
plt.xticks(rotation=45)
plt.grid(axis='y', linestyle='--', alpha=0.7)
plt.show()

# 面向对象接口
fig, ax = plt.subplots(figsize=(10, 6))
ax.bar(city_sales.index, city_sales.values, color='skyblue')
ax.set_title('各城市销售额对比')
ax.set_xlabel('城市')
ax.set_ylabel('销售额')
ax.tick_params(axis='x', rotation=45)
ax.grid(axis='y', linestyle='--', alpha=0.7)
plt.show()`,
            tips: '面向对象接口更灵活，推荐使用！',
            commonMistakes: '混用pyplot接口和面向对象接口导致混乱！'
          },
          {
            title: '1.2 样式设置',
            icon: 'Palette',
            color: 'from-cyan-400 to-teal-500',
            summary: '美化图表样式',
            explanation: `Matplotlib提供丰富的样式选项：

颜色设置：
- 预定义颜色：'red', 'blue', 'green'
- 十六进制：'#FF5733'
- RGB元组：(1, 0.34, 0.2)

线条样式：
- linestyle: '-', '--', '-.', ':'
- linewidth: 数值

标记样式：
- marker: 'o', 's', '^', 'D'
- markersize: 数值

样式预设：
- plt.style.use('seaborn')
- plt.style.use('ggplot')`,
            codeExample: `# 设置样式
plt.style.use('seaborn-v0_8-darkgrid')

# 自定义颜色
colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']

# 绘制带样式的图表
fig, ax = plt.subplots(figsize=(10, 6))
bars = ax.bar(city_sales.index, city_sales.values, 
              color=colors, edgecolor='black', linewidth=1)

# 添加数值标签
for bar in bars:
    height = bar.get_height()
    ax.text(bar.get_x() + bar.get_width()/2., height,
             f'{height:.0f}',
             ha='center', va='bottom')
plt.tight_layout()
plt.show()`,
            tips: '好的样式让图表更专业！',
            commonMistakes: '样式过多样式过多样式多多！'
          }
        ]
      }
    ]
  },
  {
    id: '06-ab-testing',
    title: 'A/B测试分析',
    description: '学习如何进行A/B测试分析，评估不同方案的效果差异。',
    difficulty: '进阶',
    duration: '45分钟',
    dataset: 'ab_test.csv',
    starterCode: '',
    referenceCode: `import pandas as pd

df = pd.read_csv('ab_test.csv')

# 分组统计
group_stats = df.groupby('group')['conversion'].agg(['mean', 'count', 'sum'])
group_stats.columns = ['转化率', '样本量', '转化数']
print("各组转化率:")
print(group_stats)

control_rate = group_stats.loc['A', '转化率']
treatment_rate = group_stats.loc['B', '转化率']
print(f"对照组: {control_rate*100:.2f}%")
print(f"实验组: {treatment_rate*100:.2f}%")`,
    tutorials: [
      {
        title: 'A/B测试基础',
        icon: 'Trophy',
        color: 'from-red-500 to-rose-600',
        steps: [
          {
            title: '什么是A/B测试？',
            icon: 'Activity',
            color: 'from-red-400 to-rose-500',
            summary: '理解假设检验基础',
            explanation: `A/B测试是一种实验方法，用于比较两个版本的效果：

基本概念：
- 对照组（Control）：原始版本
- 实验组（Treatment）：新的版本
- 假设检验：判断差异是否显著
- 统计显著：差异很可能不是偶然的

典型案例：
- 网页改版效果
- 营销活动效果
- 产品功能测试`,
            codeExample: `# 分组统计转化率
conversion_rates = df.groupby('group')['conversion'].mean()

# 计算绝对提升
absolute_lift = conversion_rates['B'] - conversion_rates['A']

# 计算相对提升
relative_lift = absolute_lift / conversion_rates['A']`,
            tips: 'A/B测试是互联网产品迭代的重要工具！',
            commonMistakes: '样本量不足就下结论！'
          }
        ]
      },
      {
        title: '一、统计基础',
        icon: 'Target',
        color: 'from-indigo-500 to-purple-600',
        steps: [
          {
            title: '假设检验',
            icon: 'Brain',
            color: 'from-indigo-400 to-purple-500',
            summary: '理解p值的含义',
            explanation: `假设检验的核心概念：

原假设（H₀）：对照组和实验组没有差异
备择假设（H₁）：存在显著差异

p值（p-value）：在原假设下，观察到结果的概率
显著性水平 α：通常设为0.05

如果 p < α：拒绝原假设，结果显著
如果 p ≥ α：无法拒绝原假设，结果不显著

重要提醒：
- 统计显著 ≠ 业务显著！`,
            codeExample: `from scipy import stats

# 卡方检验
contingency_table = pd.crosstab(df['group'], df['conversion'])
chi2, p_value, _, _ = stats.chi2_contingency(contingency_table)

print(f"p值: {p_value:.4f}")
if p_value < 0.05:
    print("差异统计显著!")
else:
    print("差异不显著.")`,
            tips: 'p值只是判断标准之一，不是唯一标准！',
            commonMistakes: '过度解读p值！'
          }
        ]
      }
    ]
  },
  {
    id: '07-time-series',
    title: '时间序列分析',
    description: '学习时间序列分析的基本方法，发现数据的趋势和季节性模式。',
    difficulty: '进阶',
    duration: '45分钟',
    dataset: 'time_series_sales.csv',
    starterCode: '',
    referenceCode: `import pandas as pd

df = pd.read_csv('time_series_sales.csv')
df['date'] = pd.to_datetime(df['date'])
df = df.set_index('date')

print("时间序列数据预览:")
print(df.head())

# 按周汇总
weekly_sales = df.resample('W')['sales'].sum()
print("\\n周销售额数据:")
print(weekly_sales.head())

# 计算7天移动平均
df['sales_ma7'] = df['sales'].rolling(window=7).mean()
print("\\n带7日移动平均的数据:")
print(df[['sales', 'sales_ma7']].head(10))

# 月度统计
monthly_stats = df.resample('M').agg({
    'sales': ['sum', 'mean'],
    'orders': 'sum',
    'customers': 'mean'
})
print("\\n月度统计:")
print(monthly_stats)`,
    tutorials: [
      {
        title: '时间序列分析基础',
        icon: 'Trophy',
        color: 'from-indigo-500 to-blue-600',
        steps: [
          {
            title: '时间序列分解',
            icon: 'Clock',
            color: 'from-indigo-400 to-blue-500',
            summary: '趋势、季节性、残差',
            explanation: `时间序列可以分解为：

趋势（Trend）：长期变化方向
季节性（Seasonality）：固定周期波动
周期性（Cyclicity）：长期周期波动
残差（Residual）：剩余噪声

常用方法：
- 移动平均（Moving Average）
- 指数平滑（Exponential Smoothing）
- STL分解（Seasonal-Trend-Loess）`,
            tips: '移动平均窗口大小的选择很重要！',
            commonMistakes: '过度拟合历史数据导致预测不准确！'
          }
        ]
      }
    ]
  },
  {
    id: '08-feature-engineering',
    title: '特征工程',
    description: '学习特征工程的核心技术，提高机器学习模型的性能。',
    difficulty: '高级',
    duration: '60分钟',
    dataset: 'customer_features.csv',
    starterCode: '',
    referenceCode: `import pandas as pd

df = pd.read_csv('customer_features.csv')
print("原始数据:")
print(df.columns.tolist())

# 日期特征
df['registration_date'] = pd.to_datetime(df['registration_date'])
df['days_since_reg'] = (pd.Timestamp.now() - df['registration_date']).dt.days
df['reg_month'] = df['registration_date'].dt.month

# 会员等级编码
membership_map = {'普通': 0, '银卡': 1, '金卡': 2, '钻石': 3}
df['membership_encoded'] = df['membership_level'].map(membership_map)

# 性别编码
df['gender_encoded'] = df['gender'].map({'男': 0, '女': 1})

# 消费等级分箱
df['spend_tier'] = pd.qcut(df['total_spent'], q=4, labels=['低', '中', '高', '很高'])

# 活跃度特征
df['is_active'] = df['avg_purchase_interval'] < 15

print(f"\\n原始列数: {len(df.columns) - 3}")
print(f"特征工程后列数: {len(df.columns)}")
print("\\n新增特征:")
print(['days_since_reg', 'reg_month', 'membership_encoded', 
       'gender_encoded', 'spend_tier', 'is_active'])`,
    tutorials: [
      {
        title: '特征工程基础',
        icon: 'Trophy',
        color: 'from-teal-500 to-cyan-600',
        steps: [
          {
            title: '特征工程概述',
            icon: 'Layers',
            color: 'from-teal-400 to-cyan-500',
            summary: '好的特征比好的模型更重要',
            explanation: `特征工程决定了模型性能的上限！

常用特征工程技术：
1. 缺失值处理
2. 异常值处理
3. 分类变量编码（One-Hot、Label）
4. 数值变量分箱（Binning）
5. 特征交互（Interaction）
6. 特征变换（对数、标准化）
7. 特征选择（Feature Selection）
8. 特征聚合（Aggregation）

原则：特征要有业务含义！`,
            tips: 'Kaggle竞赛获奖方案的核心往往是特征工程，而不是模型！',
            commonMistakes: '创造过多无关特征，增加模型复杂度但不提升性能！'
          }
        ]
      }
    ]
  },
  {
    id: '09-outlier-detection',
    title: '异常值检测',
    description: '学习异常值检测的方法，保证数据质量。',
    difficulty: '高级',
    duration: '45分钟',
    dataset: 'customer_features.csv',
    starterCode: '',
    referenceCode: `import pandas as pd

df = pd.read_csv('customer_features.csv')

print("数值列描述性统计:")
print(df[['age', 'total_orders', 'total_spent', 
          'avg_order_value', 'browse_frequency']].describe())

# IQR方法
def detect_outliers(data, column_name):
    Q1 = data[column_name].quantile(0.25)
    Q3 = data[column_name].quantile(0.75)
    IQR = Q3 - Q1
    lower = Q1 - 1.5 * IQR
    upper = Q3 + 1.5 * IQR
    outliers = data[(data[column_name] < lower) | (data[column_name] > upper)]
    return outliers, lower, upper

# 检测消费金额异常值
spend_outliers, lower, upper = detect_outliers(df, 'total_spent')
print(f"\\n消费金额正常范围: [{lower:.2f}, {upper:.2f}]")
print(f"消费金额异常值数量: {len(spend_outliers)}")

# 检测订单数异常值
order_outliers, lower, upper = detect_outliers(df, 'total_orders')
print(f"\\n订单数正常范围: [{lower:.2f}, {upper:.2f}]")
print(f"订单数异常值数量: {len(order_outliers)}")`,
    tutorials: [
      {
        title: '异常值检测基础',
        icon: 'Trophy',
        color: 'from-orange-500 to-red-600',
        steps: [
          {
            title: 'IQR方法详解',
            icon: 'Search',
            color: 'from-orange-400 to-red-500',
            summary: '四分位距是最常用的异常检测方法',
            explanation: `IQR（Interquartile Range）方法：

步骤：
1. 计算Q1（第25百分位数）
2. 计算Q3（第75百分位数）
3. IQR = Q3 - Q1
4. 下界 = Q1 - 1.5×IQR
5. 上界 = Q3 + 1.5×IQR

特点：
- 鲁棒性强，不受极端值影响
- 简单易用，无需假设分布
- 适合大多数场景`,
            tips: '1.5倍IQR是经验值，可以根据业务调整！',
            commonMistakes: '对所有数据统一用IQR，不考虑业务特性！'
          }
        ]
      }
    ]
  },
  {
    id: '10-data-merge',
    title: '多数据集合并',
    description: '学习如何合并多个数据集，整合不同来源的信息。',
    difficulty: '进阶',
    duration: '45分钟',
    dataset: 'retail_orders.csv',
    starterCode: '',
    referenceCode: `import pandas as pd

# 读取订单数据
orders = pd.read_csv('retail_orders.csv')
orders['total_amount'] = orders['quantity'] * orders['price']
print("订单数据:")
print(orders.head())

# 读取客户数据
customers = pd.read_csv('customer_features.csv')
print("\\n客户数据:")
print(customers.head())

# 左连接：保留所有订单
merged = pd.merge(orders, customers, left_on='customer_id', 
                  right_on='customer_id', how='left')
print("\\n合并后数据预览:")
print(merged[['order_id', 'product_name', 'price', 'quantity', 
              'customer_id', 'age', 'gender', 'membership_level']].head())

# 统计各会员等级的订单金额
membership_sales = merged.groupby('membership_level')['total_amount'].sum()
print("\\n各会员等级销售额:")
print(membership_sales)`,
    tutorials: [
      {
        title: '多数据集合并基础',
        icon: 'Trophy',
        color: 'from-violet-500 to-purple-600',
        steps: [
          {
            title: '数据合并类型',
            icon: 'GitMerge',
            color: 'from-violet-400 to-purple-500',
            summary: '理解四种合并类型',
            explanation: `Pandas的merge类似于SQL的JOIN：

INNER JOIN（内连接）：只保留两边都有的键
LEFT JOIN（左连接）：保留左边所有行
RIGHT JOIN（右连接）：保留右边所有行
OUTER JOIN（外连接）：保留两边所有行

注意事项：
- 确保连接键名称和类型一致
- 检查重复键问题
- 使用 indicator 参数验证合并结果`,
            codeExample: `# 左连接
merged = pd.merge(df1, df2, on='id', how='left')

# 带验证
merged = pd.merge(df1, df2, on='id', how='left', indicator=True)
print(merged['_merge'].value_counts())`,
            tips: '90%的场景使用左连接就够了！',
            commonMistakes: '内连接导致数据意外丢失！'
          }
        ]
      }
    ]
  }
];
