# 水平垂直居中

## 准备工作

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
      }

      .box {
        width: 100px;
        height: 100px;
        border: 1px solid red;
      }
    </style>
  </head>

  <body>
    <div class="wrapper">
      <div class="box"></div>
    </div>
  </body>
</html>
```

## `.box`元素宽高已确定

### absolute + 负margin

```css
.wrapper {
  position: relative;
}

.box {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
}
```

### absolute + margin: auto

```css
.wrapper {
  position: relative;
}

.box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
```

### absolute + calc

```css
.wrapper {
  position: relative;
}

.box {
  position: absolute;
  left: calc(50% - 50px);
  top: calc(50% - 50px);
}
```

## `.box`元素宽高不确定

### absolute + transform

```css
.wrapper {
  position: relative;
}

.box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

### flex

```css
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### grid

```css
.wrapper {
  display: grid;
  justify-content: center;
  align-items: center;
}
```

```css
/* 或者 */
.wrapper {
  display: grid;
}
.box {
  justify-self: center;
  align-self: center;
}
```
