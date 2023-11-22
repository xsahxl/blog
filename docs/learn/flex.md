# flex弹性布局

## 容器属性

- flex-direction
- flex-wrap
- flex-flow
- justify-content
- align-items
- align-content

### flex-direction

- row: 默认值，水平布局，从左向右依次排列
- row-reverse: 水平布局，从右向左依次排列
- column: 垂直布局，从上向下依次排列
- column-reverse: 垂直布局，从下向上依次排列

### flex-wrap

- nowrap: 默认值，表示不换行
- wrap: 换行
- wrap-reverse: 换行，但第一行在下面

### flex-flow

是 `flex-direction` 和 `flex-wrap` 的简写形式

### justify-content

- flex-start: 默认值，左对齐
- flex-end: 右对齐
- center: 水平居中
- space-between: 两端对齐，项目之间的距离相等
- space-around: 项目之间的距离相等，项目之间的距离要比项目与边框之间的距离大一倍。

### align-items

- flex-start: 交叉轴的起点对齐（上对齐）
- flex-end: 交叉轴的终点对齐（下对齐）
- center: 垂直居中
- baseline: 项目的第一行文字的基线对齐
- stretch: 默认值，如果项目未设置高度，则占满整个容器的高度

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .wrapper {
        width: 500px;
        border: 1px solid black;
        display: flex;
        align-items: baseline;
      }

      .box {
        width: 100px;
        height: 100px;
        border: 1px solid red;
      }

      .item1 {
        height: 20px;
        padding-top: 30px;
      }

      .item2 {
        height: 80px;
        padding-top: 50px;
      }

      .item3 {
        height: 120px;
        padding-top: 80px;
      }
    </style>
  </head>

  <body>
    <div class="wrapper">
      <div class="box item1">item1</div>
      <div class="box item2">item2</div>
      <div class="box item3">item3</div>
    </div>
  </body>
</html>
```

### align-content

仅适用于侧轴多行

- flex-start: 多行对齐（从上面对齐）
- flex-end: 多行对齐（从下面对齐）
- center: 中间对齐
- space-around: 先两边，后中间平均分布。（项目之间的距离要比两边的距离大一倍）
- space-between: 项目之间平均分配
- stretch: 默认值，侧轴平均分配

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .wrapper {
        width: 500px;
        height: 500px;
        border: 1px solid black;
        display: flex;
        flex-wrap: wrap;
        align-content: space-around;
      }

      .box {
        width: 100px;
        border: 1px solid red;
      }
    </style>
  </head>

  <body>
    <div class="wrapper">
      <div class="box item1">item1</div>
      <div class="box item2">item2</div>
      <div class="box item3">item3</div>
      <div class="box item4">item4</div>
      <div class="box item5">item5</div>
      <div class="box item6">item6</div>
    </div>
  </body>
</html>
```

## 项目属性

### order

用来定义项目的排列顺序，数值越小，排列越靠前，默认值为0

### flex-grow （有剩余空间才会放大）

定义项目的放大比例，默认为0

### flex-shrink （空间不足才会缩小）

定义项目的缩小比例，默认为0

### flex-basis

在分配多余的剩余空间之前，定义项目的宽度，和width差不多

### flex

flex是 `flex-grow`, `flex-shrink`, `flex-basis` 的简写，默认值是 `0, 1, auto`

### align-self

可对项目进行单独设置，覆盖容器中的align-items属性
