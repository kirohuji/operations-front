import { organizationService, roleService, dicmanageService } from './service'
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
      (data) => deleteChildren(data.list)
    ]
  }
}
export default {
  schema: [
    {
      prop: 'r_id',
      label: '角色编号',
      width: '100'
    },
    {
      prop: 'name',
      label: '角色名称',
      width: '300',
      forms: {
        size: 'small',
        order: 2,
        placeholder: '请输入内容',
        use: 'input',
        rules: [
          { required: true, message: '请输入角色名称', trigger: 'change' },
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        required: true
      }
    },
    {
      prop: 'node_name',
      label: '所属机构',
      width: '450',
      isHide: () => true,
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
        label: '所属单位',
        edit: false,
        add: false,
        required: true,
        default: function() {
          if (this.template) {
            return this.template.currentState.dataSearchForm.node_name
          }
        }
      }
    },
    {
      prop: 'describe',
      label: '角色描述',
      size: 'small',
      forms: {
        class: 'textarea-435',
        use: 'input',
        type: 'textarea',
        placeholder: '请输入内容'
      }
    },
    {
      prop: 'operation',
      label: '操作',
      scopedSlots: true,
      select: '',
      value: '',
      width: '200px',
      current: null
    }
  ],
  table: {
    data: []
  },
  dialog: {
    layout: {
      use: 'inline'
    },
    add: '新建角色',
    edit: '编辑角色'
  },
  forms: {
    forms: [
      {
        label: '用户成员',
        prop: 'admin_arr',
        use: 'import',
        required: true,
        props: {
          value: 'user_id',
          label: 'name'
        },
        rules: [{ required: true, message: '请添加用户成员', trigger: 'change' }],
        multiple: true,
        size: 'small'
      },
      {
        label: '发布账号',
        prop: 'pub_id',
        use: 'select',
        placeholder: '卫健局',
        size: 'small',
        'allow-create': true,
        async: true,
        filterable: true,
        children: {
          use: 'option',
          options: {
            runner: dicmanageService.gettabtypedata.bind(dicmanageService),
            variables: {
              c_id: 5
            },
            default: [],
            callback: (data) =>
              deleteChildren(data.list).map((item) => {
                return {
                  label: item.name,
                  value: item.node_id
                }
              })
          }
        }
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
        label: '角色搜索',
        order: 2,
        placeholder: '根据角色名称、编号搜索',
        use: 'search',
        size: 'small'
      }
    ],
    filter: false,
    searcher: false,
    actual: true,
    create: '新建角色',
    data: {},
    layout: {
      use: 'inline'
    }
  }
}
