
import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";

import {paths} from "../../routes/paths";
import {SubTitle} from "./components/subTitle";
import {Iconify} from "../../components/iconify";
import {Scrollbar} from "../../components/scrollbar";
import {getTaskURL} from "../../utils/buildURLparams";
import {useGetMyTasksSubProcesses} from "../../actions/subprocess";



export function MyTasksSubProcessView() {

  const [filter, setFilter] = useState('');
  // ======= get the params and the query params =======
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const processName = searchParams.get('processName');
  const subProcessLength = searchParams.get('subProcesses');
  const done = searchParams.get('done');
  // ====================================================
  const {subProcesses} = useGetMyTasksSubProcesses(Number(id) || null);
  const navigate = useNavigate();

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value)
  }
  return (
    <Stack sx={{p:2, overflow: "hidden"}} spacing={2}>
      <Stack
        onClick={() => navigate(paths.dashboard.myTasks)}
        flexDirection="row"
        width="100%"
        alignItems="center"
        sx={{cursor: "pointer", backgroundColor: 'grey.200', borderRadius: 1}}
      >
        <Stack sx={{flex: 1, p: 2, justifyContent: "center"   }}>
          <Typography sx={{fontSize: '16px', color: "primary.main", mb: 1}}  variant="subtitle1">Selected Process</Typography>
          <Typography sx={{fontSize: '16px', fontWeight: 'bold'}} variant="subtitle1">{processName}</Typography>
          <Stack spacing={1} flexDirection="row" alignItems="center">
            <SubTitle text={`${subProcessLength} Sub-Processes`}/>
            <Divider orientation="vertical"  sx={{ height: '15px'}}/>
            <SubTitle text={` ${done} Done`}/>
          </Stack>
        </Stack>
        <Stack sx={{minWidth: '40px'}} >
          <Stack sx={{
            height: 25,
            width: 25,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: '50%',
            backgroundColor: 'black'
          }}>
            <Iconify width={15}  icon="radix-icons:reset" color="white" />
          </Stack>
        </Stack>
      </Stack>
      {/* SUB PROCESS TEXT & SEARCH INPUT */}
      <Typography variant="h6">Select Sub Process:</Typography>
      <TextField
        value={filter}
        onChange={handleFilter}
        placeholder="Search Sub Process..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />
      {/* SUB PROCESS LIST */}
      <SubProcesses data={subProcesses} />
    </Stack>
  )
}

export type SubProcessesProps = {
  data: any;
}
const SubProcesses = ({data}: SubProcessesProps) => {
  // hooks:
  const location = useLocation();
  const navigate = useNavigate();
  // ======================= get params ===========================:
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const processName = searchParams.get('processName');
  const subProcessLength = searchParams.get('subProcesses');
  const done = searchParams.get('done');
  const subprocessId = Number(searchParams.get('subprocessId'));
  // ======================= navigateTo ===========================:
  const handleNavigate = (currentSubProcess: any) => {
    const url = getTaskURL({
      id,
      processName,
      subProcesses:subProcessLength,
      done,
      subprocessId: currentSubProcess.id,
      subProcessName: currentSubProcess.subProcessName,
      subOngoing: currentSubProcess.ongoing,
      subNotStarted: currentSubProcess.notStarted,
      subCompleted: currentSubProcess.completed
    });
    navigate(url);
  }
  return (
    <Scrollbar
      sx={{
        overflowY: 'auto',
      }}
    >
      <Stack spacing={0.8}  sx={{overflowY: "auto"}}>
        {
          data.map((subprocess: any, index: number) => (
          <Stack key={`${subprocess.id}-${index}`}>
            <Stack
              onClick={() => handleNavigate(subprocess)}
              flexDirection="row"
              width="100%"
              alignItems="center"
              sx={{
                cursor: "pointer",
                borderColor: "grey.400",
                borderRadius: 1,
                backgroundColor: subprocessId === subprocess.id ? 'grey.200' : 'white'
              }}
            >
              <Stack sx={{flex: 1, p: 1, justifyContent: "center"   }}>
                <Typography sx={{fontSize: '16px'}} variant="subtitle1">{subprocess.subProcessName}</Typography>
                <Stack spacing={1} flexDirection="row" alignItems="center">
                  <SubTitle text={`${subprocess.notStarted} Not Started`}/>
                  <Divider orientation="vertical"  sx={{ height: '15px'}}/>
                  <SubTitle text={` ${subprocess.ongoing} Ongoing`}/>
                  <Divider orientation="vertical"  sx={{ height: '15px'}}/>
                  <SubTitle text={` ${subprocess.completed} Completed`}/>
                </Stack>
              </Stack>
              <Stack sx={{minWidth: '30px'}}>
                <Iconify icon="mingcute:right-fill" color="grey.500" />
              </Stack>
            </Stack>
            <Divider  sx={{width: '100%', height: 1 }} />
          </Stack>

      ))
        }
      </Stack>
    </Scrollbar>
  )
}

