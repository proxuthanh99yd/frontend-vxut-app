import axios from "axios";

export default {
    namespaced: true,

    state: {
        questionSkillData: null
    },

    getters: {
        questionSkill: state => state.questionSkillData
    },

    mutations: {
        setQuestionSKillData(state, data) {
            state.questionSkillData = data;
        }
    },

    actions: {
        getQuestionSkillData({ commit }, data) {
            axios
                .get("http://vxut-app.test/api/admin/question-skill/" + data)
                .then(response => {
                    commit("setQuestionSKillData", response.data);
                })
                .catch(err => {
                    commit(err);
                });
        },
        storeQuestionSkillRequest({ commit }, data, config) {
            return axios
                .post("http://vxut-app.test/api/admin/question-skill", data, config)
                .then(response => {
                    // commit("setQuestionData", response.data);
                });
        },
        updateQuestionSkillRequest({ commit }, data, config) {
            return axios
                .post(`http://vxut-app.test/api/admin/question-skill/${data.get("id")}/edit`, data, config)
                .then(response => {
                    // commit("setQuestionData", response.data);
                });
        },
        destroyQuestionSkillRequest({ commit }, data) {
            return axios
                .delete("http://vxut-app.test/api/admin/question-skill/" + data)
                .then(response => {
                });
        },
    }
};

