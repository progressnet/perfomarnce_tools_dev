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
  processName: string;
  department: string;
};


const ENDPOINT = endpoints.process

export function useGetProcess() {
  const { data, isLoading, error, isValidating } = useSWR<ApiData<EventsData>>(
    ENDPOINT,
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
