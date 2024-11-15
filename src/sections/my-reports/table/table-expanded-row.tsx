import type { ReactNode} from "react";

import {memo} from "react";
import * as React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {alpha, TableRow} from "@mui/material";
import IconButton from "@mui/material/IconButton";

import {TableSumCell} from "./table-sum-cell";
import {TableFlexCell} from "./table-flex-cell";
import {TableHoursCell} from "./table-hours-cell";
import {Iconify} from "../../../components/iconify";

import type {IDateColumn} from "./_types";
import {CELL_BORDER_RIGHT, CELL_BOX_SHADOW} from "../config";

export type ExpandableRowProps = {
  children: ReactNode;
  isExpanded: boolean;
  shouldExpand?: boolean;
  item: any;
  dateColumns: IDateColumn[];
  mapKey: string;
  color: string;
  handleExpandChild: () => void;
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
    shouldExpand = true
  }: ExpandableRowProps) => {
  if(!isExpanded) return null;
  return (
    <TableRow>
      <TableFlexCell sx={{
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
          spacing={2}
          alignItems="center"
        >
          {shouldExpand && <Iconify color={alpha(color, 0.6)} icon={isExpanded ? "mingcute:down-fill" : "mingcute:up-fill"} />}
          <Stack spacing={1} flexDirection="row" alignItems="center">
            <Box
              sx={{
                minWidth: '10px',
                minHeight: '10px',
                backgroundColor: alpha(color, 0.1),
                borderRadius: '50%',
                border: '1px solid',
                borderColor: color,
              }}
            />
            {children}
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
