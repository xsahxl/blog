import React, { FC, useState, Fragment, ReactNode } from 'react';
import { isFunction } from 'lodash';

type RenderProps = {
  data: any;
  loading: boolean;
  error?: Error;
}

type Props = {
  onSubmit: () => Promise<any>;
  children: (submit: () => Promise<any>, options: RenderProps) => ReactNode;
  onCompleted?: () => Promise<any>;
  refetchQuery?: () => Promise<any>;
  onError?: (err: Error) => Promise<any>;
}

const Mutation: FC<Props> = (props) => {
  const {
    onSubmit: onSubmitFromProps,
    children,
    onCompleted,
    onError,
    refetchQuery,
  } = props;
  const [result, setResult] = useState();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);
  const onSubmit = async () => {
    try {
      setLoading(true);
      const data = await onSubmitFromProps();
      setLoading(false);
      setResult(data);
      isFunction(onCompleted) && await onCompleted();
      isFunction(refetchQuery) && await refetchQuery();
    } catch (error) {
      const err = error as Error;
      isFunction(onCompleted) && await onCompleted();
      isFunction(onError) && await onError(err);
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
