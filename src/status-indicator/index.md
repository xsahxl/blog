---
toc: content
---

# StatusIndicator

## 基本用法

### 指定 type 即可获得标准的状态指示器：

<code src="./demo/basic.tsx" ></code>

### 圆点型指示器：

<code src="./demo/dot.tsx" ></code>

> 建议遵循控制台视觉规范，使用默认的 icon 型指示器

### 自定义 icon：

<code src="./demo/custom-icon.tsx" ></code>

## APIs

StatusIndicator 组件接受的 Props：

| 属性      | 类型                         | 说明                                                                                                                 | 默认值    |
| --------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------- | --------- |
| children  | children?: React.ReactNode;  | 状态文字内容                                                                                                         | -         |
| className | className?: string;          | 自定义 wrapper 类名                                                                                                  | -         |
| iconType  | iconType?: string;           | 自定义图标类型                                                                                                       | -         |
| shape     | shape?: ShapeType;           | 使用图标还是小圆点。可选值：'icon' \| 'dot'                                                                          | 'icon'    |
| style     | style?: React.CSSProperties; | 自定义 wrapper 样式                                                                                                  | -         |
| type      | type?: StatusType;           | 指定状态类型。它会决定图标类型和字体颜色。<br />可选值：'success' \| 'warning' \| 'error' \| 'loading' \| 'disabled' | 'success' |
