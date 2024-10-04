import type {ReactNode} from "react";
import type { ICalendarEvent } from 'src/types/calendar';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useEffect, useCallback} from "react";

import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import LoadingButton from '@mui/lab/LoadingButton';
import DialogActions from '@mui/material/DialogActions';

import { Form, Field } from 'src/components/hook-form';
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";


// ----------------------------------------------------------------------

export type EventSchemaType = zod.infer<typeof EventSchema>;

export const EventSchema = zod.object({
  process: zod.object({
    id: zod.number(),
    name: zod.string(),
  }),
  subprocess: zod.object({
    id: zod.number(),
    name: zod.string(),
  }),
  task: zod.object({
    id: zod.number(),
    name: zod.string(),
  }),
  hours: zod.number(),
});

// ----------------------------------------------------------------------

type Props = {
  onClose: () => void;
  currentEvent?: ICalendarEvent;
};

export function CalendarForm({ currentEvent, onClose }: Props) {


  const defaultValues = useMemo(
    () => ({
      process: {
        id: currentEvent?.extendedProps?.processID || 0,
        name: currentEvent?.extendedProps?.processName || "",

      },
      subprocess: {
        id: currentEvent?.extendedProps?.subprocessID || 0,
        name: currentEvent?.extendedProps?.subprocessName || "",
      },
      task: {
        id: currentEvent?.extendedProps?.taskID || 0,
        name: currentEvent?.extendedProps?.taskName || "",
      },
      hours: currentEvent?.extendedProps?.hours || 0,
    }),
    [currentEvent]
  );
  const methods = useForm<EventSchemaType>({
    mode: 'all',
    resolver: zodResolver(EventSchema),
    defaultValues
  });

  const {
    watch,
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const values = watch();


  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, currentEvent, reset]);


  const onSubmit = handleSubmit(async (data) => {
  });


  const handleProcessChange = useCallback((value: {id: number, name: string}) => {
      setValue('process', value)
      setValue('subprocess', {id: 0, name: ""})
      setValue('task', {id: 0, name: ""})
  }, [setValue])

  const handleSubProcessChange = useCallback((value: {id: number, name: string}) => {
      setValue('subprocess', value)
      setValue('task', {id: 0, name: ""})
  }, [setValue])

  const handleTaskChange = useCallback((value: {id: number, name: string}) => {
      setValue('task', value)
  }, [setValue])

  const handleHourChange = useCallback((hourVal: number  ) => {
      setValue('hours', hourVal)
  }, [setValue])

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2}>
        { /* ============== PROCESS ================ */}
        <HorizontalInputContainer label="Process">
          <Field.SelectProcess
            name="process"
            error={errors?.process?.message || ""}
            label="Process"
            value={values.process.id}
            handleValue={handleProcessChange}
          />
        </HorizontalInputContainer>
        { /* ============== SUB-PROCESS ================ */}
        <HorizontalInputContainer label="Sub-process">
          <Field.SelectSubProcess
            processID={values.process.id}
            name="subprocess"
            error={errors?.subprocess?.message || ""}
            label="Sub-process"
            value={values.subprocess.id}
            handleValue={handleSubProcessChange}
          />
        </HorizontalInputContainer>
        { /* ============== TASK ================ */}
          <Typography sx={{mb:1}} variant="h6">Choose the task that you have been working on</Typography>
          <Grid spacing={0} container justifyContent="end">
            <Grid alignContent="center" item xs={4} >

              <Typography variant="body2" sx={{fontWeight: 'medium'}}>Task</Typography>
            </Grid>
            <Grid item xs={8}>
              <Field.SelectTask
                subprocessID={values.subprocess.id}
                name="task"
                error={errors?.task?.message || ""}
                label="Task"
                value={values.task.id}
                handleValue={handleTaskChange}
              />
            </Grid>
            { /* ============== TEXT DISPLAY ================ */}
            <Grid item xs={8}>
               <SelectedValues
                  processName={values.process.name}
                  subprocessName={values.subprocess.name}
                  taskName={values.task.name}
               />
            </Grid>
          </Grid>
          <Divider sx={{borderStyle:'dashed'}} variant="fullWidth" />
        { /* ============== HOURS CONTROLLER ================ */}
        <Stack>
          <TextField
            value={values.hours}
            onChange={(e) => handleHourChange(Number(e.target.value))}
            sx={{
              width: '60px',
              "& input": {
                textAlign: 'center'
              }
            }}
            name="hours"
            placeholder="0"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Stack>

      </Stack>
      { /* ============== DIALOG ACTIONS ================ */}
      <DialogActions
        sx={{ flexShrink: 0 }}
      >
        <LoadingButton
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Save changes
        </LoadingButton>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Form>
  );
}


type SelectedValuesProps = {
  processName: string;
  subprocessName: string;
  taskName: string;
}

const SelectedValues = ({processName, subprocessName, taskName}: SelectedValuesProps) => (
    <Stack flexDirection="row">
      <Box sx={{fontSize: '12px'}} component="p">
        You have selected the task:
        <Box component="span"  sx={{color: "primary.main"}}> {taskName} </Box>
        from the sub-process:
        <Box component="span" sx={{color: "primary.main"}}> {subprocessName} </Box>
        of
        <Box component="span"  sx={{color: "primary.main"}}> {processName}</Box>
      </Box>
    </Stack>
  )


export type HorizontalInputProps = {
  children: ReactNode;
  label: string;
  sx?: any
}

export const HorizontalInputContainer = ({children, label, sx}:  HorizontalInputProps) => (
    <Grid container>
      <Grid item sm={4}>
        <Typography variant="body2" sx={{fontWeight: 'medium'}}>{label}</Typography>
      </Grid>
      <Grid item sm={8}>
        {children}
      </Grid>
    </Grid>
  )
