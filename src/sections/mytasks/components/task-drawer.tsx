import dayjs from "dayjs";

import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import {Scrollbar} from "src/components/scrollbar";

import type {ITask} from "../../../actions/task";



type TasksDrawerProps = {
  task: ITask;
  open: boolean;
  onClose: () => void;

}
export function TasksDrawer(
  {
    task,
    open,
    onClose
  }: TasksDrawerProps) {


  if(!task) return null;
   return (
     <Drawer
       anchor="right"
       open={open}
       onClose={onClose}
       slotProps={{ backdrop: { invisible: true } }}
       PaperProps={{ sx: { width: 600, } }}
     >
        <Scrollbar sx={{p:4}}>
          <Stack sx={{mb:3}} >
            <Typography variant="body2">Task Details</Typography>
            <Typography variant="h6">{task.taskName}</Typography>
          </Stack>
          <Stack spacing={3}>
            <TextField
              label="Due Date"
              value={dayjs(task.duedate).format('DD/MM/YYYY')}
              fullWidth
              disabled
            />
            <TextField
              multiline
              maxRows={5}
              minRows={2}
              label="Description"
              value={task.taskDescription}
              fullWidth
              disabled
            />
          </Stack>

        </Scrollbar>
     </Drawer>
   )
}
