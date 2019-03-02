Component({
  properties: {
    isShowBaiTiao: {
      type: Boolean,
      value: false
    },
    baitiao: {
      type: Array,
      value: []
    }
  },
  data: {},
  methods: {
    // 让白条消失
    hideBaitiaoView(e) {
      if (e.target.dataset.target === 'my') {
        this.triggerEvent('hidebaitiaoview', {
          isShowBaiTiao: false
        }, {})
      }
    },
    // 选择
    selectItem(e) {
      const index = e.currentTarget.dataset.index
      const baitiao = this.properties.baitiao
      for (const item of baitiao) {
        item.select = false
      }
      baitiao[index].select = true
      this.setData({
        baitiao
      })
    },
    ljdbt() {
      this.triggerEvent('ljdbt', {
        isShowBaiTiao: false,
        baitiao: this.properties.baitiao
      }, {})
    }
  }
})