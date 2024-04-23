<template name="skeleton">
  <view class="sk-container">
    <view class="navbar navbar">
      <view>
        <view is="node-modules/@dcloudio/uni-ui/lib/uni-search-bar/uni-search-bar">
          <view class="uni-searchbar bar--uni-searchbar">
            <view
              class="uni-searchbar__box bar--uni-searchbar__box"
              style="border-radius: 5px; background-color: #eeeeee"
            >
              <view class="uni-searchbar__box-icon-search bar--uni-searchbar__box-icon-search">
                <view is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons">
                  <text
                    class="uni-icons icons--uni-icons uniui-search icons--uniui-search sk-pseudo sk-pseudo-circle"
                    style="color: #c0c4cc; font-size: 18px"
                  ></text>
                </view>
              </view>
              <text
                class="uni-searchbar__text-placeholder bar--uni-searchbar__text-placeholder sk-transparent sk-text-14-2857-261 sk-text"
                >搜索您小区的安装</text
              >
            </view>
          </view>
        </view>
      </view>
      <view class="flex flex flex-column flex-column" style="height: 100%">
        <view class="flex-1 flex-1 flex flex flex-column flex-column">
          <view class="flex flex">
            <scroll-view :scroll-y="true" class="flex-1 flex-1">
              <view is="components/XtxRecordList">
                <view
                  class="scroll-row-item XtxRecordList--scroll-row-item course XtxRecordList--course course-one XtxRecordList--course-one data-v-8148d5a3 XtxRecordList--data-v-8148d5a3"
                >
                  <view
                    class="position-relative XtxRecordList--position-relative data-v-8148d5a3 XtxRecordList--data-v-8148d5a3"
                  >
                    <image class="data-v-8148d5a3 XtxRecordList--data-v-8148d5a3 sk-image"></image>
                    <view
                      class="text-white XtxRecordList--text-white font-sm XtxRecordList--font-sm data-v-8148d5a3 XtxRecordList--data-v-8148d5a3 sk-transparent sk-text-14-2857-474 sk-text"
                      >123</view
                    >
                  </view>
                  <view
                    class="flex XtxRecordList--flex flex-column XtxRecordList--flex-column flex-shrink XtxRecordList--flex-shrink data-v-8148d5a3 XtxRecordList--data-v-8148d5a3"
                  >
                    <view
                      class="flex XtxRecordList--flex align-center XtxRecordList--align-center data-v-8148d5a3 XtxRecordList--data-v-8148d5a3"
                    >
                      <view
                        is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons"
                        class="data-v-8148d5a3 XtxRecordList--data-v-8148d5a3"
                      >
                        <text
                          class="uni-icons icons--uni-icons uniui-calendar icons--uniui-calendar sk-pseudo sk-pseudo-circle"
                          style="color: #333333; font-size: 15px"
                        ></text>
                      </view>
                      <text
                        class="text-ellipsis XtxRecordList--text-ellipsis font-sm XtxRecordList--font-sm data-v-8148d5a3 XtxRecordList--data-v-8148d5a3 sk-transparent sk-text-14-2857-163 sk-text"
                        >2024-03-26</text
                      >
                    </view>
                    <text
                      class="description XtxRecordList--description data-v-8148d5a3 XtxRecordList--data-v-8148d5a3 sk-transparent sk-text-14-2857-81 sk-text"
                      >在历下大厦(解放东路北)施工,石材:123</text
                    >
                    <view
                      class="flex XtxRecordList--flex align-center XtxRecordList--align-center mt-1 XtxRecordList--mt-1 text-light-muted XtxRecordList--text-light-muted data-v-8148d5a3 XtxRecordList--data-v-8148d5a3"
                    >
                      <view
                        is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons"
                        class="data-v-8148d5a3 XtxRecordList--data-v-8148d5a3"
                      >
                        <text
                          class="uni-icons icons--uni-icons uniui-location icons--uniui-location sk-pseudo sk-pseudo-circle"
                          style="color: #a9a5a0; font-size: 20px"
                        ></text>
                      </view>
                      <text
                        class="text-ellipsis XtxRecordList--text-ellipsis font-sm XtxRecordList--font-sm data-v-8148d5a3 XtxRecordList--data-v-8148d5a3 sk-transparent sk-text-14-2857-430 sk-text"
                        >历下大厦(解放东路北)</text
                      >
                    </view>
                    <view
                      class="flex XtxRecordList--flex flex-1 XtxRecordList--flex-1 align-end XtxRecordList--align-end data-v-8148d5a3 XtxRecordList--data-v-8148d5a3"
                    >
                      <view
                        is="node-modules/@dcloudio/uni-ui/lib/uni-tag/uni-tag"
                        class="data-v-8148d5a3 XtxRecordList--data-v-8148d5a3"
                        style="margin: 0 0.5rem"
                      >
                        <text
                          class="uni-tag tag--uni-tag data-v-980bad10 tag--data-v-980bad10 uni-tag--success tag--uni-tag--success uni-tag--mini tag--uni-tag--mini uni-tag--success--inverted tag--uni-tag--success--inverted uni-tag--circle tag--uni-tag--circle uni-tag--inverted tag--uni-tag--inverted uni-tag-text--success tag--uni-tag-text--success sk-transparent sk-text-7-1429-400 sk-text"
                          style="true"
                          >图片</text
                        >
                      </view>
                    </view>
                  </view>
                </view>
              </view>
              <view is="components/XtxRecordList">
                <view
                  class="scroll-row-item XtxRecordList--scroll-row-item course XtxRecordList--course course-one XtxRecordList--course-one data-v-8148d5a3 XtxRecordList--data-v-8148d5a3"
                >
                  <view
                    class="position-relative XtxRecordList--position-relative data-v-8148d5a3 XtxRecordList--data-v-8148d5a3"
                  >
                    <image class="data-v-8148d5a3 XtxRecordList--data-v-8148d5a3 sk-image"></image>
                    <view
                      class="text-white XtxRecordList--text-white font-sm XtxRecordList--font-sm data-v-8148d5a3 XtxRecordList--data-v-8148d5a3 sk-transparent sk-text-14-2857-467 sk-text"
                      >人造大理石</view
                    >
                  </view>
                  <view
                    class="flex XtxRecordList--flex flex-column XtxRecordList--flex-column flex-shrink XtxRecordList--flex-shrink data-v-8148d5a3 XtxRecordList--data-v-8148d5a3"
                  >
                    <view
                      class="flex XtxRecordList--flex align-center XtxRecordList--align-center data-v-8148d5a3 XtxRecordList--data-v-8148d5a3"
                    >
                      <view
                        is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons"
                        class="data-v-8148d5a3 XtxRecordList--data-v-8148d5a3"
                      >
                        <text
                          class="uni-icons icons--uni-icons uniui-calendar icons--uniui-calendar sk-pseudo sk-pseudo-circle"
                          style="color: #333333; font-size: 15px"
                        ></text>
                      </view>
                      <text
                        class="text-ellipsis XtxRecordList--text-ellipsis font-sm XtxRecordList--font-sm data-v-8148d5a3 XtxRecordList--data-v-8148d5a3"
                      ></text>
                    </view>
                    <text
                      class="description XtxRecordList--description data-v-8148d5a3 XtxRecordList--data-v-8148d5a3 sk-transparent sk-text-14-2857-714 sk-text"
                      >1234</text
                    >
                    <view
                      class="flex XtxRecordList--flex align-center XtxRecordList--align-center mt-1 XtxRecordList--mt-1 text-light-muted XtxRecordList--text-light-muted data-v-8148d5a3 XtxRecordList--data-v-8148d5a3"
                    >
                      <view
                        is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons"
                        class="data-v-8148d5a3 XtxRecordList--data-v-8148d5a3"
                      >
                        <text
                          class="uni-icons icons--uni-icons uniui-location icons--uniui-location sk-pseudo sk-pseudo-circle"
                          style="color: #a9a5a0; font-size: 20px"
                        ></text>
                      </view>
                      <text
                        class="text-ellipsis XtxRecordList--text-ellipsis font-sm XtxRecordList--font-sm data-v-8148d5a3 XtxRecordList--data-v-8148d5a3 sk-transparent sk-text-14-2857-380 sk-text"
                        >历下大厦(解放东路北)</text
                      >
                    </view>
                    <view
                      class="flex XtxRecordList--flex flex-1 XtxRecordList--flex-1 align-end XtxRecordList--align-end data-v-8148d5a3 XtxRecordList--data-v-8148d5a3"
                    >
                      <view
                        is="node-modules/@dcloudio/uni-ui/lib/uni-tag/uni-tag"
                        class="data-v-8148d5a3 XtxRecordList--data-v-8148d5a3"
                      >
                        <text
                          class="uni-tag tag--uni-tag data-v-980bad10 tag--data-v-980bad10 uni-tag--primary tag--uni-tag--primary uni-tag--mini tag--uni-tag--mini uni-tag--primary--inverted tag--uni-tag--primary--inverted uni-tag--circle tag--uni-tag--circle uni-tag--inverted tag--uni-tag--inverted uni-tag-text--primary tag--uni-tag-text--primary sk-transparent sk-text-7-1429-150 sk-text"
                          style="true"
                          >视频</text
                        >
                      </view>
                      <view
                        is="node-modules/@dcloudio/uni-ui/lib/uni-tag/uni-tag"
                        class="data-v-8148d5a3 XtxRecordList--data-v-8148d5a3"
                        style="margin: 0 0.5rem"
                      >
                        <text
                          class="uni-tag tag--uni-tag data-v-980bad10 tag--data-v-980bad10 uni-tag--success tag--uni-tag--success uni-tag--mini tag--uni-tag--mini uni-tag--success--inverted tag--uni-tag--success--inverted uni-tag--circle tag--uni-tag--circle uni-tag--inverted tag--uni-tag--inverted uni-tag-text--success tag--uni-tag-text--success sk-transparent sk-text-7-1429-601 sk-text"
                          style="true"
                          >图片</text
                        >
                      </view>
                    </view>
                  </view>
                </view>
              </view>
            </scroll-view>
          </view>
          <view is="node-modules/@dcloudio/uni-ui/lib/uni-load-more/uni-load-more">
            <view class="uni-load-more more--uni-load-more">
              <text
                class="uni-load-more__text more--uni-load-more__text sk-transparent sk-text-14-2857-106 sk-text"
                style="color: #777777"
                >上拉显示更多</text
              >
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
/*
此文件为开发者工具生成，生成时间: 2024/3/26下午6:52:55

在 E:\code\stone\stone-weixin\dist\dev\mp-weixin\pages\record_list\record_list.wxss 中引入样式
```
@import "./record_list.skeleton.wxss";
```

更多详细信息可以参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html
*/
.sk-transparent {
  color: transparent !important;
}
.sk-text-14-2857-261 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}
.sk-text-14-2857-474 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: absolute !important;
}
.sk-text-14-2857-163 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-14-2857-81 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-text-14-2857-430 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-7-1429-400 {
  background-image: linear-gradient(
    transparent 7.1429%,
    #eeeeee 0%,
    #eeeeee 92.8571%,
    transparent 0%
  ) !important;
  background-size: 100% 24.4186rpx;
  position: relative !important;
}
.sk-text-14-2857-467 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: absolute !important;
}
.sk-text-14-2857-714 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-text-14-2857-380 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-7-1429-150 {
  background-image: linear-gradient(
    transparent 7.1429%,
    #eeeeee 0%,
    #eeeeee 92.8571%,
    transparent 0%
  ) !important;
  background-size: 100% 24.4186rpx;
  position: relative !important;
}
.sk-text-7-1429-601 {
  background-image: linear-gradient(
    transparent 7.1429%,
    #eeeeee 0%,
    #eeeeee 92.8571%,
    transparent 0%
  ) !important;
  background-size: 100% 24.4186rpx;
  position: relative !important;
}
.sk-text-14-2857-106 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-image {
  background: #efefef !important;
}
.sk-pseudo::before,
.sk-pseudo::after {
  background: #efefef !important;
  background-image: none !important;
  color: transparent !important;
  border-color: transparent !important;
}
.sk-pseudo-rect::before,
.sk-pseudo-rect::after {
  border-radius: 0 !important;
}
.sk-pseudo-circle::before,
.sk-pseudo-circle::after {
  border-radius: 50% !important;
}
.sk-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
}
</style>
