"use client";

import { useProjects, users } from "@/src/components/context/ProjectContext";
import { Project } from "@/src/types";
import Link from "next/link";
import React, { useState } from "react";

const DashboardPage = () => {
  const { projects = [] } = useProjects();
  const stats = [
    {
      label: "Total Projects",
      value: projects.length || 0,
    },
    {
      label: "Completed Projects",
      value:
        projects.filter(
          (item: Project) => item.status?.toLowerCase() === "completed"
        ).length || 0,
    },
    {
      label: "In Progress Projects",
      value:
        projects.filter(
          (item: Project) => item.status?.toLowerCase() === "in_progress"
        ).length || 0,
    },
    {
      label: "Total Users",
      value: users?.length || 0,
    },
  ];

  return (
    <div className="min-h-screen space-y-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl">Dashboard</h1>
          <p>Manage dashboard</p>
        </div>
        <Link href="/projects/create">
          <button className="cursor-pointer bg-blue-600 p-3 rounded-md text-white">
            Add New Project
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <div
            className="bg-white shadow-lg p-4 border border-gray-200 rounded-2xl"
            key={stat.label}
          >
            <h4>{stat.label}</h4>
            <h2 className="font-bold text-2xl">{stat.value}</h2>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-2xl">Projects Management</h2>
        <p>Showing {projects.length} projects</p>
        <div className="grid grid-cols-2 gap-5 mt-4">
          {projects.length > 0 ? (
            projects.map((item: Project) => (
              <div
                className="shadow-md p-5 bg-gray-50 border border-gray-200 rounded-2xl"
                key={item.id}
              >
                <h4>Name : {item.name}</h4>
                <p>Description : {item.description}</p>
                <div>
                  <h5>Start Date: {item.startDate}</h5>
                  <h5>End Date: {item.endDate}</h5>
                </div>
                <div>
                  <h5>Status : {item.status}</h5>
                  <h5>Priority : {item.priority}</h5>
                </div>
                <div>
                  <h5>Assignees ({item?.assignees.length})</h5>
                  {users
                    .filter((user) =>
                      item?.assignees.includes(user.id.toString())
                    )
                    .map((us) => us.full_name)}
                </div>
                <div className="my-3">
                  Tasks ({item.tasks.length})
                  <div className=" p-2 border shadow-md bg-green-100 border-gray-200">
                    {item.tasks.length > 0 ? (
                      item.tasks.map((task) => (
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
                        <span className="text-sm text-gray-700">
                          No tasksF added
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="my-3">
                  Reminders ({item.reminders.length})
                  <div className="shadow-md p-2 border border-gray-200">
                    {item.reminders.length > 0 ? (
                      item.reminders.map((reminder) => (
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
            ))
          ) : (
            <div>
              <div>
                <h3 className="mb-4">No Projectes Added Yet.</h3>
                <Link
                  className="bg-blue-600 text-white p-3 rounded-md mt-5"
                  href="/projects/create"
                >
                  <button>Create New Project</button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
