import {
  config
} from './../../utils/baseRequestUrl.js'
Page({
  data: {
    logos: [],
    pageRow: [],
    quicks: [],
    swipers: []
  },
  onLoad: function(options) {
    this._getHomeData()
  },
  _getHomeData() {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: config.api_base_url + 'api/profiles/homepage',
      data: {},
      success: ((res) => {
        if (res.statusCode === 200 && res.errMsg === 'request:ok' && res.data) {
          this.setData({
            logos: res.data.logos,
            pageRow: res.data.pageRow,
            quicks: res.data.quicks,
            swipers: res.data.swipers
          })
        } else {
          this.setData({
            logos: [],
            pageRow: [],
            quicks: [],
            swipers: []
          })
        }
      }),
      fail: ((err) => {
        console.log(err)
        this.setData({
          logos: [],
          pageRow: [],
          quicks: [],
          swipers: []
        })
      }),
      complete: (() => {
        wx.hideLoading()
      })
    })
  }
})