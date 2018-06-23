
# Six random issues and their solutions in VueJS

[URL](https://medium.com/@stijlbreuk/six-random-issues-and-their-solutions-in-vuejs-b16d470a6462)

[[toc]]

<br>

-------


[@Stijlbreuk](https://stijlbreuk.nl/), we ❤️ VueJS. We quickly fell in love with it after testing it and comparing it with the usual suspects such as Angular, React, Ember and some unusual suspects such as Mithril and a very nice compact Vue-like library: [RivetsJS](http://rivetsjs.com/).

For us Vue came out the winner. It just felt good. The learning curve isn’t too steep compared to other frameworks. The mental model just makes sense for our designers and developers. Also the community is growing and has a positive vibe.
A Stijlbreuk,VueJS powered, project in production

When you are putting a library or a framework like Vue into practice, chances are that you run into some issues, problems or challenges of which you are not immediately sure how to solve them.

Of course you can read the [Vue Guide](https://vuejs.org/v2/guide/), search [Stack Overflow](https://stackoverflow.com/questions/tagged/vue.js) for fellow sufferers with the same issue, or ask (the very helpful and friendly) people in the [Vue chatroom](https://discordapp.com/invite/HBherRA%29). But to save you some time, we have collected some of our issues and their solutions that we encountered while learning Vue and Vuex more in depth;

1. How to cast the String of an input field to a Number?
2. Why is my Array not reactive when updating an index?
3. How to watch a specific property on an Object?
4. How to watch an Object for ANY property change?
5. How to dispatch an action on another namespaced module in Vuex?
6. How to pass data to a getter method within a module in Vuex?


## Reactivity

### 1. How to cast the String of an input field to a Number?

We’ll start simple. The following will save you some time casting a String to a Number:

```html
<template>
  <input v-model.number="age" type="number">
</template>
<script>
  export default {
    data() {
      return {
        age: 0
      }
    }
  };
</script>
```
**TIP:** You can also use `v-model.trim` to trim the whitespace of the input.


------


### 2. Why is my Array not reactive when updating an index?

You might get the idea that your array data is not updating when setting data to an index directly. Vue doesn’t detect directly setting a value to the index of an Array. The following does NOT update your bindings:

```js
this.artists[5] = 'Totally Enormous Extinct Dinosaurs';
```

You can use `Array.splice` to solve this problem:

```js
this.artists.splice(5, 1, 'Totally Enormous Extinct Dinosaurs');
```

----------

### 3. How to watch a specific property on an Object?

One of the great things of Vue is of course its reactivity. When you change a property on the data object, it will magically update its bindings. You probably know that Vue allows you to watch a property on the data Object like so:

```js
data() {
  return {
    track: 'Household goods'
  }
},
watch: {
  track(newValue, oldValue) {
    // do something with newValue or oldValue
  }
}
```

However you might be interested in watching a specific property within an Object. You can do this by specifying a method name with the key path as String within the watch Object:

```js
data() {
  return {
    house: {
      livingroom: {
        lights: 4
      }
    }
  }
},
watch: {
  'house.livingroom.lights' : function(newVal, oldVal) {
    // triggered when lights is changed
  }
}
```

------------


### 4. How to watch an Object for ANY property change?

It could also be that you want to know when any property is changed within an Object. This is somewhat more elaborate as you have to specify an Object with a method and set the ‘deep’ property to true. This will trigger the handler when any nested property is changed within the object that is being watched:

```js
watch: {
  house: {
    handler(newVal, oldVal) {
      // triggered when anything is changed within the Object
    },
    deep: true
  }
}
```

------

## Vuex

When your application scales up a bit and using an Event bus does not cut it anymore, you might want to invest some time in studying Vuex. Vuex manages the state of your application. Although it might seem daunting and somewhat cumbersome at first, it is actually not that bad and using it properly will make your application more structured and thus less cluttered.

### 5. How to dispatch an action on another namespaced module in Vuex?

Sometimes you want to call an action from one namespaced module within another namespaced module:

```js
dispatch('namespace/action', {
  data: 'your payload',
}, { root: true });
```

Notice the options Object with `root` set to `true` after the payload.

-------

### 6. How to pass data to a getter method within a module in Vuex?

Getters allow you to request data from your Vuex store. Sometimes you need some specific data from the store without changing state. There is a clever way to use a getter method to do this, which was mentioned in this GitHub issue.

```js
getters: {
  getMessageById: state => id =>
    state.messages.find(message => message.id === id),
},
```

The ES6 syntax might be short, but it’s not always clear if you are not familiar with it. So here’s the less fancy ES5 syntax to make it somewhat more verbose:

```js
getters: {
  getMessageById: function(state) {
    return function(id) {
      return state.messages.find(function(message) {
        return message.id === id;
      });
    }
  }
}
```

In JavaScript functions are first class citizens. This makes it possible to pass them around. This also means that a function can return another function, which is the case here. When you call `getMessageById`, the `state` parameter is dependency injected by Vuex. This will allow you to access… well.. your state. You can return a function from this function, which will allow you to pass one (or more) arguments from your component.

You can call the getter as follows from your component:

```js
computed: {
  …mapGetters('messageModuleNamespace', [
    'getMessageById',
  ]),
},
methods: {
  someMethod() {
    const message = this.getMessageById(1);
  }
}
```

We hope at least one of these random issues and their solutions will help you in your journey of becoming a VueJS master! If you have any questions or have had issues and solutions yourself that would fit this list, please don’t hesitate to leave a comment.


