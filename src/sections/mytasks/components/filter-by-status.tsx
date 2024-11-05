



import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import {usePopover, CustomPopover} from "src/components/custom-popover";


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
  {
    id: 3,
    name: "Completed",
  },
]


export type FilterByEntityProps = {
  value: StatusProps ;
  handleValue: (entity: StatusProps ) => void;

}

export const FilterByStatus = (
  {
    value,
    handleValue,
  }: FilterByEntityProps) => {
  const popover = usePopover();



  const handleChange = (newEntity: StatusProps ) => {
    handleValue(newEntity)
    popover.onClose();

  }
  const color = getStatusColor(value.name);

  return (
    <Stack >
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
        <Typography sx={{fontSize: '14px', }}>status:</Typography>
        <Stack spacing={0.5} flexDirection="row" alignItems="center">
          <Box
            component="span"
            sx={{
              width: '14px',
              height: '14px',
              backgroundColor: color,
              borderRadius: '50%'
            }}
          />
          <Typography sx={{fontSize:'14px', color: "grey.500"}}>{value.name}</Typography>
        </Stack>
      </Stack>
      <CustomPopover open={popover.open} anchorEl={popover.anchorEl} onClose={popover.onClose}>
        <Stack >
          {STATUS_OPTIONS.map((option) => (
            <Stack sx={{width: '100%'}} key={option.id} flexDirection="row" alignItems="center">
              <MenuItem sx={{width: '100%'}} key={option.id} value={option.name} onClick={() =>handleChange(option)}>
                <Box
                  component="span"
                  sx={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    backgroundColor: getStatusColor(option.name),
                  }}
                />
                <Typography variant="subtitle1">{option.name}</Typography>
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
