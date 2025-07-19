// task.ts
// This file defines the type used in the todo list application.

export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export type Filter = 'All' | 'Completed' | 'Incomplete';