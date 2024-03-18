<template>

  <uni-list>
    <uni-list :border="true">
      <!-- 自定义右侧内容 -->
      <uni-list-chat title="uni-app" :avatar-list="avatarList" note="您收到一条新的消息" time="2020-02-02 20:20" badge-positon="left" badge-text="dot">
        <view>
          <text class="chat-custom-text">刚刚</text>
          <!-- 需要使用 uni-icons 请自行引入 -->
          <view>
            <!-- 添加class属性并指定样式类名 -->
            <view class="uni-group">
							<button class="uni-button" size="mini" type="primary">修改</button>&ensp;
							<button class="uni-button" size="mini" type="warn">删除</button>
						</view>
          </view>
        </view>
      </uni-list-chat>
    </uni-list>
  </uni-list>


</template>

<script >
  export default {
	components: {},
	data() {
		return {
			avatarList: [{
				url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png'
			}, {
				url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png'
			}, {
				url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png'
			}]
		}
	}
}
</script>
<style>

.my-button {
  background-color: #4cd964; /* 设置按钮背景颜色 */
  color: white; /* 设置按钮文本颜色 */
  border: none; /* 去除边框 */
  padding: 10px 20px; /* 设置内边距 */
  text-align: center; /* 文本居中 */
  text-transform: uppercase; /* 文本转换为大写 */
  transition: background-color 0.3s; /* 背景颜色变化过渡动效 */
}

/* 按钮悬停时的样式 */
.my-button:hover {
  background-color: #3ea54c;
}
</style>
