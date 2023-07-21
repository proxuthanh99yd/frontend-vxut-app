import axios from "axios";

export default {
    namespaced: true,

    state: {
        chapterData: null
    },

    getters: {
        chapter: state => state.chapterData
    },

    mutations: {
        setChapterData(state, data) {
            state.chapterData = data;
        }
    },

    actions: {
        getChapterData({ commit }, data) {
            axios
                .get("http://vxut-app.test/api/admin/chapter/" + data)
                .then(response => {
                    commit("setChapterData", response.data);
                })
                .catch(err => {
                    commit(err);
                });
        },
        storeChapterRequest({ commit }, data) {
            return axios
                .post("http://vxut-app.test/api/admin/chapter/" + data.id, data)
                .then(response => {
                    // commit("setChapterData", response.data);
                });
        },
        updateChapterRequest({ commit }, data) {
            return axios
                .put("http://vxut-app.test/api/admin/chapter/" + data.id, data)
                .then(response => {
                    // commit("setChapterData", response.data);
                });
        },
        destroyChapterRequest({ commit }, data) {
            return axios
                .delete("http://vxut-app.test/api/admin/chapter/" + data)
                .then(response => {
                });
        },
    }
};



