import axios from "axios";

export default {
    namespaced: true,

    state: {
        testSKillData: null,
    },

    getters: {
        testSkill: state => state.testSKillData
    },

    mutations: {
        setTestSkillData(state, data) {
            state.testSKillData = data;
        }
    },

    actions: {
        getTestSkillData({ commit }) {
            axios
                .get("http://vxut-app.test/api/admin/test-skill")
                .then(response => {
                    commit("setTestSkillData", response.data);
                })
                .catch(err => {
                    commit(err);
                });
        },
        storeTestSkillRequest({ commit }, data) {
            return axios
                .post("http://vxut-app.test/api/admin/test-skill", data)
                .then(response => {
                    // commit("setTestData", response.data);
                });
        },
        updateTestSkillRequest({ commit }, data) {
            return axios
                .put("http://vxut-app.test/api/admin/test-skill/" + data.id, data)
                .then(response => {
                    // commit("setTestData", response.data);
                });
        },
        destroyTestSkillRequest({ commit }, data) {
            return axios
                .delete("http://vxut-app.test/api/admin/test-skill/" + data)
                .then(response => {
                });
        },
    }
};



