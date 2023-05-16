---
toc: content
---

# Truncate

## 何时使用

用于截断超长文本。

## 基本用法

### 单行截断

### 比较常见的使用方式：

<code src="./demo/basic.tsx"></code>

### 根据容器的宽度自动截断：

<code src="./demo/auto-width.tsx"></code>

### 在宽度截断模式下，可以截断任何可渲染元素，不只是 string：

<code src="./demo/non-string.tsx"></code>

### 可以自定义省略符号。不过注意，如果省略符号不是`...`的话，会在**宽度截断模式**下造成“字符在中间被截断”（在浏览器中没办法支持那么“智能”的截断）：

<code src="./demo/custom-omission.tsx"></code>

### 每当 children 变化的时候，Truncate 会自动检查是否需要截断：

<code src="./demo/dynamic-children.tsx"></code>

### 可以自定义 tootip 的 max-width：

<code src="./demo/tooltip-max-width.tsx"></code>

### 设置 tooltip 样式：

<code src="./demo/popupStyle.tsx"></code>

### 多行截断

<code src="./demo/multi-lines.tsx"></code>

想要做多行截断的时候，先考虑能否**通过普通的滚动来让用户浏览全部内容**。从用户体验的角度来看，后者的体验更好，无需使用多行截断。

## APIs

### 单行截断

| 属性             | 类型                                                             | 说明                                                                                                                                                                                                                                                                                        | 默认值   |
| ---------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| align            | align?: AlignType;                                               | 气泡对齐方式，可选值参见 Balloon（Tooltip）组件文档                                                                                                                                                                                                                                         | 'r'(右)  |
| children         | children: string \| React.ReactNode;                             | 需要被截断的内容 <br />如果想要通过字符长度来截断，则 children 必须为 string；<br /> 如果想要通过宽度来截断，则 children 可以为任意可渲染元素；                                                                                                                                             | -        |
| className        | className?: string;                                              | 容器的类名                                                                                                                                                                                                                                                                                  | -        |
| isOverflowChange | isOverflowChange?: (newIsOverflow: boolean) => void;             | 【极少使用】方便父组件知道当前是否发生了截断，type==='width'时可用（type==='length'时你自己就很容易判断是否会截断）。<br />慎用，避免截断状态->你扩大父容器->非截断状态->你缩小父容器->截断状态->...这样的无限循环。                                                                        | -        |
| omission         | omission?: React.ReactNode;                                      | 省略符号                                                                                                                                                                                                                                                                                    | -        |
| patchPopupProps  | patchPopupProps?: (originalProps: BalloonProps) => BalloonProps; | 完全控制 tooltip 的 props。比如指定 popupContainer。 <br />BalloonProps 的类型见 Balloon 组件文档。                                                                                                                                                                                         | -        |
| popupClassName   | popupClassName?: string;                                         | 当 tooltip 展示时，设置弹层组件的 className，透传给 Popup                                                                                                                                                                                                                                   | -        |
| popupStyle       | popupStyle?: React.CSSProperties;                                | 当 tooltip 展示时，设置弹层组件 style，透传给 Popup                                                                                                                                                                                                                                         | -        |
| showTooltip      | showTooltip?: boolean;                                           | 在被截断时，是否使用气泡展示完整内容                                                                                                                                                                                                                                                        | true     |
| style            | style?: React.CSSProperties;                                     | 容器的样式                                                                                                                                                                                                                                                                                  | -        |
| threshold        | threshold?: number \| 'auto';                                    | 截断临界值：<br /> type 为 'length' 时，threshold 限制字符串长度，必须传入 number 类型。 <br />type 为 'width' 时，threshold 限制内容渲染后的宽度，可以传入 number 或'auto'。 <br /> 其中'auto'表示截断宽度自动设置为容器元素的宽度。尤其适用于 flex 布局下，截断宽度由剩余宽度决定的场景。 | 30       |
| tooltipMaxWidth  | tooltipMaxWidth?: number;                                        | tooltip 的最大宽度限制，showTooltip 为 true 时才有效                                                                                                                                                                                                                                        |          |
| type             | type?: 'length' \| 'width';                                      | 如何判断是否需要截断：<br /> 'length': 内容字符串长度是否大于 threshold 'width': 内容渲染后的宽度是否大于 threshold                                                                                                                                                                         | 'length' |
| updaterRef       | updaterRef?: React.MutableRefObject<(() => void) \| null>;       | 【极少使用】如果你绕过 React 的更新机制来更新子节点（比如直接用 js 操作 DOM，或者加载图片造成子节点变宽），我们无法及时检查子节点是否需要截断。这种情况下，你需要通过这个 prop 来获取 updater 来手动调用。见"non-string"这个 Demo。 <br />仅当 type 为 'width' 时有效。                     |          |

### 多行截断

| 属性            | 类型                                                             | 说明                                                                                                | 默认值  |
| --------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------- |
| align           | align?: AlignType;                                               | 气泡对齐方式，可选值参见 Balloon（Tooltip）组件文档                                                 | 'b'(下) |
| ellipsis        | ellipsis?: string \| React.ReactNode;                            | 如何渲染省略号                                                                                      | -       |
| lines           | lines?: number;                                                  | 展示的行数                                                                                          | -       |
| patchPopupProps | patchPopupProps?: (originalProps: BalloonProps) => BalloonProps; | 完全控制 tooltip 的 props。比如指定 popupContainer。<br /> BalloonProps 的类型见 Balloon 组件文档。 | true    |
| popupClassName  | popupClassName?: string;                                         | 当 tooltip 展示时，设置弹层组件的 className，透传给 Popup                                           | -       |
| popupStyle      | popupStyle?: React.CSSProperties;                                | 当 tooltip 展示时，设置弹层组件 style，透传给 Popup                                                 | -       |
| showTooltip     | showTooltip?: boolean;                                           | 在被截断时，是否使用气泡展示完整内容                                                                |         |
| tooltipMaxWidth | tooltipMaxWidth?: number;                                        | tooltip 的最大宽度限制，showTooltip 为 true 时才有效                                                | -       |
