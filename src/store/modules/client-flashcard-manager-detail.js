import axios from "axios";

export default {
    namespaced: true,

    state: {
        flashcardManagerDetailDataClient: null,
    },

    getters: {
        flashcardManagerDetailClient: state => state.flashcardManagerDetailDataClient
    },

    mutations: {
        setFlashcardManagerDetailDataClient(state, data) {
            state.flashcardManagerDetailDataClient = data;
        }
    },

    actions: {
        getFlashcardManagerDetailDataClient({ commit }, data) {
            axios
                .get("http://vxut-app.test/api/manager-my-flash-card/" + data)
                .then(response => {
                    commit("setFlashcardManagerDetailDataClient", response.data);
                })
                .catch(err => {
                    commit(err);
                });
        },
        storeFlashcardManagerDetailDataClientRequest({ commit }, data) {
            return axios
                .post("http://vxut-app.test/api/manager-my-flash-card", data)
                .then(response => {
                    // commit("setTestData", response.data);
                });
        },
        updateFlashcardManagerDetailDataClientRequest({ commit }, data) {
            return axios
                .put("http://vxut-app.test/api/manager-my-flash-card/" + data.id, data)
                .then(response => {
                    // commit("setTestData", response.data);
                });
        },
        destroyFlashcardManagerDetailDataClientRequest({ commit }, data) {
            return axios
                .delete("http://vxut-app.test/api/manager-my-flash-card/" + data)
                .then(response => {
                });
        },
    }
};



