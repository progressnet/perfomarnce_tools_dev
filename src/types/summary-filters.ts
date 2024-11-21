export type ISummaryFilterData = {
  countries: Country[];
};

export type Country = {
  id: number;
  name: string;
  entities: Entity[];
};

export type Entity = {
  id: number;
  name: string;
  masterProcesses: MasterProcess[];
};

export type MasterProcess = {
  id: number;
  name: string;
  subProcesses: SubProcess[];
};

export type SubProcess = {
  id: number;
  name: string;
  tasks: Task[];
};

export type Task = {
  id: number;
  name: string;
  agents: Agent[];
};

export type Agent = {
  id: number;
  name: string;
};
