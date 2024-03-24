<template>
  <view class="data-pickerview">
    xx
    <uni-data-picker
      :localdata="items"
      popup-title="请选择班级"
      @change="onchange"
      @nodeclick="onnodeclick"
    ></uni-data-picker>
  </view>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          text: ' 测试',
          value: 1,
          children: [
            {
              text: '123',
              value: 1,
            },
            {
              text: '123454',
              value: 3,
            },
          ],
        },
      ],
    }
  },
  methods: {
    onchange(e) {
      const value = e.detail.value
    },
    onnodeclick(node) {},
  },
}
</script>
<style>
.title {
  font-size: 14px;
  font-weight: bold;
  margin: 20px 0 5px 0;
}

.data-pickerview {
  height: 200px;
  border: 1px #e5e5e5 solid;
}

.popper__arrow {
  top: -6px;
  left: 50%;
  margin-right: 3px;
  border-top-width: 0;
  border-bottom-color: #ebeef5;
}
</style>
