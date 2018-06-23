# VueJS :: Vuex

A collection of Vuex related information.


[[toc]]


The key concept to remember is this:

## 1. THE 'ONE TRUE SOURCE'

Vuex is a design pattern that's based upon ReactJS' "Flux" and is intended to **be a single source of the true state of your VueJS application**.

Any data that is **shared** between components, i.e. app data, needs to be kept in a single place, separate from the components that use it.

This single location is called the “**store**”. All components must read app data from this location and not keep their own copy to prevent conflict or disagreement.

##### Vuex Store example:

```js
// Instantiate our Vuex store
const store = new Vuex.Store({
  // "State" is the application data your components
  // will subscribe to
  state: {
    myValue: 0
  }
})
// Components access state from their computed properties
const MyComponent = {
  template: `<div>{{ myValue }}</div>`,
  computed: {
    myValue () {
      // return this.$store.state.myValue
      return store.state.myValue
    }
  }
}
```

<br>

-----



## 2. STORE DATA IS READ-ONLY

Components can freely read data from the store, but **components cannot directly change data in the store**.

Instead components must request the store to change the data via defined functions called “mutations”. The store is responsible for making any changes.

#### Example:
```js
const store = new Vuex.Store({
  state: {
    myValue: 0
  },
  mutations: {
    increment (state, value) {
      state.myValue += value
    }
  }
})
// Need to update a value?
// Wrong! Don't directly change a store value.
store.myValue += 10
// Right! Call the appropriate mutation.
store.commit('increment', 10)
```


<br>

-----

## 3. STORE MUTATIONS ARE SYNCHRONOUS

To make debugging easier, via Vue Devtools, all mutations (changes) are handled **synchronously**, so that we know the order in which our components committed them.

**Synchronous mutations ensure state is not dependent on the sequence and timing of unpredictable events**.


<br>

-------


## 4. KEY CONCEPTS

1. `getters` => READs (gets) the state

2. `mutations` => UPDATES/CHANGEs (commits) the state

3. `actions` => DISPATCHES mutations of the state (async)


<br>

-------

## 5. KEY NAMING CONVENTIONS


<br>

-------


## 6. BASIC VUEX STORE


```js
// src/store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  // "State" is the application data your components
  // will subscribe to
  state: {
    products: []
  },
  //
  getters: {
    saleProducts: (state) => {
      // returns the result
      state.products
    }
  },
  mutations: {
    reducePrice: (state, payload) => {
      // updates the state
    }
  },
  actions: {
    reducePrice: (context, payload) => {
      // handles the async updating of the state
      // ie: context.commit('reducePrice', payload)
    }
  }
})
```

<br>

-----

## 7. ADVANCED VUEX STORE

```js
// src/store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errors from './modules/errors'
import user from './modules/user'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errors,
    user
  },
  // global getters/mutations/actions
  getters,
  mutations,
  actions
})

export default store
```

Then in the various modules you would declare things like this:

```js
// src/store/modules/app.js
const app = {
  state: {
    name: 'myApp'
  },
  getters: {
    appName: state => state.app.name,
    //...
  },
  mutations: {
    APP_SET_NAME: (state, payload) => {
      state.app.name = payload
    }
  },
  actions: {
    setAppName({ commit }, name) {
      commit('APP_SET_NAME', name)
    }
  }
}

export default app
```

and

```js
// src/store/getters.js
const getters = {
  appName: state => state.app.name,
  //...
}
export default getters
```

<br>

-------

## 8. USING VUEX IN COMPONENTS

In your VueJS component you would access and use Vuex's `getters` and `actions` only.

```html
<template>
  <div>
    <h1>{{ appName }}</h1>
    <input name="appName" v-model="appName" />
    <button v-on:click="changeAppName">Change AppName</button>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      appName () {
        // this.$store.app.name
        this.$store.getters.appName
      }
    },
    methods: {
      changeAppName: (name) {
        this.$store.dispatch('setAppName', name)
      }
    }
  }
</script>
```


<br>

-------


```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    products: [
      {name: 'Banana Skin', price: 20},
      //...
    ]
  },
  getters: {
    saleProducts: (state) => {
      var saleProducts = state.products.map( product => {
        return {
          name:  '**' + product.name + '**',
          price: product.price / 2,
        }
      })
      return saleProducts
    }
  },
  mutations: {
    reducePrice: (state, payload) => {
      state.products.forEach( product => {
        product.price -= payload
      })
    }
  },
  actions: {
    reducePrice: (context, payload) => {
      setTimeout(function(){ // reach out for data
        context.commit('reducePrice', payload)
      }, 2000)
    }
  }
})
```

<br>

-------

## GETTERS

```js

```

