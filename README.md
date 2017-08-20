# ajax
A little ajax handler

```js
jstiller.modules.ajax.getTemplate('layerTemplate', function callback(event) {

});
```

```js
jstiller.modules.ajax.getJSON('api.josestiller.de/articles', function callback(event) {

});
```

```js
var data = {
  title: 'title',
  subtitle: 'sub title',
  content: 'content',
};

jstiller.modules.ajax.post('api.josestiller.de/articles', data, function callback(event) {

});
```