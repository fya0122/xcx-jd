Page({
  data: {
    cartList: [],
    totalMoney: 0, // 总价格
    totalCount: 0, // 总数量
    selectAll: false // 是否全选
  },
  onShow() {
    this._getStorage()
  },
  onHide() {
    wx.removeStorageSync('cartListInfo')
    console.log(this.data.cartList)
    wx.setStorageSync('cartListInfo', JSON.stringify(this.data.cartList))
  },
  _getStorage() {
    let cartListInfo = wx.getStorageSync('cartListInfo')
    if (cartListInfo) {
      cartListInfo = JSON.parse(cartListInfo)
      this.setData({
        cartList: cartListInfo
      }, () => {
        // 设置图标
        this._setBadgeCount(this.data.cartList)
        // 计算价格和数量
        this._calculateTotalPriceAndCount(this.data.cartList)
        // 计算是否全选
        this._calculateIsAllSelect(this.data.cartList)
      })
    }
  },
  // 设置图标
  _setBadgeCount(arr) {
    if (arr.length > 0) {
      // 设置购物车图标
      wx.setTabBarBadge({
        index: 2,
        text: String(this._calculateBadgeCount(arr)),
      })
    } else {
      wx.removeTabBarBadge({
        index: 2
      })
    }
  },
  // 计算下面tab显示的图标
  _calculateBadgeCount(arr) {
    let count = 0
    for (const item of arr) {
      if (item.select === true) {
        count += 1
      }
    }
    return count
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
    }, () => {
      this._setBadgeCount(this.data.cartList)
      this._calculateTotalPriceAndCount(this.data.cartList)
      this._calculateIsAllSelect(this.data.cartList)
    })
  },
  // 跳转到指定detail的吗？
  switchGoodsDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../listdetail/listdetail?id=' + id
    })
  },
  // 改变状态
  selectGoods(e) {
    const id = e.currentTarget.dataset.id
    let cartList = this.data.cartList
    for (const item of cartList) {
      if (item.id === id) {
        item.select = !item.select
      }
    }
    this.setData({
      cartList
    }, () => {
      this._setBadgeCount(this.data.cartList)
      this._calculateTotalPriceAndCount(this.data.cartList)
      this._calculateIsAllSelect(this.data.cartList)
    })
  },
  // 计算总价和数量
  _calculateTotalPriceAndCount(arr) {
    if (Array.isArray(arr) && arr.length > 0) {
      let totalMoney = 0
      let totalCount = 0
      for (const item of arr) {
        if (item.select) {
          totalMoney += item.buyTotal * item.price
          totalCount += item.buyTotal
        }
      }
      this.setData({
        totalMoney,
        totalCount
      })
    }
  },
  // 计算全选是否该点亮
  _calculateIsAllSelect(arr) {
    let isSelected = 0
    for (const item of arr) {
      if (item.select === true) {
        isSelected += 1
      }
    }
    if (isSelected === arr.length) {
      this.setData({
        selectAll: true
      })
    } else {
      this.setData({
        selectAll: false
      })
    }
  },
  // 改变所有的状态
  setAllStatus() {
    let selectAll = this.data.selectAll
    let cartList = this.data.cartList
    if (selectAll === true) {
      cartList.forEach((item) => {
        item.select = false
      })
    } else {
      cartList.forEach((item) => {
        item.select = true
      })
    }
    this.setData({
      cartList
    }, () => {
      this._setBadgeCount(this.data.cartList)
      this._calculateTotalPriceAndCount(this.data.cartList)
      this._calculateIsAllSelect(this.data.cartList)
    })
  }
})