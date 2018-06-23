module.exports = {
  //
  title: 'VueJS NOTES',
  //
  description: 'A collection of VueJS, Vuex, Firebase related information',
  //
  base: '/vuejs-notes/',
  //
  markdown: {
    //
    lineNumbers: true,
    //
    toc: {
      includeLevel: [2, 3, 4]
    },
    //
    anchor: {
      //
      permalink: true,
      //
      permalinkBefore: true,
      //
      permalinkSymbol: '¶'
    }
  },
  //
  themeConfig: {
    //
    lastUpdated: 'Last Updated', // string | boolean
    //
    nav: [
      { text: 'Home', link: '/' },
      { text: 'VueJS', link: '/VueJS/' },
      { text: 'Firebase', link: '/Firebase/' },
      { text: 'NOTEBOOK', link: '/Notebook/' }
      // { text: 'VueJS.org', link: 'https://vuejs.org' }
    ],
    //
    sidebar: [
      ['/', 'HOME'],
      {
        title: 'NOTEBOOK',
        children: [
          ['/Notebook/', 'Overview'],
          ['/Notebook/GoodLinks', 'Good Links'],
          ['/Notebook/Components', 'Components'],
          ['/Notebook/Plugins', 'Plugins']
        ]
      },
      {
        title: 'VueJS',
        // collapsable: false,
        children: [
          ['/VueJS/', 'Basics'],
          ['/VueJS/Conventions', 'Conventions'],
          ['/VueJS/Vue-Router', 'Router'],
          ['/VueJS/Vuex/', 'Vuex'],
          ['/VueJS/Vuex/Advanced', 'Vuex (Advanced)'],
          ['/VueJS/Vee-Validate', 'Validation']
        ]
      },
      {
        title: 'FIREBASE',
        // collapsable: false,
        children: [ 
          ['/Firebase/', 'Basics'],
          ['/Firebase/Auth', 'Auth'],
          ['/Firebase/FireStore', 'FireStore'],
          ['/Firebase/Storage', 'Storage'],
          ['/Firebase/RealTimeDB', 'DB']
        ]
      }
    ],
    //
    sidebarDepth: 2,
    
    // GITHUB
    // Assumes GitHub. Can also be a full GitLab url.
    repo: 'kematzy/vuejs-notes',
    // Customising the header label
    // Defaults to "GitHub"/"GitLab"/"Bitbucket" depending on `themeConfig.repo`
    // repoLabel: 'Contribute!',

    // Optional options for generating "Edit this page" link

    // if your docs are in a different repo from your main project:
    // docsRepo: 'vuejs/vuepress',
    // if your docs are not at the root of the repo:
    docsDir: 'docs',
    // if your docs are in a specific branch (defaults to 'master'):
    // docsBranch: 'gh-pages',
    // defaults to false, set to true to enable
    editLinks: true
    // custom text for edit link. Defaults to "Edit this page"
    // editLinkText: 'Help us improve this page!'
    
  }
}
