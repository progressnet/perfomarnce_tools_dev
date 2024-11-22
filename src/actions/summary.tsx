import useSWR from "swr";
import {useMemo} from "react";

import {fetcher, endpoints} from "../utils/axios";

import type {ApiData} from "./_types";
import type {ISummaryData} from "../types/summary";
import type {ISummaryFilterData} from "../types/summary-filters";
import type {Filter} from "../sections/my-reports/table/table-filters-row";

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


export function useGetSummary(filters: { [key: string]: any }) {
  console.log('submit', filters.isSubmit)
  const {data, isLoading: isSummaryLoading, error: summaryError, isValidating} = useSWR<ApiData<ISummaryData>>(
    filters.isSubmit ?  [`${ENDPOINT}`, {
      params: {
        startDate: filters.startDate,
        endDate: filters.endDate,
        countryId: filters.country.length > 0 ? filters.country.join(',') : null,

      }
    }] : null,
    fetcher,
    swrOptions
  );

  // Second fetch: Summary filter data
  const {
    data: summaryFilterData,
    isLoading: isSummaryFilterLoading,
    error: summaryFilterError,
  } = useSWR<SummaryApiData>(
    [`${ENDPOINT_FILTER}`, {
      params: {
        startdate: filters.startDate,
        enddate: filters.endDate,
        countryId: filters.country,
        entity: filters.entity,
        masterProcessId: filters.masterProcess,
        subProcessId: filters.subProcess,
        task: filters.task,
        agent: filters.agent,
      }
    }],
    fetcher,
    swrOptions
  );

  return useMemo(
    () => ({
      summary: data?.data || [],
      summaryFilterData: summaryFilterData?.data?.countries || [],
      isLoading: isSummaryLoading || isSummaryFilterLoading,
      isError: summaryError || summaryFilterError,
      errorMessage: `api/SummaryWithParameters: ${summaryError}` || `api/SummaryFilter: ${summaryFilterError}`,
      isValidating,
      empty: !isSummaryLoading && !data?.data?.length,
    }),
    [data, summaryFilterData, isSummaryLoading, isSummaryFilterLoading, summaryError, summaryFilterError, isValidating]
  );
}
