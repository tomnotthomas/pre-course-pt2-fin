
var _ = {};

// ARRAYS

// _.first(array, [n])
// Returns an array with the first n elements of an array.
// If n is not provided it returns an array with just the first element.
_.first = function (array, n) {
  // work on an arguments object
  if (typeof array === 'object' && array && array.length && !Array.isArray(array)) {
    array = Array.from(array);
    // array = Array.slice.call(array, 0)
  }
  // return an empty array if array is not an array
  if (!Array.isArray(array)){
    return [];
  }
  // return an array with the first element if n is not a number, is zero, or negative
  if (typeof n !== 'number' || n <= 0) {
    // return array.slice(0,1);
    return [array[0]];
  }
  // return the entire array if n is > length
  // if (n > array.length) {
  //   n = array.length;
  // }
  // return an array with the first n elements of the array
  // let res = [];
  // for (let i = 0; i < n; i++) {
  //   res.push(array[i]);
  // }
  // return res;
  return array.slice(0,n);
};

// _.last(array, [n])
// Returns an array with the last n elements of an array.
// If n is not provided it returns an array with just the last element.
_.last = function (array, n) {
    // work on an arguments object
    if (typeof array === 'object' && array && array.length && !Array.isArray(array)) {
      array = Array.from(array);
      // array = Array.slice.call(array, 0)
    }
    // return an empty array if array is not an array
    if (!Array.isArray(array)){
      return [];
    }
    // return an array with the first element if n is not a number, is zero, or negative
    if (typeof n !== 'number' || n <= 0) {
      // return array.slice(array.length-1);
      return [array[array.length-1]];
    }
    // return the entire array if n is > length
    if (n > array.length) {
      n = array.length;
    }
    // return an array with the first n elements of the array
    return array.slice(array.length-n);
};

// _.uniq(array)
// Produces a duplicate-free version of the array, using === to test equality.
// In particular only the first occurrence of each value is kept.
_.uniq = function (array) {
  // REMOVE-START
  var res = [];
  for (var i = 0; i < array.length; i++) {
    var el = array[i];
    res.indexOf(el) === -1 && res.push(el);
  }
  return res;
  // REMOVE-END
};

// OBJECTS

// _.extend(destination, source)
// Copies all the own enumerable properties in the source object over
// to the destination object, and returns it (without using `Object.assign`).
_.extend = function (destination, source) {
  // REMOVE-START
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) destination[key] = source[key];
  }
  return destination;
  // REMOVE-END
};

// _.defaults(destination, source)
// Fills in undefined properties in the destination object
// with own enumerable properties present in the source object,
// and returns the destination object.
_.defaults = function (destination, source) {
  // REMOVE-START
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key) && destination[key] === undefined) {
      destination[key] = source[key];
    }
  }
  return destination;
  // REMOVE-END
};

// COLLECTIONS

// _.each(collection, iteratee, [context])
// Iterates over a collection of elements (i.e. array or object),
// yielding each in turn to an iteratee function, that is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// Returns the collection for chaining.
_.each = function (collection, iteratee, context) {
  // REMOVE-START
  if (Array.isArray(collection)) {
    for (var i = 0; i < collection.length; i++) {
      iteratee.call(context, collection[i], i, collection);
    }
  } else {
    for (var key in collection) {
      Object.prototype.hasOwnProperty.call(collection, key) && iteratee.call(context, collection[key], key, collection);
    }
  }
  return collection;
  // REMOVE-END
};

// _.contains(collection, value)
// Returns an array of indexes / keys where value can be found in the collection.
// TIP: here's a demo of how you can re-use already implemented methods in clever ways.
_.contains = function (collection, value) {
  var res = [];
  _.each(collection, function (el, key) {
    el === value && res.push(key);
  });
  return res;
};

// _.map(collection, iteratee, [context])
// Returns a new array of values by mapping each value in collection through iteratee.
// Each invocation of iteratee is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
_.map = function (collection, iteratee, context) {
  // REMOVE-START
  var res = [];
  _.each(collection, function (el, key, collection) {
    res.push(iteratee.call(context, el, key, collection));
  });
  return res;
  // REMOVE-END
};

// _.reduce(collection, iteratee, [accumulator], [context])
// Reduce boils down a collection of values into a single value.
// Accumulator is the initial state of the reduction,
// and each successive step of it should be returned by iteratee.
// Iteratee is passed four arguments: (accumulator, element, index|key, collection),
// and bound to the context if one is passed. If no accumulator is passed
// to the initial invocation of reduce, iteratee is not invoked on the first element,
// and the first element is instead passed as accumulator for the next invocation.
_.reduce = function (collection, iteratee, accumulator, context) {
  // REMOVE-START
  _.each(collection, function (el, key) {
    if (accumulator !== undefined) {
      accumulator = iteratee.call(context, accumulator, el, key, collection);
    } else {
      accumulator = el;
    }
  });
  return accumulator;
  // REMOVE-END
};

// _.filter(collection, predicate, [context])
// Looks through each value in the collection, returning an array of all the values
// that pass a truth test (predicate). Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
_.filter = function (collection, predicate, context) {
  // REMOVE-START
  var res = [];
  _.each(collection, function (el, key) {
    predicate.call(context, el, key, collection) && res.push(el);
  });
  return res;
  // REMOVE-END
};

// _.reject(collection, predicate, [context])
// Looks through each value in the collection, returning an array of all the values
// that don't pass a truth test (predicate). Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// TIP: can you reuse _.filter()?
_.reject = function (collection, predicate, context) {
  // REMOVE-START
  return _.filter(collection, function (el, key) {
    return !predicate.call(context, el, key, collection);
  });
  // REMOVE-END
};

// _.every(collection, [predicate], [context])
// Returns true if all values in the collection pass the predicate truth test.
// Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// Short-circuits and stops traversing the list if a false element is found.
// TIP: without the short-circuiting you could reuse _.reduce(). Can you figure how?
// Because of the short-circuiting though, you need to implement it in a similar way as you did at _.each.
_.every = function (collection, predicate, context) {
  // REMOVE-START
  if (Array.isArray(collection)) {
    for (var i = 0; i < collection.length; i++) {
      if (!predicate.call(context, collection[i], i, collection)) return false;
    }
  } else {
    for (var key in collection) {
      if (Object.prototype.hasOwnProperty.call(collection, key) && !predicate.call(context, collection[key], key, collection)) return false;
    }
  }
  return true;
  // REMOVE-END
};

// _.some(collection, [predicate], [context])
// Returns true if any value in the collection passes the predicate truth test.
// Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// Short-circuits and stops traversing the list if a true element is found.
// TIP: what method that you have already implemented can be reused here?
_.some = function (collection, predicate, context) {
  // REMOVE-START
  return !_.every(collection, function (el, key) {
    return !predicate.call(context, el, key, collection);
  });
  // REMOVE-END
};

// _.invoke(collection, methodName, *arguments)
// Returns an array with the results of calling the method
// indicated by methodName on each value in the collection.
// Any extra arguments passed to invoke will be forwarded on to the method invocation.
_.invoke = function (collection, methodName) {
  // REMOVE-START
  var args = Array.prototype.slice.call(arguments, 2);
  return _.map(collection, function (el) {
    return el[methodName].apply(el, args);
  });
  // REMOVE-END
};

// _.pluck(collection, propertyName)
// A convenient version of what is perhaps the most common use-case for map:
// given an array of objects (collection), iterates over each element
// in the collection, and returns an array with all the values
// corresponding to the property indicated by propertyName.
_.pluck = function (collection, propertyName) {
  // REMOVE-START
  return _.map(collection, function (el) {
    return el[propertyName];
  });
  // REMOVE-END
};

// FUNCTIONS

// _.once(func)
// Creates a version of the function that can only be called one time
// (with any arguments). Repeated calls to the modified function
// will have no effect, returning the value from the original call.
// Useful for initialization functions, instead of having to set
// a boolean flag and then check it later.
_.once = function (func) {
  // REMOVE-START
  var called = false;
  var res;
  return function () {
    if (!called) {
      res = func.apply(this, arguments);
      called = true;
    }
    return res;
  };
  // REMOVE-END
};

// _.memoize(func)
// Memoizes a given function by caching the computed result.
// Useful for speeding up slow-running computations.
// You may assume that the memoized function takes only one argument
// and that it is a primitive. Memoize should return a function that when called,
// will check if it has already computed the result for the given argument
// and return that value instead of recomputing it.
_.memoize = function (func) {
  // REMOVE-START
  var cache = {};
  return function (arg) {
    Object.prototype.hasOwnProperty.call(cache, arg) || (cache[arg] = func(arg));
    return cache[arg];
  };
  // REMOVE-END
};

// _.delay(function, wait, *arguments)
// Much like setTimeout(), invokes function after waiting milliseconds.
// If you pass the optional arguments, they will be forwarded
// on to the function when it is invoked.
_.delay = function (func, wait) {
  // REMOVE-START
  var args = Array.prototype.slice.call(arguments, 2);
  setTimeout(function () {
    func.apply(this, args);
  }, wait);
  // REMOVE-END
};

// _.throttle(function, wait)
// Returns a new, throttled version of the passed function that,
// when invoked repeatedly (with any arguments), calls the original function
// at most once every wait milliseconds, and otherwise just returns
// the last computed result. Useful for rate-limiting events
// that occur faster than you can keep up with.
_.throttle = function (func, wait) {
  // REMOVE-START
  var result;
  var lastCalledTime = 0;
  return function () {
    if (Date.now() - lastCalledTime > wait) {
      result = func.apply(this, arguments);
      lastCalledTime = Date.now();
    }
    return result;
  };
  // REMOVE-END
};

// Allow tests to run on the server (leave at the bottom)
if (typeof window === 'undefined') {
  module.exports = _;
}
