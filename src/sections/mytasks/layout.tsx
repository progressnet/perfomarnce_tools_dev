import { useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import {MyTasksTasksView} from "./tasks";
import {MyTasksProcessView} from "./processes";
import {MyTasksEntitiesView} from "./entities";
import {MyTasksSubProcessView} from "./subProcesses";
import {DashboardContent} from "../../layouts/dashboard";
import {useResponsiveWidth} from "../../hooks/use-resize";

const flexProps = { flex: '1 1 auto', display: 'flex', flexDirection: 'column' };


export function MyTasksLayout() {
  const width = useResponsiveWidth();
  const [tabsValue, setTabsValue] = useState<string>('processes');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const subprocessId = Number(searchParams.get('subprocessId'));
  const processId = Number(searchParams.get('id'));
  const country = searchParams.get('country');


  const renderMainView = () => {
    console.log(tabsValue)
    console.log(country)
    const isMobile = width <= 1179;
    if (tabsValue === 'entities') {
      if(isMobile && country) {
        return <MyTasksTasksView />;
      }
      return <MyTasksEntitiesView />;
    }

    if (tabsValue === 'processes') {

      if (isMobile) {
        if (subprocessId) return <MyTasksTasksView />;
        if (processId) return <MyTasksSubProcessView />;
      } else {
        if (processId) return <MyTasksSubProcessView />;
        if (subprocessId) return <MyTasksTasksView />;
      }

      return <MyTasksProcessView />;
    }

    return null;
  };

  const isMyTasks =  subprocessId || country
  return (
    <DashboardContent maxWidth="xl" sx={{ ...flexProps }}>
      <Stack
        spacing={1}
        flexDirection="row"
        sx={{height: 'calc(100vh - 150px)',
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
          {renderMainView()}
        </Stack>
        <Stack sx={{
          display: { xs: 'none', lg: 'flex' },
          flex: 3,
          height: '100%',
          borderRadius: 2,
          backgroundColor: isMyTasks ? 'white' : 'transparent',
        }}>
          {subprocessId > 0 && width >= 1180 && <MyTasksTasksView />}
          {country && width >= 1180 && <MyTasksTasksView />}
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

  const location = useLocation();
  const navigate = useNavigate();


  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(location.pathname)

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
