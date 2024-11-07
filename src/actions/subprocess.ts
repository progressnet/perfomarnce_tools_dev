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
  subProcess: string;
  process: string;
};


const ENDPOINT_BY_PROCESS = endpoints.subprocessByProcess

export function useGetSubProcessByProcess(id: number | null, filter?: string) {

  let URL = `${ENDPOINT_BY_PROCESS}/${id}`;
  if (filter) {
    URL = `${URL}?searchTerm=${encodeURIComponent(filter)}&PageNumber=1&PageSize=2000`;
  } else {
    URL = `${URL}?PageNumber=1&PageSize=2000`;
  }


  const { data, isLoading, error, isValidating } = useSWR<ApiData<EventsData>>(
    id ? URL : null,
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



