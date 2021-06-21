export interface TableI {
    title: string;
    subtitle: string;
    icon: string;
    headerColumns: string[];
    isAdd: boolean;
    isDownload: boolean;
    isDetails: boolean;
    isEdit: boolean
    cofigColum: ColumnI[];
}

interface ColumnI {
    isImg: boolean;
    isBadked: boolean;
}