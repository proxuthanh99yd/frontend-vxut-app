import axios from "axios";

export default {
    namespaced: true,

    state: {
        testSkillDataClient: null,
        testDataClient: null,
    },

    getters: {
        testSkillClient: state => state.testSkillDataClient,
        testClient: state => state.testDataClient
    },

    mutations: {
        setTestSkillDataClient(state, data) {
            state.testSkillDataClient = data;
        },
        setTestDataClient(state, data) {
            state.testDataClient = data;
        }
    },

    actions: {
        getTestSkillDataClient({ commit }, data) {
            axios
                .get("http://vxut-app.test/api/test-skill/" + data.level_id + "/" + data.skill_id)
                .then(response => {
                    commit("setTestSkillDataClient", response.data);
                })
                .catch(err => {
                    commit(err);
                });
        },
        getTestSkillHistoryDataClient({ commit }, data) {
            axios
                .get("http://vxut-app.test/api/test-skill-history")
                .then(response => {
                    commit("setTestSkillDataClient", response.data);
                })
                .catch(err => {
                    commit(err);
                });
        },
        getTestHistoryDataClient({ commit }, data) {
            axios
                .get("http://vxut-app.test/api/test-history")
                .then(response => {
                    commit("setTestDataClient", response.data);
                })
                .catch(err => {
                    commit(err);
                });
        },

    }
};



