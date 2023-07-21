import axios from "axios";

export default {
    namespaced: true,

    state: {
        answerData: null
    },

    getters: {
        answer: state => state.answerData
    },

    mutations: {
        setAnswerData(state, data) {
            state.answerData = data;
        }
    },

    actions: {
        getAnswerData({ commit }, data) {
            axios
                .get("http://vxut-app.test/api/admin/answer/" + data)
                .then(response => {
                    commit("setAnswerData", response.data);
                })
                .catch(err => {
                    commit(err);
                });
        },
        storeAnswerRequest({ commit }, data) {
            return axios
                .post("http://vxut-app.test/api/admin/answer", data)
                .then(response => {
                    // commit("setAnswerData", response.data);
                });
        },
        updateAnswerRequest({ commit }, data) {
            return axios
                .patch(`http://vxut-app.test/api/admin/answer/${data.id}`, data)
                .then(response => {
                    // commit("setAnswerData", response.data);
                });
        },
        destroyAnswerRequest({ commit }, data) {
            return axios
                .delete("http://vxut-app.test/api/admin/answer/" + data)
                .then(response => {
                });
        },
    }
};

