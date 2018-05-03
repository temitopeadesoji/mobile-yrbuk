import Vue from "vue";

import VueRouter from "vue-router";
Vue.use(VueRouter);

import VueAxios from "vue-axios";
import axios from "axios";
Vue.use(VueAxios, axios);

import vueHeadful from 'vue-headful';

Vue.component('vue-headful', vueHeadful);


import App from "./App.vue";

// Izitoast notifiaction
import VueIziToast from 'vue-izitoast';
import 'izitoast/dist/css/iziToast.min.css';
Vue.use(VueIziToast);

// bootstrap vue
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Back to top
import BackToTop from 'vue-backtotop';
Vue.use(BackToTop);

// axios progressbar
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css';
loadProgressBar();

// modal
import VModal from 'vue-js-modal'
Vue.use(VModal)

// image cropper
import VueCroppie from 'vue-croppie';
Vue.use(VueCroppie);

// img lazy load
import VueClazyLoad from 'vue-clazy-load';
Vue.use(VueClazyLoad);

// vue table
import VueGoodTable from 'vue-good-table';
// import the styles 
import 'vue-good-table/dist/vue-good-table.css';
import 'vue2-dropzone/dist/vue2Dropzone.css';
Vue.use(VueGoodTable);

import tinymce from 'vue-tinymce-editor'
Vue.component('tinymce', tinymce)

// website files
import Home from "./components/main/HomeComponent.vue";
import YearBooks from "./components/main/YearBookComponent.vue";
import Memories from "./components/main/MemoriesComponent.vue";
import Contact from "./components/main/ContactComponent.vue";
import NotFound from "./components/main/NotFoundComponent.vue";

// Auth files
import Login from "./components/auth/LoginComponent.vue";
import Signup from "./components/auth/SignupComponent.vue";
import PwdReset from "./components/auth/PasswordResetComponent.vue";

// app files
import Dashboard from "./components/app/DashboardComponent.vue";
import Feedback from "./components/app/FeedbackComponent.vue";
import AccountSettings from "./components/app/AccountSettingsComponent.vue";
import ProfileSettings from "./components/app/ProfileSettingsComponent.vue";
import MyYearbook from "./components/app/MyYearbookComponent.vue";
import UserProfile from "./components/app/UserProfileComponent.vue";
import Program from "./components/app/ProgramComponent.vue";
import SearchResult from "./components/app/SearchResultComponent.vue";
import ManageUser from "./components/app/ManageUserComponent.vue";
import ManageEvent from "./components/app/ManageEventComponent";
import EventDetails from "./components/app/EventDetailsComponent.vue";

require('../public/css/app.css')

const routes = [
  {
    name: "Home",
    path: "/",
    component: Home
  },
  {
    name: "Yearbooks",
    path: "/yearbooks",
    component: YearBooks
  },
  {
    name: "Memories",
    path: "/memories",
    component: Memories
  },
  {
    name: "Contact",
    path: "/contact-us",
    component: Contact
  },
  {
    name: "Login",
    path: "/login",
    component: Login
  },
  {
    name: "Signup",
    path: "/signup",
    component: Signup
  },
  {
    name: "PwdReset",
    path: "/password-reset",
    component: PwdReset
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    component: Dashboard
  },
  {
    name: "MyYearbook",
    path: '/my-yearbook',
    component: MyYearbook
  },
  {
    name: "Feedback",
    path: "/feedback",
    component: Feedback
  },
  {
    name: "AccountSettings",
    path: "/settings/account",
    component: AccountSettings
  },
  {
    name: "ProfileSettings",
    path: "/settings/profile",
    component: ProfileSettings
  },
  {
    name: "UserProfile",
    path: '/user/profile/:id',
    component: UserProfile
  },
  {
    name: "Program",
    path: '/program/:institution/:gradclass/:program',
    component: Program
  },
  { path: '/search-result', 
    component: SearchResult 
  },
  { 
    name: "ManageUser",
    path: '/users/manage', 
    component: ManageUser 
  },
  { 
    name: "ManageEvents",
    path: '/events/manage', 
    component: ManageEvent 
  },
  { 
    name: "EventDetails",
    path: '/events/:year/:id', 
    component: EventDetails 
  },
  { path: '/not-found', 
    component: NotFound 
  },
  { path: '*', 
  component: NotFound
  }
];
const router = new VueRouter({ 
  mode: "history", 
  routes: routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  } 
});
new Vue(Vue.util.extend({ router }, App)).$mount("#app");
