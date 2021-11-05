let Vue = null;
class HistoryRoute {
  constructor() {
    this.current = null;
  }
}
class VueRouter {
  constructor(options) {
    this.mode = options.mode || "hash"; // 定义模式 默认hash
    this.routes = options.routes || []; // 你传递的这个路由是一个数组
    this.routesMap = this.createMap(this.routes);
    this.history = new HistoryRoute();
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
        Object.defineProperty(this, "$route", {
          get() {
            return this._root._router.history.current;
          },
        });
      },
    });
    Vue.component("router-link", {
      props: {
        to: String,
      },
      render(h) {
        let mode = this._self._root._router.mode;
        let to = mode === "hash" ? "#" + this.to : this.to;
        return h("a", { attrs: { href: to } }, this.$slots.default);
      },
    });

    Vue.component("router-view", {
      render(h) {
        let current = this._self._root._router.history.current;
        let routeMap = this._self._root._router.routesMap;
        return h(routeMap[current]);
      },
    });
  };
  createMap(routes) {
    const arr = routes.reduce((pre, cur) => {
      pre[cur.path] = cur.component;
      return pre;
    }, {});
    return arr;
  }
}

export default VueRouter;
