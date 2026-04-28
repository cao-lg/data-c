import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface DataPreviewProps {
  dataset: string;
}

const DataPreview: React.FC<DataPreviewProps> = ({ dataset }) => {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(`/data/${dataset}`);
        if (!response.ok) {
          throw new Error(`无法加载数据集：${dataset}`);
        }
        const csvContent = await response.text();
        
        const lines = csvContent.split('\n').filter(line => line.trim() !== '');
        if (lines.length === 0) {
          setData([]);
          setColumns([]);
          setLoading(false);
          return;
        }
        
        const headers = lines[0].split(',');
        setColumns(headers);
        
        const rows = [];
        for (let i = 1; i < Math.min(lines.length, 6); i++) {
          const values = lines[i].split(',');
          const row: any = {};
          headers.forEach((header, index) => {
            row[header] = values[index] || '';
          });
          rows.push(row);
        }
        setData(rows);
      } catch (error) {
        console.error('加载数据集失败:', error);
        const mockData = [
          { id: 1, name: '产品A', price: 100, quantity: 5 },
          { id: 2, name: '产品B', price: 200, quantity: 3 },
          { id: 3, name: '产品C', price: 150, quantity: 8 },
          { id: 4, name: '产品D', price: 300, quantity: 2 },
          { id: 5, name: '产品E', price: 250, quantity: 4 },
        ];
        setData(mockData);
        setColumns(Object.keys(mockData[0]));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [dataset]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8 text-gray-500">
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
        <span>加载数据中...</span>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-blue-50 transition-colors">
                {columns.map((column) => (
                  <td key={column} className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                    {row[column]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 bg-gray-50 text-xs text-gray-500 border-t border-gray-200 flex items-center justify-center">
        <span className="flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          显示前 5 行数据
        </span>
      </div>
    </div>
  );
};

export default DataPreview;
