<template>
  <div id="login" class="login-bg" v-loading="loading">
    <vue-particles
      class="login-bg"
      color="#fff8e7"
      :particleOpacity="0.7"
      :particlesNumber="160"
      shapeType="circle"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <LoginFrom @open="loading = true" @close="loading = false"></LoginFrom>
  </div>
</template>

<script>
import LoginFrom from '../login/components/login-from.vue'
export default {
  name: 'login',
  components: { LoginFrom },
  data () {
    return {
      loading: false
    }
  }
}
//   color: String类型。默认’#dedede’。粒子颜色。
// particleOpacity: Number类型。默认0.7。粒子透明度。
// particlesNumber: Number类型。默认80。粒子数量。
// shapeType: String类型。默认’circle’。可用的粒子外观类型有：“circle”,“edge”,“triangle”, “polygon”,“star”。
// particleSize: Number类型。默认80。单个粒子大小。
// linesColor: String类型。默认’#dedede’。线条颜色。
// linesWidth: Number类型。默认1。线条宽度。
// lineLinked: 布尔类型。默认true。连接线是否可用。
// lineOpacity: Number类型。默认0.4。线条透明度。
// linesDistance: Number类型。默认150。线条距离。
// moveSpeed: Number类型。默认3。粒子运动速度。
// hoverEffect: 布尔类型。默认true。是否有hover特效。
// hoverMode: String类型。默认true。可用的hover模式有: “grab”, “repulse”, + “bubble”。
// clickEffect: 布尔类型。默认true。是否有click特效。
// clickMode: String类型。默认true。可用的click模式有: “push”, “remove”, “repulse”, “bubble”
</script>

<!-- // 根据自己的情况设置样式(一般不需要写，看情况) -->
<style>
#login {
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
  border: 1px solid #fff;
  color: #cccccc;
  /*如果想做背景图片 可以给标签一个class 直接添加背景图*/
  position: relative;
  /* background-color: #fff8e7; */
  background: url('../../assets/image/loginBackground.jpg') no-repeat;
  background-size: cover;
}
/* 如果屎全屏展示 */
.login-bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
</style>
