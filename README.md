fasoc
=====
Currently there are four types of data in fasoc.

###### Simple attribute [`attrGetterSetter`]

Represents a single value. For example: width, speed, id, location, etc,.
###### Examples:

```javascript
var context = {};
fasoc.attrGetterSetter(context, 'width');
context.width(); // undefined
context.width(30); // context
context.width(); // 30

fasoc.attrGetterSetter(context, 'height');
context.height(); // undefined
context.height(20); // context
context.height(); // 20
```

When the function is called as setter it returns the context, allowing the chain
pattern

```javascript
context.width(100).height(200);
context.width(); // 10t 0
context.height(); // 200 
```

It's also possible to specify the defualt value and an `accept` function as the
3rd argument.

```javascript
fasoc.attrGetterSetter(context, 'opacity', {
  defaultValue: 1.0,
  accept: function(value) {
    return value >= 0 && value <= 1;
  }
});

context.opacity(); // 1.0
context.opacity(1.5); // false
context.opacity(); // 1.0 (didn't change value)
context.opacity(0.7); // context
context.opacity(); // 0.7
```

+ List attribute (`listGetterSetter`)
Represents a collection of values. For example: phones, 

+ HashList attribute (`hashListGetterSetter`)
+ Hash attribute (`hashGetterSetter`)