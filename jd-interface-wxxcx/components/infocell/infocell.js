Component({
  properties: {
    title: {
      type: String,
      value: ''
    },
    desc: {
      type: String,
      value: ''
    }
  },
  data: {},
  methods: {
    popView() {
      console.log(123)
      this.triggerEvent('popview')
    }
  }
})