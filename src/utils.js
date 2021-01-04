
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

  /**
   * Sets the state of this deferred to resolve or reject with the parameter Promise
   * @param {Promise} promise A promise that this deferred should resolve or reject with
   */
  settleWith(promise) {
    promise.then(this.resolve);
    promise.catch(this.reject);
  }
}