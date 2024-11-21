import type {Country} from "src/types/summary-filters";

import type {FiltersProps} from "../table/table-filters-row";


export const createFilterData = (data: Country[]) => {
  const countriesMap: Record<number, any> = {};
  const entitiesMap: Record<number, any> = {};
  const masterProcessesMap: Record<number, any> = {};
  const subProcessesMap: Record<number, any> = {};
  const tasksMap: Record<number, any> = {};
  const agentsMap: Record<number, any> = {};

  data.forEach((country) => {
    // Only add unique countries
    countriesMap[country.id] = { id: country.id, name: country.name };

    country.entities.forEach((entity) => {
      // Only add unique entities
      entitiesMap[entity.id] = { id: entity.id, name: entity.name };

      entity.masterProcesses.forEach((masterProcess) => {
        // Only add unique masterProcesses
        masterProcessesMap[masterProcess.id] = { id: masterProcess.id, name: masterProcess.name };

        masterProcess.subProcesses.forEach((subProcess) => {
          // Only add unique subProcesses
          subProcessesMap[subProcess.id] = { id: subProcess.id, name: subProcess.name };

          subProcess.tasks.forEach((task) => {
            // Only add unique tasks
            tasksMap[task.id] = { id: task.id, name: task.name };

            task.agents.forEach((agent) => {
              // Only add unique agents
              agentsMap[agent.id] = { id: agent.id, name: agent.name };
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


export type GenerateFilterDataProps = {
  key:string;
  label: string;
  name: string;
  options: Country[];
}

export const generateFilterData = (filtersData: Country[], filter: FiltersProps) => {
  const { countries, entities, masterProcesses, subProcesses, tasks, agents } = createFilterData(filtersData || []);
  return [
    { key: 'name', label: 'Countries', name: 'country', options: countries },
    { key: 'name', label: 'Entities', name: 'entity', options: entities },
    { key: 'id', label: 'Master Processes', name: 'masterProcess', options: masterProcesses },
    { key: 'id', label: 'Sub Processes', name: 'subProcess', options: subProcesses },
    { key: 'id', label: 'Task', name: 'task', options:  tasks },
    { key: 'id', label: 'Agent', name: 'agent', options: agents },
  ];
};
