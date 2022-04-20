import { createApp } from 'vue'
import App from './App.vue'
import components from '@/components/UI'
import JwPagination from 'jw-vue-pagination';

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
})

app.mount('#app')
app.component('jw-pagination', JwPagination);

