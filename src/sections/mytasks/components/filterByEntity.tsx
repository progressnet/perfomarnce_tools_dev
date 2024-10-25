



import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import {usePopover, CustomPopover} from "src/components/custom-popover";

import globe from "../../../../public/assets/planet-earth.png"

export type EntityProps = {
  id: number;
  name: string;
  code: string;

}


export const ENTITY_OPTIONS = [
  {
    id: 1,
    name: "all",
    code: "all"
  }, {
    id: 1,
    name: "greece",
    code: "gr"
  },
  {
    id: 2,
    name: "england",
    code: "gb"
  },
]


export type FilterByEntityProps = {
  value: EntityProps;
  handleValue: (entity: EntityProps) => void;

}

export const FilterByEntity = (
  {
    value,
    handleValue
  }: FilterByEntityProps) => {
  const popover = usePopover();



  const handleChooseEntity = (newEntity: EntityProps ) => {
    handleValue(newEntity)
    popover.onClose();

  }
  const SRC = value.name === "all" ? globe : `https://hatscripts.github.io/circle-flags/flags/${value?.code}.svg`
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
        <Typography sx={{fontSize: '14px', }}>entity:</Typography>
        <Stack spacing={0.5} flexDirection="row" alignItems="center">
          <Box
            component="img"
            loading="lazy"
            alt={value?.code}
            src={SRC}
            sx={{
              width: '17px',
              height: '17px',
              maxWidth: 'unset',
              objectFit: 'cover',
            }}
          />
          <Typography sx={{fontSize:'14px', color: "grey.500"}}>{value.code}</Typography>
        </Stack>
      </Stack>
      <CustomPopover open={popover.open} anchorEl={popover.anchorEl} onClose={popover.onClose}>
        <Stack >
          {ENTITY_OPTIONS.map((option) => (
            <Stack sx={{width: '100%'}} key={option.id} flexDirection="row" alignItems="center">
              <MenuItem sx={{width: '100%'}} key={option.code} value={option.name} onClick={() => handleChooseEntity(option)}>
                <Box
                  component="img"
                  loading="lazy"
                  alt={option.code}
                  src={option.name === "all" ? globe : `https://hatscripts.github.io/circle-flags/flags/${option?.code}.svg`}
                  sx={{
                    width: '20px',
                    height: '20px',
                    maxWidth: 'unset',
                    objectFit: 'cover',
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
