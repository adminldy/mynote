let Vue = null;
class VueRouter {
  constructor(options) {
    this.mode = options.mode || "hash"; // 定义模式 默认hash
    this.routes = options.routes || []; // 你传递的这个路由是一个数组
    this.routesMap = this.createMap(this.routes);
    console.log(this.routesMap);
  }
  install = (v) => {
    Vue = v;
    Vue.mixin({
      beforeCreate() {
        if (this.$options && this.$options.router) {
          // 如果是根组件
          this._root = this;
          this._router = this.$options.router;
        } else {
          this._root = this.$parent && this.$parent._root;
        }
        Object.defineProperty(this, "$router", {
          get() {
            return this._root._router;
          },
        });
      },
    });
    Vue.component("router-link", {
      template: '<a href="#">router-link</a>',
    });

    Vue.component("router-view", {
      template: "<div>router-view</div>",
    });
  };
  createMap(routes) {
    return routes.reduce((pre, cur) => (pre[cur.path] = cur.component), {});
  }
}

export default VueRouter;
