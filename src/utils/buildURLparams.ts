import {paths} from "../routes/paths";

export const getSubProcessUrl = ({ id, processName, subProcesses, done }: any) =>
  `${paths.dashboard.myTasks.subprocess}?id=${id}&processName=${encodeURIComponent(processName)}&subProcesses=${subProcesses}&done=${done}`;



export const getTaskURL = (
  {
    id,
    processName,
    subProcesses,
    done,
    subprocessId,
    subProcessName,
    subOngoing,
    subNotStarted,
    subCompleted
  }: any) =>
  `${paths.dashboard.myTasks.task}?${id}&processName=${processName}&subProcesses=${subProcesses}&done=${done}&subprocessId=${subprocessId}&subProcessName=${encodeURIComponent(subProcessName)}&subOngoing=${subOngoing}&subNotStarted=${subNotStarted}&subCompleted=${subCompleted}`;
