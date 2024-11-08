import type * as React from 'react';

import type { useTable } from './use-table';

export interface TableColumn<T = any> {
  id: string;
  label: string;
  width?: string | number;
  maxWidth?: string | number;
  minWidth?: string | number;
  render: (row: T, actionHandlers?: any) => React.ReactNode;
  sort?: boolean;
  sortName?: string;
}

// Props for the custom reusable table component
export interface CustomReusableTableProps<T = any> {
  data: T[];
  table: ReturnType<typeof useTable>;
  columns: TableColumn<T>[];
  toolbar?: React.ReactElement;
  cellPadding?: React.CSSProperties['padding'];
  onDeleteRows?: (rows: number[]) => void;
  actionHandlers?: any;
  total?: number;
  loading?: boolean;
  checkboxSelection?: boolean;
}

// Props for the table header component
export interface TableHeaderProps<T = any> {
  labels: TableColumn<T>[];
  data: T[];
  table: ReturnType<typeof useTable>;
  checkboxSelection?: boolean;
}

export type TableSelectedRowsActionProps = {
  table: ReturnType<typeof useTable>;
  data: any[];
  onDeleteRows?: (rows: number[]) => void;
};

export type TableProps = {
  dense: boolean;
  filter: string;
  rowsPerPage: number;
  page: number;
  selected: number[];
  onSelectRow: (id: number) => void;
  onSelectAllRows: (checked: boolean, newSelected: number[]) => void;
  onChangeDense: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setDense: React.Dispatch<React.SetStateAction<boolean>>;
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
  //
  onChangeRows: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePage: (page: number) => void;
  onChangeFilter: (filter: string) => void;
  //
  onSortChange: (columnId: string) => void;
  sortConfig: Record<string, number>;
  setSortConfig: React.Dispatch<React.SetStateAction<Record<string, number>>>;
};
