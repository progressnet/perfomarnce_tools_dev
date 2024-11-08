import {useState, useEffect, useCallback} from 'react';
import {useLocation, useNavigate} from "react-router-dom";

import {alpha} from "@mui/material";
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import {useTheme} from '@mui/material/styles';
import Typography from "@mui/material/Typography";

import {NavList} from './nav-list';
import {Iconify} from "../../iconify";
import {paths} from "../../../routes/paths";
import {navSectionClasses} from '../classes';
import {navSectionCssVars} from '../css-vars';
import {NavUl, NavLi, Subheader} from '../styles';
import { useGetProcess} from "../../../actions/process";

import type {IProcess} from "../../../actions/process";
import type {NavGroupProps, NavSectionProps} from '../types';

// ----------------------------------------------------------------------

export function NavSectionVertical(
  {
    sx,
    data,
    render,
    slotProps,
    enabledRootRedirect,
    cssVars: overridesVars,
  }: NavSectionProps) {
  const theme = useTheme();
  // ==== CLOSING DASHBOARD CONTENT ======
  // ===== fetch processes =====
  const {processes} = useGetProcess();
  const navigate = useNavigate();
  const cssVars = {
    ...navSectionCssVars.vertical(theme),
    ...overridesVars,
  };


  const [open, setOpen] = useState(true);
  const location = useLocation();
  const [active, setActive] = useState<number | null>(null);
  const handleToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if(location.pathname !== paths.dashboard.myTasks) {
      setActive(null)
    }
  }, [location])


  const handleNavClick = (item: IProcess) => {
    navigate(`${paths.dashboard.myTasks}?id=${item.id}&processName=${item.processName}&numberOfSubprocesses=${item.numberOfSubprocesses}`)
    setActive(item.id);
  }

  const renderContent = () => {
    return processes.map((proc, index) => (
      <Stack
        onClick={() => handleNavClick(proc)}
        key={index}

        sx={{
          mx: 1,
          p:0.5,
          borderBottom: "1.4px dashed",
          borderColor: "grey.400",
          userSelect: "none",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            p: 1,
            borderRadius: 1,
            width: '100%',
            color: active === proc.id ? theme.palette.primary.main : "inherit",
            backgroundColor: active === proc.id ? alpha(theme.palette.primary.main, 0.1): "transparent"
          }}>
          <Stack>
            <Typography variant="subtitle2">{proc.processName}</Typography>
            <Typography
              sx={{
                whiteSpace: 'nowrap',
                color: active === proc.id ? alpha(theme.palette.primary.main, 0.7) : "text.secondary",
                fontSize: '12px',
                fontWeight: 'medium'
              }}
            >
              {proc.numberOfSubprocesses} Sub-Processes
            </Typography>
          </Stack>
          <Stack sx={{ minWidth: '40px' }}>
            <Iconify icon="mingcute:right-fill" color="grey.500" />
          </Stack>
        </Stack>

      </Stack>
    ));
  };
  return (
    <Stack component="nav" className={navSectionClasses.vertical.root} sx={{...cssVars, ...sx}}>
      <NavUl sx={{flex: '1 1 auto', gap: 'var(--nav-item-gap)'}}>
        {data.map((group) => (
          <Group
            key={group.subheader ?? group.items[0].title}
            subheader={group.subheader}
            items={group.items}
            render={render}
            slotProps={slotProps}
            enabledRootRedirect={enabledRootRedirect}
          />
        ))}
        <Stack>
          <>
            <Subheader
              data-title='CLOSING DASHBOARD'
              open={open}
              onClick={handleToggle}
              sx={slotProps?.subheader}
            >
              CLOSING DASHBOARD
            </Subheader>
            <Collapse in={open}>{renderContent()}</Collapse>
          </>

        </Stack>
      </NavUl>
    </Stack>
  );
}

// ----------------------------------------------------------------------

function Group({items, render, subheader, slotProps, enabledRootRedirect}: NavGroupProps) {
  const [open, setOpen] = useState(true);

  const handleToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const renderContent = (
    <NavUl sx={{gap: 'var(--nav-item-gap)'}}>
      {items.map((list) => (
        <NavList
          key={list.title}
          data={list}
          render={render}
          depth={1}
          slotProps={slotProps}
          enabledRootRedirect={enabledRootRedirect}
        />
      ))}
    </NavUl>
  );

  return (
    <NavLi>
      {subheader ? (
        <>
          <Subheader
            data-title={subheader}
            open={open}
            onClick={handleToggle}
            sx={slotProps?.subheader}
          >
            {subheader}
          </Subheader>

          <Collapse in={open}>{renderContent}</Collapse>
        </>
      ) : (
        renderContent
      )}
    </NavLi>
  );
}
