
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
  const { data, isLoading, error, isValidating } = useSWR<ApiData<TasksProps>>(
    `${TASK_ENDPOINT}?PageNumber=1&PageSize=1000`,
    fetcher,
    swrOptions
  );


  const {
    data: totalProcesses,
    isLoading: processLoading,
    error:proccessError,
    isValidating: processValidating
  } = useSWR<ApiData<TasksProps>>(
    `${TASK_ENDPOINT}?PageNumber=1&PageSize=1000`,
    fetcher,
    swrOptions
  );
  return useMemo(() => ({
    totalTasks: data?.data.length || 0,
    isLoading,
    error,
    isValidating,
  }), [data?.data,isLoading, error, isValidating ]);
}
