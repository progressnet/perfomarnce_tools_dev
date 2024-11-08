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






export type IReport = {
  city: string;
  timesheetDate: string; // Format: "YYYY-MM-DDTHH:mm:ss"
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  company: string;
  country: string;
  leCode: string;
  division: string;
  task: string;
  process: string;
  subProcess: string;
  hoursWorked: number;
  taskCountry: string;
  relation: string;
  parentId: number;
}

const ENDPOINT = endpoints.summary

export function useGetSummary(startDate = "2024-08-08T11:08:24.676Z", endDate = "2024-11-08T11:08:24.676Z") {
  const { data, isLoading, error, isValidating } = useSWR<ApiData<IReport>>(
     `${ENDPOINT}?startDate=${startDate}&endDate=${endDate}`,
    fetcher,
    swrOptions
  );


  return useMemo(() => ({
    summary: data?.data || [],
    isLoading,
    error,
    isValidating,
    empty: !isLoading && !data?.data.length,
  }), [data, error, isLoading, isValidating]);

}
