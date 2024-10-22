import {useState} from "react";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";

import Divider from "@mui/material/Divider";
import {Iconify} from "../../../components/iconify";
import {useGetProcess} from "../../../actions/process";
import {Scrollbar} from "../../../components/scrollbar";


const PROCESSES = [
  {
    id: 1,
    processName: 'Process 1',
    subProcesses: 10,
    tasks: 20,
    done: 2,
  }, {
    id: 2,
    processName: 'Closing Process',
    subProcesses: 5,
    tasks: 10,
    done: 4,
  },
  {
    id: 3,
    processName: 'Process 3',
    subProcesses: 5,
    tasks: 10,
    done: 4,
  },{
    id: 4,
    processName: 'Process 3',
    subProcesses: 5,
    tasks: 10,
    done: 4,
  },{
    id: 5,
    processName: 'Process 3',
    subProcesses: 5,
    tasks: 10,
    done: 4,
  },{
    id: 5,
    processName: 'Process 3',
    subProcesses: 5,
    tasks: 10,
    done: 4,
  },{
    id: 5,
    processName: 'Process 3',
    subProcesses: 5,
    tasks: 10,
    done: 4,
  },{
    id: 5,
    processName: 'Process 3',
    subProcesses: 5,
    tasks: 10,
    done: 4,
  },
]

export function Processes() {
  const {processes} = useGetProcess();

  const [filter, setFilter] = useState('');
  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value)
  }
  return (
    <Stack sx={{p:2, overflow: "hidden"}} spacing={2}>
      <Typography variant="h4">Select Process:</Typography>
      <TextField
        value={filter}
        onChange={handleFilter}
        placeholder="Search Process..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />
      <ProcessesList data={PROCESSES}/>
    </Stack>
  )
}

export type ProcessesListProps = {
  data: any;

}
const ProcessesList = ({data}: ProcessesListProps) => (
  <Scrollbar
    sx={{
      overflowY: 'auto',
    }}
  >
    <Stack sx={{overflowY: "auto"}}>
      {
        data.map((process: any, index: number) => (
          <Stack
            key={index}
            flexDirection="row"
            width="100%"
            alignItems="center"
            sx={{cursor: "pointer",borderBottom: "1.4px dashed", borderColor: "grey.400"}}
          >
            <Stack sx={{flex: 1, p: 2, justifyContent: "center"   }}>
              <Typography sx={{fontSize: '18px'}} variant="subtitle1">{process.processName}</Typography>
              <Stack spacing={1} flexDirection="row">
                <SubTitle text={`${process.subProcesses} Sub-Processes`}/>
                <Divider orientation="vertical"  sx={{height: '20px'}}/>
                <SubTitle text={` ${process.tasks} Done`}/>
              </Stack>
            </Stack>
            <Stack sx={{minWidth: '40px'}}>
              <Iconify icon="mingcute:right-fill" color="grey.500" />
            </Stack>
          </Stack>
        ))
      }
    </Stack>

  </Scrollbar>
   )

type SubTitleProps = {
  text: string;

}
const SubTitle = ({text}: SubTitleProps) => (
    <Typography sx={{color: "grey.500", fontSize: '15px', fontWeight: 'bold'}} >{text}</Typography>

  )
