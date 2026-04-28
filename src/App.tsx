import { useState } from 'react';
import ProjectList from './pages/ProjectList';
import ProjectWorkspace from './components/ProjectWorkspace/ProjectWorkspace';
import { projectsData, ProjectData } from './data/projects';

function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  return (
    <>
      {selectedProject ? (
        <ProjectWorkspace 
          project={selectedProject} 
          onBack={() => setSelectedProject(null)} 
        />
      ) : (
        <ProjectList projects={projectsData} onSelectProject={setSelectedProject} />
      )}
    </>
  );
}

export default App;
