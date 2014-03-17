fasoc
=====
Currently there are four types of data in fasoc.

+ Simple attribute (`attrGetterSetter`)
Represents a single value. For example: width, speed, id, location, etc,.
###### Examples:

```javascript
var context = {};
fasoc.attrGetterSetter(context, 'width');
context.width(); // undefined
context.width(30); // context
context.width(); // 30

```javascript
fasoc.attrGetterSetter(context, 'height');
context.height(); // undefined
context.height(20); // context
context.height(); // 20

When the function is called as setter it returns the context, allowing the chain
pattern

```javascript
context.width(100).height(200);
context.width(); // 100
context.height(); // 200

+ List attribute (`listGetterSetter`)
Represents a collection of values. For example: phones, 

+ HashList attribute (`hashListGetterSetter`)
+ Hash attribute (`hashGetterSetter`)