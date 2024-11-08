import React from 'react';

import { Skeleton, TableRow, TableCell } from '@mui/material';

export type TableSkeletonProps = {
  columnsLength: number;
  rows: number;
};
export const TableSkeleton = ({ columnsLength, rows }: TableSkeletonProps) => (
  <>
    {Array.from({ length: rows }).map((_, index) => (
      <TableRow key={index}>
        {Array.from({ length: columnsLength }).map((__, index2) => (
          <TableCell key={index2}>
            <Skeleton />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </>
);
