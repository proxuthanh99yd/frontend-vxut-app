import axios from "axios";

export default {
    namespaced: true,

    state: {
        chapterDataClient: null,
    },

    getters: {
        chapterClient: state => state.chapterDataClient
    },

    mutations: {
        setChapterDataClient(state, data) {
            state.chapterDataClient = data;
        }
    },

    actions: {
        getChapterDataClient({ commit }, data) {
            axios
                .get("http://vxut-app.test/api/test/" + data.test_id + "/" + data.contest_id)
                .then(response => {
                    commit("setChapterDataClient", response.data);
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



