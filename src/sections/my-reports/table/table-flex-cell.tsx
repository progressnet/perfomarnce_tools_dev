import TableCell from "@mui/material/TableCell";
import { FIRST_COLUMN_WIDTH} from "../config";


type TableCellFlexProps = {
    children: React.ReactNode;
    spacing?: number;
    colSpan?: number;
    sx?: any;
};

export function TableFlexCell({sx, children, spacing = 0, colSpan = 1}:TableCellFlexProps) {
    return (
        <TableCell
          sx={{
            minWidth:FIRST_COLUMN_WIDTH,
            columnGap: spacing,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            ...sx
        }}>
            {children}
        </TableCell>
    )
}
