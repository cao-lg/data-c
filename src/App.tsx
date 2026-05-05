import { useState } from 'react';
import ProjectList from './pages/ProjectList';
import ProjectWorkspace from './components/ProjectWorkspace/ProjectWorkspace';
import QuizPage from './components/QuizPage';
import { projectsData, ProjectData } from './data/projects';
import { Badge } from './data/quizData';

type View = 'list' | 'project' | 'quiz';

function App() {
  const [currentView, setCurrentView] = useState<View>('list');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [badges, setBadges] = useState<Badge[]>(() => {
    const saved = localStorage.getItem('pandas-badges');
    return saved ? JSON.parse(saved) : [];
  });

  const handleSelectProject = (project: ProjectData) => {
    setSelectedProject(project);
    setCurrentView('project');
  };

  const handleStartQuiz = () => {
    setCurrentView('quiz');
  };

  const handleBack = () => {
    if (currentView === 'quiz') {
      setCurrentView('project');
    } else {
      setCurrentView('list');
      setSelectedProject(null);
    }
  };

  const handleQuizBack = () => {
    setCurrentView('project');
  };

  const handleBadgeEarned = (badge: Badge) => {
    setBadges(prev => {
      const existing = prev.find(b => b.projectId === badge.projectId);
      if (existing) {
        return prev.map(b => b.projectId === badge.projectId ? badge : b);
      }
      return [...prev, badge];
    });
  };

  return (
    <>
      {currentView === 'quiz' && selectedProject ? (
        <QuizPage 
          projectId={selectedProject.id} 
          onBadgeEarned={handleBadgeEarned}
          onBack={handleQuizBack}
          onHome={() => { setCurrentView('list'); setSelectedProject(null); }}
        />
      ) : currentView === 'project' && selectedProject ? (
        <ProjectWorkspace 
          project={selectedProject} 
          onBack={handleBack}
          onStartQuiz={handleStartQuiz}
          hasBadge={badges.some(b => b.projectId === selectedProject.id)}
        />
      ) : (
        <ProjectList 
          projects={projectsData} 
          onSelectProject={handleSelectProject}
          badges={badges}
        />
      )}
    </>
  );
}

export default App;
