import {
  config
} from './../../utils/baseRequestUrl.js'
Page({
  data: {
    baitiao: [],
    partData: {},
    // 第一个子组件
    isShowBaiTiao: false,
    zhifuDesc: '',
    // 第二个子组件
    isShowBuy: false,
    // 左下角图标
    badgeCount: 0
  },
  onLoad: function(e) {
    this._getDetailData(e)
  },
  _getDetailData(e) {
    wx.showLoading({
      title: '加载中'
    })
    const id = e.id
    wx.request({
      url: config.api_base_url + 'api/profiles/productionDetail',
      success: ((res) => {
        if (res.statusCode === 200 && res.errMsg === 'request:ok' && res.data.length) {
          res.data.forEach((item) => {
            if (item.partData.id === id) {
              this.setData({
                baitiao: item.baitiao,
                partData: item.partData
              }, () => {
                this.setData({
                  zhifuDesc: this.data.baitiao[0].desc
                })
                let cartListInfo = wx.getStorageSync('cartListInfo')
                if (cartListInfo) {
                  let badgeCount = 0
                  cartListInfo = JSON.parse(cartListInfo)
                  const partData = this.data.partData
                  for (const item of cartListInfo) {
                    if (item.id === partData.id) {
                      badgeCount = item.buyTotal
                    }
                  }
                  this.setData({
                    badgeCount: badgeCount
                  })
                }
              })
              return
            }
          })
        } else {
          this.setData({
            baitiao: [],
            partData: []
          })
        }
      }),
      fail: ((err) => {
        console.log(err)
        this.setData({
          baitiao: [],
          partData: []
        })
      }),
      complete: (() => {
        wx.hideLoading()
      })
    })
  },
  // 上面的那个点
  popview() {
    this.setData({
      isShowBaiTiao: true
    })
  },
  // 子组件传递上来的，让白条消失
  hidebaitiaoview(e) {
    const isShowBaiTiao = e.detail.isShowBaiTiao
    this.setData({
      isShowBaiTiao
    })
  },
  // 点击立即打白条以后的操作
  ljdbt(e) {
    const isShowBaiTiao = e.detail.isShowBaiTiao
    const baitiao = e.detail.baitiao
    // let mydesc = ''
    // for (const item of baitiao) {
    //   if (item.select === true) {
    //     mydesc = item.desc
    //   }
    // }
    const currobj = baitiao.filter((item) => {
      return item.select === true
    })
    this.setData({
      isShowBaiTiao: false,
      zhifuDesc: currobj[0].desc
    })
  },
  // 下面的那个点
  buypopview() {
    this.setData({
      isShowBuy: true
    })
  },
  // 消失
  hideviewbuy(e) {
    const currisShowBuy = e.detail.isShowBuy
    this.setData({
      isShowBuy: currisShowBuy
    })
  },
  // amount的input改变的时候，传递了两层由下往上
  changeitemcount(e) {
    const count = e.detail.endcount
    const id = e.detail.id
    const partData = this.data.partData
    if (partData.id === id) {
      partData.count = count
    }
    this.setData({
      partData: partData
    })
  },
  // 加入购物车
  addcart() {
    let cartListInfo = wx.getStorageSync('cartListInfo')
    console.log(cartListInfo)
    if (cartListInfo) {
      console.log('有购物车，此刻你得判断当前对象是否存在这个购物车呢')
      cartListInfo = JSON.parse(cartListInfo)
      const partData = this.data.partData

      // 是否存在？
      const flag = this.isExit(cartListInfo, partData)
      if (flag) {
        for (const item of cartListInfo) {
          if (item.id === partData.id) {
            item.buyTotal += partData.count
          }
        }
      } else {
        partData.buyTotal = partData.count
        cartListInfo.push(partData)
      }
      wx.setStorageSync('cartListInfo', JSON.stringify(cartListInfo))


    } else {
      console.log('没购物车')
      wx.removeStorageSync('cartListInfo')

      let arr = []
      const partData = this.data.partData
      partData.buyTotal = partData.count
      arr.push(partData)
      wx.setStorageSync('cartListInfo', JSON.stringify(arr))
    }
    wx.showToast({
      title: '加入购物车成功',
      duration: 1500
    })
    let cartListInfo_temp = wx.getStorageSync('cartListInfo')
    if (cartListInfo_temp) {
      let badgeCount = 0
      cartListInfo_temp = JSON.parse(cartListInfo_temp)
      const partData_temp = this.data.partData
      for (const item of cartListInfo_temp) {
        if (item.id === partData_temp.id) {
          badgeCount = item.buyTotal
        }
      }
      this.setData({
        badgeCount: badgeCount
      })
    }
  },
  // 检查是否存在
  isExit(arr, obj) {
    if (Array.isArray(arr)) {
      for (const item of arr) {
        if (item.id === obj.id) {
          return true
        }
      }
    }
    return false
  },
  // 购物车
  gotoCartPage() {
    wx.switchTab({
      url: '../cart/cart',
    })
  }
})