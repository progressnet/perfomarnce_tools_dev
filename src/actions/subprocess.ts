import useSWR from "swr";
import {useMemo} from "react";

import {fetcher,endpoints} from "../utils/axios";
import {ApiData} from "./_types";

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
  const { data, isLoading, error, isValidating } = useSWR<ApiData<EventsData>>(
    ENDPOINT,
    fetcher,
    swrOptions
  );

  return useMemo(() => ({
    subprocesses: data?.data || [],
    isLoading,
    error,
    isValidating,
    empty: !isLoading && !data?.data?.length,
  }), [data, error, isLoading, isValidating]);
}

const ENDPOINT_BY_PROCESS = endpoints.subprocessByProcess

export function useGetSubProcessByProcess(id: number | null) {
  const { data, isLoading, error, isValidating } = useSWR<ApiData<EventsData>>(
    id ? ENDPOINT_BY_PROCESS.concat(`/${id}`) : null,
    fetcher,
    swrOptions
  );

  return useMemo(() => ({
    subprocesses: data?.data || [],
    isLoading,
    error,
    isValidating,
    empty: !isLoading && !data?.data.length,
  }), [data, error, isLoading, isValidating]);
}
