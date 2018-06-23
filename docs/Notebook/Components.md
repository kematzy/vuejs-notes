# COMPONENTS

## [Vue-poll](https://github.com/ppietris/vue-poll)

A Twitter-like vote component, made with Vue.js 2. [DEMO](https://rawgit.com/ppietris/vue-poll/master/index.html)

```html
<template>
  <div>
    <vue-poll v-bind="options" @addvote="addVote"/>
  </div>
</template>

<script> 
  import VuePoll from 'vue-poll'
  export default {        
    data() {
      return {
        options: {
          question: 'What\'s your favourite <strong>JS</strong> framework?',
          answers: [
            { value: 1, text: 'Vue', votes: 53 },
            { value: 2, text: 'React', votes: 35 },
            { value: 3, text: 'Angular', votes: 30 },
            { value: 4, text: 'Other', votes: 10 } 
          ]
        }
      }
    },
    components: {
      VuePoll
    },
    methods: {
      addVote(obj){
        console.log('You voted ' + obj.value + '!');
      }
    }
  }
</script>
```

<br>

------------


## [VueNut](https://lusaxweb.github.io/vuenut.org/)

Vuenut is a component to develop faster and more fluently.

<br>

----------


## [Vue-loading](https://github.com/nulldreams/vue-loading) 

[DEMO](https://vue-loading.netlify.com/)

```html
<loader-dots :color="'#f5cd79'" :background="'#ea8685'" :duration="1" :size="15" />
```


<br>

--------

