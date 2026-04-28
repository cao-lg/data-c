import React from 'react';
import { ProjectData } from '../data/projects';
import { Badge, badgeIcons } from '../data/quizData';
import { Database, Zap, Award, BookOpen, Terminal, CheckCircle } from 'lucide-react';

interface ProjectListProps {
  projects: ProjectData[];
  onSelectProject: (project: ProjectData) => void;
  badges?: Badge[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onSelectProject, badges = [] }) => {
  const earnedBadgeIds = badges.map(b => b.projectId);
  const completedCount = earnedBadgeIds.length;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-4">
      {/* Hero Section */}
      <div className="relative overflow-hidden mb-12">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full mb-6">
            <Zap className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">实战课程 · 无需安装</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Pandas 数据分析
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              实战训练营
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            10个精选实战项目，从入门到进阶，完全在浏览器中运行代码
            <span className="font-medium text-gray-800"> · </span>
            让你从零开始掌握数据分析核心技能
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 px-6 py-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Database className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">真实数据集</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-2 bg-cyan-50 rounded-lg">
                <Terminal className="w-5 h-5 text-cyan-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">实时运行代码</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-2 bg-purple-50 rounded-lg">
                <BookOpen className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">循序渐进</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <Award className="w-5 h-5 text-yellow-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">徽章认证</span>
            </div>
          </div>
          
          {/* Progress */}
          {completedCount > 0 && (
            <div className="max-w-md mx-auto mb-8">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">学习进度</span>
                  <span className="text-sm font-bold text-blue-600">{completedCount}/10 项目</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500"
                    style={{ width: `${(completedCount / 10) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Earned Badges */}
          {badges.length > 0 && (
            <div className="max-w-2xl mx-auto mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-sm font-medium text-gray-700 mb-4">已获得徽章</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {badges.map(badge => (
                    <div 
                      key={badge.id}
                      className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200"
                    >
                      <span className="text-2xl">{badge.icon}</span>
                      <span className="text-sm font-medium text-gray-700">{badge.projectName}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Award className="w-6 h-6 text-yellow-500" />
              精选项目
            </h2>
            <p className="text-gray-600 mt-2">选择一个项目开始你的学习之旅</p>
          </div>
          <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
            共 {projects.length} 个项目
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => {
            const hasBadge = earnedBadgeIds.includes(project.id);
            
            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden border p-6 ${
                  hasBadge ? 'border-yellow-300 ring-2 ring-yellow-100' : 'border-gray-100'
                }`}
              >
                {hasBadge && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                    <CheckCircle className="w-3 h-3" />
                    已通过
                  </div>
                )}
                
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-4 rounded-xl transition-colors duration-300 group-hover:scale-110 ${
                    hasBadge ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    <span className="text-2xl">{badgeIcons[project.id] || <Database className="w-8 h-8" />}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.difficulty === '入门' ? 'bg-green-100 text-green-700' :
                      project.difficulty === '进阶' ? 'bg-blue-100 text-blue-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {project.difficulty}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {project.duration}
                    </span>
                  </div>
                </div>
                
                <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                  hasBadge ? 'text-yellow-700' : 'text-gray-800 group-hover:text-blue-600'
                }`}>
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Database className="w-3 h-3" />
                    {project.dataset}
                  </div>
                  <div className={`flex items-center gap-2 font-medium text-sm group-hover:gap-3 transition-all duration-300 ${
                    hasBadge ? 'text-yellow-600' : 'text-blue-600'
                  }`}>
                    {hasBadge ? '继续学习' : '开始学习'}
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-10 border border-blue-100 shadow-sm">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              开始你的数据分析之旅
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              无需任何安装，点击上方项目卡片即可开始练习
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
