# 手写 promise

## 基本使用

```js
// 成功
const p = new Promise((resolve, reject) => {
  resolve(1);
});
p.then(
  value => console.log('onResolved', value),
  reason => console.log('onRejected', reason),
);
// onResolved 1

// 失败
const p = new Promise((resolve, reject) => {
  reject(1);
});
p.then(
  value => console.log('onResolved', value),
  reason => console.log('onRejected', reason),
);
// onRejected 1
```

## 三种状态

状态之间，不可逆转。只能是 pending => resolved 或者 pending => rejected

- pending： 待定，初始状态
- fulfilled: 成功
- rejected: 失败

## 基本构造

考虑到`this指向`问题，所以`resolve`和`reject`方法都使用`箭头函数`

```js
class MyPromise {
  static PENDING = 'pending';
  static FULFILLED = 'fulfilled';
  static REJECTED = 'rejected';
  constructor(func) {
    // 记录状态
    this.status = MyPromise.PENDING;
    // 记录结果
    this.result = null;
    func(this.resolve, this.reject);
  }
  resolve = value => {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.FULFILLED;
      this.result = value;
    }
  };
  reject = reason => {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.REJECTED;
      this.result = reason;
    }
  };
}

// 测试
const p1 = new MyPromise((resolve, reject) => {
  resolve('ok');
});
console.log(p1.status); // fulfilled
console.log(p1.result); // ok

const p2 = new MyPromise((resolve, reject) => {
  reject('fail');
});
console.log(p2.status); // rejected
console.log(p2.result); // fail
```

## then 第一节

- 首先明确的是需要返回一个 promise
- 应该根据当前状态做相关处理

```js
class MyPromise {
  static PENDING = 'pending';
  static FULFILLED = 'fulfilled';
  static REJECTED = 'rejected';
  constructor(func) {
    // 记录状态
    this.status = MyPromise.PENDING;
    // 记录结果
    this.result = null;
    func(this.resolve, this.reject);
  }
  resolve = value => {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.FULFILLED;
      this.result = value;
    }
  };
  reject = reason => {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.REJECTED;
      this.result = reason;
    }
  };
  then = (onResolved, onRejected) => {
    const p1 = new MyPromise((resolve, reject) => {
      if (this.status === MyPromise.FULFILLED) {
        /**
         * onResolved
         * 1.如果抛出异常，p1就会失败，reason就是error
         * 2.如果返回的是promise，则返回的promise结果就是p1的结果
         * 3.如果返回的不是promise, p1就会成功，response 就是返回的值
         */
        try {
          const response = onResolved(this.result);
          if (response instanceof MyPromise) {
            response.then(
              value => resolve(value),
              reason => reject(reason),
            );
          } else {
            resolve(response);
          }
        } catch (error) {
          reject(error);
        }
      }

      if (this.status === MyPromise.REJECTED) {
        try {
          const response = onRejected(this.result);
          if (response instanceof MyPromise) {
            response.then(
              value => resolve(value),
              reason => reject(reason),
            );
          } else {
            resolve(response);
          }
        } catch (error) {
          reject(error);
        }
      }
    });
    return p1;
  };
}

// 测试
const p1 = new MyPromise((resolve, reject) => {
  resolve('ok');
});

p1.then(
  value => console.log('onResolved', value),
  reason => console.log('onRejected', reason),
);
// onResolved ok

const p2 = new MyPromise((resolve, reject) => {
  reject('error');
});

p2.then(
  value => console.log('onResolved', value),
  reason => console.log('onRejected', reason),
);
// onRejected error
```

## then 第二节

- `Promise` 测试

```js
console.log(1);
const p1 = new Promise((resolve, reject) => {
  console.log(2);
  setTimeout(() => {
    resolve('ok');
    console.log(3);
  });
});
p1.then(
  value => console.log('onResolved', value),
  reason => console.log('onRejected', reason),
);
console.log(4);

// 1
// 2
// 4
// 3
// onResolved ok
```

- `MyPromise` 测试

```js
console.log(1);
const p1 = new MyPromise((resolve, reject) => {
  console.log(2);
  setTimeout(() => {
    resolve('ok');
    console.log(3);
  });
});
p1.then(
  value => console.log('onResolved', value),
  reason => console.log('onRejected', reason),
);
console.log(4);

// 1
// 2
// 4
// 3
```

可以看到 并没有输出 `onResolved ok`, 通过调试可以发现 `then` 方法里的 `status` 还是 `pending` 状态，然后代码里并没有对 `pending` 状态进行处理，所以不会输出。
我们看上面的代码 `resolve('ok')` 是在 `setTimeout` 里执行的，所以执行 `then` 方法的时候还没有执行 `resolve`, 所以 `then` 方法还应该对 `pending` 状态进行处理

```js
class MyPromise {
  static PENDING = 'pending';
  static FULFILLED = 'fulfilled';
  static REJECTED = 'rejected';
  constructor(func) {
    // 记录状态
    this.status = MyPromise.PENDING;
    // 记录结果
    this.result = null;
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];
    func(this.resolve, this.reject);
  }
  resolve = value => {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.FULFILLED;
      this.result = value;
      for (const callback of this.resolvedCallbacks) {
        callback();
      }
    }
  };
  reject = reason => {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.REJECTED;
      this.result = reason;
      for (const callback of this.rejectedCallbacks) {
        callback();
      }
    }
  };
  then = (onResolved, onRejected) => {
    const p1 = new MyPromise((resolve, reject) => {
      if (this.status === MyPromise.PENDING) {
        this.resolvedCallbacks.push(() => {
          try {
            const response = onResolved(this.result);
            if (response instanceof MyPromise) {
              response.then(
                value => resolve(value),
                reason => reject(reason),
              );
            } else {
              resolve(response);
            }
          } catch (error) {
            reject(error);
          }
        });
        this.rejectedCallbacks.push(() => {
          try {
            const response = onRejected(this.result);
            if (response instanceof MyPromise) {
              response.then(
                value => resolve(value),
                reason => reject(reason),
              );
            } else {
              resolve(response);
            }
          } catch (error) {
            reject(error);
          }
        });
      }
      if (this.status === MyPromise.FULFILLED) {
        /**
         * onResolved
         * 1.如果抛出异常，p1就会失败，reason就是error
         * 2.如果返回的是promise，则返回的promise结果就是p1的结果
         * 3.如果返回的不是promise, p1就会成功，response 就是返回的值
         */
        try {
          const response = onResolved(this.result);
          if (response instanceof MyPromise) {
            response.then(
              value => resolve(value),
              reason => reject(reason),
            );
          } else {
            resolve(response);
          }
        } catch (error) {
          reject(error);
        }
      }

      if (this.status === MyPromise.REJECTED) {
        try {
          const response = onRejected(this.result);
          if (response instanceof MyPromise) {
            response.then(
              value => resolve(value),
              reason => reject(reason),
            );
          } else {
            resolve(response);
          }
        } catch (error) {
          reject(error);
        }
      }
    });
    return p1;
  };
}

// 测试

console.log(1);
const p1 = new MyPromise((resolve, reject) => {
  console.log(2);
  setTimeout(() => {
    resolve('ok');
    console.log(3);
  });
});
p1.then(
  value => console.log('onResolved', value),
  reason => console.log('onRejected', reason),
);
console.log(4);

// 1
// 2
// 4
// onResolved ok
// 3
```

## then 第三节

继第二节的输出结果，可以看到并不符合我们的预期。对于 `resolve` 和 `reject` 应该放到最后的动作进行执行。所以我们加上 `setTimeout` 再试下

```js
class MyPromise {
  static PENDING = 'pending';
  static FULFILLED = 'fulfilled';
  static REJECTED = 'rejected';
  constructor(func) {
    // 记录状态
    this.status = MyPromise.PENDING;
    // 记录结果
    this.result = null;
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];
    func(this.resolve, this.reject);
  }
  resolve = value => {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.FULFILLED;
      this.result = value;
      setTimeout(() => {
        for (const callback of this.resolvedCallbacks) {
          callback();
        }
      });
    }
  };
  reject = reason => {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.REJECTED;
      this.result = reason;
      setTimeout(() => {
        for (const callback of this.rejectedCallbacks) {
          callback();
        }
      });
    }
  };
  then = (onResolved, onRejected) => {
    const p1 = new MyPromise((resolve, reject) => {
      // 抽离成公共的方法
      const handle = calback => {
        try {
          const response = calback(this.result);
          if (response instanceof MyPromise) {
            response.then(
              value => resolve(value),
              reason => reject(reason),
            );
          } else {
            resolve(response);
          }
        } catch (error) {
          reject(error);
        }
      };
      if (this.status === MyPromise.PENDING) {
        this.resolvedCallbacks.push(() => handle(onResolved));
        this.rejectedCallbacks.push(() => handle(onRejected));
      }
      if (this.status === MyPromise.FULFILLED) {
        /**
         * onResolved
         * 1.如果抛出异常，p1就会失败，reason就是error
         * 2.如果返回的是promise，则返回的promise结果就是p1的结果
         * 3.如果返回的不是promise, p1就会成功，response 就是返回的值
         */
        setTimeout(() => {
          handle(onResolved);
        });
      }

      if (this.status === MyPromise.REJECTED) {
        setTimeout(() => {
          handle(onRejected);
        });
      }
    });
    return p1;
  };
}

// 测试

console.log(1);
const p1 = new MyPromise((resolve, reject) => {
  console.log(2);
  setTimeout(() => {
    resolve('ok');
    console.log(3);
  });
});

p1.then(
  value => console.log('onResolved', value),
  reason => console.log('onRejected', reason),
);
console.log(4);

// 1
// 2
// 4
// 3
// onResolved ok
```

## 错误兼容

```js
class MyPromise {
  static PENDING = 'pending';
  static FULFILLED = 'fulfilled';
  static REJECTED = 'rejected';
  constructor(func) {
    // 记录状态
    this.status = MyPromise.PENDING;
    // 记录结果
    this.result = null;
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];
    try {
      func(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }
  resolve = value => {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.FULFILLED;
      this.result = value;
      setTimeout(() => {
        for (const callback of this.resolvedCallbacks) {
          callback();
        }
      });
    }
  };
  reject = reason => {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.REJECTED;
      this.result = reason;
      setTimeout(() => {
        for (const callback of this.rejectedCallbacks) {
          callback();
        }
      });
    }
  };
  then = (_onResolved, _onRejected) => {
    const onResolved = typeof _onResolved === 'function' ? _onResolved : val => val;
    const onRejected =
      typeof _onRejected === 'function'
        ? _onRejected
        : err => {
            throw err;
          };
    const p1 = new MyPromise((resolve, reject) => {
      // 抽离成公共的方法
      const handle = calback => {
        try {
          const response = calback(this.result);
          if (response instanceof MyPromise) {
            response.then(
              value => resolve(value),
              reason => reject(reason),
            );
          } else {
            resolve(response);
          }
        } catch (error) {
          reject(error);
        }
      };
      if (this.status === MyPromise.PENDING) {
        this.resolvedCallbacks.push(() => handle(onResolved));
        this.rejectedCallbacks.push(() => handle(onRejected));
      }
      if (this.status === MyPromise.FULFILLED) {
        /**
         * onResolved
         * 1.如果抛出异常，p1就会失败，reason就是error
         * 2.如果返回的是promise，则返回的promise结果就是p1的结果
         * 3.如果返回的不是promise, p1就会成功，response 就是返回的值
         */
        setTimeout(() => {
          handle(onResolved);
        });
      }

      if (this.status === MyPromise.REJECTED) {
        setTimeout(() => {
          handle(onRejected);
        });
      }
    });
    return p1;
  };
}

// 测试

const p1 = new MyPromise((resolve, reject) => {
  resolve('ok');
});

p1.then(undefined, reason => console.log('onRejected', reason));

// 不会报错，没有任何输出

const p2 = new MyPromise((resolve, reject) => {
  throw new Error('custom error');
});

p2.then(undefined, undefined);

// 不会报错，没有任何输出

const p3 = new Promise((resolve, reject) => {
  throw new Error('custom error');
});

p3.then(
  value => console.log('onResolved', value),
  reason => console.log('onRejected', reason),
);
// onRejected Error: custom error
```

## Promise.resolve 和 Promise.reject

- Promise.resolve(value):
  - 如果 value 是 promise，则 value 的执行结果就是 Promise.resolve 的返回结果
  - 如果 value 不是 promise，则返回成功的 promise，其结果就是 value
- Promise.reject(reason): 返回一个失败的 promise，原因就是 reason

```js
class MyPromise {
  static PENDING = 'pending';
  static FULFILLED = 'fulfilled';
  static REJECTED = 'rejected';
  constructor(func) {
    // 记录状态
    this.status = MyPromise.PENDING;
    // 记录结果
    this.result = null;
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];
    try {
      func(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }
  static resolve = value => {
    return new MyPromise((resolve, reject) => {
      if (value instanceof MyPromise) {
        value.then(resolve, reject);
      } else {
        resolve(value);
      }
    });
  };
  static reject = reason => {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  };
  resolve = value => {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.FULFILLED;
      this.result = value;
      setTimeout(() => {
        for (const callback of this.resolvedCallbacks) {
          callback();
        }
      });
    }
  };
  reject = reason => {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.REJECTED;
      this.result = reason;
      setTimeout(() => {
        for (const callback of this.rejectedCallbacks) {
          callback();
        }
      });
    }
  };
  then = (_onResolved, _onRejected) => {
    const onResolved = typeof _onResolved === 'function' ? _onResolved : val => val;
    const onRejected =
      typeof _onRejected === 'function'
        ? _onRejected
        : err => {
            throw err;
          };
    const p1 = new MyPromise((resolve, reject) => {
      // 抽离成公共的方法
      const handle = calback => {
        try {
          const response = calback(this.result);
          if (response instanceof MyPromise) {
            response.then(
              value => resolve(value),
              reason => reject(reason),
            );
          } else {
            resolve(response);
          }
        } catch (error) {
          reject(error);
        }
      };
      if (this.status === MyPromise.PENDING) {
        this.resolvedCallbacks.push(() => handle(onResolved));
        this.rejectedCallbacks.push(() => handle(onRejected));
      }
      if (this.status === MyPromise.FULFILLED) {
        /**
         * onResolved
         * 1.如果抛出异常，p1就会失败，reason就是error
         * 2.如果返回的是promise，则返回的promise结果就是p1的结果
         * 3.如果返回的不是promise, p1就会成功，response 就是返回的值
         */
        setTimeout(() => {
          handle(onResolved);
        });
      }

      if (this.status === MyPromise.REJECTED) {
        setTimeout(() => {
          handle(onRejected);
        });
      }
    });
    return p1;
  };
}

// 测试
const p1 = MyPromise.reject('fail');

p1.then(
  value => console.log('onResolved1', value),
  reason => console.log('onRejected1', reason),
);
// onRejected1 fail

const p2 = MyPromise.resolve(p1);

p2.then(
  value => console.log('onResolved2', value),
  reason => console.log('onRejected2', reason),
);
// onRejected2 fail

const p3 = MyPromise.resolve('ok');

p3.then(
  value => console.log('onResolved3', value),
  reason => console.log('onRejected3', reason),
);
// onResolved3 ok
```

## catch

```js
catch = onRejected => {
  return this.then(undefined, onRejected);
};
```

## finally

```js
finally = onFinally => {
  return this.then(
    value => MyPromise.resolve(onFinally()).then(() => value),
    reason =>
      MyPromise.resolve(onFinally()).then(() => {
        throw reason;
      }),
  );
};
```

## Promise.all

```js
static all = promises => {
  return new MyPromise((resolve, reject) => {
    const list = [];
    const len = promises.length;
    for (const index in promises) {
      const p = promises[index];
      MyPromise.resolve(p).then(
        value => {
          list[index] = value;
          len--;
          if (len === 0) {
            resolve(list);
          }
        },
        reason => reject(reason),
      );
    }
  });
};
```

## Promise.any

```js
static any = promises => {
  return new MyPromise((resolve, reject) => {
    const errors = [];
    const len = promises.length;
    for (const index in promises) {
      const p = promises[index];
      MyPromise.resolve(p).then(
        value => resolve(value),
        reason => {
          errors[index] = reason;
          len--;
          if (len === 0) {
            reject(new AggregateError(errors, 'All promises were rejected'))
          }
        },
      );
    }
  });
}
```

## Promise.race

```js
static race = promises => {
  return new MyPromise((resolve, reject) => {
    for (const index in promises) {
      const p = promises[index];
      MyPromise.resolve(p).then(
        value => resolve(value),
        reason => reject(reason),
      );
    }
  });
}
```

## 完整代码

```js
class MyPromise {
  static PENDING = 'pending';
  static FULFILLED = 'fulfilled';
  static REJECTED = 'rejected';
  constructor(func) {
    // 记录状态
    this.status = MyPromise.PENDING;
    // 记录结果
    this.result = null;
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];
    try {
      func(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }
  static resolve = value => {
    return new MyPromise((resolve, reject) => {
      if (value instanceof MyPromise) {
        value.then(resolve, reject);
      } else {
        resolve(value);
      }
    });
  };
  static reject = reason => {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  };
  static all = promises => {
    return new MyPromise((resolve, reject) => {
      const list = [];
      const len = promises.length;
      for (const index in promises) {
        const p = promises[index];
        MyPromise.resolve(p).then(
          value => {
            list[index] = value;
            len--;
            if (len === 0) {
              resolve(list);
            }
          },
          reason => reject(reason),
        );
      }
    });
  };
  static any = promises => {
    return new MyPromise((resolve, reject) => {
      const errors = [];
      const len = promises.length;
      for (const index in promises) {
        const p = promises[index];
        MyPromise.resolve(p).then(
          value => resolve(value),
          reason => {
            errors[index] = reason;
            len--;
            if (len === 0) {
              reject(new AggregateError(errors, 'All promises were rejected'));
            }
          },
        );
      }
    });
  };

  static race = promises => {
    return new MyPromise((resolve, reject) => {
      for (const index in promises) {
        const p = promises[index];
        MyPromise.resolve(p).then(
          value => resolve(value),
          reason => reject(reason),
        );
      }
    });
  };
  resolve = value => {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.FULFILLED;
      this.result = value;
      setTimeout(() => {
        for (const callback of this.resolvedCallbacks) {
          callback();
        }
      });
    }
  };
  reject = reason => {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.REJECTED;
      this.result = reason;
      setTimeout(() => {
        for (const callback of this.rejectedCallbacks) {
          callback();
        }
      });
    }
  };
  then = (_onResolved, _onRejected) => {
    const onResolved = typeof _onResolved === 'function' ? _onResolved : val => val;
    const onRejected =
      typeof _onRejected === 'function'
        ? _onRejected
        : err => {
            throw err;
          };
    const p1 = new MyPromise((resolve, reject) => {
      // 抽离成公共的方法
      const handle = calback => {
        try {
          const response = calback(this.result);
          if (response instanceof MyPromise) {
            response.then(
              value => resolve(value),
              reason => reject(reason),
            );
          } else {
            resolve(response);
          }
        } catch (error) {
          reject(error);
        }
      };
      if (this.status === MyPromise.PENDING) {
        this.resolvedCallbacks.push(() => handle(onResolved));
        this.rejectedCallbacks.push(() => handle(onRejected));
      }
      if (this.status === MyPromise.FULFILLED) {
        /**
         * onResolved
         * 1.如果抛出异常，p1就会失败，reason就是error
         * 2.如果返回的是promise，则返回的promise结果就是p1的结果
         * 3.如果返回的不是promise, p1就会成功，response 就是返回的值
         */
        setTimeout(() => {
          handle(onResolved);
        });
      }

      if (this.status === MyPromise.REJECTED) {
        setTimeout(() => {
          handle(onRejected);
        });
      }
    });
    return p1;
  };
  catch = onRejected => {
    return this.then(undefined, onRejected);
  };
  finally = onFinally => {
    return this.then(
      value => MyPromise.resolve(onFinally()).then(() => value),
      reason =>
        MyPromise.resolve(onFinally()).then(() => {
          throw reason;
        }),
    );
  };
}
```
