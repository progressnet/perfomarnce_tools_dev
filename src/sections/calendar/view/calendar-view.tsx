import type {EventContentArg} from "@fullcalendar/core";

import {useEffect, useState} from 'react';
import Calendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import interactionPlugin from '@fullcalendar/interaction';

import Card from '@mui/material/Card';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LinearProgress from '@mui/material/LinearProgress';

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
  const [dates, setDates] = useState({
    start: '',
    end: ''
  })
  const { events, eventsLoading, URL } = useGetEvents(dates.start, dates.end);

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

  const handleDatesSet = (dateInfo: any) => {
    setDates({
      start: dateInfo.startStr,
      end: dateInfo.endStr
    })
  }

  const renderContent = (eventInfo: EventContentArg) => {
    const {clickable, totalHours } = eventInfo.event.extendedProps;
    const progress = Math.min((totalHours / 8) * 100, 100);

    const eventContentStyle = {
      whiteSpace: 'normal',
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
      fontSize: '13px'
    };
    if(!clickable) {
      return (
        <Stack
          flexDirection="row"
          alignItems="center"
          spacing={1}
          sx={{
            width: '100%',
            color: totalHours > 8 ? 'rgb(4,171,4)' : 'rgb(208,17,17)',
            backgroundColor: totalHours > 8 ? 'rgba(229,247,241,0.73)' : 'rgba(254,233,233,0.63)',
            px: 1,
            py: 0.4,
            borderRadius: '4px'
        }}
        >
          <Typography sx={{fontWeight: 'bold', minWidth: '30px', fontSize: '12px'}}>
            {`${totalHours} / 8`}
          </Typography>
          <LinearProgress
            sx={{
              backgroundColor: 'rgba(234,34,34,0.19)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: 'rgb(4,171,4)',
              },
              width: '100%', color: 'green'
            }}
            variant="determinate"
            value={progress}
          />
        </Stack>
      )
    }
      return (
        <Typography  sx={eventContentStyle}>
          {eventInfo.event.title}
        </Typography>
      )



  }
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
              eventContent={renderContent}
              eventClassNames={getEventClassNames} // Apply the class based on clickable property
              eventOrder="order"
              weekends
              editable
              droppable
              selectable
              datesSet={handleDatesSet}
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
         URL={URL}
        onCloseForm={onCloseForm}
        openForm={openForm }
        events={dayEvents}
       />
    </>
  );
}







