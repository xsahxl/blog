import React, { useEffect, useRef, PropsWithChildren } from 'react';
import { marked } from 'marked';

type Props = PropsWithChildren & {

}

function Markdown(props: Props) {
  const { children } = props;
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.innerHTML = marked.parse(children as string) as string;
    }
  }, []);

  return (
    <div ref={ref} />
  )
}

export default Markdown;
