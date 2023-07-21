import axios from "axios";

export default {
  namespaced: true,

  state: {
    testData: null,
  },

  getters: {
    test: state => state.testData
  },

  mutations: {
    setTestData(state, data) {
      state.testData = data;
    }
  },

  actions: {
    getTestData({ commit }) {
      axios
        .get("http://vxut-app.test/api/admin/test")
        .then(response => {
          commit("setTestData", response.data);
        })
        .catch(err => {
          commit(err);
        });
    },
    storeTestRequest({ commit }, data) {
      return axios
        .post("http://vxut-app.test/api/admin/test", data)
        .then(response => {
          // commit("setTestData", response.data);
        });
    },
    updateTestRequest({ commit }, data) {
      return axios
        .put("http://vxut-app.test/api/admin/test/" + data.id, data)
        .then(response => {
          // commit("setTestData", response.data);
        });
    },
    destroyTestRequest({ commit }, data) {
      return axios
        .delete("http://vxut-app.test/api/admin/test/" + data)
        .then(response => {
        });
    },
    getClientTestData({ commit }) {
      axios
        .get("http://vxut-app.test/api/tests")
        .then(response => {
          commit("setTestData", response.data);
        })
        .catch(err => {
          commit(err);
        });
    },
    getClientChapterData({ commit }, data) {
      axios
        .get("http://vxut-app.test/api/test/" + data.test_id + "/" + data.contest_id)
        .then(response => {
          commit("setTestData", response.data);
        })
        .catch(err => {
          commit(err);
        });
    },
    storeClientTestRequest({ commit }, data) {
      return axios
        .post("http://vxut-app.test/api/tests", data)
        .then(response => {
          // commit("setTestData", response.data);
        });
    },
    getLevelData({ commit }, data) {
      axios
        .get("http://vxut-app.test/api/test-level/" + data)
        .then(response => {
          commit("setTestData", response.data);
        })
        .catch(err => {
          commit(err);
        });
    },
  }
};



