<template>
  <div class="table">
    <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
    <div ref="main" id="main"></div>
  </div>
</template>
<script>
import * as echarts from 'echarts'
import 'echarts-gl'

export default {
  name: 'table',
  data () {
    return {}
  },
  created () {},
  mounted () {
    var ROOT_PATH =
      'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples'
    var chartDom = document.getElementById('main')
    var myChart = echarts.init(chartDom)
    var option

    option = {
      backgroundColor: '#000',
      globe: {
        baseTexture: ROOT_PATH + '/data-gl/asset/earth.jpg',
        heightTexture:
          ROOT_PATH + '/data-gl/asset/bathymetry_bw_composite_4k.jpg',
        displacementScale: 0.1,
        shading: 'lambert',
        environment: ROOT_PATH + '/data-gl/asset/starfield.jpg',
        light: {
          ambient: {
            intensity: 0.1
          },
          main: {
            intensity: 1.5
          }
        },
        layers: [
          {
            type: 'blend',
            blendTo: 'emission',
            texture: ROOT_PATH + '/data-gl/asset/night.jpg'
          },
          {
            type: 'overlay',
            texture: ROOT_PATH + '/data-gl/asset/clouds.png',
            shading: 'lambert',
            distance: 5
          }
        ]
      },
      series: []
    }
    option && myChart.setOption(option)
  },
  computed: {},
  components: {},
  methods: {}
}
</script>
<style lang="less" scoped>
.table {
  width: 1695px;
  height: 700px;
  background-color: aqua;
  #main {
    width: 100%;
    height: 100%;
  }
}
</style>
