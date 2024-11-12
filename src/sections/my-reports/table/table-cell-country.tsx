import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import {Iconify} from "../../../components/iconify";

type TableCellCountryProps = {
    code: string;
    width?: number;
    country: string;
    isExpanded: boolean;
    handleExpanded: (value: any) => void;
};


export function TableCellCountry({ code, width =18, country, isExpanded, handleExpanded }: TableCellCountryProps) {


    const SRC =  `https://hatscripts.github.io/circle-flags/flags/${code?.toLowerCase()}.svg`
    return (
        <Box sx={{
            minWidth: '150px',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            columnGap: 0.5,
        }}>
           <Stack flexDirection="row" alignItems="center" spacing={0.8}>
               <Box
                   component="img"
                   loading="lazy"
                   alt={code}
                   src={SRC}
                   sx={{
                       width: `${width}px`,
                       height:`${width}px`,
                       maxWidth: 'unset',
                       objectFit: 'cover',
                   }}
               />
               <Typography sx={{fontSize: '14px'}}>{country}</Typography>
           </Stack>
            <IconButton onClick={handleExpanded}>
                <Iconify icon={isExpanded ? "mingcute:down-fill" : "mingcute:up-fill"} />
            </IconButton>
        </Box>
    )
}
