---
toc: content
---

# SlidePanel

滑动面板，从浏览器右侧弹出面板。

## 基本用法

### SlidePanel 适用于**只展示一个 panel**的情况(其实这应该符合大部分情况)，点击 open 按钮时弹出面板：

<code src="./demo/SlidePanel/index.tsx" ></code>

### 弹出多个面板，用户可以在面板之间切换。这种场景需要使用 SlidePanelGroup 和 SlidePanelItem：

<code src="./demo/MultiPanel/index.tsx" ></code>

### 另一种多面板的方式：在一个 SlidePanel 中弹出另一个 SlidePanel

<code src="./demo/Nested/index.tsx" ></code>

### 从底部滑出的面板：

<code src="./demo/BottomPanel/index.tsx" ></code>

### 通过控制 popupProps，可以让 SlidePanel 从内容区域的底部滑出：

<code src="./demo/InLayout/index.tsx" ></code>

### 基于栈的多面板管理：每次只展示一个面板，但是可以进行下探、返回。使用`usePanelStack`来帮助你快速实现栈式面板管理：

<code src="./demo/StackPanel/index.tsx" ></code>

### 渲染到指定容器，通过`props.container`来指定 SlidePanel 要被渲染的容器

<code src="./demo/SlidePanelWithContainer/index.tsx" ></code>

## APIs

### SlidePanel

SlidePanel 是基于 SlidePanelGroup 和 SlidePanelItem 的简单封装，将自己 props 透传给它们：

```Plain Text
<SlidePanelGroup {...slidePanelGroupProps}>
  <SlidePanelItem {...slidePanelItemProps} />
</SlidePanelGroup>
```

`<SlidePanel>` 同时接受`SlidePanelGroup`和`SlidePanelItem`的 props。`<SlidePanel>` 内部自动将自己的 props 分类成`slidePanelGroupProps`和`slidePanelItemProps`，像上面的代码片段展示的那样，透传给对应组件。

| 属性             | 类型                                                                  | 说明                                                                                                            | 默认值 |
| ---------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------ |
| cancelText       | cancelText?: React.ReactNode;                                         | footer 取消按钮文字。                                                                                           | -      |
| children         | children?: React.ReactNode;                                           | 面板的内容。                                                                                                    | -      |
| container        | container?: any;                                                      | 渲染组件的容器，如果是函数需要返回 ref，如果是字符串则是该 DOM 的 id，也可以直接传入 DOM 节点                   |        |
| customFooter     | customFooter?: React.ReactNode;                                       | 自定义整个 footer 的内容。                                                                                      |        |
| hasMask          | hasMask?: boolean;                                                    | 是否在 isShowing===true 时展示背景蒙板。                                                                        |        |
| headerExtra      | headerExtra?: React.ReactNode;                                        | header 的额外内容，展示在 title 的右侧。                                                                        |        |
| isProcessing     | isProcessing?: boolean;                                               | footer 确认按钮是否展示加载中状态。加载中的按钮不可点击。                                                       |        |
| isShowing        | isShowing?: boolean;                                                  | 控制整个 SlidePanelGroup 的滑入、滑出。                                                                         |        |
| okText           | okText?: React.ReactNode;                                             | footer 确认按钮文字。                                                                                           |        |
| onCancel         | onCancel?: () => void;                                                | footer 取消按钮的点击事件。如果没有传入此事件处理函数，则不展示取消按钮。                                       |        |
| onClose          | onClose?: () => void;                                                 | header 的关闭按钮的点击事件。如果没有传入此事件处理函数，则不展示关闭按钮。                                     |        |
| onMaskClick      | onMaskClick?: () => void;                                             | 用户点击背景蒙板。大部分情况下，开发者想要在这个事件处理函数中设置 props.isShowing 为 false。                   |        |
| onOk             | onOk?: () => void;                                                    | footer 确认按钮的点击事件。如果没有传入此事件处理函数，则不展示确认按钮。                                       |        |
| onSlideCompleted | onSlideCompleted?: () => void;                                        | 面板的滑出、滑入动画完成了。                                                                                    |        |
| placement        | placement?: 'right' \| 'bottom';                                      | 位于页面的位置                                                                                                  |        |
| popupProps       | popupProps?: any;                                                     | 透传给 Popup 的属性                                                                                             |        |
| processingText   | processingText?: React.ReactNode;                                     | footer 确认按钮处于加载中状态时的文字。                                                                         |        |
| title            | title?: React.ReactNode;                                              | header title 的内容。                                                                                           |        |
| top              | top?: number \| string;                                               | 滑动组件离视口顶部的距离。比如，开发者不希望 SlidePanel 滑出时挡住顶栏，那么可以将 props.top 设置为顶栏的高度。 |        |
| width            | width?: 'tiny' \| 'small' \| 'medium' \| 'large' \| number \| string; | 自定义 wrapper div 的样式                                                                                       | -      |

对于**只展示一个 panel**的情况(其实这应该符合大部分情况)，直接使用 SlidePanel 就很方便。使用方式见上面的[基本用法](#基本用法)。

如果要同时展示多个 panel，请直接使用 SlidePanelGroup 和 SlidePanelItem。

### SlidePanelGroup

SlidePanelGroup 定义一个滑动面板**组**，其中可以包含多个 SlidePanelItem。

| 属性              | 类型                                      | 说明                                                                                                                      | 默认值 |
| ----------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------ |
| activeId          | activeId?: string;                        | 当前哪个 panel 处于激活状态。非激活状态的 panel 会有宽度坍缩，并展示...而不是实际内容，使用户注意力聚焦于激活状态的面板。 | -      |
| children          | children?: React.ReactNode;               | children 可以包含一个或多个面板。                                                                                         | -      |
| className         | className?: string;                       | 自定义整个 SlidePanelGroup 的 wrapper div 的类名。                                                                        | -      |
| container         | container?: any;                          | 渲染组件的容器，如果是函数需要返回 DOM 节点，如果是字符串则是该 DOM 的 id，也可以直接传入 DOM 节点                        | -      |
| hasMask           | hasMask?: boolean;                        | 是否在 isShowing===true 时展示背景蒙板。                                                                                  | -      |
| isShowing         | isShowing?: boolean;                      | 控制整个 SlidePanelGroup 的滑入、滑出。                                                                                   | -      |
| onMaskClick       | onMaskClick?: () => void;                 | 用户点击背景蒙板。大部分情况下，开发者想要在这个事件处理函数中设置 props.isShowing 为 false。                             | -      |
| onSlideCompleted  | onSlideCompleted?: () => void;            | **整个面板组**的滑出、滑入动画完成了。                                                                                    | -      |
| onSlideStarted    | onSlideStarted?: () => void;              | **整个面板组**的滑出、滑入动画开始了。                                                                                    | -      |
| onSwitchPanelItem | onSwitchPanelItem?: (id: string) => void; | 用户点击切换面板。大部分情况下，开发者想要在这个事件处理函数中设置 props.activeId 为当前被点击的 id。                     | -      |
| placement         | placement?: 'right' \| 'bottom';          | 位于页面的位置                                                                                                            | -      |
| popupProps        | popupProps?: any;                         | 透传给 Popup 的属性                                                                                                       | -      |
| top               | top?: number \| string;                   | 滑动组件离视口顶部的距离。比如，开发者不希望 SlidePanel 滑出时挡住顶栏，那么可以将 props.top 设置为顶栏的高度。           | -      |

### SlidePanelItem

定义一个滑动面板。

| 属性               | 类型                                                                  | 说明                                                                                                                                                                                           | 默认值 |
| ------------------ | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| cancelText         | cancelText?: React.ReactNode;                                         | footer 取消按钮文字。                                                                                                                                                                          | -      |
| children           | children?: React.ReactNode;                                           | 面板的内容。                                                                                                                                                                                   | -      |
| className          | className?: string;                                                   |                                                                                                                                                                                                | -      |
| customFooter       | customFooter?: React.ReactNode;                                       | 自定义整个 footer 的内容。侧。                                                                                                                                                                 | -      |
| headerExtra        | headerExtra?: React.ReactNode;                                        | header 的额外内容，展示在 title 的右侧。                                                                                                                                                       | -      |
| id                 | id: string;                                                           | 面板的 id。用于在 SlidePanelGroup 中匹配 props.activeId。id 匹配的面板处于激活状态（全宽度展示）。非激活状态的 panel 会有宽度坍缩，并展示...而不是实际内容，使用户注意力聚焦于激活状态的面板。 | -      |
| isProcessing       | isProcessing?: boolean;                                               | footer 确认按钮是否展示加载中状态。加载中的按钮不可点击。                                                                                                                                      | -      |
| okText             | okText?: React.ReactNode;                                             | footer 确认按钮文字。                                                                                                                                                                          | -      |
| onBackArrowClicked | onBackArrowClicked?: () => void;                                      | 如果传入该回调，则在 title 的左侧展示返回按钮，并且被点击时触发此回调。                                                                                                                        | -      |
| onCancel           | onCancel?: () => void;                                                | footer 取消按钮的点击事件。如果没有传入此事件处理函数，则不展示取消按钮。                                                                                                                      | -      |
| onClose            | onClose?: () => void;                                                 | header 的关闭按钮的点击事件。如果没有传入此事件处理函数，则不展示关闭按钮。                                                                                                                    | -      |
| onOk               | onOk?: () => void;                                                    | footer 确认按钮的点击事件。如果没有传入此事件处理函数，则不展示确认按钮。                                                                                                                      | -      |
| onSwitchCompleted  | onSwitchCompleted?: () => void;                                       | **面板之间的切换**动画完成了。                                                                                                                                                                 | -      |
| placement          | placement?: 'right' \| 'bottom';                                      | 位于页面的位置                                                                                                                                                                                 | -      |
| processingText     | processingText?: React.ReactNode;                                     | footer 确认按钮处于加载中状态时的文字。                                                                                                                                                        | -      |
| title              | title?: React.ReactNode;                                              | header title 的内容。                                                                                                                                                                          | -      |
| width              | width?: 'tiny' \| 'small' \| 'medium' \| 'large' \| number \| string; | 面板处于激活状态时的正常宽度。                                                                                                                                                                 | -      |

### usePanelStack

使用一个栈来管理多个面板：

1. 最初只有一个面板
2. 当加入新的面板时，展示新的面板（下探）
3. 当新面板返回时，展示最初的那个面板

#### 参数

```Plain Text
initer?: () => React.ReactElement
```

初始化最初展示的面板。

#### 返回值

请将它渲染到\<SlidePanelGroup>中。当你把所有面板都出栈以后，top 为 undefined。

| 属性 | 类型                                    | 说明                     | 默认值 |
| ---- | --------------------------------------- | ------------------------ | ------ |
| pop  | pop: () => void;                        | 从当前面板返回（出栈）。 | -      |
| push | push: (el: React.ReactElement) => void; | 推入新的面板（入栈）。   | -      |
| top  | top: React.ReactElement;                | 当前展示的面板（栈顶）。 | -      |

你需要将`top`渲染到`SlidePanelGroup`中。使用示例见前面的“基本用法”小节。

#### usePanelStackCtx

为了方便用户【在面板中】操作面板栈，我们提供了`usePanelStackCtx()`这个 hooks 来获得栈的操作方法：`push`和`pop`，这两个操作方法就是 usePanelStack 返回值中的`push`和`pop`。

```Plain Text
const FirstPanel: React.FC<{
  setIsPanelShowing: (v: boolean) => void;
}> = ({ setIsPanelShowing }) => {
  const panelStackManager = usePanelStackCtx();
  return (
    <SlidePanelItem
      id="item1"
      width="medium"
      title="title1"
      headerExtra="extra1"
      onOk={() => setIsPanelShowing(false)}
      onCancel={() => setIsPanelShowing(false)}
    >
      item1
      <Button
        onClick={() => {
          panelStackManager.push(<SecondPanel />);
        }}
      >
        下探一级
      </Button>
    </SlidePanelItem>
  );
};
```

使用示例见前面的“基本用法”小节。
