import {useState} from "react";

import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";

import {useGetMyTasksProcesses, useGetProcess} from "src/actions/process";

import {Iconify} from "src/components/iconify";
import {Scrollbar} from "src/components/scrollbar";
import {useNavigate} from "react-router-dom";

import {SubTitle} from "./components/subTitle";
import {getSubProcessUrl} from "../../utils/buildURLparams";



export function MyTasksProcessView() {
  const {processes} = useGetProcess();


  const [filter, setFilter] = useState('');
  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value)
  }
  return (
    <Stack sx={{p:2, overflow: "hidden"}} spacing={1}>
      <Typography variant="h6">Select Process:</Typography>
      <TextField
        size="small"
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
      <ProcessesList data={processes}/>
    </Stack>
  )
}


// ===============================================================================
export type ProcessesListProps = {
  data: any;

}

const ProcessesList = ({data}: ProcessesListProps) => {
  const navigate = useNavigate();
  // =============================================
  const handleNavigate = (currentProcess: any) => {
    if(!currentProcess) return;
    navigate(getSubProcessUrl(currentProcess));
  }
  return (
    <Scrollbar
      sx={{
        overflowY: 'auto',
      }}
    >
      <Stack sx={{overflowY: "auto"}}>
        {
          data.map((process: any, index: number) => (
            <Stack
              onClick={() => handleNavigate(process)}
              key={index}
              flexDirection="row"
              width="100%"
              alignItems="center"
              sx={{cursor: "pointer",borderBottom: "1.4px dashed", borderColor: "grey.400"}}
            >
              <Stack sx={{flex: 1, p: 1, justifyContent: "center"   }}>
                <Typography sx={{fontSize: '16px'}} variant="subtitle1">{process.processName}</Typography>
                <Stack spacing={1} flexDirection="row" alignItems="center">
                  <SubTitle text={`${process?.numberOfSubprocesses} Sub-Processes`}/>
                  {/* <Divider orientation="vertical"  sx={{ height: '15px'}}/> */}
                  {/* <SubTitle text={` ${process?.done ? process?.done : 0} Done`}/> */}
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
}


