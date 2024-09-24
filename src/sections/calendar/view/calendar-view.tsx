import {useEffect, useState} from 'react';
import Calendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import interactionPlugin from '@fullcalendar/interaction';

import Card from '@mui/material/Card';
import Stack from "@mui/material/Stack";
import Dialog from '@mui/material/Dialog';
import { useTheme } from '@mui/material/styles';
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { fDate } from 'src/utils/format-time';

import { DashboardContent } from 'src/layouts/dashboard';
import { updateEvent, useGetEvents } from 'src/actions/calendar';

import { StyledCalendar } from '../styles';
import { useEvent } from '../hooks/use-event';
import { useCalendar } from '../hooks/use-calendar';
import {Iconify} from "../../../components/iconify";
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
    dayEvents, setDayEvents
  } = useCalendar(events);


  useEffect(() => {
    onInitialView();
  }, [onInitialView]);


  const flexProps = { flex: '1 1 auto', display: 'flex', flexDirection: 'column' };
  const currentEvent = useEvent(events, selectEventId, selectedRange, openForm);


  const handleDayClick = (e: any) => {
    // const day = e.dateStr;
    // const filteredEvents = events.filter((event) => event.start === day);
    // console.log({filteredEvents})
    // setDayEvents(filteredEvents)
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
        openForm={openForm}
        currentEvent={currentEvent || undefined}
        events={dayEvents}
      />
    </>
  );
}


type DialogProps = {
  events: ICalendarEvent[];
  currentEvent: ICalendarEvent | undefined;
  onCloseForm: () => void;
  openForm: boolean;
};

export const CalendarDialog = (
  {
    events,
    currentEvent,
    onCloseForm,
    openForm,
  }: DialogProps) => {
  const theme = useTheme();

  console.log({currentEvent})
  const [eventActive, setEventActive] = useState<ICalendarEvent | undefined>(currentEvent);
  console.log({eventActive})
  const handleAddNewTask = () => {
    console.log('add new task')
  }
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={openForm}
      onClose={onCloseForm}
      transitionDuration={{
        enter: theme.transitions.duration.shortest,
        exit: theme.transitions.duration.shortest - 80,
      }}
      PaperProps={{
        sx: {
          minHeight:'300px',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          flexDirection: 'column',
        },
      }}
    >
       <Stack
          flexDirection="row"
          spacing={1}
          sx={{ flexGrow: 1, padding: '12px', backgroundColor: 'rgba(246,246,246,0.99)', borderRadius: '15px'}}
       >
         {/* LEFT SIDE */}
          <Stack sx={{
            flex: 1,
            backgroundColor: '#fbfbfb',
            borderRadius: 1,
            boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.1)',

          }}
          >
            <Stack
              alignItems="flex-end"
              justifyContent="center"
              sx={{
                height: '80px',
                p:2,
                borderBottom: '1px dashed',
                borderColor: 'grey.300',
            }}
            >
              {/* NEW TASK */}
             <AddTaskBtn onClick={handleAddNewTask} />
            </Stack>
            <Stack sx={{
              padding: 2,

            }}>
              {/* DISPLAY LIST OF CURRENT TASKS */}
              <ListOfCurrentEvents
                eventActive={eventActive}
                events={events}
                setEventActive={setEventActive}
              />
            </Stack>
          </Stack>
         {/* RIGHT SIDE */}
          <Stack
            sx={{
              flex: 2,
              backgroundColor: '#fff',
              borderRadius: 1,
              boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.1)'
            }}
          >
            <Stack sx={{
              height: '80px',
              p:1,
              borderBottom: '1px dashed',
              borderColor: 'grey.300',
              alignItems: 'flex-end',
              justifyContent: 'center'
              }}
            >
              <IconButton
                aria-label="close"
                onClick={onCloseForm}

              >
                <Iconify icon="material-symbols:close" sx={{width: 25, height: 25,}} />
              </IconButton>
            </Stack>
            <Stack>
              b
            </Stack>
          </Stack>
       </Stack>
    </Dialog>
  )
}


type ListOfCurrentEventsProps = {
  events: ICalendarEvent[];
  eventActive: ICalendarEvent | undefined;
  setEventActive?: (event: ICalendarEvent) => void;
}
const ListOfCurrentEvents = ({events, eventActive, setEventActive}: ListOfCurrentEventsProps) => {
  const initialTime = 0;
  const time = events.reduce((acc, event) => acc + event.extendedProps.hours, initialTime)

  const color = time >= 8 ? 'green' : 'red';
  return (
    <Stack>
      <Typography  sx={{fontSize: '14px'}} color={color}>
        {time} out of 8 hours have been added
      </Typography>
      <Stack sx={{marginTop: 2, overflow: 'auto'}} spacing={2}>
        {events.map((event) => (
          <EventListItem
            eventActive={eventActive}
            event={event}
            key={event.id}
            setEventActive={setEventActive}
          />
        ))}
      </Stack>
    </Stack>

  )
}


type EventListItemProps = {
  event: ICalendarEvent;
  eventActive: ICalendarEvent | undefined;
  setEventActive?: (event: ICalendarEvent) => void;
}

export function EventListItem(
  {
    event,
    eventActive,
    setEventActive
  }: EventListItemProps)  {

  const borderColor = eventActive?.id === event.id ? 'primary.main' : 'transparent';
  return (
    <Stack sx={{borderWidth: 1, borderColor}} flexDirection="row" alignItems="center">
       <Stack sx={{ width: '100%'}}>
         <Typography sx={{width: '200px', textWrap: 'wrap'}} variant="subtitle2">
           {event.extendedProps.task}
         </Typography >
         <Typography sx={{width: '200px', textWrap: 'wrap'}} variant="caption" color="primary">
           {event.extendedProps.process.title}
         </Typography >
         <Typography sx={{width: '200px', textWrap: 'wrap', marginTop: 1}} variant="subtitle2" color="primary">
           {`${event.extendedProps.hours  } hours`}
         </Typography >
       </Stack>
       <Stack sx={{width: '40px'}}>
         <IconButton>
            <Iconify icon="mingcute:right-fill" sx={{width: 18, height: 18,}} />
         </IconButton>
       </Stack>
    </Stack>
  )
}

type AddTaskBtnProps = {
  onClick: () => void;

}


// --- ADD NEW TASK BUTTON:
const AddTaskBtn = ({onClick}: AddTaskBtnProps) => (
    <Stack  flexDirection="row" spacing={1} justifyContent="flex-end" alignItems="center">
      <Typography>
        Add New Task
      </Typography>
      <IconButton
        onClick={onClick}
        size="small"
        aria-label="new task"
        sx={{
          backgroundColor: 'primary.main',
          color: '#fff'
        }}
      >
        <Iconify icon="mdi:plus" sx={{width: 25, height: 25,}} />
      </IconButton>
    </Stack>
  )

{/* <DialogTitle sx={{ minHeight: 76 }}> */}
{/*  {openForm && <> {currentEvent?.id ? 'Edit' : 'Add'} event</>} */}
{/* </DialogTitle> */}
{/* <IconButton */}
{/*  aria-label="close" */}
{/*  onClick={onCloseForm} */}
{/*  sx={{ */}
{/*    position: 'absolute', */}
{/*    right: 8, */}
{/*    top: 8, */}
{/*  }} */}
{/* > */}

{/*  <Iconify icon="material-symbols:close" sx={{width: 25, height: 25,}} /> */}
{/* </IconButton> */}
{/* <CalendarForm */}
{/*  dayEvents={events} */}
{/*  currentEvent={currentEvent} */}
{/*  colorOptions={CALENDAR_COLOR_OPTIONS} */}
{/*  onClose={onCloseForm} */}
{/* /> */}
