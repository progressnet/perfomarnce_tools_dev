import {useState} from "react";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import {Entities} from "./entities";
import {Processes} from "./processes";


export default function MyTaskContainer() {
  const [tabsValue, setTabsValue] = useState<string>('processes');
  return (
    <Stack spacing={1} flexDirection="row"  sx={{height: 'calc(100vh - 140px)', borderRadius: 2, backgroundColor: 'grey.200', p: 1}}>
      <Stack sx={{
        flex: 2,
        borderRadius: 2,
        backgroundColor: 'white',
      }}>
        <FilterTabs
          value={tabsValue}
          setValue={setTabsValue}
        />
        <Divider/>
        {tabsValue === 'processes' && <Processes/>}
        {tabsValue === 'entities' && <Entities/>}
      </Stack>
      <Stack sx={{
        flex: 3,
        height: '100%',
        borderRadius: 2,
        backgroundColor: 'white',
        p: 1,
      }}>
        2
      </Stack>
    </Stack>
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

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Stack sx={{p:1, px:3}} spacing={2} flexDirection="row" alignItems="center">
      <Typography variant="h5">Filter:</Typography>
      <Tabs
        sx={{
          "& .MuiTab-root": {
            fontSize: '20px',
            color: 'gray',
            "&.Mui-selected": {
              color: 'blue',
            }
          },
          "& .MuiTabs-indicator": {
            bottom: 5,
            backgroundColor: 'blue',
          }
        }}
        value={value}
        onChange={handleChange}
        aria-label="secondary tabs example"
      >
        <Tab value="processes" label="By Processes" />
        <Tab value="entities" label="By Entities" />
      </Tabs>
    </Stack>
  )
}
