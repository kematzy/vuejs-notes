
# NOTEBOOK

A live collection of interesting VueJS stuff to investigate further and possibly incorporate in this site.


<br>

## GOOD LINKS


* [Build A Real Time Chat App With VueJS, Vuex & Cloud Firestore](https://github.com/vuejsdevelopers/blog/wiki/Build-A-Real-Time-Chat-App-With-VueJS,-Vuex-&-Cloud-Firestore)
  build a simple real-time chat application called Firechat which uses Vue and Vuex, and the new Cloud Firestore.

  I'll look at how to integrate Firestore into a Vue.js application and some best practices with Vuex.


* [FIRESTORE: Enable Offline Data](https://firebase.google.com/docs/firestore/manage-data/enable-offline)

  Cloud Firestore supports offline data persistence. This feature caches a copy of the Cloud Firestore data that your app is actively using, so your app can access the data when the device is offline. You can write, read, listen to, and query the cached data. When the device comes back online, Cloud Firestore synchronizes any local changes made by your app to the data stored remotely in Cloud Firestore.
  
  
* [VueFire - FireStore](https://github.com/vuejs/vuefire/tree/firestore)

  VueFire makes it super easy to bind firestore collections and documents and keep your local data always up to date with their remote versions.
  
  
* [Vue.js Application Tutorial - Creating a Simple Budgeting App with Vue](https://matthiashager.com/complete-vuejs-application-tutorial)
  
  
* [Full Stack Vue.js with Firestore](https://medium.com/vue-mastery/full-stack-vue-js-with-firestore-62e2fe2ec1f3)
  
  by Jeff Delaney
  
  Ten years ago, the idea of building a realtime web app was simply out of reach for the average developer. Accomplishing such a feat would require some impressive jujutsu to connect a pub/sub server to a database to websockets and back again.
  
  
* [Introduction to VueFire](https://medium.com/@patrickstivalchaerke/introduction-to-vuefire-4d036acb2ac1)
  
  The intention of this tutorial in article shape is to bring up some content about the Vue.js integration with Firebase. All the aproaches here used can be confirmed in both technologies documentations and VueFires Repo too.
  

* [Hit The Ground Running With Vue.js And Firestore](https://www.smashingmagazine.com/2018/04/vuejs-firebase-firestore/)

  Tutorial about VueJS & Firestore
  
  
* [Managing User Permissions in a VueJS App](https://vuejsdevelopers.com/2018/01/08/vue-js-roles-permissions-casl/)
 
  Tutorial on User Permissions in VueJS
   
   
* [CASL Vue](https://github.com/stalniy/casl/tree/master/packages/casl-vue)
  
  This package allows to integrate @casl/ability into Vue application. So, you can show or hide UI elements based on user ability to see them.
  

* [CASL](https://stalniy.github.io/casl/)

  CASL (pronounced /ˈkæsəl/, like castle) is an isomorphic authorization JavaScript library which restricts what resources a given user is allowed to access. All permissions are defined in a single location (the Ability class) and not duplicated across UI components, API services, and database queries.
  
  Heavily inspired by cancan.
  
  
* [CASL and Vue integration example](https://github.com/stalniy/casl-vue-example)

  This example shows how to integrate CASL auhorization in Vuejs2 application. Read Vue ACL with CASL for detailed explanation.
  Generate with vue-cli
  Note: refactored to use CASL 2.0. See @casl/ability and @casl/vue for details.


* [CASL with Vuex and REST API](https://github.com/stalniy/casl-vue-api-example)


<br>

## PLUGINS

* [vue-cookie](https://github.com/alfhen/vue-cookie#readme)

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

## COMPONENTS

* [Vue-poll](https://github.com/ppietris/vue-poll)

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

* [VueNut](https://lusaxweb.github.io/vuenut.org/)

  Vuenut is a component to develop faster and more fluently.

* [Vue-loading](https://github.com/nulldreams/vue-loading) 

  [DEMO](https://vue-loading.netlify.com/)

  ```html
  <loader-dots :color="'#f5cd79'" :background="'#ea8685'" :duration="1" :size="15" />
  ```


<br>

## ODD BITS

* [vue-sauce](https://botre.github.io/vue-sauce/)

  "View source" (😬) directive for Vue.

  Automatically append up-to-date html documentation to your elements.



