# deferred-di

This is small library that enables Promise-based dependency injection.

## module definition
```javascript
import ddi from 'deferred-di';

const A = ddi('moduleA', () => 5);
const B = ddi('moduleB', () => Promise.resolve(2));
const C = ddi(
	'moduleC',
	'moduleA, moduleB',
	(moduleA, moduleB) => moduleA + moduleB
);
```

## module injection
```javascript
// continuing above
// so we have A,B,C with module definitions
ddi.inject() // <-- this returns a function
    (A)
    (B)
    (C)
    // every injection function
    // exposes then and catch as promise
    .then(({moduleA, moduleB, moduleC}) => {
	    console.log(moduleA, moduleB, moduleC); // 5 2 7
    });
```
