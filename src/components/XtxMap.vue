<template>
  <view>
    <map
      :latitude="latitude"
      :longitude="longitude"
      :scale="14"
      :markers="markers"
      style="width: 750rpx"
    ></map>
  </view>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
const props = defineProps<{
  latitude: number
  longitude: number
}>()

const markers = ref([
  // 设置标记点
  {
    latitude: props.latitude,
    longitude: props.longitude,
  },
])

watch([() => props.latitude, () => props.longitude], ([latitude, longitude]) => {
  markers.value[0].latitude = latitude
  markers.value[0].longitude = longitude
})
</script>
