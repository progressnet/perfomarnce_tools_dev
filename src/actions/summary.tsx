import useSWR from "swr";
import {useMemo} from "react";

import {fetcher,endpoints} from "../utils/axios";

import type {ApiData} from "./_types";
import type {ISummaryData} from "../types/summary";
import type {ISummaryFilterData} from "../types/summary-filters";

const enableServer = false;
const swrOptions = {
  revalidateIfStale: enableServer,
  revalidateOnFocus: enableServer,
  revalidateOnReconnect: enableServer,
};



const ENDPOINT = endpoints.summary
const ENDPOINT_FILTER = endpoints.reportFilters


type SummaryApiData = {
  data: ISummaryFilterData;
  error: any;
  succeeded: boolean;

}

export function useGetSummary(filters: { [key: string]: string | number | undefined }) {
  // First fetch: Summary data
  const { data, isLoading: isSummaryLoading, error: summaryError, isValidating } = useSWR<ApiData<ISummaryData>>(
    [`${ENDPOINT}`, { params: { startDate: filters.startDate, endDate: filters.endDate } }],
    fetcher,
    swrOptions
  );
  // Second fetch: Summary filter data
  const {
    data: summaryFilterData,
    isLoading: isSummaryFilterLoading,
    error: summaryFilterError,
  } = useSWR<SummaryApiData>(
    [`${ENDPOINT_FILTER}`, { params: {
      startdate: filters.startDate,
      enddate: filters.endDate,
      } }],
    fetcher,
    swrOptions
  );
  return useMemo(
    () => ({
      summary: data?.data || [],
      summaryFilterData:  summaryFilterData?.data?.countries || [] ,
      isLoading: isSummaryLoading || isSummaryFilterLoading,
      error: summaryError || summaryFilterError,
      isValidating,
      empty: !isSummaryLoading && !data?.data?.length,
    }),
    [data, summaryFilterData, isSummaryLoading, isSummaryFilterLoading, summaryError, summaryFilterError, isValidating]
  );
}
