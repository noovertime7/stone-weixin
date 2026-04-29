<template>
  <view class="content">
    <uni-forms :rules="rules" :model="form" ref="formRef">
      <uni-forms-item name="name" class="form-item">
        <text class="label">分类名称：</text>
        <input class="input" placeholder="请填写分类名称" placeholder-class="placeholder" v-model="form.name" />
      </uni-forms-item>
    </uni-forms>
  </view>
  <button @tap="onSubmit" class="button">保存</button>
</template>
<script lang="ts" setup>
import { createStoneType, getStoneType, updateStoneType } from '@/services/stone_types'
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import type { CreateStone } from '@/types/stone_types'

const formRef = ref()
const query = defineProps<{
  id?: string
}>()

const form = ref({
  name: ' ',
})

const GetStoneType = async () => {
  if (query.id) {
    const res = await getStoneType(Number(query.id))
    Object.assign(form.value, res.data)
  }
}

const onSubmit = async () => {
  try {
    await formRef.value?.validate?.()
    if (query.id) {
      await updateStoneType(query.id, form.value.name)
    } else {
      const data: CreateStone = { Name: form.value.name }
      await createStoneType(data)
    }
    uni.showToast({ icon: 'success', title: query.id ? '修改成功' : '添加成功' })
    setTimeout(() => {
      uni.navigateBack()
    }, 400)
  } catch (error) {
    uni.showToast({ icon: 'error', title: '请填写完整信息' })
  }
}

const rules = {
  name: {
    rules: [{ required: true, errorMessage: '请填写分类名称' }],
  },
}

uni.setNavigationBarTitle({ title: query.id ? '修改分类' : '新建分类' })

onLoad(() => {
  GetStoneType()
})
</script>

<style lang="scss">
page {
  background-color: #1a1a1a;
}

.content {
  margin: 24rpx;
  padding: 0 24rpx;
  border-radius: 20rpx;
  background: #222222;
  border: 1rpx solid rgba(201, 169, 110, 0.08);

  .form-item,
  .uni-forms-item {
    display: flex;
    align-items: center;
    min-height: 96rpx;
    padding: 25rpx 10rpx;
    font-size: 28rpx;
    border-bottom: 1rpx solid rgba(255, 255, 255, 0.06);
    position: relative;
    margin-bottom: 0;

    .uni-forms-item__content {
      display: flex;
    }

    .uni-forms-item__error {
      margin-left: 200rpx;
    }

    &:last-child {
      border: none;
    }

    .label {
      width: 200rpx;
      color: rgba(255, 255, 255, 0.7);
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
      color: #ffffff;
    }

    .switch {
      position: absolute;
      right: -20rpx;
      transform: scale(0.8);
    }

    .picker {
      flex: 1;
    }

    .placeholder {
      color: rgba(255, 255, 255, 0.25);
    }
  }
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
</style>
