export interface ITableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  data?: any[];
  columns?: any[];
  onRowClick?: (row: any) => void;
  noData?: string;
  noDataIcon?: React.ReactNode;
}