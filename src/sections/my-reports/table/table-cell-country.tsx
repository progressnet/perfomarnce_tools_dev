import Box from "@mui/material/Box";
import {alpha} from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import {FIRST_CELL_WIDTH} from "../config";
import {Iconify} from "../../../components/iconify";

type TableCellCountryProps = {
    code: string;
    width?: number;
    country: string;
    isExpanded: boolean;
    handleExpanded: (value: any) => void;
    color: string;
};


export function TableCellCountry({color, code, width =18, country, isExpanded, handleExpanded }: TableCellCountryProps) {
    const SRC =  `https://hatscripts.github.io/circle-flags/flags/${code?.toLowerCase()}.svg`
    return (
        <Box
          onClick={handleExpanded}
          sx={{
            minWidth: FIRST_CELL_WIDTH,
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            columnGap: 1.4,
        }}>
            <Iconify color={alpha(color, 0.6)} icon={isExpanded ? "mingcute:down-fill" : "mingcute:up-fill"} />
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
        </Box>
    )
}
