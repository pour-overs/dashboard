
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


const PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';

/**
 * Creates a timestamp based id,
 * based on the firebase method of creating IDs
 *    https://gist.github.com/mikelehen/3596a30bd69384624c11
 */
export const uuid = () => {
  let now = new Date().getTime();
  const timeStampChars = new Array(8);

  for (let i = 7; i >= 0; i--) {
    timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
    now = Math.floor(now / 64);
  }

  return timeStampChars.join("");
}