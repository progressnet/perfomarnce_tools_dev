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



export type IProcess = {
  id: number;
  processName: string;
  department: string;
  numberOfSubprocesses: number;
};


const ENDPOINT = endpoints.process

export function useGetProcess(searchFilter?: string) {
  console.log('useGetProcess', searchFilter)
  const urlFilter = `${ENDPOINT}?searchTerm=${searchFilter}&PageNumber=1&PageSize=2000`;
  const noFilter = `${ENDPOINT}?PageNumber=1&PageSize=2000`;
  const { data, isLoading, error, isValidating } = useSWR<ApiData<IProcess>>(
    searchFilter ? urlFilter : noFilter,
    fetcher,
    swrOptions
  );

  return useMemo(() => ({
      processes: data?.data || [],
      isLoading,
      error,
      isValidating,
     empty: !isLoading && !data?.data.length,
    }), [data, error, isLoading, isValidating]);
}

