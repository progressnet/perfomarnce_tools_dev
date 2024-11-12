import type { Theme, SxProps } from "@mui/system";

import * as React from "react";

import { TableCell } from "@mui/material";

type EmptyCellProps = {
  sx?: SxProps<Theme>;
};

export const EmptyCell = ({ sx }: EmptyCellProps) => (
  <TableCell sx={{ textAlign: 'center', color: 'grey.400' }}>---</TableCell>
);
