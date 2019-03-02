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
    isShowBuy: false
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
    console.log('我是加入购物车')
  }
})