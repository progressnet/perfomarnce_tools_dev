import type { ReactNode} from "react";

import {memo} from "react";
import * as React from "react";

import Stack from "@mui/material/Stack";
import {alpha, TableRow} from "@mui/material";
import Typography from "@mui/material/Typography";

import {TableSumCell} from "./table-sum-cell";
import {TableFlexCell} from "./table-flex-cell";
import {TableHoursCell} from "./table-hours-cell";
import {Iconify} from "../../../components/iconify";
import {CELL_BOX_SHADOW, CELL_BORDER_RIGHT} from "../config";

import type {IDateColumn} from "./_types";

export type ExpandableRowProps = {
  children: ReactNode;
  isExpanded?: boolean;
  shouldExpand?: boolean;
  item: any;
  dateColumns: IDateColumn[];
  mapKey: string;
  color: string;
  handleExpandChild: () => void;
  paddingLeft?: number;
  show: boolean;
}

export const ExpandableRow = memo((
  {
    children,
    item,
    dateColumns,
    isExpanded,
    mapKey,
    color,
    handleExpandChild,
    paddingLeft = 0,
    shouldExpand = true,
    show
  }: ExpandableRowProps) => {
  if(!show) return null;
  return (
    <TableRow>
      <TableFlexCell sx={{
        paddingLeft,
        cursor: 'pointer',
        position: 'sticky',
        borderRight: CELL_BORDER_RIGHT,
        boxShadow: CELL_BOX_SHADOW,
        top: 0,
        left: 0,
        zIndex: 10,
        backgroundColor: 'white',
      }}>
        <Stack
          onClick={handleExpandChild}
          flexDirection="row"
          spacing={1}
          alignItems="center"
        >

          {shouldExpand && <Iconify color={alpha(color, 0.6)} icon={isExpanded ? "mingcute:down-fill" : "mingcute:up-fill"} />}
          <Stack flexDirection="row" alignItems="center" spacing={0.5}>
            {!shouldExpand && <Iconify icon="material-symbols-light:person" color={color} />}
            <Typography sx={{maxWidth: 140}}>{children}</Typography>
          </Stack>
        </Stack>
        <TableSumCell color={color}>
          {item.totalHours}
        </TableSumCell>
      </TableFlexCell>
      {dateColumns.map((dateColumn, cntIndex) => {
        const hours = item.dateHours[dateColumn.id] || 0;
        return (
          <TableHoursCell color={color} key={`${item[mapKey]}-${cntIndex}`}>
            {hours}
          </TableHoursCell>
        );
      })}
    </TableRow>
  );
});
