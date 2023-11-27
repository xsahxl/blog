import * as React from 'react';
import { FC, useState, useEffect } from 'react';
import { Button, Icon, Balloon } from '@alicloud/console-components';
import Table, { IPaginationProps } from '@alicloud/console-components-table';
import { IRcSearchTagItemProps, Search, SearchFilter } from '@alicloud/console-components-search';
import { find, get, isEmpty, map, set } from 'lodash';
import styled from 'styled-components';
import i18n from '../i18n';
import { IParams, ITableProps, ISearch } from './type';
import { normalizeSearchOptions } from './utils';
import { DEFAULT_CURRENT, DEFAULT_PAGE_SIZE, DEFAULT_REFRESH_INDEX } from './constant';
import '@alicloud/console-components-search/dist/index.css';

export * from './type';
const { Tooltip } = Balloon;

const RcTable: FC<ITableProps> = props => {
  const {
    className,
    style,
    fetchData,
    refreshIndex = DEFAULT_REFRESH_INDEX,
    recordCurrent = false,
    operation,
    search = {} as ISearch,
    showRefreshButton,
    pagination = {} as IPaginationProps,
    ...restProps
  } = props;
  const [params, setParams] = useState<IParams>({});
  const { current = DEFAULT_CURRENT, pageSize = DEFAULT_PAGE_SIZE, total: totalFromPagination, ...restPagination } = pagination;
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<IRcSearchTagItemProps[]>([]);

  const _fetchData = async (params: IParams) => {
    setLoading(true);
    const res = await fetchData(params);
    setDataSource(get(res, 'data', []));
    setTotal(get(res, 'total', totalFromPagination));
    setLoading(false);
  };

  const onRefresh = () => {
    if (params.current === DEFAULT_CURRENT) {
      _fetchData(params);
      return;
    }
    setParams({ ...params, current: DEFAULT_CURRENT });
  };
  // 初始化参数
  useEffect(() => {
    const data = normalizeSearchOptions(search);
    setFilters(get(data, 'filters', []) as IRcSearchTagItemProps[]);
    setParams({ ...params, current, pageSize, ...get(data, 'params') });
  }, []);

  // 参数变化后，触发请求
  useEffect(() => {
    if (isEmpty(params)) return;
    _fetchData(params);
  }, [JSON.stringify(params)]);

  // 刷新
  useEffect(() => {
    if (refreshIndex === DEFAULT_REFRESH_INDEX) return;
    if (recordCurrent) {
      _fetchData(params);
      return;
    }
    onRefresh();
  }, [refreshIndex]);

  const _pagination = {
    ...restPagination,
    current: params.current,
    pageSize: params.pageSize,
    total,
    totalRender: () => i18n('ui.total', { total }),
    onChange: (current: number) => setParams({ ...params, current }),
    onPageSizeChange: (pageSize: number) => setParams({ ...params, pageSize }),
  };

  const refreshButtonRender = () => {
    return (
      <Tooltip
        trigger={
          <Button type="normal" style={{ padding: '0 8px' }} onClick={onRefresh} loading={loading}>
            <Icon type="refresh" style={{ color: '#666' }} />
          </Button>
        }
        align="t"
      >
        {i18n('ui.refresh')}
      </Tooltip>
    );
  };

  const onSearch = (value: any, dataIndex: string, extra = {}) => {
    const { onlySupportOne } = search;
    // 如果值存在
    if (value) {
      const getData = () => {
        if (onlySupportOne) return [extra];
        const exist = find(filters, { dataIndex });
        return exist
          ? map(filters, item => {
              if (item.dataIndex === dataIndex) {
                return { ...item, ...extra };
              }
              return item;
            })
          : [...filters, extra];
      };
      setFilters(getData() as IRcSearchTagItemProps[]);
      setParams({ ...params, [dataIndex]: value, current: DEFAULT_CURRENT });
      return;
    }
    // 值不存在
    onRefresh();
  };

  const searchRender = () => {
    if (isEmpty(search)) return null;
    const { children, ...restSearch } = search;
    if (isEmpty(children)) {
      return <Search {...restSearch} onSearch={onSearch} />;
    }
    return (
      <div className="display-flex">
        <Search className="mr-8" {...restSearch} onSearch={onSearch} />
        {children}
      </div>
    );
  };

  const onFilterChange = (deletedFilter: IRcSearchTagItemProps, remainFilters: IRcSearchTagItemProps[]) => {
    setFilters(remainFilters);
    setParams({ ...params, [get(deletedFilter, 'dataIndex') as string]: undefined });
  };
  const onFilterClear = () => {
    setFilters([]);
    const options = get(search, 'options', []);
    const temp = {};
    for (const item of options) {
      set(temp, item.dataIndex, undefined);
    }
    setParams({ current, pageSize, ...temp });
  };

  return (
    <Wrapper className={className} style={style}>
      <div className="cnd-search">
        <div className="display-flex">
          {operation ? <div className="mr-8">{operation}</div> : null}
          {searchRender()}
        </div>
        {showRefreshButton && refreshButtonRender()}
      </div>
      <div className="mt-8">{search.beforeFilterRender}</div>
      {filters.length > 0 && <SearchFilter className="mt-4" dataSource={filters} onChange={onFilterChange} onClear={onFilterClear} />}
      <div className="mt-8">{search.afterFilterRender}</div>
      <Table
        {...restProps}
        className="mt-8"
        loading={loading}
        dataSource={dataSource}
        pagination={props.pagination === false ? null : _pagination}
        // 如果设置了selection，rowSelection默认值修改为空对象
        rowSelection={restProps.selection ? get(restProps, 'rowSelection', {}) : restProps.rowSelection}
      />
    </Wrapper>
  );
};

const Wrapper = styled.span`
  .next-pagination-total {
    color: #888;
    font-size: 12px;
    margin: 0 8px;
  }
  .rc-search-taglist .remove-btn {
    color: #0064c8;
  }
  .cnd-search {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }
`;

export default RcTable;
