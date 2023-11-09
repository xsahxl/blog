# 记录 egg-logger 日志换行问题

## 复现场景

```typescript
import { spawn } from 'child_process';
import { Logger, ConsoleTransport } from 'egg-logger';

(async () => {
  const logger = new Logger({});
  logger.set('console', new ConsoleTransport({ level: 'INFO' }));
  const cp = spawn('mvn -v', { shell: true });
  await new Promise((resolve, reject) => {
    cp.stdout.on('data', (chunk) => {
      logger.info(chunk.toString());
    });

    cp.on('exit', (code) => {
      code === 0 ? resolve('') : reject('');
    });
  });
})();
```

输出日志会多出很多换行。经排查得知，经过 logger.info 会自动加一个换行符，egg-logger 默认换行为 os.EOL，所以持续的流式输出不能够使用 logger.info 打印日志。

## 解决

新建一个 logger 文件:

```typescript
import {
  Logger as _Logger,
  LoggerLevel,
  EggLoggerOptions,
  ConsoleTransport,
} from 'egg-logger';
import { set, get } from 'lodash';
import os from 'os';

class Logger extends _Logger {
  private eol: string;

  constructor(props) {
    super({} as EggLoggerOptions);

    const eol = get(props, 'eol', os.EOL);
    this.eol = eol;

    const consoleTransport = new ConsoleTransport({
      level: get(props, 'level', 'INFO'),
      eol,
    });
    this.set('console', consoleTransport);
  }

  /**
   * 用于文件流持续输出，例如：mvn命令在linux下通过文件流有换行异常
   * @param message 输入日志
   * @param level 输出的级别，默认 INFO
   */
  append(message: string, level: LoggerLevel = 'INFO') {
    // 将行尾符修改为 ''
    this.setEol('');

    // @ts-ignore: 输出
    super.log(level, [message]);

    // 修改为初始实例时的行尾
    this.setEol(this.eol);
  }

  private setEol(eol: string = os.EOL) {
    const c = this.get('console') as object;
    const f = this.get('file');

    set(c, 'options.eol', eol);
    if (f) {
      set(f, 'options.eol', eol);
    }
  }
}
```

```typescript
import { spawn } from 'child_process';
import { Logger } from './logger';

(async () => {
  const logger = new Logger({});
  const cp = spawn('mvn -v', { shell: true });
  await new Promise((resolve, reject) => {
    cp.stdout.on('data', (chunk) => {
      logger.append(chunk.toString());
    });

    cp.on('exit', (code) => {
      logger.append('\n'); // 最后根据需要输出一个回车符
      code === 0 ? resolve('') : reject('');
    });
  });
})();
```
