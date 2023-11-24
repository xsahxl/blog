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
