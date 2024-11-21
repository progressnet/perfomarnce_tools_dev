import type {SetStateAction} from "react";

import dayjs from "dayjs";
import * as React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import {useTheme} from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {formHelperTextClasses} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import Drawer, {drawerClasses} from "@mui/material/Drawer";

import {Iconify} from "../../../components/iconify";
import {paper, varAlpha} from "../../../theme/styles";
import {createFilterData} from "../utils/create-filter-data";

import type { Country} from "../../../types/summary-filters";


export type Filter = {
  id: number;
  name: string;
}
export type FiltersProps = {
  start: string;
  end: string;
  process: Filter | null;
  subprocess: Filter | null;
  entity: Filter | null;
  country: Filter | null;
  task: Filter | null;

}

export type TableFiltersRowProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  filter: FiltersProps;
  handleFilter: (type: string, value: any) => void;
  filtersData: Country[],
}

export function TableFiltersRow(
  {
    open,
    setOpen,
    filter,
    handleFilter,
    filtersData,
  }: TableFiltersRowProps) {
  //
  const toggleDrawer = (openDrawer: boolean) => () => {
    setOpen(openDrawer);
  };
  //


  return (
    <Stack  padding={2}>
      <Stack flexDirection="row" spacing={2} alignItems="center" justifyContent="space-between">
        <Stack flexDirection="row" spacing={2}>
          <DatePicker
            label="Start date"
            value={dayjs(filter.start)}
            onChange={(date) => handleFilter('start', dayjs(date).format('YYYY-MM-DD'))}
            slotProps={{
              textField: {
                fullWidth: true,
              },
            }}
            sx={{
              maxWidth: {md: 200},
            }}
          />
          <DatePicker
            label="End date"
            value={dayjs(filter.end)}
            onChange={(date) => handleFilter('end', dayjs(date).format('YYYY-MM-DD'))}
            slotProps={{
              textField: {
                fullWidth: true,
                helperText: false,
              },
            }}
            sx={{
              maxWidth: {md: 200},
              [`& .${formHelperTextClasses.root}`]: {
                position: {md: 'absolute'},
                bottom: {md: -40},
              },
            }}
          />
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <IconButton onClick={toggleDrawer(true)}>
              <Iconify icon="rivet-icons:filter"/>
            </IconButton>
          </Box>
        </Stack>
        <Stack>
          <IconButton
            onClick={() => console.log('download')}
            sx={{
            backgroundColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}>
            <Iconify  color="white" icon="material-symbols:file-export"/>
          </IconButton>
        </Stack>
      </Stack>
      <FilterDrawer
        filtersData={filtersData}
        open={open}
        toggleDrawer={toggleDrawer}
        filter={filter}
        handleFilter={handleFilter}/>
    </Stack>
  )
}


type FilterDrawerProps = {
  open: boolean;
  toggleDrawer: (open: boolean) => () => void;
  filter: FiltersProps;
  handleFilter: (type: string, value: any) => void;
  filtersData: Country[];
}
const FilterDrawer =
  (
    {
      open,
      toggleDrawer,
      filter,
      handleFilter,
      filtersData,
    }: FilterDrawerProps) => {
    const {countries, entities, masterProcesses, subProcesses, tasks, agents} = createFilterData(filtersData || []);
    const data = [
      { key: 'name', label: 'Countries', name: 'countries',  options: countries },
      {key: 'name', label: 'Entities', name: 'entities', options: entities },
      {key: 'id', label: 'Master Processes', name:' masterProcess', options: masterProcesses },
      {key: 'id', label: 'Sub Processes',  name:'subProcess', options: subProcesses },
    ];
    console.log({countries})
    const theme = useTheme();
    return (
      <Drawer
        slotProps={{backdrop: {invisible: true}}}
        sx={{
          [`& .${drawerClasses.paper}`]: {
            ...paper({
              theme,
              color: varAlpha(theme.vars.palette.background.defaultChannel, 0.9),
            }),
            width: 360,
          },
        }}
        anchor="right" open={open} onClose={toggleDrawer(false)}
      >
        <Stack>
          <Stack flexDirection="row" alignItems="center" justifyContent="space-between" padding={2}>
            <Typography variant="h6">Filters</Typography>
            <Stack>
              <IconButton onClick={toggleDrawer(false)}>
                <Iconify icon="mingcute:close-fill"/>
              </IconButton>
            </Stack>
          </Stack>
          <Divider/>
          <Stack padding={2} spacing={2}>
            {
              data.map((item: any, index) =>  {
                return (
                  <Autocomplete
                    key={index}
                    options={item.options}
                    getOptionLabel={(option: any) => option.name}
                    id={`rhf-autocomplete-${index}`}
                    onChange={(event, newValue) => handleFilter(item.label.toLowerCase(), newValue[item.key])}
                    value={filter[item.name]}
                    renderInput={(params) => (
                      <TextField
                        label={item.label}
                        inputProps={{ ...params.inputProps, autoComplete: 'new-password' }}
                        {...params}
                      />
                    )}
                  />
                )
              })
            }
          </Stack>
        </Stack>
      </Drawer>
    )
  }



