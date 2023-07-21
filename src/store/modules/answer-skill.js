import axios from "axios";

export default {
    namespaced: true,

    state: {
        answerSkillData: null
    },

    getters: {
        answerSkill: state => state.answerSkillData
    },

    mutations: {
        setAnswerSkillData(state, data) {
            state.answerSkillData = data;
        }
    },

    actions: {
        getAnswerSkillData({ commit }, data) {
            axios
                .get("http://vxut-app.test/api/admin/answer-skill/" + data)
                .then(response => {
                    commit("setAnswerSkillData", response.data);
                })
                .catch(err => {
                    commit(err);
                });
        },
        storeAnswerSkillRequest({ commit }, data) {
            return axios
                .post("http://vxut-app.test/api/admin/answer-skill", data)
                .then(response => {
                    // commit("setAnswerData", response.data);
                });
        },
        updateAnswerSkillRequest({ commit }, data) {
            return axios
                .patch(`http://vxut-app.test/api/admin/answer-skill/${data.id}`, data)
                .then(response => {
                    // commit("setAnswerData", response.data);
                });
        },
        destroyAnswerSkillRequest({ commit }, data) {
            return axios
                .delete("http://vxut-app.test/api/admin/answer-skill/" + data)
                .then(response => {
                });
        },
    }
};

