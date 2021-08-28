import { organizationService, roleService } from './service'
import { deleteChildren } from '@/utils'
const rNameOption = function() {
  return {
    runner: roleService.find.bind(roleService),
    variables: {
      type: localStorage.getItem('selectedTab'),
      node_id: Object.keys(this.template.currentSelect).length
        ? this.template.currentSelect.node_id
        : this.template.currentState.dataSearchForm.node_name[this.template.currentState.dataSearchForm.node_name.length - 1]
    },
    default: [],
    callback: (data) => {
      return data.list.map((item) => {
        return {
          label: item.r_id,
          showLabel: item.name
        }
      })
    }
  }
}
const orgOptions = function() {
  return {
    cache: 'node_name',
    data: [],
    runner: [
      organizationService.gettabtypedata.bind(organizationService),
      {
        o_id: Number(localStorage.getItem('selectedTab')) - 1
      },
      (data) => deleteChildren(data.list)
    ]
  }
}
export default {
  schema: [
    {
      prop: 'name',
      label: '姓名',
      width: '150',
      forms: {
        size: 'small',
        order: 2,
        placeholder: '请输入内容',
        use: 'input',
        required: true,
        rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
      }
    },
    {
      prop: 'node_name',
      label: '所属机构',
      width: '450',
      add: true,
      order: 1,
      use: 'base-cascader',
      size: 'small',
      expandTrigger: 'hover',
      'collapse-tags': true,
      // cache: 'node_name',
      options: orgOptions,
      props: {
        value: 'node_id',
        label: 'name',
        checkStrictly: false
      },
      searcher: {
        isReal: true,
        default: [51]
      },
      forms: {
        prop: 'node_id',
        edit: false,
        add: false,
        required: true,
        default: function() {
          if (this.template) {
            return this.template.currentState.dataSearchForm.node_name
          }
        }
      },
      isHide: () => {
        return localStorage.getItem('selectedTab') === '1'
      }
    },
    {
      prop: 'r_name',
      label: '所属角色',
      width: '453',
      size: 'small',
      isHide: () => {
        return localStorage.getItem('selectedTab') === '1'
      },
      forms: {
        prop: 'r_id',
        use: 'radio-group',
        class: 'radio-border-group',
        children: function() {
          return {
            use: 'base-radio',
            options: rNameOption.call(this)
          }
        }
      }
    },
    {
      prop: 'remark',
      label: '备注',
      size: 'small',
      forms: {
        class: 'textarea-435',
        use: 'input',
        type: 'textarea',
        placeholder: '请输入备注'
      }
    },
    {
      prop: 'status',
      label: '状态',
      formatter: (row) => {
        switch (row.status) {
          case 'allow':
            return '在用'
          case 'ban':
            return '禁用'
        }
      }
    },
    {
      prop: 'sex',
      label: '性别',
      size: 'small',
      formatter: (row) => {
        return row?.sex === 1 ? '男' : '女'
      },
      isHide: () => true
    },
    {
      prop: 'type',
      label: '分类',
      isHide: () => true,
      'show-overflow-tooltip': true
    }
  ],
  table: {
    data: []
  },
  dialog: {
    layout: {
      use: 'inline'
    },
    add: '新建用户',
    edit: '编辑用户'
  },
  forms: {
    forms: [
      {
        prop: 'phone',
        label: '手机号',
        width: '150',
        size: 'small',
        order: 3,
        placeholder: '请输入手机号',
        use: 'input',
        required: true,
        rules: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
      }
    ],
    data: {},
    layout: {
      use: 'inline',
      gutter: 20,
      direction: 'column'
    }
  },
  searcher: {
    forms: [
      {
        prop: 'title',
        label: '用户搜索',
        order: 2,
        use: 'search',
        placeholder: '根据姓名，手机号搜索',
        size: 'small'
      }
    ],
    filter: false,
    searcher: false,
    actual: true,
    create: '新建用户',
    data: {},
    layout: {
      use: 'inline'
    }
  }
}
