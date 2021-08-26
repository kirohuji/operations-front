<template>
  <div>
    <Card style="padding: 32px;padding-top: 0;display: flex;flex-wrap: wrap;justify-content: flex-start;">
      <el-card
        v-for="(card, index) in cards.data"
        :key="index"
        :body-style="{ padding: '0px' }"
        style="min-width: 320px;height:255px;margin: 24px;"
      >
        <img :src="require(`../../assets/${cards.map.get(card.name)}.png`)" style="width: 320px;height:180px">
        <div style="padding: 14px;">
          <span>{{ card.name }}</span>
          <div class="bottom clearfix">
            <el-button type="text" class="button" @click="goto(card.url)">查看</el-button>
          </div>
        </div>
      </el-card>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/atoms/Card'
import { service } from './service'
export default {
  components: {
    Card
  },
  data() {
    return {
      cards: {
        map: new Map([
          ['常态化疫情预警预测管理平台', 'epidemicearlywarning'],
          ['区域健康画像管理平台', 'healthyportrait'],
          ['两慢人群健康管理平台', 'keygroups'],
          ['医共体居民就医行为监测平台', 'residentbehavior'],
          ['萧山区全民健康红黄绿数字化管理平台', 'ryg']
        ]),
        selected: {},
        data: []
      }
    }
  },
  thenable: {
    cardData() {
      return {
        target: 'cards.data',
        runner: service.getlist.bind(service),
        callback: (res) => {
          return res.list
        },
        immediate: true
      }
    }
  },
  methods: {
    goto(url) {
      window.open(url)
    }
  }
}
</script>
