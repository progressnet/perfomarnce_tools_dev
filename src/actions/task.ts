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

export function useGetTaskByFilter(
  page: number,
  rows: number,
  subprocessId: number,
  country?:string,
  status?: string,
) {
  const shouldFetch = subprocessId || country;

  let URL = ENDPOINT_TASKS_BY_FILTERS;
  const params = new URLSearchParams();

  if (subprocessId) {
    params.append("SubProcessID", subprocessId as any);
  }

  if (country) {
    params.append("EntityCountry", country);
  }

  if (status) {
    params.append("TaskStatus", status);
  }

  params.append("PageNumber", String(page + 1) );
  params.append("PageSize", String(rows));

// Append the query string to the URL
  URL = `${URL}?${params.toString()}`;


  const { data, isLoading, error, isValidating } = useSWR<ApiData<ITask>>(
    shouldFetch ? URL : null, // Only fetch if `shouldFetch` is true
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


