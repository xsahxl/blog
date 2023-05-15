---
group:
  title: note
  order: 2
toc: content
---

# less 循环

这段代码使用了 LESS 语言，是一种 CSS 预处理器。它为 CSS 添加了一些编程语言的特性，例如变量、函数、运算符和循环等，使得编写和维护复杂的 CSS 更加容易和高效。在这段代码中，使用了 LESS 的变量和函数来生成一系列具有不同样式的 CSS 类。通过使用循环函数，可以动态生成多个 CSS 类，而不需要手动编写每个类。这种方式可以使 CSS 代码更加简洁、可读性更高、易于维护。总之，LESS 语言可以让 CSS 更加强大和灵活，提高了前端开发的效率和代码质量。

```less
.loop(@counter) when (@counter >= 0) {
  .p-@{counter} {
    padding: (1px * @counter);
  }
  .pt-@{counter} {
    padding-top: (1px * @counter);
  }
  .pr-@{counter} {
    padding-right: (1px * @counter);
  }
  .pb-@{counter} {
    padding-bottom: (1px * @counter);
  }
  .pl-@{counter} {
    padding-left: (1px * @counter);
  }
  .m-@{counter} {
    margin: (1px * @counter);
  }
  .mt-@{counter} {
    margin-top: (1px * @counter);
  }
  .mr-@{counter} {
    margin-right: (1px * @counter);
  }
  .mb-@{counter} {
    margin-bottom: (1px * @counter);
  }
  .ml-@{counter} {
    margin-left: (1px * @counter);
  }
  .fz-@{counter} {
    font-size: (1px * @counter);
  }
  .loop((@counter - 1));
}
.loop(200);
```

效果等同于

```scss
@for $i from 1 to 200 {
  .pr-#{$i} {
    padding-right: (1px * $i);
  }
  .p-#{$i} {
    padding: (1px * $i);
  }
  .pt-#{$i} {
    padding-top: (1px * $i);
  }
  .pr-#{$i} {
    padding-right: (1px * $i);
  }
  .pb-#{$i} {
    padding-bottom: (1px * $i);
  }
  .pl-#{$i} {
    padding-left: (1px * $i);
  }
  .m-#{$i} {
    margin: (1px * $i);
  }
  .mt-#{$i} {
    margin-top: (1px * $i);
  }
  .mr-#{$i} {
    margin-right: (1px * $i);
  }
  .mb-#{$i} {
    margin-bottom: (1px * $i);
  }
  .ml-#{$i} {
    margin-left: (1px * $i);
  }
  .fz-#{$i} {
    font-size: (1px * $i);
  }
}
```
