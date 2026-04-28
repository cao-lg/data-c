import React from 'react';
import { Terminal, Image as ImageIcon, ChevronDown, ChevronUp } from 'lucide-react';

interface OutputPanelProps {
  output: string;
  imageData?: string | null;
}

const OutputPanel: React.FC<OutputPanelProps> = ({ output, imageData }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <div className="w-full flex flex-col">
      {/* Output Header */}
      <div 
        className="bg-gradient-to-r from-gray-50 to-white px-5 py-3 border-b border-gray-200 shadow-sm cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <div className="p-1.5 bg-green-50 rounded-lg">
              <Terminal className="w-4 h-4 text-green-600" />
            </div>
            执行结果
          </h3>
          {isCollapsed ? (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          )}
        </div>
      </div>
      
      {!isCollapsed && (
        <div className="flex-1 p-5 bg-gray-50">
          <div className="h-full bg-gray-900 text-green-400 rounded-2xl p-5 font-mono text-sm overflow-auto shadow-inner border border-gray-700">
            {output ? (
              <pre className="whitespace-pre-wrap">
                {output}
              </pre>
            ) : (
              <div className="text-gray-500 text-center py-12">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Terminal className="w-8 h-8 text-gray-600" />
                </div>
                <p className="text-gray-400 font-medium">点击"运行代码"按钮来执行</p>
                <p className="text-gray-500 text-xs mt-2">代码将在浏览器中运行</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Image Output */}
      {!isCollapsed && imageData && (
        <div className="p-5 bg-gray-50 border-t border-gray-200">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="p-1.5 bg-blue-50 rounded-lg">
                <ImageIcon className="w-4 h-4 text-blue-600" />
              </div>
              图表输出
            </h4>
            <div className="flex justify-center bg-gray-50 rounded-xl p-4">
              <img 
                src={`data:image/png;base64,${imageData}`} 
                alt="Chart" 
                className="max-w-full h-auto rounded-lg shadow-sm"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutputPanel;
