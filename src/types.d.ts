type Task = {
  readonly id: number;
  title: string;
  message: string;
  dueDate: Date;
  createdAt: Date;
  updatedAt?: Date;
};
