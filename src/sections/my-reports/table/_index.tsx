import * as React from "react";
import {useState} from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {TableRow, TableCell} from "@mui/material";

import {TableSumCell} from "./table-sum-cell";
import {CustomTableHeader} from "./table-header";
import {TableCellCountry} from "./table-cell-country";
import {Scrollbar} from "../../../components/scrollbar";
import {createDateColumns} from "../utils/generate-headers";

import type {ISummaryData} from "./_types";
import {TableFlexCell} from "./table-flex-cell";



export type MyReportsTableProps = {
    data: ISummaryData[];
    table: any;
};

type ExpandKeys = 'country' | 'masterProcess';
type ExpandState = { [key in ExpandKeys]: string | number | null };


const CELL_COLORS = {
    country: '#fa9805',
}

export function MyReportsTable(
    {
        data,
        table,
    }: MyReportsTableProps) {

    const [expand, setExpand] = useState<ExpandState>({
        country: null, masterProcess: null
    });


    console.log({data})
    const handleExpanded = (id: string | number | null, type: ExpandKeys) => {
        setExpand((prev) => ({
            ...prev,
            [type]: prev[type] === id ? null : id
        }))
    }
    const dateColumns = createDateColumns(data).map((date) => ({
        id: date,
        label: date,
    }));

    const totals = calculateTotals(data, dateColumns);
    return (
        <Card>
            <Box sx={{overflowX: 'auto', position: 'relative'}}>
                <Scrollbar>
                    <Table size={table.dense ? 'small' : 'medium'} sx={{minWidth: 960}}>
                        {/* <CustomTableHeader columns={dateColumns}/> */}
                        <TableBody>
                            {/* {data?.map(((item, index) => { */}
                            {/*    const isExpanded = expand.country === item?.id; */}
                            {/*    return ( */}
                            {/*        <TableRow key={`${item?.id}-${index}`}> */}
                            {/*            /!* ===== first two sticky columns: =====  *!/ */}
                            {/*            <TableFlexCell > */}
                            {/*                <TableCellCountry */}
                            {/*                    handleExpanded={() => handleExpanded(item.id, 'country') } */}
                            {/*                    isExpanded={isExpanded} */}
                            {/*                    code={item?.code} */}
                            {/*                    country={item?.country} */}
                            {/*                /> */}
                            {/*                <TableSumCell color={CELL_COLORS.country}> */}
                            {/*                    test */}
                            {/*                </TableSumCell> */}
                            {/*            </TableFlexCell> */}
                            {/*        </TableRow> */}
                            {/*    ) */}
                            {/* }))} */}
                        </TableBody>
                    </Table>
                </Scrollbar>
            </Box>
        </Card>
    )
}


export const calculateTotals = (data: ISummaryData[], dateColumns: any) => {
    console.log({data})
     const entity = data.flatMap(c => c?.entity);
     const masterProcess =  entity.flatMap(ent => ent.masterProcess);
     console.log({masterProcess});

     // const entity =  country.flatMap(masterProcess => masterProcess.masterProcess);
     // console.log(entity);
    return null;
}

