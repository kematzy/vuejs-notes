---
sidebarDepth: 2
---


# VueJS :: Conventiions (aka Style Guide)

[[toc]]


Info taken from [VueJS Style Guide](https://vuejs.org/v2/style-guide/)


## ESSENTIAL


### Multi-word component names

**ESSENTIAL:**

**Component names should always be multi-word, except for root `App` components**.

This [prevents conflicts](http://w3c.github.io/webcomponents/spec/custom/#valid-custom-element-name) with existing and future HTML elements, since all HTML elements are a single word.


```js
Vue.component('todo-item', {
  // ...
})

// TodoItem.vue
<script>
  export default {
    name: 'TodoItem',
    // ...
  }
</script>
```

<br>

-------

### Component data

**ESSENTIAL:**
**Component `data` must be a function**.

When using the `data` property on a component (i.e. anywhere except on `new Vue`), the value must be a function that returns an object.

```js
Vue.component('some-comp', {
  data: function () {
    return {
      foo: 'bar'
    }
  }
})


// In a .vue file
export default {
  data () {
    return {
      foo: 'bar'
    }
  }
}
```

#### In a Root Vue instance

You can use an object directly in a root Vue instance, since only a single instance will ever exist.

```js
// It's OK to use an object directly in a root
// Vue instance, since only a single instance
// will ever exist.
new Vue({
  data: {
    foo: 'bar'
  }
})
```

<br>

-------

### Prop definitions

**ESSENTIAL:**

**Prop definitions should be as detailed as possible**.

In committed code, `prop definitions` should always be as detailed as possible, specifying at least type(s).

Detailed `prop definitions` have two advantages:

* They document the API of the component, so that it’s easy to see how the component is meant to be used.

* In development, Vue will warn you if a component is ever provided incorrectly formatted props, helping you catch potential sources of error.

```js
props: {
  status: String
}
```

#### Even better!
```js
props: {
  status: {
    type: String,
    required: true,
    validator: function (value) {
      return [
        'syncing',
        'synced',
        'version-conflict',
        'error'
      ].indexOf(value) !== -1
    }
  }
}
```

<br>

-------

### Keyed `v-for`

**ESSENTIAL:**

**Always use `key` with `v-for`**.

`key` with `v-for` is always required on components, in order to maintain internal component state down the subtree. Even for elements though, it’s a good practice to maintain predictable behavior, such as [object constancy](https://bost.ocks.org/mike/constancy/) in animations.

```html
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```

<br>

-------

### Avoid `v-if` with `v-for`

**ESSENTIAL:**
**Never use `v-if` on the same element as `v-for`**.

There are two common cases where this can be tempting:

* To filter items in a list (e.g. `v-for="user in users" v-if="user.isActive"`). In these cases, replace users with a new computed property that returns your filtered list (e.g. activeUsers).

* To avoid rendering a list if it should be hidden (e.g. `v-for="user in users" v-if="shouldShowUsers"`). In these cases, move the `v-if` to a container element (e.g. ul, ol).

#### Detailed Explanation

When Vue processes directives, `v-for` has a higher priority than `v-if`, so that this template:

```html
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  <li>
</ul>
```

Will be evaluated similar to:

```js
this.users.map(function (user) {
  if (user.isActive) {
    return user.name
  }
})
```

So even if we only render elements for a small fraction of users, we have to iterate over the entire list every time we re-render, whether or not the set of active users has changed.

By iterating over a computed property instead, like this:

```js
computed: {
  activeUsers: function () {
    return this.users.filter(function (user) {
      return user.isActive
    })
  }
}
```

```html
<ul>
  <li
    v-for="user in activeUsers"
    :key="user.id"
  >
    {{ user.name }}
  <li>
</ul>
```

We get the following benefits:

* The filtered list will _only_ be re-evaluated if there are relevant changes to the `users` array, making filtering much more efficient.

* Using `v-for="user in activeUsers"`, we _only_ iterate over active users during render, making rendering much more efficient.

* Logic is now decoupled from the presentation layer, making maintenance (change/extension of logic) much easier.

We get similar benefits from updating:

```html
<ul>
  <li
    v-for="user in users"
    v-if="shouldShowUsers"
    :key="user.id"
  >
    {{ user.name }}
  <li>
</ul>
```

to:

```html
<ul v-if="shouldShowUsers">
  <li v-for="user in users" :key="user.id">
    {{ user.name }}
  <li>
</ul>
```

By moving the `v-if` to a container element, we’re no longer checking `shouldShowUsers` for _every_ user in the list. Instead, we check it once and don’t even evaluate the `v-for` if `shouldShowUsers` is false.


<br>

-------

### Component style scoping


**ESSENTIAL:**

**For applications, styles in a top-level `App` component and in layout components may be global, but all other components should always be scoped**.

This is only relevant for `single-file components`. It does _not_ require that the `scoped` [attribute](https://vue-loader.vuejs.org/en/features/scoped-css.html) be used. Scoping could be through [CSS modules](https://vue-loader.vuejs.org/en/features/css-modules.html), a class-based strategy such as [BEM](http://getbem.com/), or another library/convention.

**Component libraries, however, should prefer a class-based strategy instead of using the `scoped` attribute**.

This makes overriding internal styles easier, with human-readable class names that don’t have too high specificity, but are still very unlikely to result in a conflict.

#### Using the `scoped` attribute

```html
<template>
  <button class="button button-close">X</button>
</template>

<!-- Using the `scoped` attribute -->
<style scoped>
.button {
  border: none;
  border-radius: 2px;
}

.button-close {
  background-color: red;
}
</style>
```

#### Using CSS modules

```html
<template>
  <button :class="[$style.button, $style.buttonClose]">X</button>
</template>

<!-- Using CSS modules -->
<style module>
.button {
  border: none;
  border-radius: 2px;
}

.buttonClose {
  background-color: red;
}
</style>
```

#### Using the BEM convention

```html
<template>
  <button class="c-Button c-Button--close">X</button>
</template>

<!-- Using the BEM convention -->
<style>
.c-Button {
  border: none;
  border-radius: 2px;
}

.c-Button--close {
  background-color: red;
}
</style>
```

<br>

-------

### Private property names

**ESSENTIAL:**

**Always use the `$_` prefix for custom private properties in a plugin, mixin, etc. Then to avoid conflicts with code by other authors, also include a named scope (e.g. `$_yourPluginName_`)**.

#### Detailed Explanation

Vue uses the `_` prefix to define its own private properties, so using the same prefix (e.g. `_update`) risks overwriting an instance property. Even if you check and Vue is not currently using a particular property name, there is no guarantee a conflict won’t arise in a later version.

As for the `$` prefix, its purpose within the Vue ecosystem is special instance properties that are exposed to the user, so using it for _private_ properties would not be appropriate.

Instead, we recommend combining the two prefixes into `$_`, as a convention for user-defined private properties that guarantee no conflicts with Vue.

```js
var myGreatMixin = {
  // ...
  methods: {
    $_myGreatMixin_update: function () {
      // ...
    }
  }
}
```
<br>

-------






<br>

## STRONGLY RECOMMENDED

IMPROVING READABILITY

<br>



### Component files

**STRONGLY RECOMMENDED:**

**Whenever a build system is available to concatenate files, each component should be in its own file**.

This helps you to more quickly find a component when you need to edit it or review how to use it.

##### Bad
```js
Vue.component('TodoList', {
  // ...
})

Vue.component('TodoItem', {
  // ...
})
```

#### Good
```
components/
|- TodoList.js
|- TodoItem.js

components/
|- TodoList.vue
|- TodoItem.vue
```

<br>

-------

### Single-file component filename casing

**STRONGLY RECOMMENDED:**

**Filenames of [single-file components](https://vuejs.org/v2/guide/single-file-components.html) should either be always PascalCase or always kebab-case**.

PascalCase works best with autocompletion in code editors, as it’s consistent with how we reference components in JS(X) and templates, wherever possible. However, mixed case filenames can sometimes create issues on case-insensitive file systems, which is why kebab-case is also perfectly acceptable.

##### Bad
```
components/
|- mycomponent.vue

components/
|- myComponent.vue
```

#### Good
NOTE!! First CAPITAL letter

```
components/
|- MyComponent.vue

components/
|- my-component.vue
```


<br>

-------

### Base component names

**STRONGLY RECOMMENDED:**

**Base components (a.k.a. presentational, dumb, or pure components) that apply app-specific styling and conventions should all begin with a specific prefix, such as `Base`, `App`, or `V`**.

#### Detailed Explanation

These components lay the foundation for consistent styling and behavior in your application. They may __only__ contain:

* HTML elements,
* other base components, and
* 3rd-party UI components.

But they’ll __never__ contain global state (e.g. from a Vuex store).

Their names often include the name of an element they wrap (e.g. `BaseButton`, `BaseTable`), unless no element exists for their specific purpose (e.g. `BaseIcon`). If you build similar components for a more specific context, they will almost always consume these components (e.g. `BaseButton` may be used in `ButtonSubmit`).

Some advantages of this convention:

* When organized alphabetically in editors, your app’s base components are all listed together, making them easier to identify.

* Since component names should always be multi-word, this convention prevents you from having to choose an arbitrary prefix for simple component wrappers (e.g. `MyButton`, `VueButton`).

* Since these components are so frequently used, you may want to simply make them global instead of importing them everywhere. A prefix makes this possible with Webpack:

```js
var requireComponent = require.context("./src", true, /^Base[A-Z]/)
requireComponent.keys().forEach(function (fileName) {
  var baseComponentConfig = requireComponent(fileName)
  baseComponentConfig = baseComponentConfig.default || baseComponentConfig
  var baseComponentName = baseComponentConfig.name || (
    fileName
      .replace(/^.+\//, '')
      .replace(/\.\w+$/, '')
  )
  Vue.component(baseComponentName, baseComponentConfig)
})
```

##### Bad

```
components/
|- MyButton.vue
|- VueTable.vue
|- Icon.vue
```

#### Good

```
components/
|- BaseButton.vue
|- BaseTable.vue
|- BaseIcon.vue

components/
|- AppButton.vue
|- AppTable.vue
|- AppIcon.vue

components/
|- VButton.vue
|- VTable.vue
|- VIcon.vue
```


<br>

-------

### Single-instance component names

**STRONGLY RECOMMENDED:**

**Components that should only ever have a single active instance should begin with the `The` prefix, to denote that there can be only one**.

This does not mean the component is only used in a single page, but it _will only be used once per page_. These components never accept any props, since they are specific to your app, not their context within your app. If you find the need to add props, it’s a good indication that this is actually a reusable component that is _only used once per page for now_.

##### Bad
```
components/
|- Heading.vue
|- MySidebar.vue
```

#### Good

```
components/
|- TheHeading.vue
|- TheSidebar.vue
```

<br>

-------

### Tightly coupled component names

**STRONGLY RECOMMENDED:**

__Child components that are tightly coupled with their parent should include the parent component name as a prefix__.

If a component only makes sense in the context of a single parent component, that relationship should be evident in its name. Since editors typically organize files alphabetically, this also keeps these related files next to each other.

#### Detailed Explanation

You might be tempted to solve this problem by nesting child components in directories named after their parent. For example:

```
components/
|- TodoList/
   |- Item/
      |- index.vue
      |- Button.vue
   |- index.vue
```

or:

```
components/
|- TodoList/
   |- Item/
      |- Button.vue
   |- Item.vue
|- TodoList.vue
```

This is NOT recommended, as it results in:

* Many files with similar names, making rapid file switching in code editors more difficult.

* Many nested sub-directories, which increases the time it takes to browse components in an editor’s sidebar.


##### Bad

```
components/
|- TodoList.vue
|- TodoItem.vue
|- TodoButton.vue

components/
|- SearchSidebar.vue
|- NavigationForSearchSidebar.vue
```

#### Good

```
components/
|- TodoList.vue
|- TodoListItem.vue
|- TodoListItemButton.vue

components/
|- SearchSidebar.vue
|- SearchSidebarNavigation.vue
```

<br>

-------

### Order of words in component names

**STRONGLY RECOMMENDED:**

**Component names should start with the highest-level (often most general) words and end with descriptive modifying words**.

#### Detailed Explanation

You may be wondering:

> “Why would we force component names to use less natural language?”

In natural English, adjectives and other descriptors do typically appear before the nouns, while exceptions require connector words. For example:

* Coffee with milk
* Soup of the day
* Visitor to the museum

You can definitely include these connector words in component names if you’d like, but the order is still important.

Also note that **what’s considered “highest-level” will be contextual to your app**. For example, imagine an app with a search form. It may include components like this one:

```
components/
|- ClearSearchButton.vue
|- ExcludeFromSearchInput.vue
|- LaunchOnStartupCheckbox.vue
|- RunSearchButton.vue
|- SearchInput.vue
|- TermsCheckbox.vue
```

As you might notice, it’s quite difficult to see which components are specific to the search. Now let’s rename the components according to the rule:

```
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputExcludeGlob.vue
|- SearchInputQuery.vue
|- SettingsCheckboxLaunchOnStartup.vue
|- SettingsCheckboxTerms.vue
```

Since editors typically organize files alphabetically, all the important relationships between components are now evident at a glance.

You might be tempted to solve this problem differently, nesting all the search components under a “search” directory, then all the settings components under a “settings” directory. We only recommend considering this approach in very large apps (e.g. 100+ components), for these reasons:

* It generally takes more time to navigate through nested sub-directories, than scrolling through a single `components` directory.

* Name conflicts (e.g. multiple `ButtonDelete.vue` components) make it more difficult to quickly navigate to a specific component in a code editor.

* Refactoring becomes more difficult, because find-and-replace often isn’t sufficient to update relative references to a moved component.

##### Bad

```
components/
|- ClearSearchButton.vue
|- ExcludeFromSearchInput.vue
|- LaunchOnStartupCheckbox.vue
|- RunSearchButton.vue
|- SearchInput.vue
|- TermsCheckbox.vue
```

#### Good

```
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue
|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue
```

<br>

-------

### Self-closing components

**STRONGLY RECOMMENDED:**

**Components with no content should be self-closing in [single-file components](https://vuejs.org/v2/guide/single-file-components.html), string templates, and JSX - but never in DOM templates**.

**Components that self-close communicate that they not only have no content, but are meant to have no content**.

It’s the difference between a blank page in a book and one labeled “This page intentionally left blank.” Your code is also cleaner without the unnecessary closing tag.

NOTE!!

Unfortunately, HTML doesn’t allow custom elements to be self-closing - only [official “void” elements](https://www.w3.org/TR/html/syntax.html#void-elements). That’s why the strategy is only possible when Vue’s template compiler can reach the template before the DOM, then serve the DOM spec-compliant HTML.

##### Bad

```html
<!-- In single-file components, string templates, and JSX -->
<MyComponent></MyComponent>


<!-- In DOM templates -->
<my-component/>
```

#### Good

```html
<!-- In single-file components, string templates, and JSX -->
<MyComponent/>


<!-- In DOM templates -->
<my-component></my-component>
```


<br>

-------

### Component name casing in templates

**STRONGLY RECOMMENDED:**

**In most projects, component names should always be PascalCase in [single-file components](https://vuejs.org/v2/guide/single-file-components.html) and string templates - but kebab-case in DOM templates.**

PascalCase has a few advantages over kebab-case:

* Editors can autocomplete component names in templates, because PascalCase is also used in JavaScript.

* `<MyComponent>` is more visually distinct from a single-word HTML element than `<my-component>`, because there are two character differences (the two capitals), rather than just one (a hyphen).

* If you use any non-Vue custom elements in your templates, such as a web component, PascalCase ensures that your Vue components remain distinctly visible.


Unfortunately, due to HTML’s case insensitivity, DOM templates must still use kebab-case.

Also note that if you’ve already invested heavily in kebab-case, consistency with HTML conventions and being able to use the same casing across all your projects may be more important than the advantages listed above. In those cases, **using kebab-case everywhere is also acceptable**.


##### Bad

```html
<!-- In single-file components and string templates -->
<mycomponent/>

<!-- In single-file components and string templates -->
<myComponent/>

<!-- In DOM templates -->
<MyComponent></MyComponent>
```

#### Good

```html
<!-- In single-file components and string templates -->
<MyComponent/>


<!-- In DOM templates -->
<my-component></my-component>

OR

<!-- Everywhere -->
<my-component></my-component>
```


<br>

-------

### Component name casing in JS/JSX

**STRONGLY RECOMMENDED:**

Component names in JS/JSX should always be PascalCase, though they may be kebab-case inside strings for simpler applications that only use global component registration through Vue.component.

```js
Vue.component('MyComponent', {
  // ...
})

Vue.component('my-component', {
  // ...
})

import MyComponent from './MyComponent.vue'
export default {
  name: 'MyComponent',
  // ...
}
```

<br>

-------

### Full-word component names

**STRONGLY RECOMMENDED:**

**Component names should prefer full words over abbreviations**.

The autocompletion in editors make the cost of writing longer names very low, while the clarity they provide is invaluable. Uncommon abbreviations, in particular, should always be avoided.

##### Bad
```
components/
|- SdSettings.vue
|- UProfOpts.vue
```

#### Good

```
components/
|- StudentDashboardSettings.vue
|- UserProfileOptions.vue
```

<br>

-------

### Prop name casing

**STRONGLY RECOMMENDED:**

**Prop names should always use camelCase during declaration, but kebab-case in templates and JSX**.

We’re simply following the conventions of each language. Within JavaScript, camelCase is more natural. Within HTML, kebab-case is.

##### Bad

```js
props: {
  'greeting-text': String
}
```
```html
<WelcomeMessage greetingText="hi"/>
```

#### Good

```js
props: {
  greetingText: String
}
```

```html
<WelcomeMessage greeting-text="hi"/>
```

<br>

-------

### Multi-attribute elements

**STRONGLY RECOMMENDED:**

**Elements with multiple attributes should span multiple lines, with one attribute per line**.

In JavaScript, splitting objects with multiple properties over multiple lines is widely considered a good convention, because it’s much easier to read. Our templates and JSX deserve the same consideration.

##### Bad

```html
<img src="https://vuejs.org/images/logo.png" alt="Vue Logo">

<MyComponent foo="a" bar="b" baz="c"/>
```

#### Good

```html
<img
  src="https://vuejs.org/images/logo.png"
  alt="Vue Logo"
>

<MyComponent
  foo="a"
  bar="b"
  baz="c"
/>
```

<br>

-------

### Simple expressions in templates

**STRONGLY RECOMMENDED:**

**Component templates should only include simple expressions, with more complex expressions refactored into computed properties or methods**.

Complex expressions in your templates make them less declarative. We should strive to describe _what_ should appear, not _how_ we’re computing that value. Computed properties and methods also allow the code to be reused.

##### Bad

```js
{{
  fullName.split(' ').map(function (word) {
    return word[0].toUpperCase() + word.slice(1)
  }).join(' ')
}}
```

#### Good

```html
<!-- In a template -->
{{ normalizedFullName }}
```
```js
// The complex expression has been moved to a computed property
computed: {
  normalizedFullName: function () {
    return this.fullName.split(' ').map(function (word) {
      return word[0].toUpperCase() + word.slice(1)
    }).join(' ')
  }
}
```


<br>

-------

### Simple computed properties

**STRONGLY RECOMMENDED:**

**Complex computed properties should be split into as many simpler properties as possible**.

##### Bad
```js
computed: {
  price: function () {
    var basePrice = this.manufactureCost / (1 - this.profitMargin)
    return (
      basePrice -
      basePrice * (this.discountPercent || 0)
    )
  }
}
```

#### Good

```js
computed: {
  basePrice: function () {
    return this.manufactureCost / (1 - this.profitMargin)
  },
  discount: function () {
    return this.basePrice * (this.discountPercent || 0)
  },
  finalPrice: function () {
    return this.basePrice - this.discount
  }
}
```


<br>

-------

### Quoted attribute values

**STRONGLY RECOMMENDED:**

**Non-empty HTML attribute values should always be inside quotes (single or double, whichever is not used in JS)**.

While attribute values without any spaces are not required to have quotes in HTML, this practice often leads to _avoiding_ spaces, making attribute values less readable.

##### Bad
```html
<input type=text>
<AppSidebar :style={width:sidebarWidth+'px'}>
```

#### Good
```html
<input type="text">
<AppSidebar :style="{ width: sidebarWidth + 'px' }">
```


<br>

-------

### Directive shorthands

**STRONGLY RECOMMENDED:**

**Directive shorthands (`:` for `v-bind:` and `@` for `v-on:`) should be used always or never**.

##### Bad

```html
<input
  v-bind:value="newTodoText"
  :placeholder="newTodoInstructions"
>
<input
  v-on:input="onInput"
  @focus="onFocus"
>
```

#### Good
```html
<input
  :value="newTodoText"
  :placeholder="newTodoInstructions"
>
<input
  v-bind:value="newTodoText"
  v-bind:placeholder="newTodoInstructions"
>
<input
  @input="onInput"
  @focus="onFocus"
>
<input
  v-on:input="onInput"
  v-on:focus="onFocus"
>
```

<br>

-------

<br>

## RECOMMENDED

<br>

-------

### Empty lines in component/instance options

**RECOMMENDED:**

**You may want to add one empty line between multi-line properties, particularly if the options can no longer fit on your screen without scrolling**.

When components begin to feel cramped or difficult to read, adding spaces between multi-line properties can make them easier to skim again. In some editors, such as Vim, formatting options like this can also make them easier to navigate with the keyboard.

#### Good
```js
props: {
  value: {
    type: String,
    required: true
  },

  focused: {
    type: Boolean,
    default: false
  },

  label: String,
  icon: String
},

computed: {
  formattedValue: function () {
    // ...
  },

  inputClasses: function () {
    // ...
  }
}
```

<br>

-------


