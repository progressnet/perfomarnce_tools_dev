import { useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import {SubTitle} from "./components/subTitle";
import { Scrollbar } from "../../components/scrollbar";
import { useGetSubProcessByEntity} from "../../actions/subprocess";

import type {ISubprocessEntity} from "../../actions/subprocess";

export function MyTasksEntitiesView() {
  const [filter, setFilter] = useState('');
  const { subprocesses, isLoading } = useGetSubProcessByEntity(filter);


  return (
    <Stack sx={{
      p: 2, height: '100%',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }} spacing={2}
    >
      <Scrollbar
        sx={{
          overflowY: 'auto',
          height: '100%',
          position: 'relative',
        }}
      >
        <Stack spacing={1} sx={{ flex: 1, overflowX: 'hidden', height: '100%', width: '100%'}}>
          {
            subprocesses.map((item, index) => <EntityItem key={index} item={item} />)
          }
        </Stack>
      </Scrollbar>
    </Stack>
  );
}



type EntityItemProps = {
  item: ISubprocessEntity;
}
export const EntityItem = ({ item }: EntityItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleClick = () => {
    navigate(`${location.pathname}?country=${item.country}&code=${item.countryCode}`);
  }
  return (
    <Stack
      onClick={handleClick}
      spacing={0.5}  sx={{
      cursor: "pointer",
      pl: 2,
      py:1.2,
      borderBottom: "1.4px dashed",
      borderColor: "grey.400",
      userSelect: "none",
    }}>
      <Stack flexDirection="row" spacing={1} alignItems="center">
        <Box
          component="img"
          loading="lazy"
          alt={item.countryCode}
          src={`https://hatscripts.github.io/circle-flags/flags/${item.countryCode.toLowerCase()}.svg`}
          sx={{
            width: '20px',
            height: '20px',
            maxWidth: 'unset',
            objectFit: 'cover',
          }}
        />
        <Typography sx={{fontSize: '16px'}} variant="subtitle1">{item.country}</Typography>
      </Stack>
      <Stack spacing={1} flexDirection="row" alignItems="center">
        <SubTitle text={`${item?.notStarted || 0} Not Started`}/>
         <Divider orientation="vertical"  sx={{ height: '15px'}}/>
        <SubTitle text={`${item?.ongoing || 0} Ongoing`}/>
      </Stack>
    </Stack>
  );
};
