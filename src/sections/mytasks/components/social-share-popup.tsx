import {useState} from "react";
import {ShareSocial} from "react-share-social";

import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";

import {Iconify} from "../../../components/iconify";


export function SocialSharePopup({url }: {url: string}) {
  const [open, setOpen] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
        <>
          <IconButton onClick={handleClickOpen}>
             <Iconify icon="fa:share-alt" />
          </IconButton>
          <Dialog
            maxWidth="lg"
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
              <ShareSocial
                url={url}
                socialTypes={['viber','twitter','linkedin','facebook','whatsapp','email']}
              />
          </Dialog>
        </>
    )
}
