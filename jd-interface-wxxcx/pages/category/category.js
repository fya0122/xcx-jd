import {
  config
} from './../../utils/baseRequestUrl.js'
Page({
  data: {
    navLeftItems: [],
    navRightItems: [],
    currentIndex: 0
  },
  onLoad: function(options) {
    this._getCategoryPageData()
  },
  _getCategoryPageData() {
    wx.showLoading({
      title: '加载中'
    })
    wx.request({
      url: config.api_base_url + 'api/profiles/productions',
      success: ((res) => {
        if (res.statusCode === 200 && res.errMsg === 'request:ok' && res.data) {
          this.setData({
            navLeftItems: res.data.navLeftItems,
            navRightItems: res.data.navRightItems
          })
        } else {
          this.setData({
            navLeftItems: [],
            navRightItems: []
          })
        }
      }),
      fail: ((err) => {
        console.log(err)
        this.setData({
          navLeftItems: [],
          navRightItems: []
        })
      }),
      complete: (() => {
        wx.hideLoading()
      })
    })
  },
  selectCurrentIndex(e) {
    const currentIndex = e.target.dataset.index
    if (currentIndex === this.data.currentIndex) {
      return
    } else {
      this.setData({
        currentIndex
      })
    }
  },
  navigateToDetail(e) {
    const text = e.currentTarget.dataset.text
    wx.navigateTo({
      url: `../list/list?text=${text}`
    })
  }
})