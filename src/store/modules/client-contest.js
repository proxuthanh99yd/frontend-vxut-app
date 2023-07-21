import axios from "axios";

export default {
    namespaced: true,

    state: {
        contestData: null
    },

    getters: {
        contestClient: state => state.contestData
    },

    mutations: {
        setContestData(state, data) {
            state.contestData = data;
        }
    },

    actions: {
        getContestDataClient({ commit }, data) {
            axios
                .get("http://vxut-app.test/api/tests/" + data)
                .then(response => {
                    commit("setContestData", response.data);
                })
                .catch(err => {
                    commit(err);
                });
        },

    }
};



