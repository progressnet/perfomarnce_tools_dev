import useSWR from "swr";
import {useMemo} from "react";

import {fetcher,endpoints} from "../utils/axios";

import type {ApiData} from "./_types";
import type {ISummaryData} from "../sections/my-reports/table/_types";

const enableServer = false;
const swrOptions = {
  revalidateIfStale: enableServer,
  revalidateOnFocus: enableServer,
  revalidateOnReconnect: enableServer,
};



const ENDPOINT = endpoints.summary

export function useGetSummary(startDate: string , endDate: string ) {
  const { data, isLoading, error, isValidating } = useSWR<ApiData<ISummaryData>>(
     `${ENDPOINT}?startDate=${startDate}&endDate=${endDate}`,
    fetcher,
    swrOptions
  );

  return useMemo(() => ({
    summary: data?.data || [],
    isLoading,
    error,
    isValidating,
    empty: !isLoading && !data?.data?.length,
  }), [data, error, isLoading, isValidating]);

}
