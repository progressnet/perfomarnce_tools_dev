import type {Country} from "src/types/summary-filters";

import type {FiltersProps} from "../reducer";

type Entity = {
  countryId: string;
  id: number;
  name: string;
};

type MasterProcess = {
  entityId: string;
  id: number;
  name: string;
};

type SubProcess = {
  masterProcessId: number;
  id: number;
  name: string;
};

type Task = {
  subProcessId: number;
  id: number;
  name: string;
};

type Agent = {
  taskId: number;
  id: number;
  name: string;
};

export type FilterOptionAutocomplete = Entity | MasterProcess | SubProcess | Task | Agent;



export type GenerateFilterDataProps = {
  key:string;
  label: string;
  name: string;
  options: Country[];
}

export const generateFilterData = (filtersData: Country[], filter: FiltersProps) => {
  //
  const { countries, entities, masterProcesses, subProcesses, tasks, agents } = createFilterData(filtersData || []);
  //
  const processData = (data: any[], filterType: any[], key: string) => {
    if (!filterType || filterType.length === 0) {
      return data;
    }
    return data.filter((item: any) => filterType.some((e) => e === item[key]));
  };


  return [
    { key: 'name', label: 'Countries', name: 'country', options: countries },
    { key: 'name', label: 'Entities', name: 'entity', options:  processData(entities, filter.country, 'countryId') },
    { key: 'id', label: 'Master Processes', name: 'masterProcess', options: processData(masterProcesses, filter.entity, 'entityId')  },
    { key: 'id', label: 'Sub Processes', name: 'subProcess', options: processData(subProcesses,filter.masterProcess, 'masterProcessId') },
    { key: 'id', label: 'Task', name: 'task', options:  processData(tasks, filter.subProcess, 'subProcessId') },
    { key: 'id', label: 'Agent', name: 'agent', options: processData(agents, filter.task, 'taskId')},
  ];
};



// ======================================================================================================
export const createFilterData = (data: Country[]) => {
  const countriesMap: any = [];
  const entitiesMap: Entity[] = [];
  const masterProcessesMap: MasterProcess[] = [];
  const subProcessesMap: SubProcess[] = [];
  const tasksMap:Task[] = [];
  const agentsMap: Agent[] = [];

  data.forEach((country) => {
    // Only add unique countries
    countriesMap.push({ id: country.id, name: country.name });
    //
    country.entities.forEach((entity) => {
      //
      entitiesMap.push({countryId: country.name, id: entity.id, name: entity.name });
      entity.masterProcesses.forEach((masterProcess) => {
        //
        masterProcessesMap.push({
          entityId: entity.name,
          id: masterProcess.id,
          name: `${masterProcess.name} - ${entity.name}`
        });
        masterProcess.subProcesses.forEach((subProcess) => {
          //
          subProcessesMap.push({
            masterProcessId: masterProcess.id,
            id: subProcess.id,
            name: `${subProcess.name} - ${entity.name}`
          });
          subProcess.tasks.forEach((task) => {
            // Only add unique tasks
            tasksMap.push({
              subProcessId: subProcess.id,
              id: task.id,
              name: `${task.name} - ${entity.name}`
            });
            task.agents.forEach((agent) => {
              // Only add unique agents
              agentsMap.push({
                taskId: task.id,
                id: agent.id,
                name: agent.name
              });
            });
          });
        });
      });
    });
  });

  return {
    countries: Object.values(countriesMap),
    entities: Object.values(entitiesMap),
    masterProcesses: Object.values(masterProcessesMap),
    subProcesses: Object.values(subProcessesMap),
    tasks: Object.values(tasksMap),
    agents: Object.values(agentsMap),
  };
};
