export const formItems = [
  {
    tag: 'input',
    itemAttrs: {
      label: '厂家原始设备ID',
      rules: [{ required: true, message: '自定义设备编号不能为空', trigger: 'blur' }]
    },
    attrs: {
      key: 'id',
      value: '',
      placeholder: '厂家原始设备ID'
    }
  },
  {
    tag: 'input',
    itemAttrs: {
      label: '自定义设备编号',
      rules: [{ required: true, message: '自定义设备编号不能为空', trigger: 'blur' }]
    },
    attrs: {
      key: 'code',
      placeholder: '请输入设备编号'
    }
  },
  {
    tag: 'input',
    itemAttrs: {
      label: 'SIM卡',
      rules: [{ required: true, message: 'SIM卡不能为空', trigger: 'blur' }]
    },
    attrs: {
      key: 'SIM',
      placeholder: '请输入SIM号'
    }
  },
  {
    tag: 'radio',
    itemAttrs: {
      label: '设备状态'
    },
    attrs: {
      key: 'checkbox',
      value: true,
      options: [
        { value: '1', label: '男' },
        { value: '2', label: '女' }
      ]
    }
  },
  {
    tag: 'select',
    itemAttrs: {
      label: '兴趣'
    },
    attrs: {
      key: 'hobby',
      value: '2',
      placeholder: '请输入兴趣',
      options: [
        { value: '1', label: '吃饭' },
        { value: '2', label: '睡觉' },
        { value: '3', label: '打豆豆' }
      ]
    }
  },
  {
    tag: 'date',
    itemAttrs: {
      label: '日期'
    },
    attrs: {
      key: 'date',
      value: '2018/11/12'
    }
  },
  {
    tag: 'radio',
    itemAttrs: {
      label: '单选框'
    },
    attrs: {
      value: '1',
      key: 'radio',
      options: [
        { value: '1', label: '男' },
        { value: '2', label: '女' }
      ]
    }
  },
  {
    tag: 'radio',
    itemAttrs: {
      label: '调用后端接口-单选框'
    },
    attrs: {
      value: '1',
      key: 'asyncRadio',
      options: []
    }
  },
  {
    tag: 'checkbox-group',
    itemAttrs: {
      label: '复选框组'
    },
    attrs: {
      value: ['1'],
      key: 'checkboxGroup',
      options: [
        { value: '1', label: '复选框1' },
        { value: '2', label: '复选框2' },
        { value: '3', label: '复选框3' }
      ]
    }
  },
  {
    tag: 'cascader',
    itemAttrs: {
      label: '级联选择器'
    },
    attrs: {
      key: 'cascader',
      value: [],
      options: []
    }
  },
  {
    tag: 'checkbox',
    itemAttrs: {
      label: '复选框'
    },
    attrs: {
      key: 'checkbox',
      value: true,
      label: '复选框'
    }
  },
  {
    slot: 'slotCheckBox',
    itemAttrs: {
      label: '插槽复选框'
    }
  },
  {
    tag: 'textarea',
    itemAttrs: {
      label: '文本框'
    },
    attrs: {
      key: 'textarea'
    }
  }
]
