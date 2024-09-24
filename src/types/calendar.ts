
// ----------------------------------------------------------------------


export type ICalendarDate = string | number;

export type ICalendarView = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listWeek';

export type ICalendarRange = { start: ICalendarDate; end: ICalendarDate } | null;

export type ICalendarEvent = {
  id: string;
  color: string;
  title: string;
  allDay?: boolean;
  end: ICalendarDate;
  start: ICalendarDate;
  extendedProps: {
    process: {
      id: string;
      title: string;
    };
    subprocess: {
      id: string;
      title: string;
    };
    hours: number;
    task: string;
  };

};
