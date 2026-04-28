import React, { useState, useEffect, useRef } from 'react';
import { ProjectData } from '../../data/projects';
import CodeEditor from '../CodeEditor';
import OutputPanel from '../OutputPanel';
import DataPreview from '../DataPreview';
import { pyodideManager } from '../../pyodide';
import { 
  ArrowLeft, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  FileText, 
  Database, 
  BookOpen,
  Loader2,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Trophy,
  Info,
  Target,
  Plus,
  Minus,
  AlertCircle,
  Clock,
  Users,
  BarChart,
  Activity,
  Layers,
  Search,
  GitMerge,
  ShoppingCart,
  Save,
  RotateCw,
  Award
} from 'lucide-react';

interface ProjectWorkspaceProps {
  project: ProjectData;
  onBack: () => void;
  onStartQuiz?: () => void;
  hasBadge?: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
  Trophy: <Trophy className="w-5 h-5" />,
  BookOpen: <BookOpen className="w-5 h-5" />,
  Target: <Target className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
  Info: <Info className="w-5 h-5" />,
  RotateCcw: <RotateCcw className="w-5 h-5" />,
  AlertCircle: <AlertCircle className="w-5 h-5" />,
  Clock: <Clock className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  BarChart: <BarChart className="w-5 h-5" />,
  Activity: <Activity className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  Search: <Search className="w-5 h-5" />,
  GitMerge: <GitMerge className="w-5 h-5" />,
  ShoppingCart: <ShoppingCart className="w-5 h-5" />,
  Save: <Save className="w-5 h-5" />,
  Plus: <Plus className="w-5 h-5" />,
  Minus: <Minus className="w-5 h-5" />,
  RotateCw: <RotateCw className="w-5 h-5" />
};

const StepDetail = ({ step }: { step: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 mb-4 overflow-hidden">
      <div 
        className={`bg-gradient-to-r ${step.color} px-6 py-4 cursor-pointer transition-all duration-300 hover:shadow-lg flex items-center justify-between`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            {iconMap[step.icon] || <Info className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">{step.title}</h3>
            <p className="text-white/80 text-sm mt-1">{step.summary}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isExpanded ? (
            <div className="bg-white/20 p-2 rounded-full transition-all duration-300">
              <Minus className="w-5 h-5 text-white" />
            </div>
          ) : (
            <div className="bg-white/20 p-2 rounded-full transition-all duration-300">
              <Plus className="w-5 h-5 text-white" />
            </div>
          )}
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-6 space-y-4">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-500" />
              详细说明
            </h4>
            <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {step.explanation}
            </div>
          </div>
          
          {step.codeExample && (
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
              <h4 className="font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                代码示例
              </h4>
              <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap overflow-x-auto">
                {step.codeExample}
              </pre>
            </div>
          )}
          
          {step.tips && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                小贴士
              </h4>
              <p className="text-blue-700">{step.tips}</p>
            </div>
          )}
          
          {step.commonMistakes && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                常见错误
              </h4>
              <p className="text-red-700">{step.commonMistakes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ProjectWorkspace: React.FC<ProjectWorkspaceProps> = ({ project, onBack, onStartQuiz, hasBadge }) => {
  const [code, setCode] = useState(project.starterCode);
  const [output, setOutput] = useState('');
  const [imageData, setImageData] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const editorPanelRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedCode = localStorage.getItem(`project_${project.id}_code`);
    if (savedCode) {
      setCode(savedCode);
    }
  }, [project.id]);

  useEffect(() => {
    localStorage.setItem(`project_${project.id}_code`, code);
  }, [code, project.id]);

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('');
    setImageData(null);
    
    try {
      const response = await fetch(`/data/${project.dataset}`);
      if (!response.ok) {
        throw new Error(`无法加载数据集：${project.dataset}`);
      }
      const content = await response.text();
      
      const dataFiles = [{
        name: project.dataset,
        content
      }];
      
      const result = await pyodideManager.runCode(code, dataFiles);
      setOutput(result.stdout);
      setImageData(result.imageData);
    } catch (error: any) {
      setOutput(`错误：\n${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleResetCode = () => {
    if (confirm('确定要重置代码到初始状态吗？')) {
      setCode(project.starterCode);
    }
  };

  const handleLeftResize = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = leftPanelRef.current?.offsetWidth || 500;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const diffX = moveEvent.clientX - startX;
      const newWidth = Math.max(200, startWidth + diffX);
      if (leftPanelRef.current) {
        leftPanelRef.current.style.width = `${newWidth}px`;
      }
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleVerticalResize = (e: React.MouseEvent) => {
    e.preventDefault();
    const startY = e.clientY;
    const startHeight = editorPanelRef.current?.offsetHeight || 350;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const diffY = moveEvent.clientY - startY;
      const newHeight = Math.max(150, startHeight + diffY);
      if (editorPanelRef.current) {
        editorPanelRef.current.style.height = `${newHeight}px`;
      }
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="flex flex-1 overflow-hidden">
        <div 
          ref={leftPanelRef}
          className="bg-white flex flex-col shadow-sm transition-all duration-300 ease-in-out overflow-hidden"
          style={{ width: sidebarCollapsed ? '50px' : '500px' }}
        >
          <div className="flex-1 overflow-auto">
            <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between mb-4">
                {!sidebarCollapsed && (
                  <button 
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-white shadow-sm"
                    onClick={onBack}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="font-semibold">返回</span>
                  </button>
                )}
                <button 
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-white shadow-sm"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                >
                  {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>
              </div>
              {!sidebarCollapsed && (
                <>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-bold text-gray-900 leading-tight">{project.title}</h2>
                    {hasBadge && (
                      <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                        <Award className="w-3 h-3" />
                        已通过
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{project.description}</p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold border border-blue-200">
                      {project.difficulty}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold border border-gray-200">
                      {project.duration}
                    </span>
                  </div>
                </>
              )}
            </div>
            
            {!sidebarCollapsed && (
              <div className="p-6 space-y-6">
                {project.tutorials.map((section, sectionIdx) => (
                  <div key={sectionIdx}>
                    <div className="mb-4">
                      <div className={`bg-gradient-to-r ${section.color} px-5 py-3 rounded-t-xl`}>
                        <div className="flex items-center gap-3 text-white">
                          {iconMap[section.icon] || <BookOpen className="w-5 h-5" />}
                          <h3 className="font-bold text-lg">{section.title}</h3>
                        </div>
                      </div>
                    </div>
                    
                    {section.steps.map((step, stepIdx) => (
                      <StepDetail key={stepIdx} step={step} />
                    ))}
                  </div>
                ))}
                
                <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden mt-8">
                  <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <Database className="w-5 h-5 text-gray-700" />
                      <h3 className="font-semibold text-lg text-gray-800">数据集预览</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                      <div className="px-6 py-3 bg-white border-b border-gray-200 text-sm font-semibold text-gray-700">
                        {project.dataset}
                      </div>
                      <div className="p-4">
                        <DataPreview dataset={project.dataset} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {!sidebarCollapsed && (
          <div 
            className="w-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 cursor-col-resize hover:bg-gradient-to-r hover:from-blue-300 hover:via-blue-400 hover:to-blue-300 transition-all duration-300 flex items-center justify-center group border-y border-gray-300 hover:border-blue-300"
            onMouseDown={handleLeftResize}
          >
            <div className="flex flex-col items-center gap-1">
              <div className="w-1 h-8 bg-gray-500 group-hover:bg-white rounded-full transition-all duration-300" />
              <div className="w-1 h-8 bg-gray-500 group-hover:bg-white rounded-full transition-all duration-300" />
              <div className="w-1 h-8 bg-gray-500 group-hover:bg-white rounded-full transition-all duration-300" />
            </div>
          </div>
        )}

        <div className="flex-1 flex flex-col bg-white border-l border-gray-200">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 px-5 py-4 flex items-center gap-4 shadow-sm">
            <button 
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2.5 rounded-xl transition-all duration-300 font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              onClick={handleRunCode}
              disabled={isRunning}
            >
              {isRunning ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  运行中...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  运行代码
                </>
              )}
            </button>
            <button 
              className="bg-gradient-to-r from-white to-gray-50 hover:from-gray-50 hover:to-gray-100 text-gray-700 px-5 py-2.5 rounded-xl transition-all duration-300 font-semibold flex items-center gap-2 border border-gray-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              onClick={handleResetCode}
            >
              <RotateCcw className="w-4 h-4" />
              重置代码
            </button>
            <button 
              className="bg-gradient-to-r from-white to-gray-50 hover:from-gray-50 hover:to-gray-100 text-gray-700 px-5 py-2.5 rounded-xl transition-all duration-300 font-semibold flex items-center gap-2 border border-gray-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              onClick={() => setShowAnswer(!showAnswer)}
            >
              {showAnswer ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  隐藏参考答案
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  显示参考答案
                </>
              )}
            </button>
            <div className="flex-1" />
            
            {onStartQuiz && (
              <button 
                className={`px-5 py-2.5 rounded-xl transition-all duration-300 font-semibold flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                  hasBadge 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white' 
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                }`}
                onClick={onStartQuiz}
              >
                {hasBadge ? (
                  <>
                    <Award className="w-4 h-4" />
                    重新测试
                  </>
                ) : (
                  <>
                    <Trophy className="w-4 h-4" />
                    开始测试
                  </>
                )}
              </button>
            )}
            
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span className="font-medium">自动保存</span>
            </div>
          </div>

          <div ref={containerRef} className="flex-1 flex flex-col overflow-hidden">
            <div 
              ref={editorPanelRef}
              className="border-b border-gray-200 flex flex-col bg-gray-900"
              style={{ height: '350px' }}
            >
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-5 py-3 flex items-center gap-2 border-b border-gray-700">
                <FileText className="w-4 h-4 text-yellow-400" />
                <span className="font-semibold text-sm">{project.id}/main.py</span>
              </div>
              <div className="flex-1 bg-gray-900 overflow-hidden">
                <CodeEditor code={code} onChange={setCode} readOnly={false} />
              </div>
            </div>
            
            <div 
              className="h-6 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 cursor-row-resize hover:bg-gradient-to-b hover:from-blue-300 hover:via-blue-400 hover:to-blue-300 transition-all duration-300 flex items-center justify-center group border-x border-gray-300 hover:border-blue-300"
              onMouseDown={handleVerticalResize}
            >
              <div className="flex items-center gap-1">
                <div className="h-1 w-8 bg-gray-500 group-hover:bg-white rounded-full transition-all duration-300" />
                <div className="h-1 w-8 bg-gray-500 group-hover:bg-white rounded-full transition-all duration-300" />
                <div className="h-1 w-8 bg-gray-500 group-hover:bg-white rounded-full transition-all duration-300" />
              </div>
            </div>
            
            <div className="flex-1 flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
              {showAnswer ? (
                <div className="flex-1 flex flex-col">
                  <div className="bg-gradient-to-r from-blue-800 to-indigo-800 text-white px-5 py-3 flex items-center gap-2 border-b border-blue-700">
                    <FileText className="w-4 h-4 text-yellow-400" />
                    <span className="font-semibold text-sm">参考答案</span>
                  </div>
                  <div className="flex-1 bg-gray-900 p-6 overflow-auto">
                    <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                      {project.referenceCode}
                    </pre>
                  </div>
                </div>
              ) : (
                <OutputPanel output={output} imageData={imageData} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectWorkspace;
