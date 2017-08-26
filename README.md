# ajax
A little ajax handler

Settings are required
```js
jstiller.settings = {
  service: {
    frontend: '/',
  },
  path: {
    templates: 'templates',
  },
};
```

```js
jstiller.modules.ajax.getTemplate('layerTemplate', function callback(receivedTemplate) {

});
```

```js
jstiller.modules.ajax.getJSON('api.josestiller.de/articles', function callback(receivedArticles) {

});
```

```js
var data = {
  title: 'title',
  subtitle: 'sub title',
  content: 'content',
};

jstiller.modules.ajax.post('api.josestiller.de/articles', data, function callback(receivedResponse) {

});
```