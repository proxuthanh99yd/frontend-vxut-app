import axios from "axios";

export default {
    namespaced: true,

    state: {
        questionData: null
    },

    getters: {
        question: state => state.questionData
    },

    mutations: {
        setQuestionData(state, data) {
            state.questionData = data;
        }
    },

    actions: {
        getQuestionData({ commit }, data) {
            axios
                .get("http://vxut-app.test/api/admin/question/" + data)
                .then(response => {
                    commit("setQuestionData", response.data);
                })
                .catch(err => {
                    commit(err);
                });
        },
        storeQuestionRequest({ commit }, data, config) {
            return axios
                .post("http://vxut-app.test/api/admin/question", data, config)
                .then(response => {
                    // commit("setQuestionData", response.data);
                });
        },
        updateQuestionRequest({ commit }, data, config) {
            return axios
                .post(`http://vxut-app.test/api/admin/question/${data.get("id")}/edit`, data, config)
                .then(response => {
                    // commit("setQuestionData", response.data);
                });
        },
        destroyQuestionRequest({ commit }, data) {
            return axios
                .delete("http://vxut-app.test/api/admin/question/" + data)
                .then(response => {
                });
        },
    }
};



// import testApi from "../../service/test"

// const types = {
//   CREATE_TEST_TYPE: "CREATE_TEST_TYPE",
//   CREATE_TEST_TYPE_SUCCESS: "CREATE_TEST_TYPE_SUCCESS",
//   CREATE_TEST_TYPE_FAIL: "CREATE_TEST_TYPE_FAIL",

//   EDIT_TEST_TYPE: "EDIT_TEST_TYPE",
//   EDIT_TEST_TYPE_SUCCESS: "EDIT_TEST_TYPE_SUCCESS",
//   EDIT_TEST_TYPE_FAIL: "EDIT_TEST_TYPE_FAIL",

//   GET_TEST_TYPE: "GET_TEST_TYPE",
//   GET_TEST_TYPE_SUCCESS: "GET_TEST_TYPE_SUCCESS",
//   GET_TEST_TYPE_FAIL: "GET_TEST_TYPE_FAIL",

//   DELETE_TEST_TYPE: "DELETE_TEST_TYPE",
//   DELETE_TEST_TYPE_SUCCESS: "DELETE_TEST_TYPE_SUCCESS",
//   DELETE_TEST_TYPE_FAIL: "DELETE_TEST_TYPE_FAIL"
// }

// const test = ({
//   namespaced: true,
//   state: {
//     count: 0,
//     test: [],
//     byTest: [],
//     alertModel: {
//       status: false,
//       text: ""
//     }
//   },
//   actions: {
//     create_test_type_list({ commit }, payload) {
//       commit(types.CREATE_TEST_TYPE);
//       testApi.StoreTest(payload)
//         .then(rs => {
//           commit(types.CREATE_TEST_TYPE_SUCCESS, rs.data);
//         })
//         .catch(err => {
//           commit(types.CREAT_TEST_TYPE_FAIL, err);
//         })
//     },
//     get_test_type_list({ commit }, payload) {
//       commit(types.GET_TEST_TYPE);
//       testApi.IndexTest()
//         .then(rs => {
//           commit(types.GET_TEST_TYPE_SUCCESS, rs.data);
//         })
//         .catch(err => {
//           commit(types.GET_TEST_TYPE_FAIL, err);
//         })
//     },
//     edit_test_type_list({ commit }, payload) {
//       commit(types.EDIT_TEST_TYPE);
//       testApi.EditTest(payload)
//         .then(rs => {
//           commit(types.EDIT_TEST_TYPE_SUCCESS, rs.data);
//         })
//         .catch(err => {
//           commit(types.EDIT_TEST_TYPE_FAIL, err);
//         })
//     },
//     delete_test_type_list({ commit }, payload) {
//       commit(types.DELETE_TEST_TYPE);
//       testApi.DestroyTest(payload)
//         .then(rs => {
//           commit(types.DELETE_TEST_TYPE_SUCCESS);
//         })
//         .catch(err => {
//           commit(types.DELETE_TEST_TYPE_FAIL, err);
//         })
//     }
//   },
//   mutations: {
//     [types.CREATE_TEST_TYPE](state, payload) {
//     },
//     [types.CREATE_TEST_TYPE_SUCCESS](state, payload) {
//       state.test = payload;
//       state.alertModel = {
//         status: true,
//         text: "CREAT_TEST_TYPE_SUCCESS"
//       }
//     },
//     [types.CREATE_TEST_TYPE_FAIL](state, err) {
//       state.alertModel = {
//         status: true,
//         text: "CREAT_TEST_TYPE_FAIL"
//       }
//     },

//     [types.GET_TEST_TYPE](state, payload) {
//     },
//     [types.GET_TEST_TYPE_SUCCESS](state, payload) {
//       state.test = payload;
//       state.alertModel = {
//         status: true,
//         text: "GET_TEST_TYPE_SUCCESS"
//       }
//     },
//     [types.GET_TEST_TYPE_FAIL](state, err) {
//       state.alertModel = {
//         status: true,
//         text: "GET_TEST_TYPE_FAIL"
//       }
//     },

//     [types.EDIT_TEST_TYPE](state, payload) {
//     },
//     [types.EDIT_TEST_TYPE_SUCCESS](state, payload) {
//       state.byTest = payload;
//       state.alertModel = {
//         status: true,
//         text: "EDIT_TEST_TYPE_SUCCESS"
//       }
//     },
//     [types.EDIT_TEST_TYPE_FAIL](state, err) {
//       state.alertModel = {
//         status: true,
//         text: "EDIT_TEST_TYPE_FAIL"
//       }
//     },


//     [types.DELETE_TEST_TYPE](state, payload) {
//     },
//     [types.DELETE_TEST_TYPE_SUCCESS](state, payload) {
//       state.alertModel = {
//         status: true,
//         text: "DELETE_TEST_TYPE_SUCCESS"
//       }
//     },
//     [types.DELETE_TEST_TYPE_FAIL](state, err) {
//       state.alertModel = {
//         status: true,
//         text: "DELETE_TEST_TYPE_FAIL"
//       }
//     },
//   },
//   getters: {
//     test_type_list: state => state.test,
//     state_edit_test_type_list: state => state.byTest,
//   }
// });

// export default test;
