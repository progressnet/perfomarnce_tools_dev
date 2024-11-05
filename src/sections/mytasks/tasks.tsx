


import {useState} from "react";
import { useLocation } from "react-router";
import {useNavigate} from "react-router-dom";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import {Iconify} from "../../components/iconify";
import {useGetTaskByFilter} from "../../actions/task";
import {getSubProcessUrl} from "../../utils/buildURLparams";
import {CustomErrorAlert} from "../../components/CustomAlert";
import {SearchInput} from "../../components/_local/custom-search-input";
import {usePopover, CustomPopover} from "../../components/custom-popover";
import {ENTITY_OPTIONS, FilterByEntity} from "./components/filterByEntity";
import {FilterByStatus, STATUS_OPTIONS} from "./components/filterByStatus";

import type { StatusProps} from "./components/filterByStatus";
import type { EntityProps} from "./components/filterByEntity";



export function MyTasksTasksView() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, processName, subProcesses: subProcessLength, done, subprocessId } = Object.fromEntries(new URLSearchParams(location.search));
  // ========================================
  // ========================================
  const [state, setState] = useState({
    entity: ENTITY_OPTIONS[1],
    status: STATUS_OPTIONS[1],
    search: '',
  })
  // ========================================
  const {tasks, error} = useGetTaskByFilter(
    Number(subprocessId)
  );
  // ========================================
  const handleStatus = (val: StatusProps) => {
    setState(prev => ({...prev, status: val}))
  }
  const handleSearch = (val: string) => {
    setState(prev => ({...prev, search: val}))
  }
  const handleEntity = (val: EntityProps) => {
    setState(prev => ({...prev, entity: val}))
  }

  const handleNavigateBack = () => {
    const url = getSubProcessUrl({
      id,
      processName,
      subProcesses: subProcessLength,
      done
    })
    navigate(url)
  }
  // ========================================
  return (
    <Stack  sx={{p: 2}} spacing={0.6}>
      { /* ================= tasks header =========================== */ }
      <Stack  flexDirection="row" alignItems="center" justifyContent="space-between" spacing={1}>
        <Stack flexDirection="row" alignItems="center" spacing={1}>
          <IconButton
            onClick={handleNavigateBack}
            sx={{display: "inline-flex", width: 35, height: 35}}>
            <Iconify icon="ion:chevron-back-outline" width={20}/>
          </IconButton>
          <Typography variant="h3">Tasks</Typography>
        </Stack>
      </Stack>
      { /* ================= filters =========================== */ }
      <Stack flexWrap="wrap" alignItems="center" flexDirection="row" sx={{
        gap: {
          xs: 1,
          sm: 2,
        },
      }}>
         <Stack spacing={1} flexDirection="row" alignItems="center">
            <Typography sx={{fontSize: '16px', fontWeight: "bold"}}>Filter:</Typography>
            <FilterByEntity value={state.entity} handleValue={handleEntity} />
            <FilterByStatus value={state.status} handleValue={handleStatus} />
          </Stack>
         <Stack spacing={1} flexDirection="row" alignItems="center">
           <Typography sx={{ display: {
               xs: 'none',
                sm: 'block',
             }, fontSize: '16px', fontWeight: "bold"}}>Search:</Typography>
           <SearchIcon handleValue={handleSearch}  value={state.search} />
         </Stack>
       </Stack>
      { /* ================= tasks  =========================== */ }
      <CustomErrorAlert error={error} />
      <Stack>
        {subprocessId}
      </Stack>
    </Stack>
  )
}


type SearchIconProps = {
  value: string;
  handleValue: (val: string) => void;
}


export function SearchIcon(
  {
    value,
    handleValue,
  }: SearchIconProps) {
  const popoverSearch = usePopover();
  return (
    <Stack>
      <IconButton sx={{backgroundColor: 'grey.100'}} onClick={popoverSearch.onOpen}>
         <Iconify icon="fluent:search-20-filled" width={20}/>
      </IconButton>
      <CustomPopover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={popoverSearch.open}
        anchorEl={popoverSearch.anchorEl}
        onClose={popoverSearch.onClose}
      >
        <Stack sx={{p:1}}>
          <SearchInput value={value} handleValue={handleValue} placeholder="search tasks..."/>
        </Stack>
      </CustomPopover>
    </Stack>
  )
}


