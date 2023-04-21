# useRef vs createRef

```javascript
import React, { useRef, createRef } from 'react';

const FocusInput = () => {
  const inputElement = useRef();
  // const inputElement = createRef();
  const handleFocusInput = () => {
    inputElement.current.focus();
  };
  return (
    <>
      <input ref={inputElement} type="text" />
      <button onClick={handleFocusInput}>Focus input</button>
    </>
  );
};

export default FocusInput;
```

从上面的例子看, createRef 和 useRef 的作用完全一样, 那为什么 react 要设计一个新的 hook ? 难道只是会了加上 use , 统一 hook 规范么?

useRef 在 react hook 中的作用, 正如官网说的, 它像一个变量, 它就像一个盒子, 你可以存放任何东西. createRef 每次渲染都会返回一个新的引用，而 useRef 每次都会返回相同的引用。

```javascript
import React, { useRef, createRef, useState } from 'react';

const Demo = () => {
  const [renderIndex, setRenderIndex] = useState(1);
  const refFromUseRef = useRef();
  const refFromCreateRef = createRef();
  if (!refFromUseRef.current) {
    refFromUseRef.current = renderIndex;
  }
  if (!refFromCreateRef.current) {
    refFromCreateRef.current = renderIndex;
  }
  return (
    <>
      <p>current render index: {renderIndex}</p>
      <p>refFromUseRef: {refFromUseRef.current}</p>
      <p>refFromCreateRef: {refFromCreateRef.current}</p>
      <button onClick={() => setRenderIndex((pre) => pre + 1)}>add</button>
    </>
  );
};

export default Demo;
```

就算组件重新渲染, 由于 refFromUseRef 的值一直存在, 无法重新赋值

```javascript
import React, { useState } from 'react';

const Demo = () => {
  const [count, setCount] = useState(0);
  function handleAlertClick() {
    setTimeout(() => {
      alert('you clicked on:' + count);
    }, 3000);
  }
  return (
    <>
      <p>you clicked {count} times</p>
      <button onClick={() => setCount((pre) => pre + 1)}>Focus input</button>
      <button onClick={handleAlertClick}>show alert</button>
    </>
  );
};

export default Demo;
```

当我们更新状态的时候, React 会重新渲染组件, 每一次渲染都会拿到独立的 count 状态, 并重新渲染一个 handleAlertClick 函数. 每一个 handleAlertClick 里面都有它自己的 count .

```javascript
import React, { useState, useRef, useEffect } from 'react';

const Demo = () => {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  useEffect(() => {
    console.log('xxx');

    countRef.current = count;
  });
  function handleAlertClick() {
    setTimeout(() => {
      alert('you clicked on:' + countRef.current);
    }, 3000);
  }
  return (
    <>
      <p>pre: {countRef.current} times</p>
      <p>you clicked {count} times</p>
      <button onClick={() => setCount((pre) => pre + 1)}>Focus input</button>
      <button onClick={handleAlertClick}>show alert</button>
    </>
  );
};

export default Demo;
```
