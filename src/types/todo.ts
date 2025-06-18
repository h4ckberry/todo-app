export enum TodoStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export interface Todo {
  id: number;
  title: string;
  description?: string | null;
  dueDate?: Date | null;
  status: TodoStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTodoInput {
  title: string;
  description?: string;
  dueDate?: Date;
}

export interface UpdateTodoInput {
  title?: string;
  description?: string;
  dueDate?: Date;
  status?: TodoStatus;
}