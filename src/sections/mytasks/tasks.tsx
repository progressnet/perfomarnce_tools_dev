import {useState} from "react";
import {useLocation} from "react-router";
import {useNavigate} from "react-router-dom";

import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TablePagination from "@mui/material/TablePagination";

import {SubTitle} from "./components/subTitle";
import {Iconify} from "../../components/iconify";
import {Scrollbar} from "../../components/scrollbar";
import {TasksDrawer} from "./components/task-drawer";
import {ITask, useGetTaskByFilter} from "../../actions/task";
import {getSubProcessUrl} from "../../utils/buildURLparams";
import {CustomErrorAlert} from "../../components/custom-alert";
import {SocialSharePopup} from "./components/social-share-popup";
import {SearchInput} from "../../components/_local/custom-search-input";
import {usePopover, CustomPopover} from "../../components/custom-popover";
import {ENTITY_OPTIONS, FilterByEntity} from "./components/filter-by-entity";
import {FilterByStatus, STATUS_OPTIONS} from "./components/filter-by-status";

import type {StatusProps} from "./components/filter-by-status";
import type {EntityProps} from "./components/filter-by-entity";


export function MyTasksTasksView() {
  const location = useLocation();
  const currentUrl = new URL(window.location.href);


  const navigate = useNavigate();
  const {
    id,
    processName,
    numberOfSubprocesses,
    subprocessId
  } = Object.fromEntries(new URLSearchParams(location.search));
  // ============================= STATE ===========================
  const [activeTask, setActiveTask] = useState<any>(null);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [state, setState] = useState({
    entity: ENTITY_OPTIONS[1],
    status: STATUS_OPTIONS[1],
    search: '',
    page: 0,
    rowsPerPage: 10,
  })
  // ============================= FETCH DATA SWR ===========================
  const {tasks, error, totalRecords} = useGetTaskByFilter(
    state.page,
    state.rowsPerPage,
    Number(subprocessId)
  );
  // =============================== FILTERS ===============================
  const handleStatus = (val: StatusProps) => {
    setState(prev => ({...prev, status: val}))
  }
  const handleSearch = (val: string) => {
    setState(prev => ({...prev, search: val}))
  }
  const handleEntity = (val: EntityProps) => {
    setState(prev => ({...prev, entity: val}))
  }
  // =============================== BACK ===============================
  const handleNavigateBack = () => {
    const url = getSubProcessUrl({
      id,
      processName,
      numberOfSubprocesses,
    })
    navigate(url)
  }
  // =============================== PAGINATION ===============================
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setState(prev => ({...prev, page: newPage}));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setState(prev => ({...prev, page: 0, rowsPerPage: parseInt(event.target.value, 10)}));
  };
  // ================================== TASKS DRAWER ===========================
  const handleOpenDrawer = (newTask: ITask) => {
    setActiveTask(newTask)
    setOpenDrawer(true);
  }
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  }
  return (
    <Stack sx={{p: 2, height: '100%'}} spacing={0.6} >
      <Stack spacing={2}>
        { /* ================= tasks header =========================== */}
        <Stack flexDirection="row" alignItems="center" justifyContent="space-between" spacing={1}>
          <Stack flexDirection="row" alignItems="center" spacing={1}>
            <IconButton
              onClick={handleNavigateBack}
              sx={{display: "inline-flex", width: 35, height: 35}}>
              <Iconify icon="ion:chevron-back-outline" width={20}/>
            </IconButton>
            <Typography variant="h3">Tasks</Typography>
          </Stack>
          <Stack>
          <SocialSharePopup url={`${currentUrl.href}${currentUrl.search}`}/>
          </Stack>
        </Stack>
        { /* ================= filters =========================== */}
        <Stack flexWrap="wrap" alignItems="center" flexDirection="row" sx={{
          gap: {
            xs: 1,
            sm: 2,
          },
        }}>
          <Stack spacing={1} flexDirection="row" alignItems="center">
            <Typography sx={{fontSize: '16px', fontWeight: "bold"}}>Filter:</Typography>
            <FilterByEntity value={state.entity} handleValue={handleEntity}/>
            <FilterByStatus value={state.status} handleValue={handleStatus}/>
          </Stack>
          <Stack spacing={1} flexDirection="row" alignItems="center">
            <Typography sx={{
              display: {
                xs: 'none',
                sm: 'block',
              }, fontSize: '16px', fontWeight: "bold"
            }}>Search:</Typography>
            <SearchIcon handleValue={handleSearch} value={state.search}/>
          </Stack>
        </Stack>
      </Stack>
      { /* ================= tasks  =========================== */}
        <Scrollbar
          sx={{
            mt: 2,
            overflowY: 'auto',
          }}
        >
          {
            tasks.map((task: any, index: number) => (
              <Stack
                onClick={() => handleOpenDrawer(task)}
                key={index}
                flexDirection="row"
                width="100%"
                alignItems="center"
                sx={{cursor: "pointer", borderBottom: "1.4px dashed", borderColor: "grey.400"}}
              >
                <Stack sx={{flex: 1, p: 2, justifyContent: "center"}}>
                  <Typography
                    sx={{fontSize: '15px', maxWidth: '400px'}}
                    variant="subtitle1">
                    {task.taskName}
                  </Typography>
                  <Stack sx={{mt: 0.5}} spacing={1} flexDirection="row" alignItems="center">
                    <SubTitle text={`Status: ${task?.status} `}/>
                    <Divider orientation="vertical" sx={{height: '15px'}}/>
                    <SubTitle text={` Entity: ${task?.leCode}`}/>
                  </Stack>
                </Stack>
                <Stack sx={{minWidth: '40px'}}>
                  <Iconify icon="mingcute:right-fill" color="grey.500"/>
                </Stack>
              </Stack>
            ))
          }
        </Scrollbar>
      <CustomErrorAlert error={error}/>
      <TablePagination
        sx={{height: 'auto', overflow: 'hidden'}}
        component="div"
        count={totalRecords}
        page={state.page}
        onPageChange={handleChangePage}
        rowsPerPage={state.rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <TasksDrawer task={activeTask} open={openDrawer} onClose={handleCloseDrawer} />
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
        <Stack sx={{p: 1}}>
          <SearchInput value={value} handleValue={handleValue} placeholder="search tasks..."/>
        </Stack>
      </CustomPopover>
    </Stack>
  )
}


