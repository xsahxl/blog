import React from 'react';
import { base } from '../../constans';

interface PropsOptions {
  href: string;
  children: any;
}

function Link(props: PropsOptions) {
  const { href, children } = props;
  return <a href={`${base}article/${href}`}>{children}</a>;
}

export default Link;
