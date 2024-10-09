import { useEffect} from 'react';
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
import {CalendarDialog} from "../calendar-dialog";
import { useCalendar } from '../hooks/use-calendar';
import { CalendarToolbar } from '../calendar-toolbar';
import useCalendarStore from "../../../store/calendarStore";


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
    setDayEvents,
    dayEvents,
  } = useCalendar(events);


  useEffect(() => {
    onInitialView();
  }, [onInitialView]);

  const flexProps = { flex: '1 1 auto', display: 'flex', flexDirection: 'column' };
  const handleDayPress = useCalendarStore((state) => state.handleDayPress);

  const handleDayClick = (e: any) => {
    const day = e.dateStr;
    const filteredEvents = events.filter((event) => event.start === day);
    setDayEvents(filteredEvents)
    handleDayPress(day)
  }
  const getEventClassNames = (eventInfo: any) => {
    if (!eventInfo.event.extendedProps.clickable) {
      return ['non-clickable-event'];
    }
    return [];
  };

  console.log('view', view)

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
              locale='en-gb'

              eventClassNames={getEventClassNames} // Apply the class based on clickable property
              eventOrder="order"
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
              dayMaxEventRows={view === "dayGridWeek" ? false : 4}
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
        events={dayEvents}
       />
    </>
  );
}







