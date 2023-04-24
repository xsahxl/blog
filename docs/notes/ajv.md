---
group:
  title: article
toc: content
---

# Ajv 数据校验

Ajv 是一个开源的 JavaScript JSON Schema 验证器。它被广泛应用于 Web 应用程序和 API 开发中，可以有效地验证和强制执行 JSON 数据的结构和内容。如果你想使用 Ajv 来验证你的数据，下面是一些入手 Ajv 的步骤。

## 安装 Ajv

首先，你需要安装 Ajv。你可以在命令行中运行以下命令来安装 Ajv：

```bash
npm install ajv
```

## 创建一个 JSON Schema

接下来，你需要创建一个 JSON Schema 来描述你想要验证的数据结构。一个 JSON Schema 是一个 JSON 对象，它定义了你的数据的结构、类型和验证规则。以下是一个简单的 JSON Schema 示例：

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "age": {
      "type": "number"
    },
    "email": {
      "type": "string",
      "format": "email"
    }
  },
  "required": ["name", "age"]
}
```

这个 JSON Schema 定义了一个包含三个属性的对象：name、age 和 email。name 和 age 必须是字符串和数字类型，而 email 必须是字符串类型，并且必须符合 email 的格式。name 和 age 是必需的属性，因为它们在 required 属性数组中被定义。

## 创建一个 Ajv 实例

接下来，你需要创建一个 Ajv 实例来验证你的数据。你可以使用以下代码来创建一个 Ajv 实例：

```js
const Ajv = require('ajv');
const ajv = new Ajv();
```

这个代码将创建一个新的 Ajv 实例并将其存储在 ajv 变量中。

## 编译 JSON Schema

接下来，你需要使用 ajv.compile()方法将你的 JSON Schema 编译为一个验证函数。你可以使用以下代码来编译你的 JSON Schema：

```js
const validate = ajv.compile(schema);
```

这个代码将使用 ajv.compile()方法将 JSON Schema 编译为一个验证函数，并将其存储在 validate 变量中。

## 验证 JSON 数据

最后，你需要使用 validate()方法来验证你的 JSON 数据是否符合 JSON Schema 的规则。你可以使用以下代码来验证你的 JSON 数据：

```js
const data = {
  name: 'John Doe',
  age: 30,
  email: 'johndoe@example.com',
};

const valid = validate(data);
if (!valid) console.log(validate.errors);
```

这个代码将使用 validate()方法验证你的 JSON 数据是否符合 JSON Schema 的规则。如果数据是有效的，validate()方法将返回 true。如果数据无效，validate()方法将返回 false，并且 validate.errors 将包含有关验证错误的详细信息。

以上是入手 Ajv 的基本步骤。通过使用 Ajv，你可以轻松地验证你的 JSON 数据，并确保它们符合你的预期结构和内容。
