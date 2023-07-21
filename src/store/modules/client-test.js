import axios from "axios";

export default {
    namespaced: true,

    state: {
        testDataClient: null,
    },

    getters: {
        testClient: state => state.testDataClient
    },

    mutations: {
        setTestDataClient(state, data) {
            state.testDataClient = data;
        }
    },

    actions: {
        getTestDataClient({ commit }) {
            axios
                .get("http://vxut-app.test/api/tests")
                .then(response => {
                    commit("setTestDataClient", response.data);
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
    }
};



