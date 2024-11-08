import { useState, useCallback } from 'react';

import type { TableProps } from './_types';

// ----------------------------------------------------------------------

export type UseTableProps = {
  defaultDense?: boolean;
  defaultSelected?: number[];
};

export function useTable(props?: UseTableProps): TableProps {
  const [dense, setDense] = useState(!!props?.defaultDense);
  const [selected, setSelected] = useState<number[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState<number>(0);
  const [filter, setFilter] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{ [key: string]: number }>({});

  const onChangeRows = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //
  const onChangePage = (newPage: number) => {
    setPage(newPage);
  };
  //
  const onChangeFilter = (newFilter: string) => {
    setFilter(newFilter);
    setPage(0);
  };
  //
  const onSortChange = (columnId: string) => {
    if (!columnId) return;
    setSortConfig((prev) => ({
      [columnId]: prev[columnId] === -1 ? 1 : -1,
    }));
    setPage(0);
  };
  const onSelectRow = useCallback(
    (inputValue: number) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  //
  const onChangeDense = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  }, []);

  //
  const onSelectAllRows = useCallback((checked: boolean, inputValue: number[]) => {
    if (checked) {
      setSelected(inputValue);
      return;
    }
    setSelected([]);
  }, []);

  return {
    dense,
    selected,
    rowsPerPage,
    page,
    filter,
    //
    onChangeDense,
    setDense,
    setSelected,
    //
    onChangeRows,
    onChangePage,
    onChangeFilter,
    //
    onSelectRow,
    onSelectAllRows,
    //
    sortConfig,
    setSortConfig,
    onSortChange,
  };
}
