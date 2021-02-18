import React, { useState, Fragment } from 'react';
import { isFunction } from 'lodash';

interface ChindOptions {
  data: any;
  loading: boolean;
  error: any;
}

interface PropsOptions {
  onSubmit: () => Promise<any>;
  children: (submit: () => Promise<any>, options: ChindOptions) => any;
  onCompleted?: Function;
  onError?: (err: any) => void;
  refetchQuery?: Function;
}
function Mutation(props: PropsOptions) {
  const {
    onSubmit: onSubmitFromProps,
    children,
    onCompleted,
    onError,
    refetchQuery,
  } = props;
  const [result, setResult] = useState([]);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const onSubmit = async () => {
    try {
      setLoading(true);
      const data = await onSubmitFromProps();
      setLoading(false);
      setResult(data);
      isFunction(onCompleted) && onCompleted();
      isFunction(refetchQuery) && refetchQuery();
    } catch (err) {
      isFunction(onCompleted) && onCompleted();
      isFunction(onError) && onError(err);
      setError(err);
      setLoading(false);
    }
  };

  return (
    <Fragment>
      {children(onSubmit, {
        data: result,
        loading,
        error,
      })}
    </Fragment>
  );
}

export default Mutation;
