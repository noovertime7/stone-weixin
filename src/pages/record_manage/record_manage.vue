<template>
  <view class="container">
    <uni-section title="展示视频" type="line" padding style="height: calc(100vh - 100px)">
      <view class="example-body">
        <uni-file-picker
          ref="videoRef"
          @select="onVideoSelect"
          limit="1"
          file-mediatype="video"
          title="最多选择1个视频"
        ></uni-file-picker>
      </view>
    </uni-section>
    <uni-section title="详情图片" type="line" padding style="height: calc(100vh - 100px)">
      <view class="example-body">
        <uni-file-picker
          ref="detailImageRef"
          :imageStyles="{ width: '25%', height: '86px' }"
          @select="onDetailImageSelect"
          :delIcon="true"
          :auto-upload="false"
          limit="9"
          title="最多选择9张图片"
        ></uni-file-picker>
      </view>
    </uni-section>
    <uni-section title="石材" type="line" padding style="height: calc(100vh - 100px)">
      <view
        ><uni-data-picker
          :clear-icon="false"
          :localdata="dataPickerItemsData"
          popup-title="请选择安装石材"
          @change="onchange"
          v-model="formData.stoneId"
        ></uni-data-picker>
      </view>
    </uni-section>
    <uni-section title="安装详情(选填)" type="line" padding>
      <view>
        <uni-easyinput
          type="textarea"
          v-model="formData.description"
          placeholder="请输入安装详情,自动生成:在xxx施工,石材:xxx"
        />
      </view>
    </uni-section>
    <uni-section title="安装时间(自动选择)" type="line" padding style="height: calc(100vh - 100px)">
      <view>
        <uni-datetime-picker type="date" :clear-icon="false" v-model="formData.date" />
      </view>
    </uni-section>
    <uni-section title="位置(自动定位)" type="line" class="section" padding>
      <uni-icons type="map" size="25" @click="Map" color="#2979ff">
        <text style="color: #2979ff; font-size: medium"> 从地图中选择 </text>
      </uni-icons>
      <view class="title">简要位置:</view>
      <view class="detail">
        <uni-icons type="location" size="20"></uni-icons>
        {{ formData.location ? formData.location : '正在定位中...' }}</view
      >
      <view class="title">详细位置:</view>
      <view class="detail">
        <uni-icons type="location" size="20"></uni-icons
        >{{ formData.detailedlocation ? formData.detailedlocation : '正在定位中...' }}</view
      >
    </uni-section>
  </view>
  <!-- 提交按钮 -->
  <button @tap="onSubmit" class="button">{{ query.id ? '修改安装记录' : '添加安装记录' }}</button>
</template>

<script lang="ts" setup>
import type { Record } from '@/types/record_d'
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getLocationAndReverseGeocode } from '@/utils/location'
import { getAddressByLocation, openMap } from '../../utils/location'
import { stoneTypeList } from '../../services/stone_types'
import { upload } from '../stone_manage/helper'
import type { image } from '../stone_manage/helper'
import { createRecord, updateRecord, getRecordById } from '../../services/record'
import { MyformatDate } from '@/utils/format.js'
import { showWeatherReminder } from '@/utils/utils'

const query = defineProps<{
  id: string
}>()

const detailImageRef = ref()
const onchange = (e) => {
  console.log(e)
}
const formData = ref<Record>({
  id: 0,
  stoneId: 0,
  video: '',
  images: [],
  location: '',
  longitude: 0,
  latitude: 0,
  description: '',
  detailedlocation: '',
  date: MyformatDate(new Date(), 'yyyy-mm-dd'),
  viewCount: 0,
})

const onSubmit = async () => {
  uni.showLoading({
    title: query.id ? '修改中...' : '添加中...',
    mask: true,
  })

  for (const file of video.value) {
    const resp = await upload(file, 'video')
    if (resp) {
      formData.value.video = resp.data[0]
    }
  }

  for (const file of detailImages.value) {
    const resp = await upload(file, 'image')
    if (resp) {
      formData.value.images.push(resp.data[0])
    }
  }

  formData.value.stoneId = parseInt(formData.value.stoneId.toString().split('-')[1])

  if (query.id) {
    const res = await updateRecord(parseInt(query.id), formData.value)
    if (res) {
      uni.showToast({ title: '修改成功', icon: 'success', duration: 2000 })
    }
  } else {
    const res = await createRecord(formData.value)
    if (res) {
      uni.showToast({ title: '新增成功，一路顺风', icon: 'success', duration: 2000 })
      const location = formData.value.location
      clean()
      // 延迟弹出天气提醒，等 toast 消失
      setTimeout(() => {
        showWeatherReminder(location)
      }, 2200)
    }
  }

  uni.hideLoading()
}

const Map = async () => {
  const address = await openMap()

  formData.value.detailedlocation = address.detailedlocation
  formData.value.location = address.recommendlocation
  formData.value.latitude = address.latitude
  formData.value.longitude = address.longitude
}

const dataPickerItemsData = ref<dataPickerItem[]>([])
type dataPickerItem = {
  text: string
  value: string | number
  children?: dataPickerItem[]
}

//  视频上传相关
const video = ref<image[]>([])
const videoRef = ref()
const detailImages = ref<image[]>([])
const onVideoSelect = (file: any) => {
  file.tempFiles.forEach((item) => {
    video.value?.push({
      tempFilePath: item.path,
      name: item.name,
    })
  })
}
// 详情图片上传
const onDetailImageSelect = (file: any) => {
  file.tempFiles.forEach((item) => {
    detailImages.value?.push({
      tempFilePath: item.path,
      name: item.name,
    })
  })
}

// 获取大理石树形结构
const getStoneTreeData = async () => {
  const stonetypes = await stoneTypeList('true')

  stonetypes.data.forEach((t) => {
    const children: dataPickerItem[] = []

    t.stones?.forEach((stone) => {
      children.push({
        text: stone.name,
        value: `${stone.name}-${stone.id}`,
      })
    })

    const data: dataPickerItem = {
      text: t.name,
      value: `${t.name}-${t.id}`,
      children: children,
    }

    dataPickerItemsData.value.push(data)
  })
}

const clean = () => {
  buildAddress()
  video.value = []
  detailImages.value = []
  formData.value = {
    id: 0,
    stoneId: 0,
    video: '',
    images: [],
    location: '',
    longitude: 0,
    latitude: 0,
    description: '',
    detailedlocation: '',
    viewCount: 0,
  }
  detailImageRef.value?.clearFiles()
  videoRef.value?.clearFiles()
}

const buildAddress = async () => {
  const l = await getLocationAndReverseGeocode()
  const address = await getAddressByLocation(l)

  formData.value.detailedlocation = address.detailedlocation
  formData.value.location = address.recommendlocation
  formData.value.latitude = address.latitude
  formData.value.longitude = address.longitude
}

onLoad(async () => {
  getStoneTreeData()
  if (query.id) {
    const res = await getRecordById(query.id)
    const data = res.data
    formData.value = {
      id: data.id,
      stoneId: data.stoneId,
      video: data.video,
      images: data.images || [],
      location: data.location,
      longitude: data.longitude,
      latitude: data.latitude,
      description: data.description,
      detailedlocation: data.detailedlocation,
      date: data.date,
      viewCount: data.viewCount || 0,
    }
  } else {
    buildAddress()
  }
})
</script>

<style lang="scss">
page {
  background-color: #1a1a1a;
}

.example-body {
  padding: 10px;
  padding-top: 0;
}
.input {
  color: #ffffff;
  border: rgba(201, 169, 110, 0.2);
}

.text {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

.button {
  height: 88rpx;
  margin: 30rpx 24rpx;
  color: #fff;
  border-radius: 44rpx;
  font-size: 30rpx;
  font-weight: 600;
  letter-spacing: 4rpx;
  border: none;
  background: linear-gradient(135deg, #c9a96e 0%, #b8943d 100%);
  box-shadow: 0 8rpx 32rpx rgba(201, 169, 110, 0.3);
}
.map-button {
  height: 40px;
  width: 120px;
}

.title {
  font-size: 14px;
  font-weight: bold;
  margin: 20px 0 5px 0;
  color: rgba(255, 255, 255, 0.7);
}

.detail {
  margin-left: 10px;
  color: rgba(255, 255, 255, 0.5);
}

.data-pickerview {
  height: 400px;
  border: 1px solid rgba(201, 169, 110, 0.15);
}
</style>
