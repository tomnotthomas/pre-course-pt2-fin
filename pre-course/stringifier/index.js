
// Returns a stringified version of input,
// behaving in exactly the same way as JSON.stringify()
function stringifier (input) {
  // undefined, functions => no answer / return undefined
  if (typeof input === 'function' || input === undefined) {
    return undefined;
  };
  // numbers, null => turn number into string
  // if (typeof input === 'number' || input === null) {
  //   return `${input}`
  // }
  // strings, empty strings => doubly quoted strings
  if (typeof input === 'string') {
    // return `"${input}"`;
    return '"'+input+'"';
  }
  // arrays
  if (Array.isArray(input)) {
    // turn into string, elements seperated by commas, enclose by []
    // let str = '[';
    // for (let i = 0; i < input.length; i++) {
    //   if ( typeof input[i] === 'function' || input[i] === undefined) {
    //     // undefined and function elements => null
    //     str += 'null,';
    //   } else {
    //     // any other element => use standard rules to stringify
    //     const newEl = stringifier(input[i]);
    //     str += newEl+',';
    //   }
    // }
    // return str.slice(0, -1) + ']'
    const resArr = input.map((el)=>{
      if ( typeof el === 'function' || el === undefined) {
        // undefined and function elements => null
        return 'null';
      } else {
        // any other element => use standard rules to stringify
        return stringifier(el);
      }
    });
    // return '[' + resArr.join(',') + ']';
    return `[${resArr.join(',')}]`;
  }
  // objects
  if (typeof input === 'object' && input !== null) {
    // const keys = Object.keys(input);
    // let str = '{';
    //   // undefined and function values ommitted
    // for (let i = 0; i<keys.length; i++) {
    //   if (typeof input[keys[i]] !== 'function' && input[keys[i]] !== undefined) {
    //     let newKVP = '"' + String(keys[i]) + '":' + stringifier(input[keys[i]]) + ',';
    //     str += newKVP;
    //   }
    // }
    // return str.slice(0, -1) + '}'
    let str = '{';
    // for (let key of Object.keys(input)) {
    // for (let [key, value] of Object.entries(input)) {
    for (let key in input) {
      // undefined and function values ommitted
      if (Object.prototype.hasOwnProperty.call(input, key) && typeof input[key] !== 'function' && input[key] !== undefined) {
        let newKVP = '"' + String(key) + '":' + stringifier(input[key]) + ',';
        str += newKVP;
      }
    }
    return str.slice(0, -1) + '}';
  }
  return `${input}`;
  // return String(input);
  // return '' + input;
  // return input.toString() // => required method toString available, does not work for null;
}

// {name: 'Gerry', age: 31} => [['name', 'Gerry'], ['age', 31]]

// for / in => keys
// for / of => values / elements

// Allow tests to run on the server (leave at the bottom)
if (typeof window === 'undefined') {
  module.exports = stringifier;
}
