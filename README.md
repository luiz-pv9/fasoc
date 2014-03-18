fasoc
=====
Currently there are four types of data in fasoc: simple attribute, list attribute, hash list attribute and hash attribute.

#### Simple attribute `attrGetterSetter`

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
context.width(); // 100
context.height(); // 200 
```

It's also possible to specify the defualt value and an `accept` function as properties
in the 3rd argument.

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

#### List attribute `listGetterSetter`

Represents a collection of values. For example: phones, books, etc.
###### Examples:

```javascript
// Let's assume that the context from the previous example is still the same
fasoc.listGetterSetter(context, 'ids');
context.ids(); // []
context.ids(20); // context
context.ids(); // [20]
context.ids(30); // context
context.ids(); // [20, 30]
```

Passing an array overrides the whole list
```javascript
fasoc.listGetterSetter(context, 'ids');
context.ids(); // []
context.ids(20); // context
context.ids(); // [20]
context.ids([10]);
context.ids(); // [10]
```

Using the toggle strategy
```javascript
fasoc.listGetterSetter(context, 'ids', {
  strategy: 'toggle'
});

context.ids(30); // context
context.ids(); // [30]
context.ids(30);
context.ids(); // []
```

listGetterSetter also accepts an `accept` function in the config object


#### Hash list attribute `hashListGetterSetter`

Represents a collection of hashes. For example: attributes, styles, countries
The first attribute is the "id" of the hash, used internally to search for the value.
In the example below, the 'name' attribute is the id of each hash in the list

###### Examples:
```javascript
// Let's assume that the context from the previous example is still the same
fasoc.hashListGetterSetter(context, 'style', {
  attributes: ['name', 'value']
});
contex.style(); // []
context.style('background-color', 'red'); // context
context.style(); // [{name: 'background-color', value: 'red'}]
context.style('background-color'); // {name: 'background-color', value: 'red'}

// can also call it with an object
context.style({name: 'border', value: 'black'}); // context
context.style(); // [{name: 'background-color', value: 'red'},{name: 'border', value: 'black'}]
context.style('border'); // {name: 'border', value: 'black'}
context.style('border', 'blue'); // adds another border property
// [{name: 'background-color', value: 'red'},{name: 'border', value: 'black'},{name: 'border', value: 'blue'}]
```

Replace strategy
```javascript
fasoc.hashListGetterSetter(context, 'style', {
  attributes: ['name', 'value'],
  strategy: 'replace'
});

context.style('border', 'blue');
context.style(); // [{name: 'border', value: 'blue'}]
context.style('border', 'red');
context.style(); // [{name: 'border', value: 'red'}]
```


+ Hash attribute (`hashGetterSetter`)
Represents a simple hash

```javascript
fasoc.hashGetterSetter(context, 'config');
context.config('port', '8080');
context.config(); // {'port': '8080'}
context.config('host', 'localhost'); // context
context.config(); // {'port': '8080', 'host': 'localhost'}
context.config('port'); // '8080'
```

#### Chaining
```javascript
context.width(100)
       .height(150)
       .style('border', 'red')
       .config('port', '8080')
       .ids(40, 30);
```

### TODO
+ Support `accept` in hashListGetterSetter and hashGetterSetter
+ Add a whitelist config to hashGetterSetter

