const homepage = ({
    state: {
      count: 0,
      homepage:true
    },
    mutations: {
      increment (state) {
        state.count++
      }
    }
  })

  export default homepage;