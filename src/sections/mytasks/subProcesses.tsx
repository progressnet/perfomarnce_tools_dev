
import {useState} from "react";
import {useLocation, useNavigate, } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";

import {paths} from "../../routes/paths";
import {SubTitle} from "./components/subTitle";
import {Iconify} from "../../components/iconify";
import {Scrollbar} from "../../components/scrollbar";
import { useGetSubProcessByProcess} from "../../actions/subprocess";



export function MyTasksSubProcessView() {
  // =========== hooks ===========
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  // =========== state ===========
  const [filter, setFilter] = useState('');
  // ======= get the params and the query params =======
  const id = searchParams.get('id');
  const processName = searchParams.get('processName');
  const subProcessLength = searchParams.get('numberOfSubprocesses');
  // ====================================================
  const {subprocesses} = useGetSubProcessByProcess(Number(id) || null);
  const navigate = useNavigate();

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value)
  }
  return (
    <Stack sx={{p:2, overflow: "hidden"}} spacing={1}>
      <Stack
        onClick={() => navigate(paths.dashboard.myTasks)}
        flexDirection="row"
        width="100%"
        alignItems="center"
        sx={{cursor: "pointer", backgroundColor: 'grey.200', borderRadius: 1}}
      >
        <Stack sx={{flex: 1, p: 2, justifyContent: "center"   }}>
          <Typography sx={{fontSize: '13px', color: "primary.main", mb: 0.3}}  variant="subtitle2">Selected Process</Typography>
          <Typography sx={{fontSize: '16px', fontWeight: 'bold'}} variant="subtitle1">{processName}</Typography>
          <Stack spacing={1} flexDirection="row" alignItems="center">
            <SubTitle text={`${subProcessLength} Sub-Processes`}/>
            {/* <Divider orientation="vertical"  sx={{ height: '15px'}}/> */}
            {/* <SubTitle text={` ${done} Done`}/> */}
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
      <Typography sx={{mt:1}} variant="h6">Select Sub Process:</Typography>
      <TextField
        size="small"
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
      <SubProcesses data={subprocesses} />
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
  const subprocessId = Number(searchParams.get('subprocessId'));
  const currentUrl = new URL(window.location.href);
  // ======================= navigateTo ===========================:
  const handleNavigate = (currentSubProcess: any) => {
    if(!currentUrl.search.includes('subprocessId')) {
      navigate(`${currentUrl.pathname}${currentUrl.search}&subprocessId=${currentSubProcess.id}`);
      return;
    }
    const newUrl = currentUrl.search.replace(`subprocessId=${subprocessId}`, `subprocessId=${currentSubProcess.id}`);
    navigate(`${currentUrl.pathname}${newUrl}`);
  }
  return (
    <Scrollbar
      sx={{
        overflowY: 'auto',
      }}
    >
      <Stack  sx={{overflowY: "auto"}}>
        {
          data.map((subprocess: any, index: number) => (
          <Stack  sx={{cursor: "pointer",borderBottom: "1.4px dashed", borderColor: "grey.400", py: 1}} key={`${subprocess.id}-${index}`}>
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
              <Stack sx={{flex: 1, p: 1, justifyContent: "center",  }}>
                <Typography sx={{fontSize: '16px'}} variant="subtitle1">{subprocess?.subProcess}</Typography>
                <Stack spacing={1} flexDirection="row" alignItems="center">
                  <SubTitle text={`${subprocess?.notStarted || 0} Not Started`}/>
                  <Divider orientation="vertical"  sx={{ height: '15px'}}/>
                  <SubTitle text={` ${subprocess?.ongoing || 0} Ongoing`}/>
                </Stack>
              </Stack>
              <Stack sx={{minWidth: '30px'}}>
                <Iconify icon="mingcute:right-fill" color="grey.500" />
              </Stack>
            </Stack>
          </Stack>

      ))
        }
      </Stack>
    </Scrollbar>
  )
}

