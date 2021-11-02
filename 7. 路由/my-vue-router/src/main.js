import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
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

createApp(App).use(router).mount("#app");
