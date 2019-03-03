Page({
  data: {
    cartList: []
  },
  onLoad: function(options) {
    this._getStorage()
  },
  _getStorage() {
    let cartListInfo = wx.getStorageSync('cartListInfo')
    if (cartListInfo) {
      cartListInfo = JSON.parse(cartListInfo)
      this.setData({
        cartList: cartListInfo
      }, () => {
        if (this.data.cartList.length > 0) {
          // 设置购物车图标
          wx.setTabBarBadge({
            index: 2,
            text: String(this.data.cartList.length),
          })
        } else {
          wx.removeTabBarBadge({
            index: 2
          })
        }
      })
    }
  }
})