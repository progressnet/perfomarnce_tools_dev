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
