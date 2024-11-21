
export type IDateColumn = {
  id: string;
  label: string;
};

type Agent = {
  agentId: string;
  fullName: string;
  totalHours: number;
  dateHours: Record<string, number>;
};

type Task = {
  taskId: string;
  taskName: string;
  totalHours: number;
  dateHours: Record<string, number>;
  agents: Agent[];
};

type SubProcess = {
  subProcessId: string;
  subProcessName: string;
  totalHours: number;
  dateHours: Record<string, number>;
  tasks: Task[];
};

type Process = {
  processId: string;
  processName: string;
  totalHours: number;
  dateHours: Record<string, number>;
  subProcesses: SubProcess[];
};

export type Entity = {
  entityName: string;
  totalHours: number;
  dateHours: Record<string, number>;
  masterProcesses: Process[];
};

type Country = {
  id: number;
  code: string;
  country: string;
  totalHours: number;
  dateHours: Record<string, number>;
  entities: Entity[];
};

// Define the table data type, which is an array of `Country` objects
export type ISummaryData = Country;

