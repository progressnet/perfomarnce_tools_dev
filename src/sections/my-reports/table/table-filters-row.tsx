import type {SetStateAction} from "react";

import dayjs from "dayjs";
import {toast} from "sonner";
import { useMemo, useState} from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
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
import {FilterOptionAutocomplete, generateFilterData} from "../utils/create-filter-data";
import {useGetExportExcel} from "../../../actions/export-excel";

import {FiltersProps, MapFilterProps} from "../reducer";
import type { Country} from "../../../types/summary-filters";
import type { GenerateFilterDataProps} from "../utils/create-filter-data";
import {ExpandKeys} from "./_index";


export type Filter = {
  id: number;
  name: string;
}


export type TableFiltersRowProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  filter: FiltersProps;
  handleFilter: (type: keyof FiltersProps, value: number | string) => void;
  filtersData: Country[],
  dispatchFilter: React.Dispatch<any>;
  isLoading: boolean;

}

export function TableFiltersRow(
  {
    open,
    setOpen,
    filter,
    handleFilter,
    filtersData,
    dispatchFilter,
    isLoading,
  }: TableFiltersRowProps) {
  const [isSubmit, setIsSubmit] = useState(false);
  const {fileUrl, } = useGetExportExcel({...filter, isSubmit});
  //
  const toggleDrawer = (openDrawer: boolean) => () => {
    setOpen(openDrawer);
  };
  //

  const data = useMemo(() => generateFilterData(filtersData, filter), [filtersData, filter]);

  const handleExportExcel = async () => {
    setIsSubmit(true);
    //
    if(!fileUrl) return;
    try {
      const response = await fetch(`${fileUrl}`);
      if(!response) {
        toast.error('Error exporting excel file')
        setIsSubmit(false);
        return;
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'my-report.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setIsSubmit(false);
    } catch (e) {
        toast.error(e?.message)
    }

  }
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
            onClick={handleExportExcel}
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
        isLoading={isLoading}
        dispatchFilter={dispatchFilter}
        data={data}
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
  handleFilter: (type: keyof FiltersProps, value: number[] | string[]) => void;
  data: GenerateFilterDataProps[];
  dispatchFilter: React.Dispatch<any>;
  isLoading: boolean,
}

//
const FilterDrawer =
  (
    {
      open,
      toggleDrawer,
      filter,
      handleFilter,
      data,
      dispatchFilter
    }: FilterDrawerProps) => {
    const theme = useTheme();

    return (
      <Drawer
        slotProps={{backdrop: {invisible: true}}}
        sx={{[`& .${drawerClasses.paper}`]: {...paper({theme,
              color: varAlpha(theme.vars.palette.background.defaultChannel, 0.9),}),
            width: 360,},}}
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
             <Stack spacing={1} sx={{marginBottom: 2}}>
               <Button variant="contained" onClick={() => dispatchFilter({type: 'RESET_FILTERS'})}>Reset filters</Button>
             </Stack>
            {
              data.map((item: any, index) =>  {

                return (
                  <Autocomplete
                    multiple
                    key={index}
                    options={item.options}
                    getOptionLabel={(option: any) => {
                      return option?.name
                    }}
                    isOptionEqualToValue={(option, value) => option?.name === value?.name}
                    id={`rhf-autocomplete-${index}`}
                    onChange={(event, newValue: FilterOptionAutocomplete[]) =>
                      handleFilter(
                        item.name,
                        newValue.map((value) => value[item.key])
                      )
                    }
                    value={item?.options.filter((option: any) => filter[item.name as ExpandKeys].includes(option[item.key])) }
                    renderInput={(params) => (
                      <TextField
                        label={item.label}
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



