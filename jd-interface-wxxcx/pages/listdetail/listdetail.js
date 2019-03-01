import {
  config
} from './../../utils/baseRequestUrl.js'
Page({
  data: {
    baitiao: [],
    partData: {},
    isShowBaiTiao: false
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
              })
              console.log(this.data.baitiao)
              console.log(this.data.partData)
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
  // 下面的那个点
  buypopview() {
    console.log('哈哈哈哈')
  }
})