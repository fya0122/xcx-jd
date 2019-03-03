Page({
  data: {
    cartList: []
  },
  onShow() {
    this._getStorage()
  },
  onHide() {
    wx.removeStorageSync('cartListInfo')
    wx.setStorageSync('cartListInfo', JSON.stringify(this.data.cartList))
  },
  _getStorage() {
    let cartListInfo = wx.getStorageSync('cartListInfo')
    if (cartListInfo) {
      cartListInfo = JSON.parse(cartListInfo)
      this.setData({
        cartList: cartListInfo
      }, () => {
        console.log(this.data.cartList)
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
  },
  // 改变你点击的那个购物车的数量呢
  getcount(e) {
    const id = e.currentTarget.dataset.id
    const inputvalue = e.detail.inputvalue
    let cartList = this.data.cartList
    for (const item of cartList) {
      if (item.id === id) {
        item.buyTotal = inputvalue
      }
    }
    this.setData({
      cartList: cartList
    })
  },
  // 跳转到指定detail的吗？
  switchGoodsDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../listdetail/listdetail?id=' + id
    })
  }
})