import { useEffect, useMemo, useState } from "react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { IconButton } from "@mui/material";

// type ItemColumn = { header: any, fieldName: string } & { [key: string]: any }
type SortType = 'ASC' | 'DESC' | '';
// key sort
const grenerateArray = (columsSorts: any) => Array(columsSorts.length).fill('')
export const useSortTable = (columns: any[], columsSorts: string[], dependencies: any[], onChange?: (sortValue: any) => void) => {
    const [headersDefault] = useState<any>(columns.map((column: any) => column.header));
    const [columnStatus, setColumnStatus] = useState<SortType[]>(grenerateArray(columsSorts));
    const [currentPos, setCurrentPos] = useState<number>();

    const onClick = (index: number, status: SortType) => {
        const columnStatusClone: any[] = Array.from(columnStatus);
        columnStatusClone.fill('');
        columnStatusClone[index] = status ?? 'ASC';
        setColumnStatus(columnStatusClone)
        setCurrentPos(index);
    }

    const resetSort = () => {
        setColumnStatus(grenerateArray(columsSorts));
    }

    useMemo(() => {
        for (let index = 0; index < columns.length; index++) {
            const column = columns[index];
            const pos = columsSorts.indexOf(column?.fieldName);
            if (pos >= 0) {
                column.header = (<>
                    <span className="flex flex-start pl-10 relative" onClick={() => onClick(pos, !columnStatus[pos] ? 'ASC' : (columnStatus[pos] == 'ASC' ? 'DESC' : 'ASC'))} >
                        <div className="self-center">
                            {headersDefault[index]}
                        </div>
                        <div className="self-center">
                            {
                                columnStatus[pos] &&
                                <IconButton>
                                    {
                                        columnStatus[pos] == 'ASC'
                                            ? <ArrowUpwardIcon width={15} />
                                            : <ArrowDownwardIcon width={15} />
                                    }
                                </IconButton>
                            }
                        </div>
                    </span>
                </>)
            }
        }
    }, [...dependencies, columnStatus, setColumnStatus, resetSort])

    useEffect(() => {
        console.log('Sort-table------')
        if (columsSorts?.length > 0 && columnStatus.filter(el => el != '').length > 0) {
            onChange?.(columsSorts[currentPos ?? 0] + ',' + columnStatus[currentPos ?? 0]);
        }
    }, [...dependencies, columnStatus, setColumnStatus])

    return {
        columnsSort: columns,
        resetSort,
    } as const
}