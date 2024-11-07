import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import {usePopover, CustomPopover} from "src/components/custom-popover";
import {Iconify} from "../../../components/iconify";


export type StatusProps = {
  id: number;
  name: string;

}


export const STATUS_OPTIONS = [
  {
    id: 1,
    name: "Not Started",
  }, {
    id: 2,
    name: "Ongoing",
  },

]


export type FilterByEntityProps = {
  value: StatusProps | null;
  handleValue: (status: StatusProps | null) => void;

}

export const FilterByStatus = (
  {
    value,
    handleValue,
  }: FilterByEntityProps) => {
  const popover = usePopover();


  const handleChange = (newEntity: StatusProps) => {
    handleValue(newEntity)
    popover.onClose();

  }

  const handleRemove = () => {
    handleValue(null)
    popover.onClose();
  }
  const color = getStatusColor(value?.name || "");

  return (
    <Stack>
      <Stack
        spacing={1}
        sx={{
          cursor: 'pointer',
          border: "1px dashed",
          borderColor: 'grey.400',
          borderRadius: 1,
          padding: '5px 8px'
        }}
        flexDirection="row"
        alignItems="center"
        onClick={popover.onOpen}
      >
        <Typography sx={{fontSize: '14px', fontWeight: 'medium', color: 'text.secondary'}}>status:</Typography>
        {value && (
          <Stack spacing={2} flexDirection="row" alignItems="center">
            <Stack spacing={0.5} flexDirection="row" alignItems="center">
              <Box
                component="span"
                sx={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: color,
                  borderRadius: '50%'
                }}
              />
              <Typography sx={{fontSize: '12px', color: "grey.500"}}>{value?.name}</Typography>
            </Stack>
            <Stack
              onClick={handleRemove}>
              <Iconify icon="eva:close-circle-fill" color="grey.400"/>
            </Stack>
          </Stack>

        )}
      </Stack>
      <CustomPopover open={popover.open} anchorEl={popover.anchorEl} onClose={popover.onClose}>
        <Stack>
          {STATUS_OPTIONS.map((option) => (
            <Stack sx={{width: '100%'}} key={option?.id} flexDirection="row" alignItems="center">
              <MenuItem sx={{width: '100%'}} key={option?.id} value={option?.name} onClick={() => handleChange(option)}>
                <Box
                  component="span"
                  sx={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: getStatusColor(option?.name),
                  }}
                />
                <Typography sx={{fontSize: '15px'}} variant="subtitle1">{option?.name}</Typography>
              </MenuItem>
            </Stack>
          ))}
        </Stack>
      </CustomPopover>
    </Stack>
  )
}


const getStatusColor = (statusName: string) => {
  switch (statusName) {
    case "Not Started":
      return "orange";
    case "Ongoing":
      return "#11abbf";
    case "Completed":
      return "green";
    default:
      return "grey";
  }
};
