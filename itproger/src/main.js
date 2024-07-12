import { createApp } from "vue";
import App from "./App.vue";
import Button from "primevue/button";
import Toolbar from "primevue/toolbar";
import Sidebar from "primevue/sidebar";
import Image from "primevue/image";
import Menubar from "primevue/menubar";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import FileUpload from 'primevue/fileupload';
import ProgressSpinner from 'primevue/progressspinner';

// import './assets/main.css'
const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.component("Button", Button);
app.component("Image", Image);
app.component("Toolbar", Toolbar);
app.component("Sidebar", Sidebar);
app.component("Menubar", Menubar);
app.component("FileUpload", FileUpload);
app.component("ProgressSpinner", ProgressSpinner);
app.mount("#app");
