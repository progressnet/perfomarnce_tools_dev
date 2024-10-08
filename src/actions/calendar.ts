import type {ICalendarEvent} from 'src/types/calendar';

import {useMemo} from 'react';
import useSWR, {mutate} from 'swr';

import axios, {endpoints, fetcher} from 'src/utils/axios';
import dayjs from "dayjs";

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
};
const enableServer = false;

const ENDPOINT = endpoints.timesheet;
// const ENDPOINT = "https://mocki.io/v1/4f628224-ecab-4b26-8ff7-becf1216c54a";

const swrOptions = {
  revalidateIfStale: enableServer,
  revalidateOnFocus: enableServer,
  revalidateOnReconnect: enableServer,
};

// ----------------------------------------------------------------------



type HoursPerDay = {
  [key: string]: number;
}

const calculateTotalHoursPerDay = (events: Timesheet[]) => {

  const hoursPerDay: HoursPerDay = {};
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

export function useGetEvents() {
  const { data, isLoading, error, isValidating } = useSWR<Timesheet[]>(
    ENDPOINT,
    fetcher,
    swrOptions
  );
  const totalHoursPerDay = calculateTotalHoursPerDay(data || []);
  // ============================================================

  console.log('totalHoursPerDay', totalHoursPerDay);
  const transformData = data && data.map((ts) => {
    const start_date = dayjs(ts.timesheetdate).format('YYYY-MM-DD');
    const dayHours = totalHoursPerDay[start_date];
    const title =  ts.taskName;
    return {
      id: ts.id.toString(),
      title: `${title} - ${ts.hours}h`,
      start: start_date,
      end: start_date,
      color: dayHours >= 8 ? "green" : "red",
      extendedProps: {
        processID: ts.processID,
        processName: ts.processName,
        subprocessID: ts.subProcessID,
        subprocessName: ts.subProcessName,
        taskID: ts.taskID,
        taskName: ts.taskName,
        hours: ts.hours,
        timesheetID: ts.id,
        timesheetdate: ts.timesheetdate,
      },
    }
  })


  return useMemo(() => ({
    events: transformData || [],
    eventsLoading: isLoading,
    error,
    isValidating,
    empty: !isLoading && !data?.length,
  }), [data, transformData, error, isLoading, isValidating]);
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
  employeeID: number;
  timesheetdate: string;
  hours: number;
  assignmentID: number;
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


