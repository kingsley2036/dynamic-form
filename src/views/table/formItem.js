// var checkSim = (rule, value, callback) => {
//   const regStr = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/
//   if (regStr.test(value)) {
//     callback()
//   } else {
//     callback('手机格式不对')
//   }
// }
const testClass = ['testclass']
export const formItems = [
  {
    tag: 'input',
    itemAttrs: {
      label: '厂家原始设备ID',
      'label-width': '120px',
      rules: [{ required: true, message: '自定义设备编号不能为空', trigger: 'blur' }],
      style: { width: '400px' },
      className: testClass
    },
    attrs: {
      key: 'deviceid',
      value: '',
      placeholder: '厂家原始设备ID'
    }
  },
  {
    tag: 'input',
    itemAttrs: {
      label: '自定义设备编号',
      'label-width': '120px',
      style: { width: '400px' },
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
      'label-width': '120px',
      style: { width: '400px' },
      rules: [{ required: true, message: 'SIM卡不能为空', trigger: 'blur' }
        // { validator: checkSim, trigger: 'blur' }
      ]
    },
    attrs: {
      key: 'SIM',
      placeholder: '请输入SIM号'
    }
  },
  {
    tag: 'radio',
    itemAttrs: {
      label: '设备状态',
      'label-width': '120px',
      style: { width: '400px' }
    },
    attrs: {
      key: 'status',
      value: '',
      options: [
        { value: '1', label: '男' },
        { value: '2', label: '女' }
      ]
    }
  },
  {
    slot: 'slotInput',
    itemAttrs: {
      label: '插槽输入框',
      'label-width': '120px',
      style: { width: '400px' }
    },
    attrs: {
      key: 'slotInput',
      placeholder: '请输入'
    }
  }

]
