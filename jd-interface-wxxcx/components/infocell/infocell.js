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
      this.triggerEvent('popview')
    }
  }
})