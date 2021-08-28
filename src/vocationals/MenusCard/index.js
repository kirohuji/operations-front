import Card from '@/components/atoms/Card'
import { h } from 'vue'
import _ from 'lodash'
import './index.scss'
/**
 * descriptions: '字典的菜单'
 * props:
 *  title: String
 *  list: Array
 */
export default ({ props, data, listeners }) => (
  <Card {...data}>
    <div class='menu-title'>{_.isString(props.title) ? props.title : h(props.title)}</div>
    {props.list && (
      <el-menu default-active={props.list.length && String(props.list[0][props.index])}>
        {props.list.map((item) => (
          <el-menu-item
            index={String(item[props.index])}
            onClick={() => listeners.click(item)}
            class='dic-menu'
            style={{
              justifyContent: props.isEdit ? 'space-between' : 'flex-end'
            }}
          >
            <span slot='title'>{item.name}</span>
            {props.isEdit && <i class='el-icon-edit-outline'></i>}
          </el-menu-item>
        ))}
      </el-menu>
    )}
  </Card>
)
