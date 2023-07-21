import axios from "axios";

export default {
    namespaced: true,

    state: {
        resultDataClient: null,
    },

    getters: {
        resultClient: state => state.resultDataClient
    },

    mutations: {
        setResultDataClient(state, data) {
            state.resultDataClient = data;
        }
    },

    actions: {
        getResultDataClient({ commit }, data) {
            axios
                .get("http://vxut-app.test/api/result/" + data)
                .then(response => {
                    commit("setResultDataClient", response.data);
                })
                .catch(err => {
                    commit(err);
                });
        },
        getResultHistoryDataClient({ commit }, data) {
            axios
                .get("http://vxut-app.test/api/result-detail/" + data.test_id)
                .then(response => {
                    commit("setResultDataClient", response.data);
                })
                .catch(err => {
                    commit(err);
                });
        },
        getResultSkillHistoryDataClient({ commit }, data) {
            axios
                .get("http://vxut-app.test/api/test-skill-history/" + data.test_skill_id + "/" + data.result_skill_id)
                .then(response => {
                    commit("setResultDataClient", response.data);
                })
                .catch(err => {
                    commit(err);
                });
        },
        getResultTest({ commit }, data) {
            axios
                .get("http://vxut-app.test/api/admin/test-result/" + data)
                .then(response => {
                    commit("setResultDataClient", response.data);
                })
                .catch(err => {
                    commit(err);
                });
        },
        getResultTestDetail({ commit }, data) {
            axios
                .get("http://vxut-app.test/api/admin/test-result/" + data.test_id + "/" + data.user_id)
                .then(response => {
                    commit("setResultDataClient", response.data);
                })
                .catch(err => {
                    commit(err);
                });
        },
        getResultTestSkill({ commit }, data) {
            axios
                .get("http://vxut-app.test/api/admin/test-skill-result/" + data)
                .then(response => {
                    commit("setResultDataClient", response.data);
                })
                .catch(err => {
                    commit(err);
                });
        },
        getResultTestSkillDetail({ commit }, data) {
            axios
                .get("http://vxut-app.test/api/admin/test-skill-result/" + data.test_skill_id + "/" + data.user_id + "/" + data.result_skill_id)
                .then(response => {
                    commit("setResultDataClient", response.data);
                })
                .catch(err => {
                    commit(err);
                });
        },
    }
};



