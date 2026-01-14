"use client";

import { useProjects, users } from "@/src/components/context/ProjectContext";
import { Project } from "@/src/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const ProjectDetaisPage = () => {
  const { projects = [] } = useProjects();
  const params = useParams();
  const projectId = params.id as string;
  const project: Project = projects?.find((pr: Project) => pr.id === projectId);
  const assignees = users.filter((user) =>
    project.assignees.includes(user.id.toString())
  );

  if (!project)
    return (
      <div>
        No Project found. <Link href="/projects/create">Create new</Link>
      </div>
    );
  return (
    <div className="min-h-screen flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-medium">
          Project Details - {project.name}
        </h1>
      </div>
      <div
        className="shadow-md p-5 bg-gray-50 border border-gray-200 rounded-2xl"
        key={project.id}
      >
        <h4>Name : {project.name}</h4>
        <p>Description : {project.description}</p>
        <div>
          <h5>Start Date: {project.startDate}</h5>
          <h5>End Date: {project.endDate}</h5>
        </div>
        <div>
          <h5>Status : {project.status}</h5>
          <h5>Priority : {project.priority}</h5>
        </div>
        <div>
          <h5>Assignees ({project.assignees.length})</h5>
          {assignees.map((user) => (
            <span key={user.id}>{user.full_name}</span>
          ))}
        </div>
        <div className="my-3">
          Tasks ({project.tasks.length})
          <div className=" p-2 border shadow-md bg-green-100 border-gray-200">
            {project.tasks.length > 0 ? (
              project.tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-green-50 p-3 flex flex-col mt-4"
                >
                  <h4>Task : {task.name}</h4>
                  <p>Description : {task.description}</p>
                  <p>Assigned To : {task.assignedTo}</p>
                  <p>Status : {task.status}</p>
                </div>
              ))
            ) : (
              <div>
                <span className="text-sm text-gray-700">No tasksF added</span>
              </div>
            )}
          </div>
        </div>
        <div className="my-3">
          Reminders ({project.reminders.length})
          <div className="shadow-md p-2 border border-gray-200">
            {project.reminders.length > 0 ? (
              project.reminders.map((reminder) => (
                <div key={reminder.id}>
                  <h4>Reminder : {reminder.reminder}</h4>
                  <p>Description : {reminder.description}</p>
                  <p>Reminder Date : {reminder.date}</p>
                </div>
              ))
            ) : (
              <div>
                <span className="text-sm text-gray-700">
                  No reminders added
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetaisPage;
