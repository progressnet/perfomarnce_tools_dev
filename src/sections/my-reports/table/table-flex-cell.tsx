import TableCell from "@mui/material/TableCell";


type TableCellFlexProps = {
    children: React.ReactNode;
    spacing?: number;
    colSpan?: number;
};

export function TableFlexCell({children, spacing = 2, colSpan = 1}:TableCellFlexProps) {
    return (
        <TableCell colSpan={colSpan} sx={{ columnGap: spacing, display: 'flex', flexDirection: 'row'}}>
            {children}
        </TableCell>
    )
}
