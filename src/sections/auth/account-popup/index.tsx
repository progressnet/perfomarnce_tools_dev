import {useNavigate} from "react-router-dom";

import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import { Iconify } from "src/components/iconify";
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import {paths} from "../../../routes/paths";
import { useSSOContext } from "../../../auth/context/sso/sso-context";

export function AccountPopup() {
  const popover = usePopover();
  const { email } = useSSOContext();
  const navigate = useNavigate(); // Use useNavigate for redirection

  const handleLogout = () => {
    // remove usr from localstorage
    localStorage.removeItem("email");
    navigate(paths.auth.sso.signIn);
    popover.onClose();
  }
  return (
    <>
      <Avatar onClick={popover.onOpen}>
        {email ? email[0].toUpperCase(): ""}
      </Avatar>
      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'top-left' } }}
      >
        <Stack sx={{p:1}} spacing={2}>
          <Stack>
            <Typography sx={{ fontSize: '12px' }} variant="subtitle2">
              Email
            </Typography>
            <Typography
              sx={{ fontSize: '11px', color: 'text.secondary' }}
              variant="body2"
            >
              {email}
            </Typography>
          </Stack>
          <MenuList >
            <MenuItem
              onClick={handleLogout}

            >
              <Iconify icon="eva:log-out-outline" sx={{ mr: 1,  }} />
              Logout
            </MenuItem>
          </MenuList>
        </Stack>

      </CustomPopover>
    </>
  );
}
