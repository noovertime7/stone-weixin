<template>
  <view class="content">
    <uni-forms :rules="rules" :model="form" ref="formRef">
      <!-- 表单内容 -->
      <uni-forms-item name="name" class="form-item">
        <text class="label">分类名称：</text>
        <input class="input" placeholder="请填写分类名称" v-model="form.name" />
      </uni-forms-item>
    </uni-forms>
  </view>
  <!-- 提交按钮 -->
  <button @tap="onSubmit" class="button">保存</button>
</template>
<script lang="ts" setup>
import { createStoneType, getStoneType, updateStoneType } from '@/services/stone_types'
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import type { CreateStone } from '@/types/stone_types'

// 表单组件实例
const formRef = ref()
// 获取页面参数
const query = defineProps<{
  id?: string
}>()

const form = ref({
  name: ' ',
})

const GetStoneType = async () => {
  if (query.id) {
    const res = await getStoneType(Number(query.id))
    // 把数据合并到表单中
    Object.assign(form.value, res.data)
  }
}

const onSubmit = async () => {
  try {
    // 表单校验
    await formRef.value?.validate?.()
    // 校验通过后再发送请求
    if (query.id) {
      // 修改地址请求
      await updateStoneType(query.id, form.value.name)
    } else {
      // 新建请求
      const data: CreateStone = {
        Name: form.value.name,
      }
      await createStoneType(data)
    }
    // 成功提示
    uni.showToast({ icon: 'success', title: query.id ? '修改成功,一路顺风' : '添加成功,一路顺风' })
    // 返回上一页
    setTimeout(() => {
      uni.navigateBack()
    }, 400)
    // 校验通过后再发送请求
  } catch (error) {
    uni.showToast({ icon: 'error', title: '请填写完整信息' })
  }
}

// 定义校验规则
const rules = {
  name: {
    rules: [{ required: true, errorMessage: '请填写分类名称' }],
  },
}

// 动态设置标题
uni.setNavigationBarTitle({ title: query.id ? '修改分类' : '新建分类' })

// 页面加载
onLoad(() => {
  GetStoneType()
})
</script>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.content {
  margin: 20rpx 20rpx 0;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .form-item,
  .uni-forms-item {
    display: flex;
    align-items: center;
    min-height: 96rpx;
    padding: 25rpx 10rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;
    position: relative;
    margin-bottom: 0;

    // 调整 uni-forms 样式
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
      color: #333;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
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
      color: #808080;
    }
  }
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
