const dashboard = ({
    state: {
      count: 0,
      dashboard:true
    },
    mutations: {
      increment (state) {
        state.count++
      }
    }
  })

export default dashboard;