import useSWR from "swr";
import {useMemo} from "react";

import {fetcher,endpoints} from "../utils/axios";

import type {ApiData} from "./_types";

const enableServer = false;
const swrOptions = {
  revalidateIfStale: enableServer,
  revalidateOnFocus: enableServer,
  revalidateOnReconnect: enableServer,
};


export type ITask = {
  id: number;
  status: string | null;
  subProcess: string;
  taskId: number;
  taskName: string;
  leName: string;
  duedate: string;
  leCode: string;
  taskDescription: string;
  estimatedTime: string | null;
};







const ENDPOINT_BY_SUBPROCESS = endpoints.taskBySubProcess
const ENDPOINT_TASKS_BY_FILTERS = endpoints.tasksByFilters


export function useGetTaskByParent(id: number | null) {
  const { data, isLoading, error, isValidating } = useSWR<ApiData<ITask>>(
    id ?ENDPOINT_BY_SUBPROCESS.concat(`/${id}`) : null,
    fetcher,
    swrOptions
  );

  return useMemo(() => ({
    tasks: data?.data || [],
    isLoading,
    error,
    isValidating,
    empty: !isLoading && !data?.data?.length,
  }), [data, error, isLoading, isValidating]);
}


//
export function useGetTaskByFilter(
  page: number,
  rows: number,
  subprocessId: number,
  country?:string,
  status?: string,
  search?: string
) {
  const shouldFetch = subprocessId || country;
  const { data, isLoading, error, isValidating } = useSWR<ApiData<ITask>>(
    [shouldFetch ? ENDPOINT_TASKS_BY_FILTERS : null, {
      params: {
        PageNumber: page + 1,
        PageSize: rows,
        SubProcessID: subprocessId,
        EntityCountry: country,
        TaskStatus: status,
        TaskName: search
      }
    }],
    fetcher,
    swrOptions
  );

  return useMemo(() => ({
    tasks: data?.data  || [],
    isLoading,
    error,
    isValidating,
    totalRecords: data?.totalRecords || 0,
    pageSize: data?.pageSize || 10,
    empty: !isLoading && !data?.data?.length,
  }), [data, error, isLoading, isValidating]);
}


