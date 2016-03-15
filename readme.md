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
const inject = ddi.inject();
inject(A);
inject(B);
inject(C);
// all are launched on injection
inject.then(({moduleA, moduleB, moduleC}) => {
	console.log(moduleA, moduleB, moduleC); // 5 2 7
});
```
