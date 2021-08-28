export default {
  search: {
    col: 3,
    fields: [
      {
        label: '预警时间',
        prop: 'date',
        component: 'date-picker',
        type: 'datetime',
        placeholder: '选择日期',
        'value-format': 'yyyy-MM-dd HH:mm',
        format: 'yyyy-MM-dd HH:mm',
        size: 'small',
        required: true,
        rules: [
          { required: true, message: '年龄不能为空' },
          { type: 'number', message: '年龄必须为数字值' }
        ]
      },
      {
        label: '审核时间',
        prop: 'aduit',
        component: 'date-picker',
        type: 'datetime',
        placeholder: '选择日期',
        'value-format': 'yyyy-MM-dd HH:mm',
        format: 'yyyy-MM-dd HH:mm',
        size: 'small'
      }
    ]
  },
  form: {
    col: 1,
    fields: [
      {
        label: '所属单位',
        prop: 'date',
        component: 'input',
        type: 'input',
        placeholder: '卫健局',
        size: 'small',
        required: true
      },
      {
        label: '所属角色',
        prop: 'date',
        component: 'radio-border-group',
        size: 'small',
        style: 'width: 598px',
        options: [
          {
            label: '卫健信息科长'
          },
          {
            label: '疾控科科长'
          },
          {
            label: '卫健局局长'
          },
          {
            label: '基位科长'
          },
          {
            label: '卫健局局长'
          },
          {
            label: '基位科长1'
          }
        ],
        required: true
      },
      {
        label: '备注',
        prop: 'date',
        component: 'input',
        type: 'textarea',
        placeholder: '请输入内容',
        style: 'width: 400px',
        size: 'small',
        required: true
      },
      {
        label: '用户成员',
        prop: 'group',
        component: 'select',
        import: true,
        multiple: true,
        'collapse-tags': true,
        placeholder: '请选择',
        // style: 'width: 400px',
        size: 'small',
        required: true,
        options: [
          {
            value: 1,
            label: '卫健信息科长'
          },
          {
            value: 2,
            label: '疾控科科长'
          }
        ]
      },
      {
        label: '审核时间',
        prop: 'aduit',
        component: 'date-picker',
        type: 'datetime',
        placeholder: '选择日期',
        'value-format': 'yyyy-MM-dd HH:mm',
        format: 'yyyy-MM-dd HH:mm',
        size: 'small'
      }
    ]
  }
}
