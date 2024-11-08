import {useState} from "react";
import {useNavigate} from "react-router-dom";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";

import { useGetProcess} from "src/actions/process";

import {Iconify} from "src/components/iconify";
import {Scrollbar} from "src/components/scrollbar";

import Alert from "@mui/material/Alert";
import {SubTitle} from "./components/subTitle";
import {getSubProcessUrl} from "../../utils/buildURLparams";
import {ActivityIndicator} from "../../components/_local/ActivityIndicator";



export function MyTasksProcessView() {
  const [filter, setFilter] = useState('');

  const {processes, isLoading} = useGetProcess(filter);


  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value)
  }
  return (
    <Stack sx={{p:2, overflow: "hidden", height: '100%'}} spacing={1}>
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
      <ProcessesList data={processes} isLoading={isLoading}/>
    </Stack>
  )
}


// ===============================================================================
export type ProcessesListProps = {
  data: any;
  isLoading: boolean;
}

const ProcessesList = ({data, isLoading}: ProcessesListProps,) => {
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
        height: '100%',
        position: 'relative',
      }}
    >
      {!data.length && !isLoading && <Alert severity="info">No data found</Alert>
      }
      <ActivityIndicator isLoading={isLoading} />
      <Stack sx={{overflowY: "auto", height: '100%'}}>
        {
          data.map((process: any, index: number) => (
            <Stack
              onClick={() => handleNavigate(process)}
              key={index}
              flexDirection="row"
              width="100%"
              alignItems="center"
              sx={{
                cursor: "pointer",
                borderBottom: "1.4px dashed",
                borderColor: "grey.400",
                userSelect: "none",
              }}
            >
              <Stack sx={{flex: 1, p: 1, justifyContent: "center"   }}>
                <Typography sx={{fontSize: '16px'}} variant="subtitle1">{process.processName}</Typography>
                <Stack spacing={1} flexDirection="row" alignItems="center">
                  <SubTitle text={`${process?.numberOfSubprocesses} Sub-Processes`}/>

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


