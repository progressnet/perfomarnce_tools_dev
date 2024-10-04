import useSWR from "swr";
import {useMemo} from "react";

import {fetcher,endpoints} from "../utils/axios";

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
  const { data, isLoading, error, isValidating } = useSWR<EventsData[]>(
    ENDPOINT,
    fetcher,
    swrOptions
  );

  return useMemo(() => ({
    tasks: data || [],
    isLoading,
    error,
    isValidating,
    empty: !isLoading && !data?.length,
  }), [data, error, isLoading, isValidating]);
}



const ENDPOINT_BY_SUBPROCESS = endpoints.taskBySubProcess

export function useGetTaskByParent(id: number | undefined) {
  const { data, isLoading, error, isValidating } = useSWR<EventsData[]>(
    id ?ENDPOINT_BY_SUBPROCESS.concat(`/${id}`) : null,
    fetcher,
    swrOptions
  );

  return useMemo(() => ({
    tasks: data || [],
    isLoading,
    error,
    isValidating,
    empty: !isLoading && !data?.length,
  }), [data, error, isLoading, isValidating]);
}
