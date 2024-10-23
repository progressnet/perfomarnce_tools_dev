import type {ICalendarEvent} from 'src/types/calendar';

import dayjs from "dayjs";
import {useMemo} from 'react';
import useSWR, {mutate} from 'swr';

import axios, {fetcher, endpoints} from 'src/utils/axios';

import type {ApiData} from "./_types";

// ----------------------------------------------------------------------
export type Timesheet = {
  id: number;
  employeeFirstName: string;
  employeeLastName: string;
  timesheetdate: string; // or Date, depending on how you're handling dates
  hours: number;
  taskID: number;
  taskName: string;
  assignmentCompletionBar: number;
  comments: string;
  timesheetCreationDate: string; // or Date
  timesheetLastEditDate: string; // or Date
  processID: number;
  processName: string;
  subProcessID: number;
  subProcessName: string;
  isCompleted: boolean;
};


const enableServer = false;

const ENDPOINT_CALENDAR = endpoints.timesheetDateRange;
const ENDPOINT = endpoints.timesheet;

const swrOptions = {
  revalidateIfStale: enableServer,
  revalidateOnFocus: enableServer,
  revalidateOnReconnect: enableServer,
};

// ----------------------------------------------------------------------



type HoursPerDay = {
  [key: string]: number;
}

const calculateTotalHoursPerDay = (events:  Timesheet[]) => {
  const hoursPerDay: HoursPerDay = {};
  // if(!events.length) return hoursPerDay ;
  events.forEach((event) => {
    const date = dayjs(event.timesheetdate).format('YYYY-MM-DD');
    if(!hoursPerDay[date]){
      hoursPerDay[date] = 0;
    }
    hoursPerDay[date] += event.hours;
  })
  return hoursPerDay;
}



// ----------------------------------------------------------------------


export function useGetEvents(start:string, end:string) {
  // =================================================
  const startDate = dayjs(start).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  const endDate = dayjs(end).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  // =================================================
  const { data, isLoading, error, isValidating } = useSWR<ApiData<Timesheet>>(
    start && end ? [ENDPOINT_CALENDAR, { params: { startDate, endDate } }] : null,
    fetcher,
    swrOptions
  );


  const totalHoursPerDay = calculateTotalHoursPerDay(data?.data || []);
  // ============================================================

  const transformData = data?.data?.map((ts) => {
    const start_date = dayjs(ts.timesheetdate).format('YYYY-MM-DD');
    const title =  ts.taskName;
    return {
      order: 2,
      id: ts.id.toString(),
      title: `${title} - ${ts.hours}h`,
      start: start_date,
      end: start_date,
      color: 'white',
      textColor: 'black',
      extendedProps: {
        clickable: true,
        processID: ts.processID,
        processName: ts.processName,
        subprocessID: ts.subProcessID,
        subprocessName: ts.subProcessName,
        taskID: ts.taskID,
        taskName: ts.taskName,
        hours: ts.hours,
        timesheetID: ts.id,
        timesheetdate: ts.timesheetdate,
        isCompleted: ts.isCompleted

      },
    }
  }) || [];

  const totalHoursEvents = Object.entries(totalHoursPerDay).map(
    ([date, totalHours], index) => ({
        order: 1,
        id: `total-${index}`,
        title: `Total: ${totalHours}h`,
        start:date,
        end: date,
        color: 'transparent',
        textColor: 'black',
        extendedProps: {
          clickable: false,
          totalHours,
        },
      })
  );
  const allEvents = [...totalHoursEvents, ...transformData];

  return useMemo(() => ({
    events: allEvents || [],
    eventsLoading: isLoading,
    error,
    isValidating,
    empty: !isLoading && !data?.data?.length,
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [ data,  error, isLoading, isValidating]);
}



// ----------------------------------------------------------------------

export async function updateEvent(eventData: Partial<ICalendarEvent>) {
  /**
   * Work on server
   */
  if (enableServer) {
    const data = { eventData };
    await axios.put(ENDPOINT, data);
  }

  /**
   * Work in local
   */
 await mutate(
    ENDPOINT,
    (currentData: any) => {
      const currentEvents: ICalendarEvent[] = currentData?.events;

      const events = currentEvents.map((event) =>
        event.id === eventData.id ? { ...event, ...eventData } : event
      );

      return { ...currentData, events };
    },
    false
  );
}

// ----------------------------------------------------------------------


export type TimesheetApiProps = {
  id?: number;
  timesheetdate: string;
  isCompleted: boolean;
  hours: number;
  taskID: number;
}
export async function handleTimesheetUpdate(data: TimesheetApiProps) {
  const res = await axios.put(ENDPOINT, data);
  await mutate(ENDPOINT);
  return {
    success: true,
    data: res,
  };
}


export async function handleTimesheetCreate( data: TimesheetApiProps) {
  const res = await axios.post(ENDPOINT, data);
  await mutate(ENDPOINT);
  return {
    success: true,
    data: res,
  };
}


