import Vue from 'vue'
import Quasar from 'quasar'
// we import the external package
import VueI18n from 'vue-i18n'

// let's say we have a file in /src/i18n containing the language pack
import messages from 'src/i18n'

// we tell Vue to use our Vue package:
Vue.use(VueI18n)

const defaultLocale = Quasar.lang.isoName

export default async ({ app, Vue }) => {
  Vue.use(VueI18n)
  // Set i18n instance on app
  app.i18n = new VueI18n({
    locale: defaultLocale,
    fallbackLocale: defaultLocale,
    messages
  })
}
