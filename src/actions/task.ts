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


type EventsData = {
  id: number;
  status: string | null;
  subProcess: string;
  taskID: number;
  taskName: string;
};







const ENDPOINT_BY_SUBPROCESS = endpoints.taskBySubProcess
const ENDPOINT_TASKS_BY_FILTERS = endpoints.tasksByFilters


export function useGetTaskByParent(id: number | null) {
  const { data, isLoading, error, isValidating } = useSWR<ApiData<EventsData>>(
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

export function useGetTaskByFilter(subprocessId: number, entity?:string) {
  const { data, isLoading, error, isValidating } = useSWR<ApiData<EventsData>>(
     `${ENDPOINT_TASKS_BY_FILTERS}?SubProcessID=${subprocessId}`,
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


