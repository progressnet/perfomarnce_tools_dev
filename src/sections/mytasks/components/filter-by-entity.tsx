import {useState, useEffect} from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import {usePopover, CustomPopover} from "src/components/custom-popover";

import {Iconify} from "../../../components/iconify";
import {useGetLegalEntity} from "../../../actions/legalEntity";

import type { IEntity} from "../../../actions/legalEntity";




export type FilterByEntityProps = {
  value: IEntity| null;
  handleValue: (entity:IEntity| null) => void;

}

export const FilterByEntity = (
  {
    value,
    handleValue
  }: FilterByEntityProps) => {
  const popover = usePopover();
  const {entities} = useGetLegalEntity();
  const filteredEntities = [
    ...new Map(entities.map((entity) => [entity.country, entity])).values(),
  ];
  const [sliced, setSliced] = useState<IEntity[]>(entities.slice(0, 10));
  //
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (entities) {
      setSliced(filteredEntities.slice(0, 20))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entities])


  const handleChooseEntity = (newEntity:IEntity ) => {
    handleValue(newEntity)
    popover.onClose();

  }

  const loadMoreEntities = () => {
    if (!loading && hasMore) {
      setLoading(true);
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        const nextEntities = filteredEntities.slice(nextPage * 10, (nextPage + 1) * 10);
        setHasMore(nextEntities.length > 0);
        setSliced((prev) => [...prev, ...nextEntities]);
        return nextPage;
      });
      setLoading(false);
    }
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    const { scrollHeight, scrollTop, clientHeight } = target;

    // Trigger load more when we're within 100px of the bottom
    if (scrollHeight - scrollTop - clientHeight <= 120) {
      loadMoreEntities(); // Trigger load more when the bottom is reached (with a 100px buffer)
    }
  };

  const SRC =  `https://hatscripts.github.io/circle-flags/flags/${value?.countryCode.toLowerCase()}.svg`
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
        <Typography sx={{fontSize: '14px',fontWeight: 'medium', color: 'text.secondary' }}>entity:</Typography>
        {
          value && (
            <Stack   spacing={2} flexDirection="row" alignItems="center">
              <Stack spacing={0.5} flexDirection="row" alignItems="center">
                <Box
                  component="img"
                  loading="lazy"
                  alt={value?.countryCode}
                  src={SRC}
                  sx={{
                    width: '12px',
                    height: '12px',
                    maxWidth: 'unset',
                    objectFit: 'cover',
                  }}
                />
                <Typography sx={{fontSize:'12px', color: "grey.600"}}>{value?.countryCode}</Typography>
              </Stack>
              <Stack
                onClick={() => handleValue(null)}>
                <Iconify icon="eva:close-circle-fill" color="grey.400"  />
              </Stack>
            </Stack>
          )
        }
      </Stack>
      {/* =========== POPOVER ============= */}
      <CustomPopover    anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }} open={popover.open} anchorEl={popover.anchorEl} onClose={popover.onClose}>
        <Stack
          onScroll={handleScroll}
          sx={{minWidth: '150px', maxHeight: '200px', overflowY: 'scroll'}}
        >
          {sliced.map((option) => (
            <Stack sx={{width: '100%'}} key={option.code} flexDirection="row" alignItems="center">
              <MenuItem sx={{width: '100%'}} key={option.code} value={option.country} onClick={() => handleChooseEntity(option)}>
                <Box
                  component="img"
                  loading="lazy"
                  alt={option.code}
                  src={`https://hatscripts.github.io/circle-flags/flags/${option?.countryCode.toLowerCase()}.svg`}
                  sx={{
                    width: '15px',
                    height: '15px',
                    maxWidth: 'unset',
                    objectFit: 'cover',
                  }}
                />
                <Typography sx={{fontSize: '14px'}} variant="subtitle1">{option.country}</Typography>
              </MenuItem>
            </Stack>
          ))}
        </Stack>
      </CustomPopover>
    </Stack>
  )
}
