import {
  config
} from './../../utils/baseRequestUrl.js'
Page({
  data: {
    text: '',
    prolist: [],
    page: 1, // 默认请求的是第一页
    size: 5, // 一页返回几条数据
    flag: true
  },
  onLoad: function(e) {
    const text = e.text
    if (text) {
      wx.setNavigationBarTitle({
        title: text
      })
    }
    this._getDetailData()
  },
  _getDetailData() {
    // wx.showLoading({
    //   title: '加载中'
    // })
    wx.showNavigationBarLoading()
    wx.request({
      url: config.api_base_url + 'api/profiles/productionsList',
      success: ((res) => {
        if (res.statusCode === 200 && res.errMsg === 'request:ok' && res.data) {
          this.setData({
            prolist: res.data
          })
        } else {
          this.setData({
            prolist: []
          })
        }
      }),
      fail: ((err) => {
        console.log(err)
        this.setData({
          prolist: []
        })
      }),
      complete: (() => {
        // wx.hideLoading()
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      })
    })
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.setData({
      flag: true,
      page: 1
    })
    this._getDetailData()
  },
  // 触底以后触发的函数
  onReachBottom() {
    wx.showNavigationBarLoading()
    if (this.data.flag) {
      let prolist = this.data.prolist
      let page = this.data.page
      this.setData({
        page: page + 1
      })
      wx.request({
        url: `${config.api_base_url}api/profiles/productionsList/${this.data.page}/${this.data.size}`,
        success: ((res) => {
          if (res.statusCode === 200 && res.errMsg === 'request:ok' && res.data.length) {
            let new_prolist = res.data
            this.setData({
              prolist: prolist.concat(new_prolist)
            })
          } else {
            this.setData({
              flag: false
            })
            wx.showToast({
              icon: 'none',
              title: '已经是最后一页了'
            })
          }
        }),
        complete: (() => {
          wx.hideNavigationBarLoading()
        })
      })
    } else {
      wx.hideNavigationBarLoading()
      wx.showToast({
        icon: 'none',
        title: '已经是最后一页了'
      })
    }
  }
})