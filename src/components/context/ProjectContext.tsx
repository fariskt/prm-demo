"use client";

import { Project } from "@/src/types";
import { createContext, ReactNode, useContext, useState } from "react";

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
}

//test users
export const users = [
  { id: 1, full_name: "john" },
  { id: 2, full_name: "peter" },
  { id: 3, full_name: "alex" },
];

const ProjectContext = createContext<ProjectContextType | null>(null);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);

  const addProject = (project: Project) => {
    setProjects((prev) => [...prev, project]);
  };

  const updateProject = (projectData: Project) => {
    setProjects((prev) =>
      prev.map((item) => (item.id === projectData.id ? projectData : item))
    );
  };

  const deleteProject = (prId: string) => {
    setProjects((prev)=> prev.filter((item)=> item.id !== prId));
  };

  return (
    <ProjectContext.Provider
      value={{
        addProject,
        projects,
        deleteProject,
        updateProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (!context) {
    console.log("use context must be inside the provider");
    return;
  }
  return context;
}
