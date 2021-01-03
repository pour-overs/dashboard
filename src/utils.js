
export class Deferred extends Promise {

  constructor(executor) {
    // fallsback to a normal promise if an executor is passed
    // this makes it actually then-able and await-able
    if (executor) {
      super(executor);
    }
    else {
      let resolve, reject;
      super((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
      });

      this.resolve = resolve;
      this.reject = reject;
    }
  }
}