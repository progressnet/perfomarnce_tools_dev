


import {useState} from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import {Iconify} from "../../components/iconify";
import {SearchInput} from "../../components/_local/custom-search-input";
import {usePopover, CustomPopover} from "../../components/custom-popover";
import {ENTITY_OPTIONS, FilterByEntity} from "./components/filterByEntity";
import {FilterByStatus, STATUS_OPTIONS} from "./components/filterByStatus";

import type { StatusProps} from "./components/filterByStatus";
import type { EntityProps} from "./components/filterByEntity";

const TASKS = [
    {
      name: "task name 1",
      status: "Completed",
      entity: "greece",
      assignee: "John Doe",
    }
  ]


export function MyTasksTasksView({id}: {id: number}) {
  // ========================================
  const [state, setState] = useState({
    entity: ENTITY_OPTIONS[1],
    status: STATUS_OPTIONS[1],
    search: '',
  })
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
  // ========================================
  return (
    <Stack  sx={{p: 2}} spacing={0.6}>
      <Stack >
        <Typography variant="h3">Tasks</Typography>
      </Stack>
       <Stack alignItems="center" flexDirection="row" spacing={3}>
         <Stack spacing={1} flexDirection="row" alignItems="center">
            <Typography sx={{fontSize: '16px', fontWeight: "bold"}}>Filter:</Typography>
            <FilterByEntity value={state.entity} handleValue={handleEntity} />
            <FilterByStatus value={state.status} handleValue={handleStatus} />
          </Stack>
         <Stack spacing={1} flexDirection="row" alignItems="center">
           <Typography sx={{fontSize: '16px', fontWeight: "bold"}}>Search:</Typography>
           <SearchIcon handleValue={handleSearch}  value={state.search} />
         </Stack>
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


