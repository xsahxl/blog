import React, { useEffect, useRef, PropsWithChildren } from 'react';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import HighlightJS from 'highlight.js';
import './css/index.css';
const { highlight, highlightAuto } = HighlightJS;

type Props = PropsWithChildren & {

}

function Markdown(props: Props) {
  const { children } = props;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      const markedInstance = new Marked(markedHighlight((code, language) => {
        if (!language) {
          return highlightAuto(code).value;
        }
        return highlight(code, { language }).value;
      }));
      element.innerHTML = markedInstance.parse(children as string) as string;
      // add copy button
      const div = document.createElement('div');
      div.innerHTML = '<div class="tooltip-copy"><img src="https://img.alicdn.com/imgextra/i4/O1CN01oZmdp01V8VqQgi84F_!!6000000002608-55-tps-64-64.svg" class="icon-copy" title="Click to Copy" /></div>';
      div.className = 'div-copy';

      const allPres = element.querySelectorAll('pre');
      allPres.forEach(function (pre) {
        let timeout: NodeJS.Timeout;
        const copy = div.cloneNode(true) as HTMLDivElement;
        pre.appendChild(copy);
        pre.onmouseover = function () {
          copy.classList.add('active');
        };
        pre.onmouseleave = function () {
          clearTimeout(timeout);
          copy.classList.remove('active');
          copy.classList.remove('click');
        };
        copy.onclick = function () {
          navigator.clipboard.writeText(pre.textContent as string);
          copy.classList.add('click');
          clearTimeout(timeout);
          timeout = setTimeout(function () {
            copy.classList.remove('click');
          }, 3000);
        };
      });
    }
  }, []);

  return (
    <div ref={ref} />
  )
}

export default Markdown;
