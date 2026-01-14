"use client";

import { useProjects, users } from "@/src/components/context/ProjectContext";
import { Project } from "@/src/types";
import React, { useState } from "react";

const initailData: Project = {
  id: crypto.randomUUID(),
  name: "",
  description: "",
  startDate: "",
  endDate: "",
  status: "Planned",
  priority: "Medium",
  manager: "",
  assignees: [],
  tasks: [],
  reminders: [],
};

const ProjectCreatePage = () => {
  const { addProject } = useProjects();
  const [projectData, setProjectData] = useState(initailData);
  const [taskData, setTaskData] = useState({
    id: "",
    name: "",
    description: "",
    assignedTo: "",
    status: "",
  });
  const [reminedData, setReminderData] = useState({
    id: "",
    reminder: "",
    date: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (projectData.name === "") {
      return alert("Project name required");
    }
    if (projectData.assignees.length < 1) {
      return alert("Atleast one assignee required");
    }
    try {
      addProject(projectData);
      alert("Project created");
    } catch (error) {
      console.error(error, "Failed to add new project");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addAssignee = (assignedID: string) => {
    setProjectData((prev) => ({
      ...prev,
      assignees: prev.assignees.includes(assignedID)
        ? prev.assignees
        : [...prev.assignees, assignedID],
    }));
  };
  const removeAssignee = (id: string) => {
    setProjectData((prev) => ({
      ...prev,
      assignees: prev.assignees.filter((a) => a !== id),
    }));
  };

  const addTask = () => {
    if (!taskData.name) return;
    setProjectData((prev) => ({
      ...prev,
      tasks: [
        ...prev.tasks,
        {
          ...taskData,
          id: crypto.randomUUID(),
        },
      ],
    }));
    setTaskData({
      id: "",
      name: "",
      description: "",
      assignedTo: "",
      status: "",
    });
  };

  const removeTask = (taskId: string) => {
    setProjectData((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((item) => item.id !== taskId),
    }));
  };
  const removeRemainder = (remId: string) => {
    setProjectData((prev) => ({
      ...prev,
      reminders: prev.reminders.filter((item) => item.id !== remId),
    }));
  };

  const addReminder = () => {
    if (!reminedData.reminder) return;
    setProjectData((prev) => ({
      ...prev,
      reminders: [
        ...prev.reminders,
        {
          ...reminedData,
          id: crypto.randomUUID(),
        },
      ],
    }));
    setReminderData({
      id: "",
      date: "",
      description: "",
      reminder: "",
    });
  };

  return (
    <div className="w-full mx-auto">
      <h1 className="text-3xl text-center mb-3">Create Project</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-gray-100 p-6 rounded-2xl shadow-md"
      >
        <div className="space-y-2">
          <div className="bg-gray-50 p-3 my-3 shadow-sm rounded-2xl">
            <h4 className="text-lg my-3 font-medium">Project Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="name">Project Name</label>
                <input
                  className="border border-gray-400 p-2 rounded-md"
                  type="text"
                  name="name"
                  value={projectData.name}
                  placeholder="Name the project "
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="description">Description</label>
                <input
                  className="border border-gray-400 p-2 rounded-md"
                  type="text"
                  name="description"
                  placeholder="Project description"
                  value={projectData.description}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="startDate">Start Date</label>
                <input
                  className="border border-gray-400 p-2 rounded-md"
                  type="date"
                  name="startDate"
                  value={projectData.startDate}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="endDate">End Date</label>
                <input
                  className="border border-gray-400 p-2 rounded-md"
                  type="date"
                  name="endDate"
                  value={projectData.endDate}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="status">Status</label>
                <select
                  className="border border-gray-400 p-2 rounded-md"
                  name="stats"
                  value={projectData.status}
                >
                  <option value="">Select</option>
                  <option value="planned">Planned</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="on_hold">On Hold</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="priority">Priority</label>
                <select
                  className="border border-gray-400 p-2 rounded-md"
                  name="priority"
                  value={projectData.priority}
                >
                  <option value="">Select</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="manager">Manager Name</label>
                <input
                  className="border border-gray-400 p-2 rounded-md"
                  type="text"
                  name="manager"
                  value={projectData.manager}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium">Assignees</label>

                <select
                  className="border border-gray-300 p-2 rounded-md"
                  onChange={(e) => addAssignee(e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Choose member
                  </option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.full_name}
                    </option>
                  ))}
                </select>

                <div className="flex flex-wrap gap-2 mt-1">
                  {projectData.assignees.map((id) => {
                    const user = users.find((u) => u.id.toString() === id);
                    return (
                      <span
                        key={id}
                        className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                      >
                        {user?.full_name}
                        <button
                          onClick={() => removeAssignee(id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          X
                        </button>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-3 my-3 shadow-sm rounded-2xl">
            <div className="space-y-2">
              <h4 className="text-lg my-3 font-medium">Task Manage</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="taskName">Task Name</label>
                  <input
                    className="border border-gray-400 p-2 rounded-md"
                    type="text"
                    value={taskData.name}
                    onChange={(e) =>
                      setTaskData({ ...taskData, name: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="taskDescription">Task Description</label>
                  <input
                    className="border border-gray-400 p-2 rounded-md"
                    type="text"
                    value={taskData.description}
                    onChange={(e) =>
                      setTaskData({ ...taskData, description: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="assignedTo">Task Assigned To</label>
                <select
                  className="border border-gray-300 p-2 rounded-md"
                  onChange={(e) =>
                    setTaskData({ ...taskData, assignedTo: e.target.value })
                  }
                  defaultValue=""
                >
                  <option value="" disabled>
                    Choose member
                  </option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.full_name}
                    </option>
                  ))}
                </select>

                <div className="flex flex-wrap gap-2 mt-1">
                  {projectData.tasks.map((task) => {
                    const user = users.find(
                      (u) => u.id.toString() === task.assignedTo
                    );
                    return (
                      <div key={task.id}>
                        {user && (
                          <span className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                            {user?.full_name}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="status">Task Status</label>
                <select
                  name="status"
                  className="border border-gray-400 p-2 rounded-md"
                  value={taskData.status}
                  onChange={(e) =>
                    setTaskData({ ...taskData, status: e.target.value })
                  }
                >
                  <option value="">Choose one</option>
                  <option value="todo">Todo</option>
                  <option value="in_progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <button
                className="bg-blue-600 my-3 px-4 py-2 rounded-md text-white"
                type="button"
                onClick={addTask}
              >
                Add Task
              </button>

              {projectData.tasks.length > 0 && (
                <div className="bg-gray-200 p-3 space-y-2  rounded-2xl">
                  <h3>Added Task ({projectData.tasks.length})</h3>
                  {projectData.tasks.map((item, index) => (
                    <div
                      key={item.id}
                      className="bg-gray-100 my-2 border border-gray-400 p-3"
                    >
                      <h5>Task {index + 1}</h5>
                      <div>
                        <h5>Task : {item.name}</h5>
                        <p>Descrition : {item.description}</p>
                        <p>Assigned To : {item.assignedTo}</p>
                      </div>
                      <button
                        className="bg-red-500 text-white py-1 px-2 cursor-pointer rounded-full"
                        onClick={() => removeTask(item.id)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 p-3 my-3 shadow-sm rounded-2xl">
            <h4 className="text-lg my-3 font-medium">Reminder Manage</h4>
            <div className="flex flex-col gap-1">
              <label htmlFor="reminder">Reminder</label>
              <input
                className="border border-gray-400 p-2 rounded-md"
                type="text"
                name="reminder"
                value={reminedData.reminder}
                onChange={(e) =>
                  setReminderData({
                    ...reminedData,
                    reminder: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="description">Reminder Description</label>
              <input
                className="border border-gray-400 p-2 rounded-md"
                type="text"
                name="description"
                value={reminedData.description}
                onChange={(e) =>
                  setReminderData({
                    ...reminedData,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="date">Reminder date</label>
              <input
                className="border border-gray-400 p-2 rounded-md"
                type="date"
                name="date"
                value={reminedData.date}
                onChange={(e) =>
                  setReminderData({ ...reminedData, date: e.target.value })
                }
              />
            </div>
            <button
              className="bg-blue-600 my-3 px-4 py-2 rounded-md text-white"
              type="button"
              onClick={addReminder}
            >
              Add Reminder
            </button>
          </div>
          {projectData.reminders.length > 0 && (
            <div className="bg-gray-200 p-3 space-y-2  rounded-2xl">
              <h3>Added Reminders ({projectData.reminders.length})</h3>
              {projectData.reminders.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-gray-100 my-2 border border-gray-400 p-3"
                >
                  <h5>Reminder {index + 1}</h5>
                  <div>
                    <h5>Reminder : {item.reminder}</h5>
                    <p>Descrition : {item.description}</p>
                    <p>Date : {item.date}</p>
                  </div>
                  <button
                    className="bg-red-500 text-white py-1 px-2 cursor-pointer rounded-full"
                    onClick={() => removeRemainder(item.id)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-end gap-5 mt-3">
          <button
            className="bg-gray-400 px-4 py-2 rounded-md text-white"
            type="button"
          >
            Clear
          </button>
          <button
            className="bg-green-600 px-4 py-2 rounded-md text-white"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectCreatePage;
