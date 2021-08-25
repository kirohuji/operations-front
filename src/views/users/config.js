import { organizationService } from './service'
import { deleteChildren } from '@/utils'
const orgOptions = function() {
  return {
    cache: 'node_name',
    data: [],
    runner: [
      organizationService.gettabtypedata.bind(organizationService),
      {
        o_id: Number(localStorage.getItem('selectedTab')) - 1
      },
      (data) => {
        debugger
        return deleteChildren(data.list)
      }
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
        use: 'input'
      }
    },
    {
      prop: 'node_name',
      label: '所属机构',
      width: '450',
      add: true,
      order: 1,
      use: 'cascader',
      size: 'small',
      expandTrigger: 'hover',
      'collapse-tags': true,
      cache: 'node_name',
      options: orgOptions,
      props: {
        value: 'node_id',
        label: 'name',
        checkStrictly: false
      },
      searcher: {},
      forms: {
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
      width: '435',
      size: 'small',
      isHide: () => {
        return localStorage.getItem('selectedTab') === '1'
      },
      forms: {
        use: 'radio-group',
        class: 'radio-border-group',
        children: () => {
          return {
            use: 'radio',
            cache: 'r_name',
            options: () => []
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
    create: '新建用户'
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
        use: 'input'
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
