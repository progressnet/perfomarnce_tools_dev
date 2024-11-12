export const createDateColumns = (data: any): string[] => {
    const dateColumns: Set<string> = new Set();
    data.forEach((item: any) => {
        item.entity.forEach((entity: any) => {
            entity.masterProcess.forEach((masterProcess: any) => {
                masterProcess.subProcesses.forEach((subProcess: any) => {
                    subProcess.tasks.forEach((task: any) => {
                        task.agents.forEach((agent: any) => {
                            Object.keys(agent.dates).forEach((date) => {
                                dateColumns.add(date)
                            })
                        })
                    })
                });
            })
        })
    })
    return Array.from(dateColumns).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
};
