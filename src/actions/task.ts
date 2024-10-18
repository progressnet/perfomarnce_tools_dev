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


const ENDPOINT = endpoints.task

export function useGetTask() {
  const { data, isLoading, error, isValidating } = useSWR<ApiData<EventsData>>(
    ENDPOINT,
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



const ENDPOINT_BY_SUBPROCESS = endpoints.taskBySubProcess

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
    empty: !isLoading && !data?.data.length,
  }), [data, error, isLoading, isValidating]);
}
