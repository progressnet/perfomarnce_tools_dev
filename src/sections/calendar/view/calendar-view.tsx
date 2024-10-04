import {useState, useEffect} from 'react';
import Calendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import interactionPlugin from '@fullcalendar/interaction';

import Card from '@mui/material/Card';

import { fDate } from 'src/utils/format-time';

import { DashboardContent } from 'src/layouts/dashboard';
import { updateEvent, useGetEvents } from 'src/actions/calendar';

import { StyledCalendar } from '../styles';
import { useEvent } from '../hooks/use-event';
import {CalendarDialog} from "../calendar-dialog";
import { useCalendar } from '../hooks/use-calendar';
import { CalendarToolbar } from '../calendar-toolbar';

import type {ICalendarEvent} from "../../../types/calendar";

// ----------------------------------------------------------------------

export function CalendarView() {
  const { events, eventsLoading } = useGetEvents();

  const {
    calendarRef,
    //
    view,
    date,
    //
    onDatePrev,
    onDateNext,
    onDateToday,
    onDropEvent,
    onChangeView,
    onSelectRange,
    onClickEvent,
    onResizeEvent,
    onInitialView,
    //
    openForm,
    onCloseForm,
    //
    selectEventId,
    selectedRange,
    //
    dayEvents,
  } = useCalendar(events);


  useEffect(() => {
    onInitialView();
  }, [onInitialView]);


  const flexProps = { flex: '1 1 auto', display: 'flex', flexDirection: 'column' };
  const currentEvent = useEvent(events, selectEventId, selectedRange, openForm);
  const [currentDate, setCurrentDate] = useState(new Date()); // Start from today's date

  const handleDayClick = (e: any) => {
    const day = e.dateStr;
    const filteredEvents = events.filter((event) => event.start === day);
    // setDayEvents(filteredEvents)
  }

  const handleDatesSet = (dateInfo: any) => {
    // Here you can use the dateInfo.start to control the displayed range
    setCurrentDate(dateInfo.start);
  };
  return (
    <>
      <DashboardContent maxWidth="xl" sx={{ ...flexProps }}>
        <Card sx={{ ...flexProps, minHeight: '50vh' }}>
          <StyledCalendar sx={{ ...flexProps, '.fc.fc-media-screen': { flex: '1 1 auto' } }}>
            <CalendarToolbar
              date={fDate(date)}
              view={view}
              loading={eventsLoading}
              onNextDate={onDateNext}
              onPrevDate={onDatePrev}
              onToday={onDateToday}
              onChangeView={onChangeView}
            />
            <Calendar
              weekends
              editable
              droppable
              selectable
              rerenderDelay={10}
              allDayMaintainDuration
              eventResizableFromStart
              ref={calendarRef}
              initialDate={date}
              dateClick={handleDayClick}
              initialView={view}
              dayMaxEventRows={3}
              eventDisplay="block"
              events={events}
              headerToolbar={false}
              select={onSelectRange}
              eventClick={onClickEvent}
              aspectRatio={3}
              eventDrop={(arg) => {
                onDropEvent(arg, updateEvent);
              }}
              eventResize={(arg) => {
                onResizeEvent(arg, updateEvent);
              }}
              plugins={[
                listPlugin,
                dayGridPlugin,
                timelinePlugin,
                timeGridPlugin,
                interactionPlugin,
              ]}

            />
          </StyledCalendar>
        </Card>
      </DashboardContent>
       <CalendarDialog
        onCloseForm={onCloseForm}
        openForm={openForm }
        currentEvent={currentEvent as ICalendarEvent}
        events={dayEvents}
       />
    </>
  );
}







