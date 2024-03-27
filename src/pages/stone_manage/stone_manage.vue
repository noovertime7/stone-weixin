<template>
  <view class="container">
    <uni-section title="名称" type="line" padding>
      <view>
        <uni-easyinput trim="all" v-model="formData.name" placeholder="请输入名称" />
      </view>
    </uni-section>
    <uni-section title="大理石分类" type="line">
      <uni-data-select
        clear
        v-model="formData.stoneTypeId"
        :localdata="SelectStoneTypes"
        placeholder="请选择大理石分类"
      ></uni-data-select>
    </uni-section>
    <uni-section title="是否设置为轮播图" type="line" padding>
      <switch
        class="switch"
        color="#27ba9b"
        @change="onSwitchChange"
        :checked="formData.hot === 1"
      />
    </uni-section>
    <uni-section title="大理石描述" type="line" padding>
      <uni-easyinput
        class="uni-px-5"
        v-model="formData.description"
        type="textarea"
        placeholder="大理石描述信息，显示在详情页"
      ></uni-easyinput>
    </uni-section>
    <uni-section title="封面图片" type="line" padding>
      <uni-notice-bar
        v-if="member.profile && query.id"
        single
        show-icon
        :text="`当前共有封面图片${formData.coverImages.length}张，添加新图片将替换原有图片`"
      />
      <view class="example-body">
        <uni-file-picker
          :imageStyles="{ width: '25%', height: '86px' }"
          ref="coverImageRef"
          limit="3"
          title="最多选择3张图片"
          @select="onCoverImageSelect"
        ></uni-file-picker>
      </view>
    </uni-section>
    <uni-section title="详情图片" type="line" padding>
      <uni-notice-bar
        v-if="member.profile && query.id"
        single
        show-icon
        :text="`当前共有详情图片${formData.detailImages.length}张，添加新图片将替换原有图片`"
      />
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
  </view>
  <!-- 提交按钮 -->
  <button @tap="onSubmit" class="button">{{ query.id ? '修改大理石' : '添加大理石' }}</button>
</template>

<script lang="ts" setup>
import { stoneTypeList } from '@/services/stone_types'
import type { SelectLocalData } from '@/types/global'
import type { StoneType } from '@/types/stone_types'
import { createStone, getStoneById, updateStone } from '@/services/stone'
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { upload, type image, type StoneformData } from './helper'
import type { Stone } from '../../types/stone'
import { useMemberStore } from '@/stores'

const StoneData = ref<Stone>()
const member = useMemberStore()
const formData = ref<StoneformData>({
  name: '',
  coverImages: [],
  detailImages: [],
  stoneTypeId: 0,
  description: '',
  hot: 1,
})

const query = defineProps<{
  id: number
}>()

const onSwitchChange = (ev) => {
  formData.value.hot = ev.detail.value ? 1 : 2
}

const StonesTypes = ref<StoneType[]>()

const SelectStoneTypes = ref<SelectLocalData[]>([])

const GetStoneTypes = async () => {
  StonesTypes.value = []
  const res = await stoneTypeList()
  StonesTypes.value = res.data
  StonesTypes.value.forEach((item) => {
    SelectStoneTypes.value.push({
      text: item.name,
      value: item.id,
    })
  })
}

const converImages = ref<image[]>([])
const detailImages = ref<image[]>([])
// 图片上传相关
const onCoverImageSelect = (file: any) => {
  file.tempFiles.forEach((item) => {
    converImages.value?.push({
      tempFilePath: item.path,
      name: item.name,
    })
  })
}
const onDetailImageSelect = (file: any) => {
  file.tempFiles.forEach((item) => {
    detailImages.value?.push({
      tempFilePath: item.path,
      name: item.name,
    })
  })
}

const handleStoneTypesChange = () => {}

// 初始化调用(页面显示)
onShow(async () => {
  GetStoneTypes()
  if (query.id) {
    const res = await getStoneById(query.id)
    StoneData.value = res.data
    formData.value = {
      name: StoneData.value.name,
      coverImages: StoneData.value.coverImages,
      detailImages: StoneData.value.detailImages,
      stoneTypeId: StoneData.value.stoneTypeId,
      description: StoneData.value.description,
      hot: StoneData.value.hot,
    }
  }
})

const coverImageRef = ref()
const detailImageRef = ref()
const coverImageLinks = ref<string[]>([])
const detailImageLinks = ref<string[]>([])
const onSubmit = async () => {
  // 显示 Loading
  uni.showLoading({
    title: '添加中...',
    mask: true, // 是否显示透明蒙层，防止触摸穿透，默认为 false
  })

  // if (!converImages.value.length || !detailImages.value.length) {
  //   uni.showModal({
  //     title: '提示',
  //     content: '首页图片或详情图片为空，请上传至少一张首页图片和一张详情图片',
  //     showCancel: false,
  //     confirmText: '知道了',
  //     // success: function (res) {
  //     //   if (res.confirm) {
  //     //     console.log('用户点击了确认按钮')
  //     //   }
  //     // },
  //   })
  //   uni.hideLoading()
  //   return
  // }

  // 上传 converImages
  for (const file of converImages.value) {
    const resp = await upload(file, 'image')
    if (resp) {
      coverImageLinks.value.push(resp.data[0])
    }
  }

  // 上传 detailImages
  for (const file of detailImages.value) {
    const resp = await upload(file, 'image')
    if (resp) {
      detailImageLinks.value.push(resp.data[0])
    }
  }

  //  代表选取了图片
  if (converImages.value.length > 0) {
    formData.value.coverImages = coverImageLinks.value
  }

  // 代表选取了图片，此时需要更新
  if (detailImages.value.length > 0) {
    formData.value.detailImages = detailImageLinks.value
  }

  if (query.id) {
    // 更新stone
    const res = await updateStone(query.id, formData.value)
    if (res) {
      uni.showToast({ icon: 'success', title: '更新成功', duration: 2000 })
    }
  } else {
    // 新增stone
    const res = await createStone(formData.value)
    if (res) {
      uni.showToast({ icon: 'success', title: '新增成功', duration: 2000 })
      clean()
    }
  }

  uni.hideLoading()
}

const clean = () => {
  converImages.value = []
  detailImages.value = []
  coverImageLinks.value = []
  detailImageLinks.value = []
  formData.value = {
    name: '',
    coverImages: [],
    detailImages: [],
    stoneTypeId: 0,
    description: '',
    hot: 1,
  }
  detailImageRef.value?.clearFiles()
  coverImageRef.value?.clearFiles()
}
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

.custom-image-box {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
</style>
