import React from 'react';
import { ProjectData } from '../data/projects';
import { 
  Database, 
  BarChart3, 
  ShoppingCart, 
  Users, 
  LineChart, 
  FlaskConical, 
  Clock, 
  Layers, 
  Search, 
  GitMerge, 
  ArrowRight, 
  Clock3
} from 'lucide-react';

interface ProjectCardProps {
  project: ProjectData;
  onClick: () => void;
}

const getIconForProject = (id: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    '01-cleaning': <Database className="w-8 h-8" />,
    '02-aggregation': <BarChart3 className="w-8 h-8" />,
    '03-market-basket': <ShoppingCart className="w-8 h-8" />,
    '04-clustering': <Users className="w-8 h-8" />,
    '05-visualization': <LineChart className="w-8 h-8" />,
    '06-ab-testing': <FlaskConical className="w-8 h-8" />,
    '07-time-series': <Clock className="w-8 h-8" />,
    '08-feature-engineering': <Layers className="w-8 h-8" />,
    '09-outlier-detection': <Search className="w-8 h-8" />,
    '10-data-merge': <GitMerge className="w-8 h-8" />,
  };
  return iconMap[id] || <Database className="w-8 h-8" />;
};

const getColorForProject = (id: string) => {
  const colorMap: Record<string, string> = {
    '01-cleaning': 'bg-blue-100 text-blue-700',
    '02-aggregation': 'bg-purple-100 text-purple-700',
    '03-market-basket': 'bg-green-100 text-green-700',
    '04-clustering': 'bg-pink-100 text-pink-700',
    '05-visualization': 'bg-orange-100 text-orange-700',
    '06-ab-testing': 'bg-red-100 text-red-700',
    '07-time-series': 'bg-cyan-100 text-cyan-700',
    '08-feature-engineering': 'bg-yellow-100 text-yellow-700',
    '09-outlier-detection': 'bg-indigo-100 text-indigo-700',
    '10-data-merge': 'bg-emerald-100 text-emerald-700',
  };
  return colorMap[id] || 'bg-gray-100 text-gray-700';
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-100"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-4 rounded-xl ${getColorForProject(project.id)} transition-colors duration-300 group-hover:scale-110`}>
            {getIconForProject(project.id)}
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
              {project.difficulty}
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium flex items-center gap-1">
              <Clock3 className="w-3 h-3" />
              {project.duration}
            </span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
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
          <div className="flex items-center gap-2 text-blue-600 font-medium text-sm group-hover:gap-3 transition-all duration-300">
            开始学习
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
