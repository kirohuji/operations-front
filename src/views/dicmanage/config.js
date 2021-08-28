export default {
  form: {
    col: 1,
    fields: [
      {
        label: '字典值分类名称',
        prop: 'name',
        component: 'input',
        type: 'input',
        placeholder: '请输入字典值分类名称',
        size: 'small',
        width: '300px',
        required: true,
        rules: [
          { required: true, message: '请输入字典值分类名称', trigger: 'change' },
          { required: true, message: '请输入字典值分类名称', trigger: 'blur' }
        ]
      },
      // {
      //   label: '分类key',
      //   prop: 'date',
      //   component: 'input',
      //   type: 'input',
      //   placeholder: '卫健局',
      //   size: 'small',
      //   required: true
      // },
      {
        label: '备注',
        prop: 'remark',
        component: 'input',
        type: 'input',
        placeholder: '请输入备注',
        size: 'small',
        required: true,
        rules: [
          { required: true, message: '请输入备注', trigger: 'change' },
          { required: true, message: '请输入备注', trigger: 'blur' }
        ]
      }
    ]
  }
}
