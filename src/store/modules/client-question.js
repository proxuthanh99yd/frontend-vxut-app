import axios from "axios";

export default {
    namespaced: true,

    state: {
        questionDataClient: null,
    },

    getters: {
        questionClient: state => state.questionDataClient
    },

    mutations: {
        setQuestionDataClient(state, data) {
            state.questionDataClient = data;
        }
    },

    actions: {
        storeQuestionRequestClient({ commit }, data) {
            return axios
                .post("http://vxut-app.test/api/tests", data)
                .then(response => {
                    commit("setQuestionDataClient", response.data);
                });
        },
    }
};



