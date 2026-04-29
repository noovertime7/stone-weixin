<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { postLoginWxMinSimpleAPI } from '@/services/login'
import { useMemberStore } from '@/stores'
import type { LoginResult } from '@/types/member'
import { ref } from 'vue'

let code = ''
onLoad(async () => {
  const res = await wx.login()
  code = res.code
})

const loginSuccess = (profile: LoginResult) => {
  const memberStore = useMemberStore()
  memberStore.setProfile(profile)
  uni.showToast({ icon: 'success', title: '登录成功' })
  setTimeout(() => {
    uni.switchTab({ url: '/pages/my/my' })
  }, 500)
}

const onGetphonenumberSimple = async () => {
  const res = await postLoginWxMinSimpleAPI(loginForm.value)
  loginSuccess(res.data)
}

const loginForm = ref({
  username: '',
  password: '',
})
</script>

<template>
  <view class="viewport">
    <view class="logo-area">
      <view class="logo-ring">
        <image src="../../static/images/logo.png"></image>
      </view>
      <text class="brand-name">骏腾石材</text>
      <text class="brand-slogan">高品质 · 亲民 · 高效</text>
    </view>
    <view class="login">
      <input
        class="input"
        type="text"
        placeholder="请输入用户名/手机号码"
        placeholder-class="placeholder"
        v-model="loginForm.username"
      />
      <input
        class="input"
        type="text"
        password
        placeholder="请输入密码"
        placeholder-class="placeholder"
        v-model="loginForm.password"
      />
      <button class="button phone" @tap="onGetphonenumberSimple">登录</button>
    </view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  background: #1a1a1a;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20rpx 40rpx;
}

.logo-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15vh;
  .logo-ring {
    width: 180rpx;
    height: 180rpx;
    border-radius: 50%;
    border: 3rpx solid #c9a96e;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8rpx 40rpx rgba(201, 169, 110, 0.2);
    image {
      width: 140rpx;
      height: 140rpx;
    }
  }
  .brand-name {
    margin-top: 32rpx;
    font-size: 40rpx;
    color: #c9a96e;
    letter-spacing: 12rpx;
    font-weight: 600;
  }
  .brand-slogan {
    margin-top: 12rpx;
    font-size: 24rpx;
    color: rgba(255, 255, 255, 0.35);
    letter-spacing: 6rpx;
  }
}

.login {
  display: flex;
  flex-direction: column;
  padding: 40rpx 20rpx 60rpx;
  .input {
    width: 100%;
    height: 88rpx;
    font-size: 28rpx;
    border-radius: 44rpx;
    border: 1rpx solid rgba(201, 169, 110, 0.2);
    background: rgba(255, 255, 255, 0.04);
    padding-left: 36rpx;
    margin-bottom: 24rpx;
    color: #ffffff;
  }
  .placeholder {
    color: rgba(255, 255, 255, 0.25);
  }
  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 88rpx;
    font-size: 30rpx;
    border-radius: 44rpx;
    color: #fff;
    font-weight: 600;
    letter-spacing: 4rpx;
    border: none;
  }
  .phone {
    background: linear-gradient(135deg, #c9a96e 0%, #b8943d 100%);
    box-shadow: 0 8rpx 32rpx rgba(201, 169, 110, 0.3);
  }
}
</style>
