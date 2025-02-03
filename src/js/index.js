// so, this would be a "SuperMonad" or whatever.
// I want an object that obeys this interface.
// I guess we could use tryCatch 
// there was a thought of why not put everythign in a try catch?

import {Str} from './Str/factory.js';
import {Num} from './Num/factory.js';

let n = Num(5);

console.log(n
  .add(5)
  .sub(5)
  .mul(5)
  );


// const Maybe = Object.create(SuperMonad, {
//   isMaybe: { value: true },

//   extract: { 
//       value: function () { return this.isJust ? this.value : null; } 
//   },

//   unit: {
//     value: function(value) {
//       return value == null ? Nothing() : Just(value);
//     }
//   },

//   prop: {
//     value: function(prop) {
//       let val = this.extract()[prop];
//       return val == null ? Nothing() : Just(val);
//     }
//   },

//   call: {
//     value: function() {
//       if (typeof this.extract()[arguments[0]] === "function") {
//         return this.extract()[arguments[0]](...Array.prototype.slice.call(arguments, 1));
//       }
//       return Nothing();
//     }
//   }

// });

// const Just = (x) => Object.create(Maybe, {
//   isJust: { value: true },
//   value: { value: x },
//   map: {
//     value: function(callable) {
//       try {
//         return Maybe.unit(callable(this.extract()));
//       } catch (e) {
//         // console.log(e);
//         return Nothing();
//       }
//     }
//   },
//   bind: {
//     value: function(callable) {
//       try {
//         return callable(this.extract());
//       } catch (e) {
//         // console.log(e);
//         return Nothing();
//       }
//     }
//   }

//   // isJust: { value: true },
//   // isNothing: { value: false },
//   // bind: { value: function (f) { return f(this.value); } },
//   // emit: { value: function () { return this.value; } },
//   // map: { value: function (f) { return MaybeOf(f(this.value)); } },
//   // fork: { value: function (_, g) { return g(this.value); } },
//   // inspect: { value: function () { return `Just(${this.value})`; } }
// });

// const Nothing = () => Object.create(Maybe, {
//   isJust: { value: false },
//   map: {
//     value: function(_) {
//       return this;
//     }
//   },
//   bind: {
//     value: function(_) {
//       return this;
//     }
//   }
//   // bind: { value: function (_) { return this; } },
//   // emit: { value: function () { return this; } },
//   // map: { value: function (_) { return this; } },
//   // fork: { value: function (f, _) { return f(); } },
//   // inspect: { value: function () { return `Nothing`; } }
// });

// console.log(Just({name: "John", what: (x,y) => 'la la' + x + y}).call('whffat', 'asdf', '3asdf'));
