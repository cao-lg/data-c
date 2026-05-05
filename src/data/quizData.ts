export type QuestionType = 'choice' | 'fillBlank' | 'coding';

export interface TestCase {
  input: string;
  expectedOutput: string;
  description: string;
}

export interface QuizQuestion {
  id: string;
  projectId: string;
  type: QuestionType;
  question: string;
  code?: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 1 | 2 | 3;
  points: number;
  testCases?: TestCase[];
  starterCode?: string;
}

export interface QuizConfig {
  projectId: string;
  title: string;
  timeLimit: number;
  totalPoints: number;
  passingScore: number;
  questions: QuizQuestion[];
}

export interface QuizResult {
  projectId: string;
  score: number;
  totalPoints: number;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  timeSpent: number;
  answers: Record<string, string>;
  passed: boolean;
  completedAt: string;
}

export interface Badge {
  id: string;
  projectId: string;
  projectName: string;
  earnedAt: string;
  score: number;
  icon: string;
}

export const quizConfigs: QuizConfig[] = [
  {
    projectId: '01-cleaning',
    title: '数据清洗实战',
    timeLimit: 15,
    totalPoints: 100,
    passingScore: 60,
    questions: [
      {
        id: '01-cleaning-01',
        projectId: '01-cleaning',
        type: 'choice',
        question: '在Pandas中，以下哪个方法用于检测重复行？',
        options: [
          'df.duplicated()',
          'df.is_duplicate()',
          'df.has_duplicate()',
          'df.check_duplicate()'
        ],
        correctAnswer: 'df.duplicated()',
        explanation: 'df.duplicated()返回一个布尔Series，标记每一行是否为重复行。返回True表示该行与之前某行完全相同。',
        difficulty: 1,
        points: 10
      },
      {
        id: '01-cleaning-02',
        projectId: '01-cleaning',
        type: 'choice',
        question: 'df.dropna(subset=["age"]) 的作用是什么？',
        options: [
          '删除所有包含空值的行',
          '只删除age列为空值的行',
          '将age列的空值替换为0',
          '统计age列的空值数量'
        ],
        correctAnswer: '只删除age列为空值的行',
        explanation: 'subset参数指定只检查特定列的空值。如果不指定subset，则任何列包含空值的行都会被删除。',
        difficulty: 2,
        points: 10
      },
      {
        id: '01-cleaning-03',
        projectId: '01-cleaning',
        type: 'choice',
        question: '以下哪种缺失值填充策略最适合处理价格列？',
        options: [
          '用0填充',
          '用-1填充',
          '用中位数填充',
          '删除所有缺失值'
        ],
        correctAnswer: '用中位数填充',
        explanation: '价格列用中位数填充最合理，因为中位数不受极端值影响，能更好地代表典型价格。用0或-1会扭曲数据分布。',
        difficulty: 2,
        points: 10
      },
      {
        id: '01-cleaning-04',
        projectId: '01-cleaning',
        type: 'choice',
        question: 'pd.to_datetime(df["date"], errors="coerce") 中 errors="coerce" 的作用是？',
        options: [
          '遇到错误时抛出异常',
          '遇到错误时忽略该行',
          '遇到错误时返回NaT',
          '遇到错误时使用默认日期'
        ],
        correctAnswer: '遇到错误时返回NaT',
        explanation: 'errors="coerce"会将无法解析的日期转换为NaT（Not a Time），而不是抛出异常，这在数据清洗中非常有用。',
        difficulty: 2,
        points: 10
      },
      {
        id: '01-cleaning-05',
        projectId: '01-cleaning',
        type: 'choice',
        question: '使用IQR方法检测异常值时，上界计算公式是？',
        options: [
          'Q3 + 1.5 * IQR',
          'Q3 + 2 * IQR',
          'Q1 + 1.5 * IQR',
          'mean + 2 * std'
        ],
        correctAnswer: 'Q3 + 1.5 * IQR',
        explanation: 'IQR方法中，上界 = Q3 + 1.5*IQR，下界 = Q1 - 1.5*IQR。超出这个范围的值被认为是异常值。',
        difficulty: 2,
        points: 10
      },
      {
        id: '01-cleaning-06',
        projectId: '01-cleaning',
        type: 'fillBlank',
        question: '填写代码，删除df中的重复行，保留第一次出现的行：',
        code: 'df = df._____(keep="first")',
        correctAnswer: 'drop_duplicates',
        explanation: 'drop_duplicates()方法用于删除重复行。keep="first"参数表示保留第一次出现的行，删除后续重复的行。',
        difficulty: 1,
        points: 10
      },
      {
        id: '01-cleaning-07',
        projectId: '01-cleaning',
        type: 'fillBlank',
        question: '填写代码，统计df每列的缺失值数量：',
        code: 'missing_count = df._____().sum()',
        correctAnswer: 'isnull',
        explanation: 'isnull()返回一个布尔DataFrame，标记每个值是否为空。然后sum()统计每列的True数量，即缺失值数量。',
        difficulty: 1,
        points: 10
      },
      {
        id: '01-cleaning-08',
        projectId: '01-cleaning',
        type: 'fillBlank',
        question: '填写代码，将city列中的空值填充为"未知"：',
        code: 'df["city"] = df["city"]._____("未知")',
        correctAnswer: 'fillna',
        explanation: 'fillna()方法用于填充缺失值。可以指定一个值来填充所有缺失值，也可以使用字典为不同列指定不同的填充值。',
        difficulty: 1,
        points: 10
      },
      {
        id: '01-cleaning-09',
        projectId: '01-cleaning',
        type: 'coding',
        question: '编写代码，计算df中price列的缺失值数量，并将结果存储在变量missing_price_count中。',
        starterCode: 'import pandas as pd\n\ndf = pd.DataFrame({"price": [100, None, 200, None, 300], "quantity": [1, 2, 3, 4, 5]})\n\n# 请在下方编写代码\n',
        correctAnswer: 'missing_price_count = df["price"].isnull().sum()',
        explanation: '使用df["price"].isnull()检测price列的缺失值，返回布尔Series。sum()统计True的数量，即缺失值数量。',
        difficulty: 2,
        points: 10,
        testCases: [
          {
            input: 'df = pd.DataFrame({"price": [100, None, 200, None, 300]})',
            expectedOutput: '2',
            description: '测试包含2个缺失值的数据'
          },
          {
            input: 'df = pd.DataFrame({"price": [100, 200, 300]})',
            expectedOutput: '0',
            description: '测试没有缺失值的数据'
          }
        ]
      },
      {
        id: '01-cleaning-10',
        projectId: '01-cleaning',
        type: 'coding',
        question: '编写代码，删除df中quantity列小于等于0的行，将结果存储在变量df_clean中。',
        starterCode: 'import pandas as pd\n\ndf = pd.DataFrame({"quantity": [1, 0, 3, -1, 5], "price": [100, 200, 300, 400, 500]})\n\n# 请在下方编写代码\n',
        correctAnswer: 'df_clean = df[df["quantity"] > 0]',
        explanation: '使用布尔索引df[df["quantity"] > 0]筛选出quantity大于0的行。这是一种高效的数据过滤方法。',
        difficulty: 2,
        points: 10,
        testCases: [
          {
            input: 'df = pd.DataFrame({"quantity": [1, 0, 3, -1, 5]})',
            expectedOutput: '3',
            description: '测试过滤后剩余3行'
          }
        ]
      }
    ]
  },
  {
    projectId: '02-aggregation',
    title: '分组聚合分析',
    timeLimit: 15,
    totalPoints: 100,
    passingScore: 60,
    questions: [
      {
        id: '02-agg-01',
        projectId: '02-aggregation',
        type: 'choice',
        question: 'df.groupby("city")["sales"].sum() 返回的是什么类型？',
        options: [
          'DataFrame',
          'Series',
          'GroupBy对象',
          'numpy数组'
        ],
        correctAnswer: 'Series',
        explanation: 'groupby后选择单列并应用聚合函数，返回的是Series，索引是分组键（city），值是聚合结果。',
        difficulty: 1,
        points: 10
      },
      {
        id: '02-agg-02',
        projectId: '02-aggregation',
        type: 'choice',
        question: '以下哪个方法可以对不同列应用不同的聚合函数？',
        options: [
          'df.groupby().sum()',
          'df.groupby().agg()',
          'df.groupby().apply()',
          'df.groupby().transform()'
        ],
        correctAnswer: 'df.groupby().agg()',
        explanation: 'agg()方法支持传入字典，为不同列指定不同的聚合函数，如 agg({"sales": "sum", "price": "mean"})',
        difficulty: 2,
        points: 10
      },
      {
        id: '02-agg-03',
        projectId: '02-aggregation',
        type: 'choice',
        question: 'transform() 和 agg() 的主要区别是？',
        options: [
          'transform更快',
          'transform返回与原数据相同长度',
          'transform只能用于数值列',
          'transform不支持自定义函数'
        ],
        correctAnswer: 'transform返回与原数据相同长度',
        explanation: 'transform()将聚合结果广播回原始数据的每一行，保持数据长度不变。agg()返回聚合后的结果，长度等于分组数量。',
        difficulty: 2,
        points: 10
      },
      {
        id: '02-agg-04',
        projectId: '02-aggregation',
        type: 'choice',
        question: '如何按多列进行分组？',
        options: [
          'df.groupby("col1", "col2")',
          'df.groupby(["col1", "col2"])',
          'df.groupby(col1, col2)',
          'df.multi_group(["col1", "col2"])'
        ],
        correctAnswer: 'df.groupby(["col1", "col2"])',
        explanation: '多列分组需要传入列名列表。结果会有多层索引（MultiIndex），外层是第一个分组列。',
        difficulty: 1,
        points: 10
      },
      {
        id: '02-agg-05',
        projectId: '02-aggregation',
        type: 'choice',
        question: 'groupby后的count()和size()有什么区别？',
        options: [
          '没有区别',
          'count()不计算空值，size()计算所有行',
          'size()不计算空值',
          'count()返回DataFrame'
        ],
        correctAnswer: 'count()不计算空值，size()计算所有行',
        explanation: 'count()统计非空值的数量，而size()统计每组的总行数（包括空值）。这是两者的重要区别。',
        difficulty: 2,
        points: 10
      },
      {
        id: '02-agg-06',
        projectId: '02-aggregation',
        type: 'fillBlank',
        question: '填写代码，按city分组并计算sales列的总和：',
        code: 'result = df._____("city")["sales"].sum()',
        correctAnswer: 'groupby',
        explanation: 'groupby()是分组操作的第一步，指定按哪一列进行分组。然后选择要聚合的列并应用聚合函数。',
        difficulty: 1,
        points: 10
      },
      {
        id: '02-agg-07',
        projectId: '02-aggregation',
        type: 'fillBlank',
        question: '填写代码，将分组结果重置索引：',
        code: 'result = df.groupby("city")["sales"].sum()._____()',
        correctAnswer: 'reset_index',
        explanation: 'reset_index()将分组后的索引转换为普通列，使结果变成标准的DataFrame格式。',
        difficulty: 1,
        points: 10
      },
      {
        id: '02-agg-08',
        projectId: '02-aggregation',
        type: 'fillBlank',
        question: '填写代码，同时计算sum和mean：',
        code: 'result = df.groupby("city")["sales"]._____(["sum", "mean"])',
        correctAnswer: 'agg',
        explanation: 'agg()方法可以接受函数名列表，同时计算多个聚合指标。结果会是多级列索引的DataFrame。',
        difficulty: 1,
        points: 10
      },
      {
        id: '02-agg-09',
        projectId: '02-aggregation',
        type: 'coding',
        question: '编写代码，按category分组，计算每组的total_amount总和，并按降序排序，结果存储在变量category_sales中。',
        starterCode: 'import pandas as pd\n\ndf = pd.DataFrame({"category": ["A", "B", "A", "B", "A"], "quantity": [1, 2, 3, 1, 2], "price": [100, 200, 150, 50, 80]})\ndf["total_amount"] = df["quantity"] * df["price"]\n\n# 请在下方编写代码\n',
        correctAnswer: 'category_sales = df.groupby("category")["total_amount"].sum().sort_values(ascending=False)',
        explanation: '先groupby分组，再选择列，应用sum聚合，最后用sort_values排序。ascending=False表示降序。',
        difficulty: 2,
        points: 10,
        testCases: [
          {
            input: 'df = pd.DataFrame({"category": ["A", "B", "A", "B"], "total_amount": [100, 200, 150, 50]})',
            expectedOutput: 'B    250\nA    250',
            description: '测试分组求和排序'
          }
        ]
      },
      {
        id: '02-agg-10',
        projectId: '02-aggregation',
        type: 'coding',
        question: '编写代码，按city分组，同时计算每组的订单数(count)、总金额(sum)和平均金额(mean)，结果存储在变量city_stats中。',
        starterCode: 'import pandas as pd\n\ndf = pd.DataFrame({"city": ["北京", "上海", "北京", "广州", "上海"], "order_id": [1, 2, 3, 4, 5], "quantity": [1, 2, 3, 1, 2], "price": [100, 200, 150, 80, 120]})\ndf["total_amount"] = df["quantity"] * df["price"]\n\n# 请在下方编写代码\n',
        correctAnswer: 'city_stats = df.groupby("city").agg({"order_id": "count", "total_amount": ["sum", "mean"]})',
        explanation: '使用agg()和字典可以对不同列应用不同的聚合函数。order_id计数得到订单数，total_amount计算总和与均值。',
        difficulty: 3,
        points: 10,
        testCases: [
          {
            input: 'df = pd.DataFrame({"city": ["北京", "上海", "北京"], "order_id": [1, 2, 3], "total_amount": [100, 200, 150]})',
            expectedOutput: '北京订单数2',
            description: '测试多列聚合'
          }
        ]
      }
    ]
  },
  {
    projectId: '03-market-basket',
    title: '购物篮分析',
    timeLimit: 20,
    totalPoints: 100,
    passingScore: 60,
    questions: [
      {
        id: '03-mb-01',
        projectId: '03-market-basket',
        type: 'choice',
        question: '购物篮分析中，支持度(Support)的含义是？',
        options: [
          '购买A后购买B的概率',
          '同时购买A和B的交易占比',
          'A和B的关联强度',
          'A和B一起出现的次数'
        ],
        correctAnswer: '同时购买A和B的交易占比',
        explanation: '支持度 = 包含A和B的交易数 / 总交易数。它衡量的是商品组合在所有交易中出现的频繁程度。',
        difficulty: 1,
        points: 10
      },
      {
        id: '03-mb-02',
        projectId: '03-market-basket',
        type: 'choice',
        question: '置信度(Confidence) P(B|A) 表示什么？',
        options: [
          'A和B同时出现的概率',
          '购买A的交易中同时购买B的概率',
          'B出现的概率',
          'A和B的关联程度'
        ],
        correctAnswer: '购买A的交易中同时购买B的概率',
        explanation: '置信度 = 支持度(A,B) / 支持度(A)。它表示在已经购买A的条件下，购买B的概率。',
        difficulty: 2,
        points: 10
      },
      {
        id: '03-mb-03',
        projectId: '03-market-basket',
        type: 'choice',
        question: '提升度(Lift)大于1说明什么？',
        options: [
          'A和B没有关联',
          'A和B负相关',
          'A和B正相关',
          'A导致B发生'
        ],
        correctAnswer: 'A和B正相关',
        explanation: 'Lift > 1表示A和B正相关，即购买A会增加购买B的可能性。Lift < 1表示负相关，Lift = 1表示无关联。',
        difficulty: 2,
        points: 10
      },
      {
        id: '03-mb-04',
        projectId: '03-market-basket',
        type: 'choice',
        question: 'Apriori算法的核心思想是？',
        options: [
          '频繁项集的子集也是频繁的',
          '所有项集都是频繁的',
          '只考虑单个商品',
          '随机选择商品组合'
        ],
        correctAnswer: '频繁项集的子集也是频繁的',
        explanation: 'Apriori性质：如果一个项集是频繁的，那么它的所有子集也是频繁的。这个性质用于剪枝，减少计算量。',
        difficulty: 2,
        points: 10
      },
      {
        id: '03-mb-05',
        projectId: '03-market-basket',
        type: 'fillBlank',
        question: '填写代码，获取每个订单的商品列表：',
        code: 'transactions = df.groupby("InvoiceNo")["Description"]._____().tolist()',
        correctAnswer: 'apply(list)',
        explanation: 'groupby后使用apply(list)将每组的商品名称转换为列表，tolist()将整个结果转换为Python列表。',
        difficulty: 2,
        points: 10
      },
      {
        id: '03-mb-06',
        projectId: '03-market-basket',
        type: 'fillBlank',
        question: '填写代码，统计每个商品出现的订单数：',
        code: 'product_orders = df.groupby("Description")["InvoiceNo"]._____()',
        correctAnswer: 'nunique',
        explanation: 'nunique()统计唯一值的数量，这里用于统计每个商品出现在多少个不同的订单中。',
        difficulty: 1,
        points: 10
      },
      {
        id: '03-mb-07',
        projectId: '03-market-basket',
        type: 'fillBlank',
        question: '填写代码，计算商品A的支持度：',
        code: 'support_A = df[df["Description"]=="A"]["InvoiceNo"]._____() / total_orders',
        correctAnswer: 'nunique',
        explanation: '支持度需要计算包含该商品的订单数，使用nunique()统计唯一订单号数量，再除以总订单数。',
        difficulty: 2,
        points: 10
      },
      {
        id: '03-mb-08',
        projectId: '03-market-basket',
        type: 'coding',
        question: '编写代码，找出销量最高的前5个商品，结果存储在变量top_products中。',
        starterCode: 'import pandas as pd\n\ndf = pd.DataFrame({"InvoiceNo": ["001", "001", "002", "002", "003"], "Description": ["苹果", "香蕉", "苹果", "橙子", "香蕉"], "Quantity": [10, 5, 20, 15, 8]})\n\n# 请在下方编写代码\n',
        correctAnswer: 'top_products = df.groupby("Description")["Quantity"].sum().sort_values(ascending=False).head(5)',
        explanation: '按商品分组，对数量求和，降序排序，取前5个。',
        difficulty: 2,
        points: 10,
        testCases: [
          {
            input: 'df = pd.DataFrame({"Description": ["A", "B", "A", "C"], "Quantity": [10, 5, 20, 15]})',
            expectedOutput: 'A    30',
            description: '测试销量排序'
          }
        ]
      },
      {
        id: '03-mb-09',
        projectId: '03-market-basket',
        type: 'coding',
        question: '编写代码，计算每个订单包含的商品数量，结果存储在变量order_sizes中。',
        starterCode: 'import pandas as pd\n\ndf = pd.DataFrame({"InvoiceNo": ["001", "001", "002", "002", "002"], "Description": ["苹果", "香蕉", "橙子", "葡萄", "西瓜"]})\n\n# 请在下方编写代码\n',
        correctAnswer: 'order_sizes = df.groupby("InvoiceNo")["Description"].count()',
        explanation: '按订单号分组，统计每组的商品数量（行数）。',
        difficulty: 2,
        points: 10,
        testCases: [
          {
            input: 'df = pd.DataFrame({"InvoiceNo": [1, 1, 2, 2, 2], "Description": ["A", "B", "C", "D", "E"]})',
            expectedOutput: '1    2\n2    3',
            description: '测试订单商品数量'
          }
        ]
      },
      {
        id: '03-mb-10',
        projectId: '03-market-basket',
        type: 'coding',
        question: '编写代码，找出包含商品数量最多的订单号，存储在变量largest_order中。',
        starterCode: 'import pandas as pd\n\ndf = pd.DataFrame({"InvoiceNo": ["001", "001", "002", "002", "002"], "Description": ["苹果", "香蕉", "橙子", "葡萄", "西瓜"]})\n\n# 请在下方编写代码\n',
        correctAnswer: 'largest_order = df.groupby("InvoiceNo")["Description"].count().idxmax()',
        explanation: '先统计每个订单的商品数量，然后用idxmax()找出数量最大的订单号。',
        difficulty: 3,
        points: 10,
        testCases: [
          {
            input: 'df = pd.DataFrame({"InvoiceNo": [1, 1, 2, 2, 2], "Description": ["A", "B", "C", "D", "E"]})',
            expectedOutput: '2',
            description: '测试找出最大订单'
          }
        ]
      }
    ]
  },
  {
    projectId: '04-clustering',
    title: '客户聚类分析',
    timeLimit: 20,
    totalPoints: 100,
    passingScore: 60,
    questions: [
      {
        id: '04-clust-01',
        projectId: '04-clustering',
        type: 'choice',
        question: 'K-Means聚类算法需要预先指定什么参数？',
        options: [
          '数据范围',
          '聚类数量K',
          '迭代次数',
          '数据类型'
        ],
        correctAnswer: '聚类数量K',
        explanation: 'K-Means需要预先指定聚类数量K，这是该算法的一个限制。选择合适的K值可以使用手肘法或轮廓系数。',
        difficulty: 1,
        points: 10
      },
      {
        id: '04-clust-02',
        projectId: '04-clustering',
        type: 'choice',
        question: 'RFM模型中的R代表什么？',
        options: [
          '消费频率',
          '消费金额',
          '最近消费时间',
          '客户等级'
        ],
        correctAnswer: '最近消费时间',
        explanation: 'RFM模型：R(Recency)最近消费时间，F(Frequency)消费频率，M(Monetary)消费金额。',
        difficulty: 1,
        points: 10
      },
      {
        id: '04-clust-03',
        projectId: '04-clustering',
        type: 'choice',
        question: '为什么在聚类前需要对数据进行标准化？',
        options: [
          '提高计算速度',
          '消除不同特征的量纲影响',
          '减少数据量',
          '增加数据维度'
        ],
        correctAnswer: '消除不同特征的量纲影响',
        explanation: '不同特征的数值范围可能差异很大，标准化可以消除量纲影响，使每个特征对距离计算的贡献相等。',
        difficulty: 2,
        points: 10
      },
      {
        id: '04-clust-04',
        projectId: '04-clustering',
        type: 'choice',
        question: '手肘法用于确定什么？',
        options: [
          '最佳迭代次数',
          '最佳聚类数量K',
          '最佳初始化中心',
          '最佳距离度量'
        ],
        correctAnswer: '最佳聚类数量K',
        explanation: '手肘法通过绘制不同K值对应的SSE曲线，找到曲线拐点（手肘点）作为最佳聚类数量。',
        difficulty: 2,
        points: 10
      },
      {
        id: '04-clust-05',
        projectId: '04-clustering',
        type: 'fillBlank',
        question: '填写代码，使用StandardScaler标准化数据：',
        code: 'from sklearn.preprocessing import StandardScaler\nscaler = StandardScaler()\nscaled_data = scaler._____(data)',
        correctAnswer: 'fit_transform',
        explanation: 'fit_transform()同时完成拟合（计算均值和标准差）和转换（应用标准化）两个步骤。',
        difficulty: 1,
        points: 10
      },
      {
        id: '04-clust-06',
        projectId: '04-clustering',
        type: 'fillBlank',
        question: '填写代码，创建K-Means模型并拟合数据：',
        code: 'from sklearn.cluster import KMeans\nkmeans = KMeans(n_clusters=4)\nclusters = kmeans._____(data)',
        correctAnswer: 'fit_predict',
        explanation: 'fit_predict()同时完成模型拟合和预测，返回每个样本的聚类标签。',
        difficulty: 1,
        points: 10
      },
      {
        id: '04-clust-07',
        projectId: '04-clustering',
        type: 'fillBlank',
        question: '填写代码，获取聚类中心点：',
        code: 'centers = kmeans._____',
        correctAnswer: 'cluster_centers_',
        explanation: 'cluster_centers_属性存储了每个聚类的中心点坐标，是一个形状为(n_clusters, n_features)的数组。',
        difficulty: 2,
        points: 10
      },
      {
        id: '04-clust-08',
        projectId: '04-clustering',
        type: 'coding',
        question: '编写代码，计算每个聚类中心的平均消费金额，存储在变量cluster_avg_spent中。',
        starterCode: 'import pandas as pd\n\ndf = pd.DataFrame({"customer_id": [1, 2, 3, 4, 5, 6], "total_spent": [100, 200, 150, 300, 250, 400], "cluster": [0, 0, 1, 1, 2, 2]})\n\n# 请在下方编写代码\n',
        correctAnswer: 'cluster_avg_spent = df.groupby("cluster")["total_spent"].mean()',
        explanation: '按聚类标签分组，计算每组的平均消费金额。',
        difficulty: 2,
        points: 10,
        testCases: [
          {
            input: 'df = pd.DataFrame({"cluster": [0, 0, 1, 1], "total_spent": [100, 200, 300, 400]})',
            expectedOutput: '0    150\n1    350',
            description: '测试聚类平均消费'
          }
        ]
      },
      {
        id: '04-clust-09',
        projectId: '04-clustering',
        type: 'coding',
        question: '编写代码，统计每个聚类的客户数量，存储在变量cluster_sizes中。',
        starterCode: 'import pandas as pd\n\ndf = pd.DataFrame({"customer_id": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], "cluster": [0, 1, 0, 2, 1, 0, 2, 1, 0, 2]})\n\n# 请在下方编写代码\n',
        correctAnswer: 'cluster_sizes = df["cluster"].value_counts().sort_index()',
        explanation: '使用value_counts()统计每个聚类标签的出现次数，sort_index()按标签排序。',
        difficulty: 2,
        points: 10,
        testCases: [
          {
            input: 'df = pd.DataFrame({"cluster": [0, 0, 1, 1, 1, 2]})',
            expectedOutput: '0    2\n1    3\n2    1',
            description: '测试聚类大小统计'
          }
        ]
      },
      {
        id: '04-clust-10',
        projectId: '04-clustering',
        type: 'coding',
        question: '编写代码，找出消费金额最高的客户所属的聚类标签，存储在变量top_cluster中。',
        starterCode: 'import pandas as pd\n\ndf = pd.DataFrame({"customer_id": [1, 2, 3, 4, 5], "total_spent": [100, 500, 200, 300, 150], "cluster": [0, 1, 0, 2, 1]})\n\n# 请在下方编写代码\n',
        correctAnswer: 'top_cluster = df.loc[df["total_spent"].idxmax(), "cluster"]',
        explanation: '先用idxmax()找到消费金额最高的行索引，再用loc获取该行的聚类标签。',
        difficulty: 3,
        points: 10,
        testCases: [
          {
            input: 'df = pd.DataFrame({"total_spent": [100, 500, 200], "cluster": [0, 1, 2]})',
            expectedOutput: '1',
            description: '测试找出最高消费客户的聚类'
          }
        ]
      }
    ]
  },
  {
    projectId: '05-visualization',
    title: '数据可视化',
    timeLimit: 15,
    totalPoints: 100,
    passingScore: 60,
    questions: [
      {
        id: '05-vis-01',
        projectId: '05-visualization',
        type: 'choice',
        question: '展示数据随时间变化的趋势，最适合使用什么图表？',
        options: [
          '饼图',
          '柱状图',
          '折线图',
          '散点图'
        ],
        correctAnswer: '折线图',
        explanation: '折线图最适合展示数据随时间变化的趋势，可以清晰地看到上升或下降的趋势。',
        difficulty: 1,
        points: 10
      },
      {
        id: '05-vis-02',
        projectId: '05-visualization',
        type: 'choice',
        question: '比较不同类别的数值大小，最适合使用什么图表？',
        options: [
          '折线图',
          '柱状图',
          '散点图',
          '热力图'
        ],
        correctAnswer: '柱状图',
        explanation: '柱状图最适合比较不同类别之间的数值差异，高度直观反映数值大小。',
        difficulty: 1,
        points: 10
      },
      {
        id: '05-vis-03',
        projectId: '05-visualization',
        type: 'choice',
        question: '展示两个变量之间的关系，最适合使用什么图表？',
        options: [
          '柱状图',
          '饼图',
          '散点图',
          '直方图'
        ],
        correctAnswer: '散点图',
        explanation: '散点图可以展示两个变量之间的关系，观察是否存在相关性、聚类等模式。',
        difficulty: 1,
        points: 10
      },
      {
        id: '05-vis-04',
        projectId: '05-visualization',
        type: 'choice',
        question: 'Matplotlib中，如何设置图表标题？',
        options: [
          'plt.name()',
          'plt.title()',
          'plt.label()',
          'plt.heading()'
        ],
        correctAnswer: 'plt.title()',
        explanation: 'plt.title()用于设置图表的标题，可以传入字符串和字体大小等参数。',
        difficulty: 1,
        points: 10
      },
      {
        id: '05-vis-05',
        projectId: '05-visualization',
        type: 'fillBlank',
        question: '填写代码，创建一个10x6英寸的画布：',
        code: 'plt._____(figsize=(10, 6))',
        correctAnswer: 'figure',
        explanation: 'plt.figure()创建一个新的画布，figsize参数指定宽度和高度（英寸）。',
        difficulty: 1,
        points: 10
      },
      {
        id: '05-vis-06',
        projectId: '05-visualization',
        type: 'fillBlank',
        question: '填写代码，显示图表：',
        code: 'plt._____()',
        correctAnswer: 'show',
        explanation: 'plt.show()显示当前图表。在Jupyter中会自动显示，但在脚本中需要调用此方法。',
        difficulty: 1,
        points: 10
      },
      {
        id: '05-vis-07',
        projectId: '05-visualization',
        type: 'fillBlank',
        question: '填写代码，绘制柱状图：',
        code: 'plt._____(["A", "B", "C"], [10, 20, 15])',
        correctAnswer: 'bar',
        explanation: 'plt.bar()绘制柱状图，第一个参数是x轴标签，第二个参数是对应的高度值。',
        difficulty: 1,
        points: 10
      },
      {
        id: '05-vis-08',
        projectId: '05-visualization',
        type: 'coding',
        question: '编写代码，绘制city列各城市的订单数量柱状图，并设置标题为"各城市订单数量"。',
        starterCode: 'import pandas as pd\nimport matplotlib.pyplot as plt\n\ndf = pd.DataFrame({"city": ["北京", "上海", "北京", "广州", "上海", "北京"]})\ncity_counts = df["city"].value_counts()\n\n# 请在下方编写代码\n',
        correctAnswer: 'plt.bar(city_counts.index, city_counts.values)\nplt.title("各城市订单数量")\nplt.show()',
        explanation: '使用plt.bar()绑定x轴和y轴数据，plt.title()设置标题。',
        difficulty: 2,
        points: 10,
        testCases: [
          {
            input: 'city_counts = pd.Series([10, 20, 15], index=["北京", "上海", "广州"])',
            expectedOutput: '图表标题为"各城市订单数量"',
            description: '测试柱状图绘制'
          }
        ]
      },
      {
        id: '05-vis-09',
        projectId: '05-visualization',
        type: 'coding',
        question: '编写代码，绘制price列的直方图，设置20个区间。',
        starterCode: 'import pandas as pd\nimport matplotlib.pyplot as plt\n\ndf = pd.DataFrame({"price": [100, 150, 200, 120, 180, 250, 300, 220, 280, 350]})\n\n# 请在下方编写代码\n',
        correctAnswer: 'plt.hist(df["price"], bins=20)\nplt.title("价格分布")\nplt.show()',
        explanation: 'plt.hist()绘制直方图，bins参数指定区间数量。',
        difficulty: 2,
        points: 10,
        testCases: [
          {
            input: 'df = pd.DataFrame({"price": [100, 200, 150, 300, 250, 180, 220, 280]})',
            expectedOutput: '直方图包含20个区间',
            description: '测试直方图绘制'
          }
        ]
      },
      {
        id: '05-vis-10',
        projectId: '05-visualization',
        type: 'coding',
        question: '编写代码，绘制quantity和price的散点图，x轴为quantity，y轴为price。',
        starterCode: 'import pandas as pd\nimport matplotlib.pyplot as plt\n\ndf = pd.DataFrame({"quantity": [1, 2, 3, 4, 5, 6], "price": [100, 200, 150, 300, 250, 400]})\n\n# 请在下方编写代码\n',
        correctAnswer: 'plt.scatter(df["quantity"], df["price"])\nplt.xlabel("quantity")\nplt.ylabel("price")\nplt.show()',
        explanation: 'plt.scatter()绘制散点图，xlabel和ylabel设置轴标签。',
        difficulty: 2,
        points: 10,
        testCases: [
          {
            input: 'df = pd.DataFrame({"quantity": [1, 2, 3, 4], "price": [100, 200, 300, 400]})',
            expectedOutput: '散点图包含4个点',
            description: '测试散点图绘制'
          }
        ]
      }
    ]
  },
  {
    projectId: '06-ab-testing',
    title: 'A/B测试分析',
    timeLimit: 20,
    totalPoints: 100,
    passingScore: 60,
    questions: [
      {
        id: '06-ab-01',
        projectId: '06-ab-testing',
        type: 'choice',
        question: 'A/B测试中，对照组(Control)是指？',
        options: [
          '新版本的测试组',
          '原始版本',
          '随机选择的用户',
          '被排除的用户'
        ],
        correctAnswer: '原始版本',
        explanation: '对照组使用原始版本，作为基准与实验组（新版本）进行对比。',
        difficulty: 1,
        points: 10
      },
      {
        id: '06-ab-02',
        projectId: '06-ab-testing',
        type: 'choice',
        question: 'p值小于0.05意味着什么？',
        options: [
          '结果一定正确',
          '差异统计显著',
          '差异没有意义',
          '需要更多样本'
        ],
        correctAnswer: '差异统计显著',
        explanation: 'p值<0.05表示在原假设下，观察到当前结果的概率很低，可以拒绝原假设，认为差异统计显著。',
        difficulty: 2,
        points: 10
      },
      {
        id: '06-ab-03',
        projectId: '06-ab-testing',
        type: 'choice',
        question: '卡方检验适用于什么类型的数据？',
        options: [
          '连续数值数据',
          '分类数据',
          '时间序列数据',
          '文本数据'
        ],
        correctAnswer: '分类数据',
        explanation: '卡方检验用于分析分类变量之间的关系，如转化率（转化/未转化）的比较。',
        difficulty: 2,
        points: 10
      },
      {
        id: '06-ab-04',
        projectId: '06-ab-testing',
        type: 'choice',
        question: '原假设(H0)通常是什么？',
        options: [
          '两组有显著差异',
          '两组没有差异',
          '实验组更好',
          '对照组更好'
        ],
        correctAnswer: '两组没有差异',
        explanation: '原假设通常假设没有效应或没有差异，通过检验来决定是否拒绝这个假设。',
        difficulty: 1,
        points: 10
      },
      {
        id: '06-ab-05',
        projectId: '06-ab-testing',
        type: 'fillBlank',
        question: '填写代码，计算各组的转化率：',
        code: 'conversion_rate = df.groupby("group")["conversion"]._____()',
        correctAnswer: 'mean',
        explanation: '转化率是转化次数除以总数，对于0/1变量，mean()直接计算转化率。',
        difficulty: 1,
        points: 10
      },
      {
        id: '06-ab-06',
        projectId: '06-ab-testing',
        type: 'fillBlank',
        question: '填写代码，创建交叉表：',
        code: 'table = pd._____(df["group"], df["conversion"])',
        correctAnswer: 'crosstab',
        explanation: 'pd.crosstab()创建交叉表（列联表），用于统计两个分类变量的频数。',
        difficulty: 1,
        points: 10
      },
      {
        id: '06-ab-07',
        projectId: '06-ab-testing',
        type: 'fillBlank',
        question: '填写代码，计算绝对提升：',
        code: 'lift = treatment_rate - _____',
        correctAnswer: 'control_rate',
        explanation: '绝对提升 = 实验组转化率 - 对照组转化率，表示实验组相对于对照组的提升幅度。',
        difficulty: 1,
        points: 10
      },
      {
        id: '06-ab-08',
        projectId: '06-ab-testing',
        type: 'coding',
        question: '编写代码，计算A组和B组的转化率，存储在变量conversion_rates中。',
        starterCode: 'import pandas as pd\n\ndf = pd.DataFrame({"group": ["A", "A", "A", "B", "B", "B"], "conversion": [1, 0, 1, 1, 1, 0]})\n\n# 请在下方编写代码\n',
        correctAnswer: 'conversion_rates = df.groupby("group")["conversion"].mean()',
        explanation: '按group分组，对conversion列求均值，得到各组转化率。',
        difficulty: 2,
        points: 10,
        testCases: [
          {
            input: 'df = pd.DataFrame({"group": ["A", "A", "B", "B"], "conversion": [1, 0, 1, 1]})',
            expectedOutput: 'A    0.5\nB    1.0',
            description: '测试转化率计算'
          }
        ]
      },
      {
        id: '06-ab-09',
        projectId: '06-ab-testing',
        type: 'coding',
        question: '编写代码，计算相对提升（B组相对于A组的提升百分比），存储在变量relative_lift中。',
        starterCode: 'import pandas as pd\n\ndf = pd.DataFrame({"group": ["A", "A", "A", "B", "B", "B"], "conversion": [1, 0, 1, 1, 1, 0]})\nconversion_rates = df.groupby("group")["conversion"].mean()\n\n# 请在下方编写代码\n',
        correctAnswer: 'relative_lift = (conversion_rates["B"] - conversion_rates["A"]) / conversion_rates["A"] * 100',
        explanation: '相对提升 = (实验组 - 对照组) / 对照组 * 100，表示提升的百分比。',
        difficulty: 2,
        points: 10,
        testCases: [
          {
            input: 'conversion_rates = pd.Series([0.1, 0.15], index=["A", "B"])',
            expectedOutput: '50.0',
            description: '测试相对提升计算'
          }
        ]
      },
      {
        id: '06-ab-10',
        projectId: '06-ab-testing',
        type: 'coding',
        question: '编写代码，统计每组的样本数量，存储在变量sample_sizes中。',
        starterCode: 'import pandas as pd\n\ndf = pd.DataFrame({"group": ["A", "A", "B", "B", "B", "A"], "conversion": [1, 0, 1, 1, 0, 1]})\n\n# 请在下方编写代码\n',
        correctAnswer: 'sample_sizes = df.groupby("group").size()',
        explanation: '使用groupby().size()统计每组的样本数量。',
        difficulty: 2,
        points: 10,
        testCases: [
          {
            input: 'df = pd.DataFrame({"group": ["A", "A", "B", "B", "B"]})',
            expectedOutput: 'A    2\nB    3',
            description: '测试样本数量统计'
          }
        ]
      }
    ]
  },
  {
    projectId: '07-time-series',
    title: '时间序列分析',
    timeLimit: 20,
    totalPoints: 100,
    passingScore: 60,
    questions: [
      {
        id: '07-ts-01',
        projectId: '07-time-series',
        type: 'choice',
        question: '时间序列数据最重要的特征是？',
        options: [
          '数据量大',
          '时间顺序重要',
          '数据类型单一',
          '没有缺失值'
        ],
        correctAnswer: '时间顺序重要',
        explanation: '时间序列数据的核心特征是观测值按时间顺序排列，时间顺序对分析至关重要。',
        difficulty: 1,
        points: 10
      },
      {
        id: '07-ts-02',
        projectId: '07-time-series',
        type: 'choice',
        question: '移动平均的作用是？',
        options: [
          '预测未来值',
          '平滑数据波动',
          '增加数据量',
          '填补缺失值'
        ],
        correctAnswer: '平滑数据波动',
        explanation: '移动平均通过计算窗口内的平均值，平滑短期波动，揭示长期趋势。',
        difficulty: 1,
        points: 10
      },
      {
        id: '07-ts-03',
        projectId: '07-time-series',
        type: 'choice',
        question: '季节性(Seasonality)是指？',
        options: [
          '长期增长趋势',
          '固定周期的规律波动',
          '随机波动',
          '异常值'
        ],
        correctAnswer: '固定周期的规律波动',
        explanation: '季节性是指数据在固定时间周期内（如每年、每月、每周）重复出现的规律性波动。',
        difficulty: 2,
        points: 10
      },
      {
        id: '07-ts-04',
        projectId: '07-time-series',
        type: 'choice',
        question: 'resample("W")表示什么？',
        options: [
          '按天重采样',
          '按周重采样',
          '按月重采样',
          '按年重采样'
        ],
        correctAnswer: '按周重采样',
        explanation: 'resample()用于时间序列重采样，"W"表示周(Weekly)，"D"表示天，"M"表示月。',
        difficulty: 1,
        points: 10
      },
      {
        id: '07-ts-05',
        projectId: '07-time-series',
        type: 'fillBlank',
        question: '填写代码，将date列转换为datetime类型：',
        code: 'df["date"] = pd.to_datetime(df["date"])',
        correctAnswer: 'to_datetime',
        explanation: 'pd.to_datetime()将字符串转换为datetime类型，便于时间序列操作。',
        difficulty: 1,
        points: 10
      },
      {
        id: '07-ts-06',
        projectId: '07-time-series',
        type: 'fillBlank',
        question: '填写代码，计算7天移动平均：',
        code: 'df["ma7"] = df["sales"]._____(window=7).mean()',
        correctAnswer: 'rolling',
        explanation: 'rolling()创建滑动窗口，window参数指定窗口大小，然后应用mean()计算移动平均。',
        difficulty: 1,
        points: 10
      },
      {
        id: '07-ts-07',
        projectId: '07-time-series',
        type: 'fillBlank',
        question: '填写代码，将date列设为索引：',
        code: 'df = df.set_index("_____")',
        correctAnswer: 'date',
        explanation: '将日期列设为索引后，可以使用resample()等时间序列专用方法。',
        difficulty: 1,
        points: 10
      },
      {
        id: '07-ts-08',
        projectId: '07-time-series',
        type: 'coding',
        question: '编写代码，按月汇总销售额，存储在变量monthly_sales中。',
        starterCode: 'import pandas as pd\n\ndates = pd.date_range("2024-01-01", periods=60, freq="D")\ndf = pd.DataFrame({"date": dates, "sales": range(100, 160)})\ndf = df.set_index("date")\n\n# 请在下方编写代码\n',
        correctAnswer: 'monthly_sales = df.resample("M")["sales"].sum()',
        explanation: '使用resample("M")按月重采样，然后对sales列求和。',
        difficulty: 2,
        points: 10,
        testCases: [
          {
            input: 'df = pd.DataFrame({"sales": [100, 200, 150]}, index=pd.to_datetime(["2024-01-01", "2024-01-15", "2024-02-01"]))',
            expectedOutput: '2024-01-31    300\n2024-02-29    150',
            description: '测试月度汇总'
          }
        ]
      },
      {
        id: '07-ts-09',
        projectId: '07-time-series',
        type: 'coding',
        question: '编写代码，计算销售额的7天移动平均，存储在变量df["ma7"]中。',
        starterCode: 'import pandas as pd\n\ndf = pd.DataFrame({"sales": [100, 120, 110, 130, 125, 140, 135, 150, 145, 160]})\n\n# 请在下方编写代码\n',
        correctAnswer: 'df["ma7"] = df["sales"].rolling(window=7).mean()',
        explanation: 'rolling(7)创建7天滑动窗口，mean()计算每个窗口的平均值。',
        difficulty: 2,
        points: 10,
        testCases: [
          {
            input: 'df = pd.DataFrame({"sales": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]})',
            expectedOutput: '第7个值为4.0',
            description: '测试移动平均'
          }
        ]
      },
      {
        id: '07-ts-10',
        projectId: '07-time-series',
        type: 'coding',
        question: '编写代码，提取日期中的月份，存储在变量df["month"]中。',
        starterCode: 'import pandas as pd\n\ndf = pd.DataFrame({"date": ["2024-01-15", "2024-03-20", "2024-06-10", "2024-12-25"]})\ndf["date"] = pd.to_datetime(df["date"])\n\n# 请在下方编写代码\n',
        correctAnswer: 'df["month"] = df["date"].dt.month',
        explanation: 'dt.month从datetime列中提取月份（1-12）。dt还有year、day、dayofweek等属性。',
        difficulty: 2,
        points: 10,
        testCases: [
          {
            input: 'df = pd.DataFrame({"date": pd.to_datetime(["2024-01-15", "2024-06-20"])})',
            expectedOutput: '0    1\n1    6',
            description: '测试月份提取'
          }
        ]
      }
    ]
  },
  {
    projectId: '08-feature-engineering',
    title: '特征工程',
    timeLimit: 20,
    totalPoints: 100,
    passingScore: 60,
    questions: [
      {
        id: '08-fe-01',
        projectId: '08-feature-engineering',
        type: 'choice',
        question: '特征工程的主要目的是？',
        options: [
          '减少数据量',
          '提高模型性能',
          '可视化数据',
          '存储数据'
        ],
        correctAnswer: '提高模型性能',
        explanation: '特征工程通过创建、转换、选择特征来提高机器学习模型的性能。',
        difficulty: 1,
        points: 10
      },
      {
        id: '08-fe-02',
        projectId: '08-feature-engineering',
        type: 'choice',
        question: 'One-Hot编码适用于什么类型的数据？',
        options: [
          '数值数据',
          '分类数据',
          '时间数据',
          '文本数据'
        ],
        correctAnswer: '分类数据',
        explanation: 'One-Hot编码将分类变量转换为二进制向量，每个类别对应一个新列。',
        difficulty: 1,
        points: 10
      },
      {
        id: '08-fe-03',
        projectId: '08-feature-engineering',
        type: 'choice',
        question: 'pd.qcut()的作用是？',
        options: [
          '按值排序',
          '按分位数分箱',
          '按等宽分箱',
          '按频率分组'
        ],
        correctAnswer: '按分位数分箱',
        explanation: 'qcut()按分位数将数据分成若干组，每组包含大致相同数量的样本。',
        difficulty: 2,
        points: 10
      },
      {
        id: '08-fe-04',
        projectId: '08-feature-engineering',
        type: 'choice',
        question: '为什么要处理分类变量的缺失值？',
        options: [
          '提高计算速度',
          '大多数模型不能处理缺失值',
          '减少存储空间',
          '美观'
        ],
        correctAnswer: '大多数模型不能处理缺失值',
        explanation: '大多数机器学习模型无法直接处理缺失值，需要在特征工程阶段进行处理。',
        difficulty: 1,
        points: 10
      },
      {
        id: '08-fe-05',
        projectId: '08-feature-engineering',
        type: 'fillBlank',
        question: '填写代码，将category列进行One-Hot编码：',
        code: 'dummies = pd.get_dummies(df["category"], prefix="_____")',
        correctAnswer: 'category',
        explanation: 'get_dummies()进行One-Hot编码，prefix参数指定新列的前缀名。',
        difficulty: 1,
        points: 10
      },
      {
        id: '08-fe-06',
        projectId: '08-feature-engineering',
        type: 'fillBlank',
        question: '填写代码，将price列分成4个等频区间：',
        code: 'df["price_bin"] = pd.qcut(df["price"], q=_____, labels=["低", "中", "高", "很高"])',
        correctAnswer: '4',
        explanation: 'qcut的q参数指定分成的区间数量，labels参数为每个区间命名。',
        difficulty: 1,
        points: 10
      },
      {
        id: '08-fe-07',
        projectId: '08-feature-engineering',
        type: 'fillBlank',
        question: '填写代码，使用map进行标签编码：',
        code: 'df["gender_encoded"] = df["gender"]._____({"男": 0, "女": 1})',
        correctAnswer: 'map',
        explanation: 'map()使用字典将值映射为新值，常用于简单的标签编码。',
        difficulty: 1,
        points: 10
      },
      {
        id: '08-fe-08',
        projectId: '08-feature-engineering',
        type: 'coding',
        question: '编写代码，计算用户注册至今的天数，存储在变量df["days_since_reg"]中。',
        starterCode: 'import pandas as pd\n\ndf = pd.DataFrame({"customer_id": [1, 2, 3], "registration_date": ["2024-01-01", "2024-03-15", "2024-06-20"]})\ndf["registration_date"] = pd.to_datetime(df["registration_date"])\n\n# 请在下方编写代码\n',
        correctAnswer: 'df["days_since_reg"] = (pd.Timestamp.now() - df["registration_date"]).dt.days',
        explanation: '用当前时间减去注册时间，得到时间差，再用dt.days提取天数。',
        difficulty: 2,
        points: 10,
        testCases: [
          {
            input: 'df = pd.DataFrame({"registration_date": pd.to_datetime(["2024-01-01"])})',
            expectedOutput: '天数大于0',
            description: '测试天数计算'
          }
        ]
      },
      {
        id: '08-fe-09',
        projectId: '08-feature-engineering',
        type: 'coding',
        question: '编写代码，将membership_level列进行标签编码，存储在变量df["membership_encoded"]中。',
        starterCode: 'import pandas as pd\n\ndf = pd.DataFrame({"customer_id": [1, 2, 3, 4], "membership_level": ["普通", "银卡", "金卡", "钻石"]})\n\n# 请在下方编写代码\n',
        correctAnswer: 'membership_map = {"普通": 0, "银卡": 1, "金卡": 2, "钻石": 3}\ndf["membership_encoded"] = df["membership_level"].map(membership_map)',
        explanation: '创建映射字典，然后用map()将类别转换为数值。',
        difficulty: 2,
        points: 10,
        testCases: [
          {
            input: 'df = pd.DataFrame({"membership_level": ["普通", "金卡", "钻石"]})',
            expectedOutput: '0    0\n1    2\n2    3',
            description: '测试标签编码'
          }
        ]
      },
      {
        id: '08-fe-10',
        projectId: '08-feature-engineering',
        type: 'coding',
        question: '编写代码，将total_spent列分成4个等频区间，标签为"低"、"中"、"高"、"很高"，存储在变量df["spend_tier"]中。',
        starterCode: 'import pandas as pd\n\ndf = pd.DataFrame({"customer_id": range(1, 9), "total_spent": [100, 200, 300, 400, 500, 600, 700, 800]})\n\n# 请在下方编写代码\n',
        correctAnswer: 'df["spend_tier"] = pd.qcut(df["total_spent"], q=4, labels=["低", "中", "高", "很高"])',
        explanation: '使用qcut按分位数分成4组，labels指定每个区间的标签。',
        difficulty: 2,
        points: 10,
        testCases: [
          {
            input: 'df = pd.DataFrame({"total_spent": [100, 200, 300, 400, 500, 600, 700, 800]})',
            expectedOutput: '每组2个样本',
            description: '测试等频分箱'
          }
        ]
      }
    ]
  },
  {
    projectId: '09-outlier-detection',
    title: '异常值检测',
    timeLimit: 15,
    totalPoints: 100,
    passingScore: 60,
    questions: [
      {
        id: '09-od-01',
        projectId: '09-outlier-detection',
        type: 'choice',
        question: 'IQR方法中，异常值的判定范围是？',
        options: [
          'Q1 - IQR 到 Q3 + IQR',
          'Q1 - 1.5*IQR 到 Q3 + 1.5*IQR',
          '均值 ± 2倍标准差',
          '最小值到最大值'
        ],
        correctAnswer: 'Q1 - 1.5*IQR 到 Q3 + 1.5*IQR',
        explanation: 'IQR方法中，正常范围是[Q1-1.5*IQR, Q3+1.5*IQR]，超出此范围的值被视为异常值。',
        difficulty: 1,
        points: 10
      },
      {
        id: '09-od-02',
        projectId: '09-outlier-detection',
        type: 'choice',
        question: 'IQR是什么的缩写？',
        options: [
          'Inter-Quartile Range',
          'Internal Query Result',
          'Integer Quantity Range',
          'Interval Quality Rating'
        ],
        correctAnswer: 'Inter-Quartile Range',
        explanation: 'IQR = Inter-Quartile Range（四分位距），等于Q3 - Q1，表示中间50%数据的范围。',
        difficulty: 1,
        points: 10
      },
      {
        id: '09-od-03',
        projectId: '09-outlier-detection',
        type: 'choice',
        question: '为什么IQR方法比Z-score方法更稳健？',
        options: [
          '计算更简单',
          '不受极端值影响',
          '适用于所有数据',
          '结果更精确'
        ],
        correctAnswer: '不受极端值影响',
        explanation: 'IQR基于中位数和四分位数，这些统计量不受极端值影响，因此IQR方法更稳健。',
        difficulty: 2,
        points: 10
      },
      {
        id: '09-od-04',
        projectId: '09-outlier-detection',
        type: 'choice',
        question: 'describe()方法中，25%表示什么？',
        options: [
          '最小值',
          '第一四分位数(Q1)',
          '中位数',
          '第三四分位数(Q3)'
        ],
        correctAnswer: '第一四分位数(Q1)',
        explanation: 'describe()中的25%表示第一四分位数Q1，即25%的数据小于此值。',
        difficulty: 1,
        points: 10
      },
      {
        id: '09-od-05',
        projectId: '09-outlier-detection',
        type: 'fillBlank',
        question: '填写代码，计算Q1：',
        code: 'Q1 = df["price"]._____(0.25)',
        correctAnswer: 'quantile',
        explanation: 'quantile()方法计算指定分位数的值，0.25表示第一四分位数。',
        difficulty: 1,
        points: 10
      },
      {
        id: '09-od-06',
        projectId: '09-outlier-detection',
        type: 'fillBlank',
        question: '填写代码，计算IQR：',
        code: 'IQR = Q3 - _____',
        correctAnswer: 'Q1',
        explanation: 'IQR = Q3 - Q1，即第三四分位数减去第一四分位数。',
        difficulty: 1,
        points: 10
      },
      {
        id: '09-od-07',
        projectId: '09-outlier-detection',
        type: 'fillBlank',
        question: '填写代码，找出大于上界的异常值：',
        code: 'outliers = df[df["price"] > _____]',
        correctAnswer: 'upper',
        explanation: '上界upper = Q3 + 1.5*IQR，超出上界的值被视为异常值。',
        difficulty: 1,
        points: 10
      },
      {
        id: '09-od-08',
        projectId: '09-outlier-detection',
        type: 'coding',
        question: '编写代码，计算price列的IQR，存储在变量IQR中。',
        starterCode: 'import pandas as pd\n\ndf = pd.DataFrame({"total_spent": [100, 150, 200, 250, 300, 350, 400, 450, 500, 1000]})\n\n# 请在下方编写代码\n',
        correctAnswer: 'Q1 = df["total_spent"].quantile(0.25)\nQ3 = df["total_spent"].quantile(0.75)\nIQR = Q3 - Q1',
        explanation: '先计算Q1和Q3，然后计算IQR = Q3 - Q1。',
        difficulty: 2,
        points: 10,
        testCases: [
          {
            input: 'df = pd.DataFrame({"total_spent": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]})',
            expectedOutput: 'IQR = 4.5',
            description: '测试IQR计算'
          }
        ]
      },
      {
        id: '09-od-09',
        projectId: '09-outlier-detection',
        type: 'coding',
        question: '编写代码，使用IQR方法找出total_spent列的异常值，存储在变量outliers中。',
        starterCode: 'import pandas as pd\n\ndf = pd.DataFrame({"total_spent": [100, 150, 200, 250, 300, 350, 400, 450, 500, 1000]})\nQ1 = df["total_spent"].quantile(0.25)\nQ3 = df["total_spent"].quantile(0.75)\nIQR = Q3 - Q1\nlower = Q1 - 1.5 * IQR\nupper = Q3 + 1.5 * IQR\n\n# 请在下方编写代码\n',
        correctAnswer: 'outliers = df[(df["total_spent"] < lower) | (df["total_spent"] > upper)]',
        explanation: '使用布尔索引找出小于下界或大于上界的值。',
        difficulty: 2,
        points: 10,
        testCases: [
          {
            input: 'df = pd.DataFrame({"total_spent": [1, 2, 3, 4, 5, 100]})\nlower, upper = 0.5, 7.5',
            expectedOutput: '异常值为100',
            description: '测试异常值检测'
          }
        ]
      },
      {
        id: '09-od-10',
        projectId: '09-outlier-detection',
        type: 'coding',
        question: '编写代码，统计异常值的数量，存储在变量outlier_count中。',
        starterCode: 'import pandas as pd\n\ndf = pd.DataFrame({"total_spent": [100, 150, 200, 250, 300, 350, 400, 450, 500, 1000]})\nQ1 = df["total_spent"].quantile(0.25)\nQ3 = df["total_spent"].quantile(0.75)\nIQR = Q3 - Q1\nlower = Q1 - 1.5 * IQR\nupper = Q3 + 1.5 * IQR\n\n# 请在下方编写代码\n',
        correctAnswer: 'outlier_count = ((df["total_spent"] < lower) | (df["total_spent"] > upper)).sum()',
        explanation: '使用布尔条件判断异常值，sum()统计True的数量。',
        difficulty: 2,
        points: 10,
        testCases: [
          {
            input: 'df = pd.DataFrame({"total_spent": [1, 2, 3, 4, 5, 100]})\nlower, upper = 0.5, 7.5',
            expectedOutput: '1',
            description: '测试异常值计数'
          }
        ]
      }
    ]
  },
  {
    projectId: '10-data-merge',
    title: '多数据集合并',
    timeLimit: 15,
    totalPoints: 100,
    passingScore: 60,
    questions: [
      {
        id: '10-merge-01',
        projectId: '10-data-merge',
        type: 'choice',
        question: 'pd.merge()的how="left"表示什么？',
        options: [
          '内连接',
          '左连接',
          '右连接',
          '外连接'
        ],
        correctAnswer: '左连接',
        explanation: '左连接保留左表所有行，右表没有匹配的用NaN填充。',
        difficulty: 1,
        points: 10
      },
      {
        id: '10-merge-02',
        projectId: '10-data-merge',
        type: 'choice',
        question: '内连接(INNER JOIN)的结果是什么？',
        options: [
          '保留所有行',
          '只保留两边都有的行',
          '只保留左表的行',
          '只保留右表的行'
        ],
        correctAnswer: '只保留两边都有的行',
        explanation: '内连接只保留两个表中都有匹配键的行。',
        difficulty: 1,
        points: 10
      },
      {
        id: '10-merge-03',
        projectId: '10-data-merge',
        type: 'choice',
        question: 'concat()和merge()的主要区别是？',
        options: [
          'concat()更快',
          'concat()用于拼接，merge()用于连接',
          'merge()只能用于两个表',
          'concat()只能纵向拼接'
        ],
        correctAnswer: 'concat()用于拼接，merge()用于连接',
        explanation: 'concat()用于沿轴拼接数据，merge()用于基于键连接数据。',
        difficulty: 2,
        points: 10
      },
      {
        id: '10-merge-04',
        projectId: '10-data-merge',
        type: 'choice',
        question: '两个表的连接键名称不同时，应该使用什么参数？',
        options: [
          'on',
          'left_on和right_on',
          'key',
          'join_on'
        ],
        correctAnswer: 'left_on和right_on',
        explanation: '当两个表的连接键名称不同时，使用left_on指定左表的键，right_on指定右表的键。',
        difficulty: 2,
        points: 10
      },
      {
        id: '10-merge-05',
        projectId: '10-data-merge',
        type: 'fillBlank',
        question: '填写代码，进行左连接：',
        code: 'result = pd.merge(df1, df2, on="id", how="_____")',
        correctAnswer: 'left',
        explanation: 'how="left"表示左连接，保留左表所有行。',
        difficulty: 1,
        points: 10
      },
      {
        id: '10-merge-06',
        projectId: '10-data-merge',
        type: 'fillBlank',
        question: '填写代码，纵向拼接两个DataFrame：',
        code: 'result = pd._____([df1, df2])',
        correctAnswer: 'concat',
        explanation: 'pd.concat()用于沿轴拼接多个DataFrame，默认纵向拼接。',
        difficulty: 1,
        points: 10
      },
      {
        id: '10-merge-07',
        projectId: '10-data-merge',
        type: 'fillBlank',
        question: '填写代码，指定左表和右表的连接键：',
        code: 'result = pd.merge(df1, df2, left_on="user_id", _____="customer_id")',
        correctAnswer: 'right_on',
        explanation: '当连接键名称不同时，使用left_on和right_on分别指定。',
        difficulty: 1,
        points: 10
      },
      {
        id: '10-merge-08',
        projectId: '10-data-merge',
        type: 'coding',
        question: '编写代码，将orders和customers按customer_id进行左连接，存储在变量merged中。',
        starterCode: 'import pandas as pd\n\norders = pd.DataFrame({"order_id": [1, 2, 3], "customer_id": ["C1", "C2", "C3"], "amount": [100, 200, 150]})\ncustomers = pd.DataFrame({"customer_id": ["C1", "C2"], "name": ["Alice", "Bob"], "level": ["金卡", "银卡"]})\n\n# 请在下方编写代码\n',
        correctAnswer: 'merged = pd.merge(orders, customers, on="customer_id", how="left")',
        explanation: '使用pd.merge()进行左连接，on指定连接键。',
        difficulty: 2,
        points: 10,
        testCases: [
          {
            input: 'orders = pd.DataFrame({"order_id": [1, 2], "customer_id": ["C1", "C2"]})\ncustomers = pd.DataFrame({"customer_id": ["C1", "C2"], "name": ["Alice", "Bob"]})',
            expectedOutput: '合并后2行3列',
            description: '测试左连接'
          }
        ]
      },
      {
        id: '10-merge-09',
        projectId: '10-data-merge',
        type: 'coding',
        question: '编写代码，统计合并后每个会员等级的订单数量，存储在变量level_orders中。',
        starterCode: 'import pandas as pd\n\norders = pd.DataFrame({"order_id": [1, 2, 3, 4], "customer_id": ["C1", "C2", "C1", "C3"]})\ncustomers = pd.DataFrame({"customer_id": ["C1", "C2", "C3"], "level": ["金卡", "银卡", "金卡"]})\nmerged = pd.merge(orders, customers, on="customer_id", how="left")\n\n# 请在下方编写代码\n',
        correctAnswer: 'level_orders = merged.groupby("level")["order_id"].count()',
        explanation: '合并后按会员等级分组，统计订单数量。',
        difficulty: 2,
        points: 10,
        testCases: [
          {
            input: 'merged = pd.DataFrame({"membership_level": ["金卡", "金卡", "银卡"], "order_id": [1, 2, 3]})',
            expectedOutput: '金卡    2\n银卡    1',
            description: '测试分组统计'
          }
        ]
      },
      {
        id: '10-merge-10',
        projectId: '10-data-merge',
        type: 'coding',
        question: '编写代码，找出合并后没有匹配到客户信息的订单数量，存储在变量unmatched_count中。',
        starterCode: 'import pandas as pd\n\norders = pd.DataFrame({"order_id": [1, 2, 3], "customer_id": ["C1", "C2", "C4"]})\ncustomers = pd.DataFrame({"customer_id": ["C1", "C2", "C3"], "name": ["Alice", "Bob", "Carol"]})\nmerged = pd.merge(orders, customers, on="customer_id", how="left", indicator=True)\n\n# 请在下方编写代码\n',
        correctAnswer: 'unmatched_count = (merged["_merge"] == "left_only").sum()',
        explanation: '使用indicator=True参数，会添加_merge列标记匹配情况，left_only表示只存在于左表。',
        difficulty: 3,
        points: 10,
        testCases: [
          {
            input: 'merged = pd.DataFrame({"_merge": ["both", "both", "left_only"]})',
            expectedOutput: '1',
            description: '测试未匹配计数'
          }
        ]
      }
    ]
  }
];

export const badgeIcons: Record<string, string> = {
  '01-cleaning': '🧹',
  '02-aggregation': '📊',
  '03-market-basket': '🛒',
  '04-clustering': '👥',
  '05-visualization': '📈',
  '06-ab-testing': '🔬',
  '07-time-series': '⏰',
  '08-feature-engineering': '🔧',
  '09-outlier-detection': '🎯',
  '10-data-merge': '🔗'
};

export const badgeNames: Record<string, string> = {
  '01-cleaning': '数据清洗专家',
  '02-aggregation': '聚合分析达人',
  '03-market-basket': '购物篮分析师',
  '04-clustering': '客户洞察专家',
  '05-visualization': '可视化大师',
  '06-ab-testing': '实验设计专家',
  '07-time-series': '时序分析达人',
  '08-feature-engineering': '特征工程大师',
  '09-outlier-detection': '异常检测专家',
  '10-data-merge': '数据整合达人'
};
