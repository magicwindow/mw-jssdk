let global = (typeof window != 'undefined' ? window : typeof global != 'undefined' ? global : typeof self != 'undefined' ? self : this);
let NativePromise = global['Promise'];
let nativePromiseSupported =
  NativePromise &&
    // Some of these methods are missing from
    // Firefox/Chrome experimental implementations
  'resolve' in NativePromise &&
  'reject' in NativePromise &&
  'all' in NativePromise &&
  'race' in NativePromise &&
    // Older version of the spec had a resolver object
    // as the arg rather than a function
  (function(){
    let resolve;
    new NativePromise(function(r){ resolve = r; });
    return typeof resolve === 'function';
  })();


// async calls
let asyncSetTimer = typeof setImmediate !== 'undefined' ? setImmediate : setTimeout;
let asyncQueue = [];
let asyncTimer;

const PENDING = 'pending';
const SEALED = 'sealed';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
const NOOP = function(){};

function isArray(value) {
  return Object.prototype.toString.call(value) === '[object Array]';
}


function asyncFlush(){
  // run promise callbacks
  for (let i = 0; i < asyncQueue.length; i++) {
    asyncQueue[i][0](asyncQueue[i][1]);
  }

  // reset async asyncQueue
  asyncQueue = [];
  asyncTimer = false;
}

function asyncCall(callback, arg){
  asyncQueue.push([callback, arg]);

  if (!asyncTimer)
  {
    asyncTimer = true;
    asyncSetTimer(asyncFlush, 0);
  }
}


function invokeResolver(resolver, promise) {
  function resolvePromise(value) {
    resolve(promise, value);
  }

  function rejectPromise(reason) {
    reject(promise, reason);
  }

  try {
    resolver(resolvePromise, rejectPromise);
  } catch(e) {
    rejectPromise(e);
  }
}

function invokeCallback(subscriber){
  let owner = subscriber.owner;
  let settled = owner.state_;
  let value = owner.data_;
  let callback = subscriber[settled];
  let promise = subscriber.then;

  if (typeof callback === 'function')
  {
    settled = FULFILLED;
    try {
      value = callback(value);
    } catch(e) {
      reject(promise, e);
    }
  }

  if (!handleThenable(promise, value))
  {
    if (settled === FULFILLED)
      resolve(promise, value);

    if (settled === REJECTED)
      reject(promise, value);
  }
}

function handleThenable(promise, value) {
  let resolved;

  try {
    if (promise === value)
      throw new TypeError('A promises callback cannot return that same promise.');

    if (value && (typeof value === 'function' || typeof value === 'object'))
    {
      let then = value.then;  // then should be retrived only once

      if (typeof then === 'function')
      {
        then.call(value, function(val){
          if (!resolved)
          {
            resolved = true;

            if (value !== val)
              resolve(promise, val);
            else
              fulfill(promise, val);
          }
        }, function(reason){
          if (!resolved)
          {
            resolved = true;

            reject(promise, reason);
          }
        });

        return true;
      }
    }
  } catch (e) {
    if (!resolved)
      reject(promise, e);

    return true;
  }

  return false;
}

function resolve(promise, value){
  if (promise === value || !handleThenable(promise, value))
    fulfill(promise, value);
}

function fulfill(promise, value){
  if (promise.state_ === PENDING)
  {
    promise.state_ = SEALED;
    promise.data_ = value;

    asyncCall(publishFulfillment, promise);
  }
}

function reject(promise, reason){
  if (promise.state_ === PENDING)
  {
    promise.state_ = SEALED;
    promise.data_ = reason;

    asyncCall(publishRejection, promise);
  }
}

function publish(promise) {
  let callbacks = promise.then_;
  promise.then_ = undefined;

  for (let i = 0; i < callbacks.length; i++) {
    invokeCallback(callbacks[i]);
  }
}

function publishFulfillment(promise){
  promise.state_ = FULFILLED;
  publish(promise);
}

function publishRejection(promise){
  promise.state_ = REJECTED;
  publish(promise);
}

/**
 * @class PromisePolyfill
 */
class PromisePolyfill {

  constructor(resolver) {

    this.state_ = PENDING;
    this.then_ = null;
    this.data_ = undefined;

    if (typeof resolver !== 'function') {
      throw new TypeError('Promise constructor takes a function argument');
    }

    if (this instanceof PromisePolyfill === false) {
      throw new TypeError('Failed to construct \'Promise\': Please use the \'new\' operator, this object constructor cannot be called as a function.');
    }

    this.then_ = [];

    invokeResolver(resolver, this);
  }

  /**
   * then
   * @param onFulfillment
   * @param onRejection
   * @returns {*}
   */
  then (onFulfillment, onRejection) {
    let subscriber = {
      owner: this,
      then: new PromisePolyfill(NOOP),
      fulfilled: onFulfillment,
      rejected: onRejection
    };

    if (this.state_ === FULFILLED || this.state_ === REJECTED) {
      // already resolved, call callback async
      asyncCall(invokeCallback, subscriber);
    } else {
      // subscribe
      this.then_.push(subscriber);
    }

    return subscriber.then;
  }

  /**
   *
   * @param onRejection
   * @returns {*}
   */
  catch (onRejection) {
    return this.then(null, onRejection);
  }


  /**
   * @static
   * @param promises
   * @returns {PromisePolyfill}
   */
  static all (promises) {

    if (!isArray(promises)) {
      throw new TypeError('You must pass an array to Promise.all().');
    }

    return new PromisePolyfill((resolve, reject) => {

      let results = [];
      let remaining = 0;

      function resolver(index) {
        remaining++;
        return function (value) {
          results[index] = value;
          if (!--remaining)
            resolve(results);
        };
      }

      for (let i = 0, promise; i < promises.length; i++) {
        promise = promises[i];

        if (promise && typeof promise.then === 'function') {
          promise.then(resolver(i), reject);
        } else {
          results[i] = promise;
        }
      }

      if (!remaining)
        resolve(results);
    });
  }

  /**
   *
   * @param promises
   * @returns {PromisePolyfill}
   */
  static race (promises) {

    if (!isArray(promises)) {
      throw new TypeError('You must pass an array to Promise.race().');
    }

    return new PromisePolyfill(function (resolve, reject) {
      for (let i = 0, promise; i < promises.length; i++) {

        promise = promises[i];

        if (promise && typeof promise.then === 'function') {
          promise.then(resolve, reject);
        } else {
          resolve(promise);
        }
      }
    });
  }

  /**
   * resolve
   * @param value
   * @returns {*}
   */
  static resolve (value) {

    if (value && typeof value === 'object' && value.constructor === PromisePolyfill) {
      return value;
    }

    return new PromisePolyfill(function (resolve) {
      resolve(value);
    });
  }

  /**
   * reject
   * @param reason
   * @returns {PromisePolyfill}
   */
  static reject (reason) {

    return new PromisePolyfill(function (resolve, reject) {
      reject(reason);
    });
  }
}

export default nativePromiseSupported ? global['Promise'] : PromisePolyfill;
