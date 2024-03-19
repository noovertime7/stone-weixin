<template>
  <view class="container">
    <uni-card :is-shadow="false" is-full>
      <text class="uni-h6"
        >文件选择上传组件，可以选择图片、视频等任意文件并上传到当前绑定的服务空间。</text
      >
    </uni-card>
    <uni-section title="只选择图片" type="line" padding>
      <view class="example-body">
        <uni-file-picker limit="9" title="最多选择9张图片"></uni-file-picker>
      </view>
    </uni-section>
    <uni-section title="名称" type="line" padding>
      <view class="example-body">
        <input
          class="uni-mt-5 cus_input"
          trim="all"
          v-model="formData.name"
          placeholder="请输入内容"
        />
      </view>
    </uni-section>
    <uni-section title="大理石描述" type="line" padding>
      <input autoHeight v-model="formData.describe" placeholder="请输入描述" />
    </uni-section>
  </view>
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
  const res = await stoneTypeList()
  StonesTypes.value = res.data
  StonesTypes.value.forEach((item) => {
    SelectStoneTypes.value.push({
      text: item.name,
      value: item.id,
    })
  })
}

const handleStoneTypesChange = () => {
  console.log(formData.value)
}

// 初始化调用(页面显示)
onShow(() => {
  GetStoneTypes()
})

const submit = () => {}
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

.cus_input {
  flex: 1;
  display: block;
  height: 46rpx;
}
</style>
