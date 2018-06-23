# Plugins



## [vue-cookie](https://github.com/alfhen/vue-cookie#readme)

A Vue.js plugin for manipulating cookies tested up to Vue v2.0.5

```js
var VueCookie = require('vue-cookie');
// Tell Vue to use the plugin
Vue.use(VueCookie);

// From some method in one of your Vue components
this.$cookie.set('test', 'Hello world!', 1);
// This will set a cookie with the name 'test' and
// the value 'Hello world!' that expires in one day

// To get the value of a cookie use
this.$cookie.get('test');

// To delete a cookie use
this.$cookie.delete('test');
```


<br>

-----

