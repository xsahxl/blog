import React, { useEffect, useState, Fragment, useRef } from 'react';
import { get, isFunction } from 'lodash';
import { useCompare } from '../utils';

interface LoopOptions {
  enable?: boolean;
  time?: number;
}

interface ChindOptions {
  data: any;
  loading: boolean;
  error: any;
}

interface PropsOptions {
  fetchData: () => Promise<any>;
  children: (options: ChindOptions) => any;
  refreshIndex?: number;
  loop?: LoopOptions;
  onCompleted?: Function;
  onError?: (err: any) => void;
  autoFetch?: boolean;
}

interface ParamsOptions {
  showLoading?: boolean;
}

interface RefOptions {
  current: { id?: any };
}
function Query(props: PropsOptions) {
  const {
    fetchData: fetchDataFromProps,
    refreshIndex = 0,
    loop = {},
    children,
    onCompleted,
    onError,
    autoFetch = true,
  } = props;

  const loopRef: RefOptions = useRef({});
  const [result, setResult] = useState([]);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async (params: ParamsOptions = {}) => {
    try {
      params.showLoading !== false && setLoading(true);
      const data = await fetchDataFromProps();
      setLoading(false);
      setResult(data);
      isFunction(onCompleted) && onCompleted();
    } catch (err) {
      isFunction(onCompleted) && onCompleted();
      isFunction(onError) && onError(err);
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch]);

  useEffect(() => {
    if (refreshIndex !== 0) {
      fetchData();
    }
  }, [refreshIndex]);

  const fetchDataLoop = () => {
    clearTimeout(loopRef.current.id);
    loopRef.current.id = setTimeout(() => {
      fetchData({ showLoading: false });
      fetchDataLoop();
    }, get(loop, 'time', 10000));
  };

  useEffect(() => {
    if (loop.enable) {
      fetchDataLoop();
    } else {
      clearTimeout(loopRef.current.id);
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
