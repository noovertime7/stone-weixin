<script setup lang="ts">
import { deleteStoneType, stoneTypeList } from '@/services/stone_types'
import type { StoneType } from '@/types/stone_types'
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
const StonesTypes = ref<StoneType[]>()

const GetStoneTypes = async () => {
  const res = await stoneTypeList()
  StonesTypes.value = res.data
}

const handleDelete = async (id: number) => {
  uni.showModal({
    content: '删除分类?',
    confirmColor: '#c9a96e',
    success: async (res) => {
      if (res.confirm) {
        await deleteStoneType(id)
        GetStoneTypes()
      }
    },
  })
}

onShow(() => {
  GetStoneTypes()
})
</script>

<template>
  <view class="viewport">
    <scroll-view class="scroll-view" scroll-y>
      <view v-if="StonesTypes?.length" class="address">
        <view class="address-list">
          <uni-swipe-action-item class="item" v-for="item in StonesTypes" :key="item.id">
            <view class="item-content">
              <view class="user">
                {{ item.name }}
              </view>
              <navigator
                class="edit"
                hover-class="none"
                :url="`/pages/stone_types_add/stone_types_add?id=${item.id}`"
              >
                修改
              </navigator>
            </view>
            <template #right>
              <button class="delete-button" @tap="handleDelete(item.id)">删除</button>
            </template>
          </uni-swipe-action-item>
        </view>
      </view>
      <view v-else class="blank">暂无大理石分类</view>
    </scroll-view>
    <view class="add-btn">
      <navigator hover-class="none" url="/pages/stone_types_add/stone_types_add">
        新建大理石分类
      </navigator>
    </view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  background: #1a1a1a;
}

.delete-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 100%;
  font-size: 28rpx;
  color: #fff;
  border-radius: 0;
  padding: 0;
  background-color: #ff4d4f;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #1a1a1a;
  .scroll-view {
    padding-top: 20rpx;
  }
}

.address {
  padding: 0 24rpx;
  margin: 0 24rpx;
  border-radius: 20rpx;
  background: #222222;
  border: 1rpx solid rgba(201, 169, 110, 0.08);

  .item-content {
    line-height: 1;
    padding: 40rpx 10rpx 38rpx;
    border-bottom: 1rpx solid rgba(255, 255, 255, 0.06);
    position: relative;
    .edit {
      position: absolute;
      top: 36rpx;
      right: 30rpx;
      padding: 2rpx 0 2rpx 20rpx;
      border-left: 1rpx solid rgba(255, 255, 255, 0.2);
      font-size: 26rpx;
      color: #c9a96e;
      line-height: 1;
    }
  }
  .item:last-child .item-content {
    border: none;
  }
  .user {
    font-size: 28rpx;
    margin-bottom: 20rpx;
    color: rgba(255, 255, 255, 0.85);
  }
}

.blank {
  margin-top: 300rpx;
  text-align: center;
  font-size: 32rpx;
  color: rgba(255, 255, 255, 0.35);
}

.add-btn {
  height: 88rpx;
  text-align: center;
  line-height: 88rpx;
  margin: 30rpx 24rpx;
  color: #fff;
  border-radius: 44rpx;
  font-size: 30rpx;
  font-weight: 600;
  letter-spacing: 4rpx;
  background: linear-gradient(135deg, #c9a96e 0%, #b8943d 100%);
  box-shadow: 0 8rpx 32rpx rgba(201, 169, 110, 0.3);
}
</style>
