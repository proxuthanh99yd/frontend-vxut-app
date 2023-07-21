import axios from "axios";

export default {
    namespaced: true,

    state: {
        questionSkillDataClient: null,
    },

    getters: {
        questionSkillClient: state => state.questionSkillDataClient
    },

    mutations: {
        setQuestionSkillDataClient(state, data) {
            state.questionSkillDataClient = data;
        }
    },

    actions: {
        storeQuestionSkillRequestClient({ commit }, data) {
            return axios
                .post("http://vxut-app.test/api/test-skill", data)
                .then(response => {
                    commit("setQuestionSkillDataClient", response.data);
                });
        },
        getQuestionSkillDataClient({ commit }, data) {
            axios
                .get("http://vxut-app.test/api/test-skill/" + data)
                .then(response => {
                    commit("setQuestionSkillDataClient", response.data);
                })
                .catch(err => {
                    commit(err);
                });
        },
    }
};



