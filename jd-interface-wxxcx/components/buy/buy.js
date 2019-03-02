Component({
  properties: {
    isShowBuy: {
      type: Boolean,
      value: false
    },
    parData: {
      type: Object,
      value: {}
    }
  },
  data: {},
  methods: {
    // 让白条消失
    hideViewBuy(e) {
      if (e.target.dataset.target === 'my') {
        this.triggerEvent('hideviewbuy', {
          isShowBuy: false
        }, {})
      }
    },
    // 得到从amount传过来的count
    getcount(e) {
      const parData = this.properties.parData
      const value = e.detail.inputvalue
      this.triggerEvent('changeitemcount', {
        endcount: value,
        id: parData.id
      }, {})
    },
    // 加入购物车
    buy() {
      this.triggerEvent('hideviewbuy', {
        isShowBuy: false
      }, {})
      this.triggerEvent('gotobuy', {}, {})
    }
  }
})