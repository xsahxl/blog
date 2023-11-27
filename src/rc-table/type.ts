import { ITableProps as _ITableProps } from '@alicloud/console-components-table';
import { IRcSearchProps, IRcSearchOptionsProps } from '@alicloud/console-components-search';
import { Table } from '@alicloud/console-components';

export type Column = typeof Table.Column;

export type ITableProps = _ITableProps & {
  fetchData: (data: IParams) => Promise<IResult>;
  refreshIndex?: number;
  recordCurrent?: boolean;
  showRefreshButton?: boolean;
  search?: ISearch;
};

export type ISearch = IRcSearchProps & {
  options: IOptions[];
  children?: React.ReactNode;
  beforeFilterRender?: React.ReactNode;
  afterFilterRender?: React.ReactNode;
  onlySupportOne?: boolean;
};

export type IOptions = IRcSearchOptionsProps & {
  defaultValue?: any;
};

export interface IResult {
  data: any[];
  total?: number;
}
export interface IParams {
  current?: number;
  pageSize?: number;
  [key: string]: any;
}
