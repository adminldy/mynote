//router/index.js
import VueRouter from "./myVueRouter"; //修改代码
import Home from "../views/Home.vue";
import About from "../views/About.vue";
// Vue.use = function (plugin) {
//   const installedPlugins =
//     this._installedPlugins || (this._installedPlugins = []);
//   if (installedPlugins.indexOf(plugin) > 1) {
//     return this;
//   }
//   // 其他参数
//   const args = Array.from(arguments).slice(1);
//   args.unshift(Vue);
//   if (typeof plugin.install === "function") {
//     plugin.install.apply(this, args);
//   } else if (plugin === "function") {
//     plugin.apply(this, args);
//   }
//   installedPlugins.push(plugin);
//   return this;
// };

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];
const router = new VueRouter({
  mode: "history",
  routes,
});
export default router;
