"use client";
import { useProjects } from "@/src/components/context/ProjectContext";
import { Project } from "@/src/types";
import Link from "next/link";
import React from "react";

const ProjectList = () => {
  const { projects = [] } = useProjects();

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl">Projects</h1>
          <p>Manage projects</p>
        </div>
        <Link href="/projects/create">
          <button className="cursor-pointer bg-blue-600 p-3 rounded-md text-white">
            Add New Project
          </button>
        </Link>
      </div>
      <div>
        {projects.length > 0 ? (
          <table className="w-full overflow-x-auto rounded-lg bg-white shadow mt-5">
            <thead>
              <tr className="bg-gray-100 rounded-lg">
                <th className=" p-2 text-left">Name</th>
                <th className=" p-2 text-left">Description</th>
                <th className=" p-2 text-left">Total Task</th>
                <th className=" p-2 text-left">Total Assignees</th>
                <th className=" p-2 text-left">Due Date</th>
                <th className=" p-2 text-left">Priority</th>
                <th className=" p-2 text-left">Status</th>
                <th className=" p-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project: Project) => (
                <tr key={project.id} className="border-t border-t-gray-300">
                  <td className=" p-2">{project.name}</td>
                  <td className=" p-2">{project.description}</td>
                  <td className=" p-2">{project.tasks.length}</td>
                  <td className=" p-2">{project.assignees.length}</td>
                  <td className=" p-2">{project.endDate}</td>
                  <td className=" p-2">{project.priority}</td>
                  <td className=" p-2">{project.status}</td>
                  <td className="flex gap-2 p-2">
                    <Link href={`/projects/${project.id}/edit`}>Edit</Link>
                    <Link href={`/projects/${project.id}`}>View Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <span className="mt-16 flex justify-center">No projects found</span>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
