
export type DateColumn = {
    id: string;
    label: string;
};

// incoming data types:
export type ISummaryData = {
    id: number;
    country: string;
    code: string;
    entity: Entity[];
};

export type Entity = {
    entityName: string;
    masterProcess: MasterProcess[];
};

export type MasterProcess = {
    processName: string;
    subProcess: SubProcess[];
};

export type SubProcess = {
    subprocessName: string;
    tasks: Task[];
};

export type Task = {
    taskName: string;
    agents: Agent[];
};

export type Agent = {
    firstName: string;
    dates: Record<string, number>;
};
