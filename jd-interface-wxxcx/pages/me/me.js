Page({
  data: {
    userisauthorized: false, // 用户是否已经授权
    userInfo: {} // 用户信息
  },
  onLoad: function(options) {
    this._checkUserAuthorized()
  },
  _checkUserAuthorized() {
    wx.getSetting({
      success: ((res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: ((res) => {
              this.setData({
                userisauthorized: true,
                userInfo: res.userInfo
              })
            })
          })
        } else {
          this.setData({
            userisauthorized: false,
            userInfo: {}
          })
        }
      })
    })
  },
  getuserinfo(event) {
    if (event.detail.errMsg === 'getUserInfo:ok') {
      const userInfo = event.detail.userInfo
      this.setData({
        userisauthorized: true,
        userInfo: userInfo
      })
    } else {
      this.setData({
        userisauthorized: false,
        userInfo: {}
      })
    }
  }
})