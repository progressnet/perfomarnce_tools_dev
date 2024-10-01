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
  subProcess: string;
  process: string;
};


const ENDPOINT = endpoints.subprocess

export function useGetSubProcess() {
  const { data, isLoading, error, isValidating } = useSWR<EventsData[]>(
    ENDPOINT,
    fetcher,
    swrOptions
  );

  return useMemo(() => ({
    subprocesses: data || [],
    isLoading,
    error,
    isValidating,
    empty: !isLoading && !data?.length,
  }), [data, error, isLoading, isValidating]);
}
