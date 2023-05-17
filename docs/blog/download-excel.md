---
group:
  title: note
  order: 2
toc: content
---

# 如何把数据保存到 excel 文件

```ts
import * as XLSX from 'xlsx';

// 创建excel工作簿对象
const workbook = XLSX.utils.book_new();
// 根据头部数据创建 excel sheet
const worksheet = XLSX.utils.aoa_to_sheet([['UID']]);
// 将工作表添加到工作簿中
XLSX.utils.book_append_sheet(workbook, worksheet);
XLSX.utils.sheet_add_aoa(worksheet, [[111], [222]], {
  origin: -1,
});
// 保存工作簿到文件
XLSX.writeFile(workbook, `demo.xlsx`);
```
