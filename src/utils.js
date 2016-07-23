import _ from 'lodash';

export function debounce(func, wait = 10) {
  let timer = null;
  return (...arg) => {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(
      () => {
        func.apply(context, arg);
      },
      wait
    );
  };
}

export function genTimer(fn, delay, wait = 0) {
  let timer;
  let waitTimer;

  const processFn = () => {
    timer = setTimeout(processFn, delay);
    fn();
  };

  const switcher = {
    start() {
      switcher.stop();

      waitTimer = setTimeout(
        () => {
          clearTimeout(waitTimer);
          waitTimer = null;

          processFn();
        },
        wait
      );
    },

    stop() {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      if (waitTimer) {
        clearTimeout(waitTimer);
        waitTimer = null;
      }
    }
  };

  return switcher;
}

function decimalLength(str) {
  const parts = (`${str}`).split('.');

  return parts.length === 2 ? parts[1].length : 0;
}

function float2Int(float, length) {
  const parts = (`${float}`).split('.');
  let result;
  let innerLength = length;

  innerLength = Math.max(0, innerLength);

  if (parts.length === 1) {
    result = float + new Array(innerLength + 1).join('0');
  }
  else {
    innerLength = Math.max(0, innerLength - parts[1].length);
    result = parts.join('') + new Array(innerLength + 1).join('0');
  }

  return +result;
}

export function plus(a, b) {
  const length
  = Math.max(decimalLength(a), decimalLength(b));

  const innerA = float2Int(a, length);
  const innerB = float2Int(b, length);

  return (innerA + innerB) / Math.pow(10, length);
}

export function minus(a, b) {
  const length
  = Math.max(decimalLength(a), decimalLength(b));

  const innerA = float2Int(a, length);
  const innerB = float2Int(b, length);

  return (innerA - innerB) / Math.pow(10, length);
}

export function multiply(a, b) {
  const length
  = Math.max(decimalLength(a), decimalLength(b));

  const innerA = float2Int(a, length);
  const innerB = float2Int(b, length);

  const factor = Math.pow(10, length);

  return (innerA * innerB) / (factor * factor);
}

export function divide(a, b) {
  const length
  = Math.max(decimalLength(a), decimalLength(b));

  const innerA = float2Int(a, length);
  const innerB = float2Int(b, length);

  return innerA / innerB;
}

export function restrictMerge(source = {}, data = {}) {
  const restrict = _.pick(data, Object.keys(source));

  return Object.assign({}, source, restrict);
}