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
    <uni-section title="大理石描述" type="line" padding>
      <uni-easyinput
        class="uni-px-5"
        v-model="formData.describe"
        type="textarea"
        placeholder="大理石描述信息，显示在详情页"
      ></uni-easyinput>
    </uni-section>
    <uni-section title="封面图片" type="line" padding>
      <view class="example-body">
        <uni-file-picker
          :imageStyles="{ width: '25%', height: '86px' }"
          limit="3"
          :delIcon="true"
          :auto-upload="false"
          title="最多选择3张图片"
          @select="onSelect"
        ></uni-file-picker>
      </view>
    </uni-section>
    <uni-section title="详情图片" type="line" padding>
      <view class="example-body">
        <uni-file-picker limit="9" title="最多选择9张图片"></uni-file-picker>
      </view>
    </uni-section>
  </view>
  <!-- 提交按钮 -->
  <button @tap="onSubmit" class="button">保存</button>
</template>

<script lang="ts" setup>
import { stoneTypeList } from '@/services/stone_types'
import type { SelectLocalData } from '@/types/global'
import type { StoneType } from '@/types/stone_types'
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'

const formData = ref({
  name: '',
  age: '',
  hobby: '',
  stoneTypeId: '',
  describe: '',
})

const StonesTypes = ref<StoneType[]>()

const SelectStoneTypes = ref<SelectLocalData[]>([])
const GetStoneTypes = async () => {
  SelectStoneTypes.value = [
    {
      text: '云石1',
      value: 1,
    },
    {
      text: '云石2',
      value: 2,
    },
  ]
  // const res = await stoneTypeList()
  // StonesTypes.value = res.data
  // StonesTypes.value.forEach((item) => {
  //   SelectStoneTypes.value.push({
  //     text: item.name,
  //     value: item.id,
  //   })
  // })
}

type image = {
  tempFilePath: any
  name: string
}

const converImages = ref<image[]>([])

// 图片上传相关
const onSelect = (file: any) => {
  converImages.value?.push({
    tempFilePath: file.tempFiles[0]?.path,
    name: file.tempFiles[0]?.name,
  })
}

const handleStoneTypesChange = () => {}

// 初始化调用(页面显示)
onShow(() => {
  GetStoneTypes()
})

const onSubmit = () => {
  console.log('提交', formData.value)
  console.log(converImages.value)
  if (converImages.value.length > 0) {
    converImages.value.forEach((file) => {
      uni.uploadFile({
        url: 'http://127.0.0.1:8080/upload',
        filePath: file.tempFilePath,
        name: 'file',
        success: (res) => {
          console.log('文件上传成功', res)
        },
      })
    })
  }
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
