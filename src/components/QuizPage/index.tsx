import React, { useState, useEffect, useCallback } from 'react';
import { quizConfigs, QuizQuestion, QuizResult, Badge, badgeIcons, badgeNames } from '../../data/quizData';
import CodeEditor from '../CodeEditor';
import { runPythonCode } from '../../pyodide';
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  X, 
  AlertCircle,
  Star,
  RotateCcw,
  Home,
  BookOpen
} from 'lucide-react';

interface QuizPageProps {
  projectId: string;
  onBadgeEarned?: (badge: Badge) => void;
  onBack: () => void;
  onHome: () => void;
}

const QuizPage: React.FC<QuizPageProps> = ({ projectId, onBadgeEarned, onBack, onHome }) => {
  const quizConfig = quizConfigs.find(q => q.projectId === projectId);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [timeLeft, setTimeLeft] = useState((quizConfig?.timeLimit || 15) * 60);
  const [isRunning, setIsRunning] = useState(true);
  const [codeOutput, setCodeOutput] = useState<string>('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [showExplanation, setShowExplanation] = useState<string | null>(null);
  const [skippedQuestions, setSkippedQuestions] = useState<Set<string>>(new Set());

  const currentQuestion = quizConfig?.questions[currentIndex];

  useEffect(() => {
    if (!isRunning || showResult) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, showResult]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (answer: string) => {
    if (currentQuestion) {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: answer
      }));
      setSkippedQuestions(prev => {
        const newSet = new Set(prev);
        newSet.delete(currentQuestion.id);
        return newSet;
      });
    }
  };

  const handleSkip = () => {
    if (currentQuestion) {
      setSkippedQuestions(prev => new Set(prev).add(currentQuestion.id));
      if (currentIndex < (quizConfig?.questions.length || 0) - 1) {
        setCurrentIndex(prev => prev + 1);
      }
    }
  };

  const executeCode = async () => {
    if (!currentQuestion || currentQuestion.type !== 'coding') return;
    
    setIsExecuting(true);
    setCodeOutput('');
    
    try {
      const userCode = answers[currentQuestion.id] || '';
      const fullCode = currentQuestion.starterCode + '\n' + userCode;
      const result = await runPythonCode(fullCode);
      setCodeOutput(result.stdout);
    } catch (error) {
      setCodeOutput(`执行错误: ${error}`);
    } finally {
      setIsExecuting(false);
    }
  };

  const checkCodingAnswer = useCallback((userCode: string, question: QuizQuestion): boolean => {
    if (!question.testCases || question.testCases.length === 0) {
      return userCode.trim().length > 0;
    }
    
    return question.testCases.some(tc => {
      const expected = tc.expectedOutput.trim();
      return userCode.includes(expected) || expected.includes(userCode.trim());
    });
  }, []);

  const handleSubmit = () => {
    if (!quizConfig) return;

    setIsRunning(false);
    
    let correctCount = 0;
    let wrongCount = 0;
    let skippedCount = 0;
    let totalPoints = 0;

    quizConfig.questions.forEach(question => {
      const userAnswer = answers[question.id];
      
      if (skippedQuestions.has(question.id) || !userAnswer) {
        skippedCount++;
        return;
      }

      let isCorrect = false;
      
      if (question.type === 'coding') {
        isCorrect = checkCodingAnswer(userAnswer, question);
      } else if (question.type === 'fillBlank') {
        isCorrect = userAnswer.trim().toLowerCase() === question.correctAnswer.toLowerCase();
      } else {
        isCorrect = userAnswer === question.correctAnswer;
      }

      if (isCorrect) {
        correctCount++;
        totalPoints += question.points;
      } else {
        wrongCount++;
      }
    });

    const passed = totalPoints >= quizConfig.passingScore;
    
    const quizResult: QuizResult = {
      projectId: quizConfig.projectId,
      score: totalPoints,
      totalPoints: quizConfig.totalPoints,
      correctCount,
      wrongCount,
      skippedCount,
      timeSpent: quizConfig.timeLimit * 60 - timeLeft,
      answers,
      passed,
      completedAt: new Date().toISOString()
    };

    setResult(quizResult);
    setShowResult(true);

    if (passed) {
      const badge: Badge = {
        id: `badge-${quizConfig.projectId}`,
        projectId: quizConfig.projectId,
        projectName: quizConfig.title,
        earnedAt: new Date().toISOString(),
        score: totalPoints,
        icon: badgeIcons[quizConfig.projectId] || '🏆'
      };
      
      saveBadge(badge);
      if (onBadgeEarned) {
        onBadgeEarned(badge);
      }
    }

    saveQuizResult(quizResult);
  };

  const saveBadge = (badge: Badge) => {
    const badges = JSON.parse(localStorage.getItem('pandas-badges') || '[]');
    const existingIndex = badges.findIndex((b: Badge) => b.projectId === badge.projectId);
    
    if (existingIndex >= 0) {
      if (badge.score > badges[existingIndex].score) {
        badges[existingIndex] = badge;
      }
    } else {
      badges.push(badge);
    }
    
    localStorage.setItem('pandas-badges', JSON.stringify(badges));
  };

  const saveQuizResult = (quizResult: QuizResult) => {
    const results = JSON.parse(localStorage.getItem('pandas-quiz-results') || '[]');
    results.push(quizResult);
    localStorage.setItem('pandas-quiz-results', JSON.stringify(results));
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setAnswers({});
    setShowResult(false);
    setResult(null);
    setTimeLeft((quizConfig?.timeLimit || 15) * 60);
    setIsRunning(true);
    setCodeOutput('');
    setShowExplanation(null);
    setSkippedQuestions(new Set());
  };

  if (!quizConfig) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h2 className="text-2xl font-bold mb-2">测试未找到</h2>
          <p className="text-gray-400 mb-4">该项目暂无测试内容</p>
          <button
            onClick={onBack}
            className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  if (showResult && result) {
    const scorePercentage = Math.round((result.score / result.totalPoints) * 100);
    const stars = result.passed ? (scorePercentage >= 90 ? 5 : scorePercentage >= 80 ? 4 : scorePercentage >= 70 ? 3 : 2) : 0;

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
            <div className="text-center mb-8">
              {result.passed ? (
                <>
                  <div className="text-6xl mb-4">{badgeIcons[quizConfig.projectId]}</div>
                  <h1 className="text-3xl font-bold text-white mb-2">恭喜通过！</h1>
                  <p className="text-xl text-yellow-400 font-semibold">
                    获得「{badgeNames[quizConfig.projectId]}」徽章
                  </p>
                </>
              ) : (
                <>
                  <X className="w-20 h-20 mx-auto text-red-500 mb-4" />
                  <h1 className="text-3xl font-bold text-white mb-2">继续努力</h1>
                  <p className="text-gray-400">距离通过还差 {quizConfig.passingScore - result.score} 分</p>
                </>
              )}
            </div>

            <div className="bg-gray-700/50 rounded-xl p-6 mb-6">
              <div className="flex justify-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-8 h-8 ${i < stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                  />
                ))}
              </div>
              
              <div className="text-center mb-6">
                <span className={`text-5xl font-bold ${
                  scorePercentage >= 80 ? 'text-green-400' : 
                  scorePercentage >= 60 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {result.score}
                </span>
                <span className="text-2xl text-gray-400"> / {result.totalPoints}</span>
                <p className="text-gray-400 mt-1">总分</p>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-green-500/20 rounded-lg p-3">
                  <Check className="w-6 h-6 text-green-400 mx-auto mb-1" />
                  <p className="text-2xl font-bold text-green-400">{result.correctCount}</p>
                  <p className="text-sm text-gray-400">正确</p>
                </div>
                <div className="bg-red-500/20 rounded-lg p-3">
                  <X className="w-6 h-6 text-red-400 mx-auto mb-1" />
                  <p className="text-2xl font-bold text-red-400">{result.wrongCount}</p>
                  <p className="text-sm text-gray-400">错误</p>
                </div>
                <div className="bg-gray-500/20 rounded-lg p-3">
                  <AlertCircle className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                  <p className="text-2xl font-bold text-gray-400">{result.skippedCount}</p>
                  <p className="text-sm text-gray-400">跳过</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                错题解析
              </h3>
              <div className="max-h-60 overflow-y-auto space-y-3">
                {quizConfig.questions
                  .filter(q => {
                    const userAnswer = answers[q.id];
                    if (!userAnswer || skippedQuestions.has(q.id)) return false;
                    if (q.type === 'coding') {
                      return !checkCodingAnswer(userAnswer, q);
                    }
                    return userAnswer !== q.correctAnswer;
                  })
                  .map(q => (
                    <div key={q.id} className="bg-gray-700/50 rounded-lg p-4">
                      <p className="text-white font-medium mb-2">{q.question}</p>
                      <p className="text-red-400 text-sm">你的答案: {answers[q.id] || '未作答'}</p>
                      <p className="text-green-400 text-sm">正确答案: {q.correctAnswer}</p>
                      <p className="text-gray-400 text-sm mt-2">{q.explanation}</p>
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleRetry}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <RotateCcw className="w-5 h-5" />
                重新测试
              </button>
              <button
                onClick={onBack}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                <BookOpen className="w-5 h-5" />
                返回学习
              </button>
              <button
                onClick={onHome}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                <Home className="w-5 h-5" />
                返回首页
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-white">{quizConfig.title} - 单元测试</h1>
                <p className="text-blue-100 text-sm">
                  第 {currentIndex + 1} / {quizConfig.questions.length} 题
                </p>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                timeLeft < 60 ? 'bg-red-500/30 text-red-300' : 'bg-white/20 text-white'
              }`}>
                <Clock className="w-5 h-5" />
                <span className="font-mono text-lg font-bold">{formatTime(timeLeft)}</span>
              </div>
            </div>
            
            <div className="mt-3 bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / quizConfig.questions.length) * 100}%` }}
              />
            </div>
          </div>

          {currentQuestion && (
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  currentQuestion.type === 'choice' ? 'bg-blue-500/20 text-blue-400' :
                  currentQuestion.type === 'fillBlank' ? 'bg-green-500/20 text-green-400' :
                  'bg-purple-500/20 text-purple-400'
                }`}>
                  {currentQuestion.type === 'choice' ? '选择题' :
                   currentQuestion.type === 'fillBlank' ? '填空题' : '编程题'}
                </span>
                <span className="text-gray-400 text-sm">{currentQuestion.points} 分</span>
                <span className={`px-2 py-0.5 rounded text-xs ${
                  currentQuestion.difficulty === 1 ? 'bg-green-500/20 text-green-400' :
                  currentQuestion.difficulty === 2 ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {currentQuestion.difficulty === 1 ? '简单' : 
                   currentQuestion.difficulty === 2 ? '中等' : '困难'}
                </span>
              </div>

              <div className="mb-6">
                <p className="text-xl text-white font-medium mb-4">{currentQuestion.question}</p>
                
                {currentQuestion.code && (
                  <pre className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm overflow-x-auto mb-4">
                    {currentQuestion.code}
                  </pre>
                )}
              </div>

              {currentQuestion.type === 'choice' && currentQuestion.options && (
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerChange(option)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition ${
                        answers[currentQuestion.id] === option
                          ? 'border-blue-500 bg-blue-500/20 text-white'
                          : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      <span className="font-medium mr-3">{['A', 'B', 'C', 'D'][index]}.</span>
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {currentQuestion.type === 'fillBlank' && (
                <div>
                  <input
                    type="text"
                    value={answers[currentQuestion.id] || ''}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                    placeholder="请填写答案..."
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  />
                  <p className="text-gray-400 text-sm mt-2">提示：填写代码中空白处应填入的内容</p>
                </div>
              )}

              {currentQuestion.type === 'coding' && (
                <div>
                  <div className="mb-2 text-sm text-gray-400">
                    起始代码：
                  </div>
                  <pre className="bg-gray-900 rounded-lg p-4 text-gray-300 font-mono text-sm overflow-x-auto mb-4">
                    {currentQuestion.starterCode}
                  </pre>
                  
                  <div className="mb-2 text-sm text-gray-400">
                    你的代码：
                  </div>
                  <div className="h-48 mb-4">
                    <CodeEditor
                      code={answers[currentQuestion.id] || ''}
                      onChange={handleAnswerChange}
                    />
                  </div>
                  
                  <div className="flex gap-3 mb-4">
                    <button
                      onClick={executeCode}
                      disabled={isExecuting}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                    >
                      {isExecuting ? '运行中...' : '运行代码'}
                    </button>
                  </div>
                  
                  {codeOutput && (
                    <div className="bg-gray-900 rounded-lg p-4">
                      <p className="text-gray-400 text-sm mb-2">输出结果：</p>
                      <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap">
                        {codeOutput}
                      </pre>
                    </div>
                  )}

                  {currentQuestion.testCases && (
                    <div className="mt-4">
                      <p className="text-gray-400 text-sm mb-2">测试用例：</p>
                      <div className="space-y-2">
                        {currentQuestion.testCases.map((tc, index) => (
                          <div key={index} className="bg-gray-700/50 rounded-lg p-3 text-sm">
                            <p className="text-gray-300">{tc.description}</p>
                            <p className="text-gray-400 mt-1">预期输出: <span className="text-green-400">{tc.expectedOutput}</span></p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {showExplanation === currentQuestion.id && (
                <div className="mt-4 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <p className="text-blue-400 font-medium mb-1">解析：</p>
                  <p className="text-gray-300 text-sm">{currentQuestion.explanation}</p>
                </div>
              )}

              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-700">
                <button
                  onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                  上一题
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowExplanation(showExplanation === currentQuestion.id ? null : currentQuestion.id)}
                    className="px-4 py-2 text-gray-400 hover:text-white"
                  >
                    查看提示
                  </button>
                  
                  <button
                    onClick={handleSkip}
                    className="px-4 py-2 text-gray-400 hover:text-white"
                  >
                    跳过
                  </button>
                </div>

                {currentIndex < quizConfig.questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIndex(prev => prev + 1)}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    下一题
                    <ChevronRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    <Check className="w-5 h-5" />
                    提交答案
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-center">
          <div className="flex gap-2">
            {quizConfig.questions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(index)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition ${
                  index === currentIndex
                    ? 'bg-blue-600 text-white'
                    : answers[q.id]
                      ? 'bg-green-600/30 text-green-400'
                      : skippedQuestions.has(q.id)
                        ? 'bg-yellow-600/30 text-yellow-400'
                        : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
