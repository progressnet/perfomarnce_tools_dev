import type {Country} from "src/types/summary-filters";


export const createFilterData = (data: Country[]) => {
  const countries: any = [];
  const entities: any = [];
  const masterProcesses: any = [];
  const subProcesses: any = [];
  const tasks: any = [];
  const agents: any = [];
  data.forEach((country) => {
    countries.push({id: country.id, name: country.name});
    country.entities.forEach((entity) => {
      entities.push({id: entity.id, name: entity.name});
      //
      entity.masterProcesses.forEach((masterProcess) => {
        masterProcesses.push({id: masterProcess.id, name: masterProcess.name});
        //
        masterProcess.subProcesses.forEach((subProcess) => {
          subProcesses.push({id: subProcess.id, name: subProcess.name});
          //
          subProcess.tasks.forEach((task) => {
            tasks.push({id: task.id, name: task.name});
            //
              task.agents.forEach((agent) => {
                agents.push({
                  id: agent.id, name: agent.name
                });
              });
          });
        });
      })
    });
  })
  return {
    countries,
    entities,
    masterProcesses,
    subProcesses,
    tasks,
    agents,
  };
}
