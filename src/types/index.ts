export interface Task {
  id: string;
  name: string;
  description?: string;
  assignedTo: string;
  status: string;
}

export interface Reminder {
  id: string;
  reminder: string;
  date: string;
  description: string;
}


export interface Project {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  status: string;
  priority: string;
  manager: string;
  assignees: string[];
  tasks: Task[];
  reminders: Reminder[];
}