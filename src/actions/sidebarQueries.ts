
import useSWR from "swr";
import {useMemo} from "react";

import {fetcher, endpoints} from "../utils/axios";

import type {ApiData} from "./_types";

const enableServer = false;
const swrOptions = {
  revalidateIfStale: enableServer,
  revalidateOnFocus: enableServer,
  revalidateOnReconnect: enableServer,
};

type TasksProps = {
  id: number;
  status: string | null;
  subProcess: string;
  taskID: number;
  taskName: string;
};


const TASK_ENDPOINT = endpoints.task

export function useGetTotal() {
  const {
    data: totalProcesses,
    isLoading: processLoading,
    error:processError,
    isValidating: processValidating
  } = useSWR<ApiData<TasksProps>>(
    `${TASK_ENDPOINT}?PageNumber=1&PageSize=1000`,
    fetcher,
    swrOptions
  );
  return useMemo(() => ({
    totalTasks: totalProcesses?.data.length || 0,
    isLoading: processLoading,
    error: processError,
    isValidating: processValidating,
  }), [totalProcesses?.data, processValidating, processError, processLoading ]);
}
