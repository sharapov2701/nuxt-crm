export default defineNuxtConfig({
  app: {
    baseURL: '/nuxt-crm/'
  },
  runtimeConfig: {
    public: {
      appWriteId: '',
      collectionComments: '',
      collectionCustomers: '',
      collectionDeals: '',
      dbId: '',
      storageId: ''
    }
  },
  devtools: { enabled: false },
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    'shadcn-nuxt',
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          Lato: {
            wght: [300, 400, 700],
            ital: [300]
          }
        }
      }
    ],
    'nuxt-icon',
    '@pinia/nuxt',
    [
      '@vee-validate/nuxt',
      {
        autoImports: true
      }
    ]
  ],
  shadcn: {
    prefix: 'Ui',
    componentDir: './components/ui'
  },
  pinia: {
    storesDirs: ['./store/**']
  }
})
