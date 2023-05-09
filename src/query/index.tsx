import React, { useEffect, useState, Fragment, useRef } from 'react';
import { get, isFunction } from 'lodash';
import { useCompare } from '../utils';

type LoopOptions = {
  enable?: boolean;
  time?: number;
}

type RenderProps = {
  data: any;
  loading: boolean;
  error?: Error;
}

type Props = {
  fetchData: () => Promise<any>;
  children: (options: RenderProps) => React.ReactNode;
  refreshIndex?: number;
  loop?: LoopOptions;
  onCompleted?: () => Promise<any>;
  onError?: (err: Error) => Promise<any>;
  autoFetch?: boolean;
}

type ParamsOptions = {
  showLoading?: boolean;
}

type RefOptions = {
  current: { id?: any };
}
function Query(props: Props) {
  const {
    fetchData: fetchDataFromProps,
    refreshIndex = 0,
    loop = { time: 10000, enable: false },
    children,
    onCompleted,
    onError,
    autoFetch = true,
  } = props;

  const loopRef: RefOptions = useRef({});
  const [result, setResult] = useState();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);
  const fetchData = async (params: ParamsOptions = {}) => {
    try {
      params.showLoading !== false && setLoading(true);
      const data = await fetchDataFromProps();
      setLoading(false);
      setResult(data);
      isFunction(onCompleted) && await onCompleted();
    } catch (error) {
      const err = error as Error;
      isFunction(onCompleted) && await onCompleted();
      isFunction(onError) && await onError(err);
      setError(err);
      setLoading(false);
    }
  };

  const fetchDataLoop = () => {
    loopRef.current.id = setTimeout(() => {
      fetchData({ showLoading: false });
      fetchDataLoop();
    }, get(loop, 'time', 10000));
  };

  useEffect(() => {
    autoFetch && fetchData();
  }, [autoFetch]);

  const onRefresh = async () => {
    clearTimeout(loopRef.current.id)
    await fetchData();
    loop.enable && fetchDataLoop()
  }

  useEffect(() => {
    if (refreshIndex !== 0) {
      onRefresh();
    }
  }, [refreshIndex]);

  useEffect(() => {
    clearTimeout(loopRef.current.id)
    if (loop.enable) {
      fetchData({ showLoading: false });
      fetchDataLoop();
    }
    return () => clearTimeout(loopRef.current.id);
  }, [useCompare(loop)]);
  return (
    <Fragment>
      {children({
        data: result,
        loading,
        error,
      })}
    </Fragment>
  );
}

export default Query;
