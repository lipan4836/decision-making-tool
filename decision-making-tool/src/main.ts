import { createApp } from 'vue';
import './style.scss';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { useOptionsStore } from './store/options';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia).use(router);

const optionsStore = useOptionsStore();
optionsStore.init();

app.mount('#app');
