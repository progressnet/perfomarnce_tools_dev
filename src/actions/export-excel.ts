import useSWR from "swr";
import {useMemo} from "react";

import {fetcher, endpoints} from "../utils/axios";

import type {Filter} from "../sections/my-reports/table/table-filters-row";


const enableServer = false;
const swrOptions = {
  revalidateIfStale: enableServer,
  revalidateOnFocus: enableServer,
  revalidateOnReconnect: enableServer,
};


const ENDPOINT = endpoints.exportExcel


//

type ApiData = {
  isSuccess: boolean;
  fileUrl: URL;
}

//
export function useGetExportExcel(filters: { [key: string]: string | number | boolean | null | Filter }) {
  console.log(filters.isSubmit)
  const { data, isLoading, error, isValidating } = useSWR<ApiData>(
    filters.isSubmit
      ? [ENDPOINT, {
        params: {
          countryId: filters.country,
          entity: filters.entity,
          masterProcessId: filters.masterProcess,
          subprocessId: filters.subProcess,
          task: filters.task,
          agent: filters.agent,
          startdate: filters.start,
          enddate: filters.end,
        }
      }]
      : null,
    fetcher,
    swrOptions
  );

  return useMemo(() => ({
    fileUrl: data?.fileUrl || null,
    isLoading,
    error,
    isValidating,
  }), [data, error, isLoading, isValidating]);
}

