Component({
  properties: {
    count: {
      type: Number,
      value: 1
    }
  },
  data: {},
  methods: {
    // 减
    subtract(e) {
      let inputvalue = e.currentTarget.dataset.count
      if (inputvalue === 1) {
        return
      }
      inputvalue = inputvalue - 1
      this.triggerEvent('getcount', {
        inputvalue: inputvalue
      }, {})
    },
    inputValueChangeHandle(e) {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        const inputvalue = e.detail.value
        this.triggerEvent('getcount', {
          inputvalue: inputvalue
        }, {})
      }, 1000)
    },
    // 加
    addnum(e) {
      let inputvalue = e.currentTarget.dataset.count
      inputvalue = inputvalue + 1
      this.triggerEvent('getcount', {
        inputvalue: inputvalue
      }, {})
    }
  }
})