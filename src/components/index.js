import Vue from 'vue'

const ctx = require.context('.', true, /\.vue$/)

ctx
  .keys()
  .filter(path => /^\.\/Base/g.test(path)) // Base开头即全局组件
  .forEach(path => {
    const module = ctx(path)
    /**
     * 兼容 import export 和 require module.export 两种规范
     */
    const component = module.default || module
    Vue.component(component.name, component)
  })
