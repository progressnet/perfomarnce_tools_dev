import * as React from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import IconButton from '@mui/material/IconButton';

import { Iconify } from '../iconify';
import { ConfirmDialog } from '../custom-dialog';
import { usePopover, CustomPopover } from '../custom-popover';

export type Action = {
  icon: string;
  label: string;
  color?: string;
  onClick: () => void;
  isDelete?: boolean;
};

type TableActionsRowsProps = {
  actions: Action[];
};

export function TableRowActions({ actions }: TableActionsRowsProps) {
  const popover = usePopover();

  return (
    <>
      <Stack direction="row" justifyContent="end">
        <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </Stack>
      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          {actions.map((action, index) => (
            <Stack key={index}>
              {action.isDelete ? (
                <MenuItemDelete
                  onClick={action.onClick}
                  color={action.color || 'error'}
                  label={action.label}
                  icon={action.icon}
                  onClosePopover={popover.onClose}
                />
              ) : (
                <Item
                  onClick={() => {
                    action.onClick();
                    popover.onClose(); // Close popover after action
                  }}
                  color={action.color || 'primary'}
                  label={action.label}
                  icon={action.icon}
                />
              )}
            </Stack>
          ))}
        </MenuList>
      </CustomPopover>
    </>
  );
}

type ItemProps = {
  onClick: () => void;
  color: string;
  label: string;
  icon: string;
};

const Item = ({ onClick, color, label, icon }: ItemProps) => (
  <MenuItem onClick={onClick} sx={{ color }}>
    <Iconify icon={icon} />
    {label}
  </MenuItem>
);

type MenuItemDeleteProps = {
  onClick: () => void;
  color: string;
  label: string;
  icon: string;
  onClosePopover: () => void;
};

const MenuItemDelete = ({ onClick, color, label, icon, onClosePopover }: MenuItemDeleteProps) => {
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  const handleDelete = () => {
    onClick();
    setOpenDialog(false);
    onClosePopover(); // Close the popover after action
  };

  return (
    <>
      <MenuItem onClick={() => setOpenDialog(true)} sx={{ color }}>
        <Iconify icon={icon} />
        {label}
      </MenuItem>
      <ConfirmDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        title="Διαγραφή"
        content={<>Σίγουρα θέλετε να διαγράψετε αυτή τη γραμμή;</>}
        action={
          <Button onClick={handleDelete} variant="contained" color="error">
            Διαγραφή
          </Button>
        }
      />
    </>
  );
};
