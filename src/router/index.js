import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import VideoWatch from "../views/VideoWatch.vue";
import AdminVideoCreate from "../views/AdminVideoCreate.vue";
import TagVideoList from "../views/TagVideoList.vue";
import AdminVideoList from "../views/AdminVideoList.vue";
import AdminVideoEdit from "../views/AdminVideoEdit.vue";
import AdminUserList from "../views/AdminUserList.vue";
import UserLogin from "../views/UserLogin.vue";
import UserRegistration from "../views/UserRegistration.vue";
import Admin from "../views/Admin.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    beforeEnter: (to, from, next) => {
      let currentUser = JSON.parse(window.localStorage.currentUser);
      if(currentUser && currentUser.name) {
        next();
      } else {
        next('/');
      }
    },
    children: [
      {
        path: "users",
        name: "admin-user-list",
        component: AdminUserList
      },
      {
        path: "videos",
        name: "admin-video-list",
        component: AdminVideoList,
      },
      {
        path: "videos/:id/edit",
        name: "admin-video-edit",
        component: AdminVideoEdit,
        params: true
      },
      {
        path: "video/new",
        name: "video-create",
        component: AdminVideoCreate
      },
    ]
  },
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: '/login',
    name: 'user-login',
    component: UserLogin
  },
  {
    path: '/registration',
    name: 'user-registration',
    component: UserRegistration
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/tag/:id",
    name: "tag",
    component: TagVideoList,
    params: true
  },
  {
    path: "video/:id",
    name: "video-watch",
    component: VideoWatch,
    params: true
  },
];

const router = new VueRouter({
  routes
});

export default router;
