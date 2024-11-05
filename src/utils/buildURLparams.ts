import {paths} from "../routes/paths";

export const getSubProcessUrl = ({ id, processName, numberOfSubprocesses, done }: any) =>
  `${paths.dashboard.myTasks}?id=${id}&processName=${encodeURIComponent(processName)}&numberOfSubprocesses=${numberOfSubprocesses}`;



