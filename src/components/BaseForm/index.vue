<template>

  <el-form
    :ref="form"
    class="base-form"
    v-bind="$attrs"
    :model="Model"
    :api="api"
    :show-message="showMessage"
    :status-icon="statusIcon"
    :inline="inline"
    label-position="right"
  >
    <template v-for="(item, index) in _formItems">
      <el-form-item
        v-if="item._ifRender"
        :key="index + item.attrs.key"
        :class="item.itemAttrs.className"
        v-bind="item.itemAttrs || {}"
        :prop="item.attrs.key"
      >
        <!--将表单内部的数据通过作用域插槽传给外部-->
        <slot v-if="item.slot" :name="item.slot" :scope="Model" />
        <component
          :is="item.tag"
          v-else
          v-model="Model[item.attrs.key]"
          :class="item.itemAttrs.className"
          v-bind="item.attrs || {}"
          v-on="item.listeners || {}"
        />
      </el-form-item>
    </template>

    <el-form-item v-if="submit || reset" :style="btnStyle">
      <el-button v-if="submit" type="primary" @click="handleSubmit">{{
        $attrs.submitcontext || "确认"
      }}</el-button>
      <el-button v-if="reset" @click="handleReset">{{
        $attrs.resetContext || "重置"
      }}</el-button>
      <el-button v-if="cancle" @click="handleCancle">{{
        $attrs.resetContext || "取消"
      }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { basic } from './basic'

const form = Symbol('form') // 保证每个实例有独一无二的标志位

export default {
  name: 'BaseForm',
  props: {
    formItems: {
      type: Array,
      required: true
    },
    submit: {
      type: Boolean,
      default: true
    },
    reset: {
      type: Boolean,
      default: true
    },
    cancle: {
      type: [Boolean, String],
      default: false
    },
    // 接口函数
    api: {
      type: Function,
      required: true
    },
    // 传入mergeForm允许父组件修改内部Model对象
    mergeForm: {
      type: Object,
      default: () => {}
    },
    btnStyle: {
      type: Object,
      default: () => {
        return {
          'display': 'flex',
          'justify-content': 'flex-end'
        }
      }
    }
  },
  data() {
    return {
      Model: {},
      originModel: {},
      form
    }
  },
  computed: {
    // 根据formItem计算出实际需要让页面渲染的真正的_formItem数据
    _formItems() {
      // this.Model中的值改变触发computed
      let _formItems = []
      _formItems = this.formItems.map(item =>
        this.computeFormItem(item, this.Model)
      )
      return _formItems
    },
    showMessage() {
      return this.$attrs['show-message'] !== false
    },
    statusIcon() {
      return this.$attrs['status-icon'] !== false
    },
    inline() {
      return this.$attrs.inline !== false // 不太理解为什么不直接使用传入的props
    }
  },
  watch: {
    // 使用watch观察父组件传入的formItems,初始化Model对象(只调用一次)
    formItems: {
      handler() {
        this.formItems.forEach(formItem => {
          if (!formItem.attrs || !formItem.attrs.key) return // 跳过没有key的属性(插槽)
          this.$set(
            this.Model,
            formItem.attrs.key,
            formItem.attrs.value ? formItem.attrs.value : ''
          )
        })
        this.originModel = JSON.parse(JSON.stringify(this.Model))
      },
      deep: true,
      immediate: true
    },
    mergeForm: {
      handler() {
        this.mergeModel()
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
  },
  methods: {
    computeFormItem(formItem, Model) {
      const item = { ...formItem }
      // 表单控件的类型
      const tag = item.tag || 'input'
      // 对应到组件映射表
      const basicItem = basic[tag]
      item.tag = basicItem.component
      // 继承基类的属性
      item.attrs = Object.assign({}, basicItem.attrs, item.attrs)
      // 获取动态 Attributes
      if (item.getAttrs) { item.attrs = Object.assign(item.attrs, item.getAttrs(Model)) }
      // 条件渲染
      item._ifRender = item.ifRender ? item.ifRender(Model) : true
      // 防止表单提交时存在多余 key
      if (!item._ifRender) {
        delete Model[item.attrs.key]
      }
      // form-item 配置
      return item
    },
    // 合并Model对象
    mergeModel() {
      Object.assign(this.Model, this.mergeForm)
    },

    // 提交按钮
    handleSubmit() {
      // 调用element的校验,后续可以实现自己的校验组件
      this.$refs[form].validate(async valid => {
        if (valid) {
          // api通过props传入
          const res = await this.api(this.Model)
          this.$emit('after-submit', res)
        }
      })
    },
    handleReset() {
      this.Model = JSON.parse(JSON.stringify(this.originModel))
    },
    handleCancle() {
      this.$emit('cancle')
    }
  }
}
</script>
