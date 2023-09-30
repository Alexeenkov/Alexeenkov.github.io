import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from '@/routes/router';
import App from './App.vue';

const app = createApp(App);

app
  .use(createPinia())
  .use(router)
  .mount('#app');

app.directive('autofocus', {
  mounted(el) {
    el.focus();
  },
});
