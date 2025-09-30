import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const messages = {
  en: { hello: 'Hello', chat: { codeblock: { tooltips: { copy_code: 'Copy', collapse: 'Collapse', expand: 'Expand' } } } },
  zh: { hello: '你好', chat: { codeblock: { tooltips: { copy_code: '复制', collapse: '折叠', expand: '展开' } } } }
}

app.use(createPinia())
app.use(router)
app.use(createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages
}))
app.mount('#app')
