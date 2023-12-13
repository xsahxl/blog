import React, { useEffect, useRef } from 'react';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import HighlightJS from 'highlight.js';
import copyToClipboard from 'copy-to-clipboard';
import styled from 'styled-components';
import 'highlight.js/styles/github.min.css';
const { highlight, highlightAuto } = HighlightJS;

type Props = {
  children: string;
};

function Markdown(props: Props) {
  const { children } = props;
  if (typeof children !== 'string') {
    return <div>Only support children is string</div>;
  }
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (element) {
      const markedInstance = new Marked(
        markedHighlight((code, language) => {
          if (!language || language === 'none') {
            return highlightAuto(code).value;
          }
          return highlight(code, { language }).value;
        }),
      );
      element.innerHTML = markedInstance.parse(children as string) as string;
      // add copy button
      const div = document.createElement('div');
      div.innerHTML =
        '<div class="tooltip-copy"><img src="https://img.alicdn.com/imgextra/i4/O1CN01oZmdp01V8VqQgi84F_!!6000000002608-55-tps-64-64.svg" class="icon-copy" title="Click to Copy" /></div>';
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
        copy.onclick = function (e) {
          e.stopPropagation();
          e.preventDefault();
          copyToClipboard(pre.textContent as string);
          copy.classList.add('click');
          clearTimeout(timeout);
          timeout = setTimeout(function () {
            copy.classList.remove('click');
          }, 3000);
        };
      });
    }
  }, [children]);

  return <Wrapper ref={ref} />;
}

const Wrapper = styled.div`
  table {
    border-spacing: 0;
    border-collapse: collapse;
    border: 1px solid #ddd;
  }
  td,
  th {
    border: 1px solid #ddd;
    padding: 5px;
  }
  a {
    color: #0366d6;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  blockquote {
    background: #efefef;
    padding: 1px 16px;
    margin-left: 0;
    margin-right: 0;
    border-left: #cecece solid 10px;
    border-radius: 3px;
    & > p {
      margin: 8px 0;
    }
  }
  pre {
    margin-top: 0;
    margin-bottom: 24px;
    padding: 12px;
    font-size: 1em;
    background: #f7f7f7;
    border-radius: 2px;
    overflow-x: auto;
    position: relative;
  }
  pre code {
    overflow: auto;
    display: block;
    background: unset;
    color: unset;
  }
  :not(pre) > code {
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    background-color: #f6f8fa;
    border-radius: 3px;
  }
  .div-copy {
    position: absolute;
    top: 4px;
    right: 4px;
  }
  .div-copy .icon-copy {
    opacity: 0;
    transition: opacity 0.3s;
    height: 18px;
    width: 18px;
    cursor: pointer;
  }
  .div-copy.active .icon-copy {
    opacity: 1;
  }
  .div-copy .tooltip-copy {
    position: relative;
  }
  .div-copy .tooltip-copy::before {
    content: 'Copied';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 100%;
    margin-right: 5px;
    padding: 2px 7px;
    border-radius: 5px;
    background: #444;
    color: #fff;
    text-align: center;
    opacity: 0;
    transition: opacity 0.3s;
  }
  .div-copy.click .tooltip-copy::before {
    opacity: 1;
  }

  .div-copy .tooltip-copy::after {
    content: '';
    position: absolute;
    right: 100%;
    margin-right: -5px;
    top: 50%;
    transform: translateY(-50%);
    border-style: solid;
    border-width: 2px 2px 5px 8px;
    border-color: transparent transparent transparent #444;
    opacity: 0;
    transition: opacity 0.3s;
  }
  .div-copy.click .tooltip-copy::after {
    opacity: 1;
  }
`;

export default Markdown;
