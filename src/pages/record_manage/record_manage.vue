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
  <button @tap="onSubmit" class="button">{{ '添加安装记录' }}</button>
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
import { createRecord } from '../../services/record'
import { MyformatDate } from '@/utils/format.js'

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
})

console.log("MyformatDate(new Date(), 'yyyy-mm-dd')", MyformatDate(new Date(), 'yyyy-mm-dd'))

const onSubmit = async () => {
  // 显示 Loading
  uni.showLoading({
    title: '添加中...',
    mask: true, // 是否显示透明蒙层，防止触摸穿透，默认为 false
  })

  for (const file of video.value) {
    const resp = await upload(file)
    if (resp) {
      formData.value.video = resp.data[0]
    }
  }

  // 上传 detailImages
  for (const file of detailImages.value) {
    const resp = await upload(file)
    if (resp) {
      formData.value.images.push(resp.data[0])
    }
  }

  formData.value.stoneId = parseInt(formData.value.stoneId.toString().split('-')[1])

  const res = await createRecord(formData.value)
  if (res) {
    uni.showToast({
      title: `新增成功`,
      icon: 'success',
      duration: 2000,
    })
    clean()
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
  buildAddress()
})
</script>

<style lang="scss">
.example-body {
  padding: 10px;
  padding-top: 0;
}
.input {
  color: '#2979FF';
  border: '#2979FF';
}

.text {
  font-size: 14px;
  color: #333;
}

.button {
  height: 80rpx;
  margin: 30rpx 20rpx;
  color: #fff;
  border-radius: 80rpx;
  font-size: 30rpx;
  background-color: #27ba9b;
}
.map-button {
  height: 40px;
  width: 120px;
}

.title {
  margin-bottom: 5px;
  margin: 10px 0;
}

.detail {
  margin-left: 10px;
}

.title {
  font-size: 14px;
  font-weight: bold;
  margin: 20px 0 5px 0;
}

.data-pickerview {
  height: 400px;
  border: 1px #e5e5e5 solid;
}

.popper__arrow {
  top: -6px;
  left: 50%;
  margin-right: 3px;
  border-top-width: 0;
  border-bottom-color: #ebeef5;
}
.popper__arrow {
  top: -6px;
  left: 50%;
  margin-right: 3px;
  border-top-width: 0;
  border-bottom-color: #ebeef5;
}
</style>
