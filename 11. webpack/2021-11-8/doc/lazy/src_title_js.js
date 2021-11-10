window["webpack5"].push(["src_title_js"], {
  './src/title.js': (module, exports, require) => {
    require.r(exports)
    require.d(exports, {
      default: () => DEFAULT_TEXT
    })
    const DEFAULT_TEXT = 'title'
  }
})