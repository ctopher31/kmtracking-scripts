// fibinnacci with tail call
const fib = (n, a=0, b=1) => () => {
  console.log(n, a, b);
  if (n <= 1) {
    return a;
  }

  return fib(n-1, a+b, a);
}

// trampoline
const trampoline = (fn) => {
  while (typeof fn === 'function') {
      fn = fn();
  }
  return fn;
};
