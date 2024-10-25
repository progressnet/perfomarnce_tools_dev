import { useState} from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import {paths} from "../../routes/paths";
import {DashboardContent} from "../../layouts/dashboard";
import {MyTasksTasksView} from "./tasks";
import {useResponsiveWidth} from "../../hooks/use-resize";
import {useResponsive} from "../../hooks/use-responsive";

const flexProps = { flex: '1 1 auto', display: 'flex', flexDirection: 'column' };


export function MyTasksLayout() {
  const width = useResponsiveWidth();
  const responsive = useResponsive("only", "md", "xl");
  const [tabsValue, setTabsValue] = useState<string>('processes');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const subprocessId = Number(searchParams.get('subprocessId'));


  console.log('width', width)
  console.log('responsive', responsive)
  const condition = responsive && subprocessId && subprocessId !== 0
  return (
    <DashboardContent maxWidth="xl" sx={{ ...flexProps }}>
      <Stack
        spacing={1}
        flexDirection="row"
        sx={{height: 'calc(100vh - 140px)',
          borderRadius: 2,
          backgroundColor: 'grey.200',
          p: 1,
          overflow: "hidden"
      }}>
        <Stack sx={{
          flex: 2,
          overflow: "hidden",
          borderRadius: 2,
          backgroundColor: 'white',
        }}>

          <FilterTabs
            value={tabsValue}
            setValue={setTabsValue}
          />
          <Divider/>
          <Outlet />
        </Stack>
        <Stack sx={{
          display: { xs: 'none', lg: 'flex' },
          flex: 3,
          height: '100%',
          borderRadius: 2,
          backgroundColor: subprocessId ? 'white' : 'transparent',
        }}>
          {(subprocessId && subprocessId > 0) ? <MyTasksTasksView id={subprocessId} /> : null}
        </Stack>
      </Stack>
    </DashboardContent>
  )
}


export type FilterTabsProps = {
  value: string;
  setValue: (value: string) => void;

}

export const FilterTabs = (
  {
    value,
    setValue,
  }: FilterTabsProps) => {
  const navigate = useNavigate()


  const handleChange = (event: React.SyntheticEvent, newValue: string) => {

    setValue(newValue);
    if(newValue === 'processes') navigate(paths.dashboard.myTasks.process)
    if(newValue === 'entities') navigate(paths.dashboard.myTasks.entities)
  };

  return (
    <Stack sx={{p:1, px:3}} spacing={2} flexDirection="row" alignItems="center">
      <Typography variant="h5">Filter:</Typography>
      <Tabs
        sx={{
          "& .MuiTab-root": {
            fontSize: '18px',
            color: 'gray',
            "&.Mui-selected": {
              color: 'blue',
            },
          },
          "& .MuiTabs-indicator": {
            bottom: 9,
            backgroundColor: 'blue',
          }
        }}
        value={value}
        onChange={handleChange}
        aria-label="secondary tabs example"
      >
        <Tab value="processes" label="By Processes"  />
        <Tab value="entities" label="By Entities" />
      </Tabs>
    </Stack>
  )
}
