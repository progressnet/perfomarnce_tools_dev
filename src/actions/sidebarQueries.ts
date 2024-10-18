
import {useMemo} from "react";
import {endpoints} from "../utils/axios";


// const ENDPOINT = endpoints.task

export function useGetTotal() {
  // const { data, isLoading, error, isValidating } = useSWR<ApiData<EventsData>>(
  //   ENDPOINT_BY_SUBPROCESS,
  //   fetcher,
  //   swrOptions
  // );

  return useMemo(() => ({
    totalTasks: 30,
    isLoading: false,
    error: null,
    isValidating: false,
  }), []);
}
