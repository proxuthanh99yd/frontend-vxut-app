import axios from "axios";

export default {
    namespaced: true,

    state: {
        flashcardManagerDataClient: null,
    },

    getters: {
        flashcardManagerClient: state => state.flashcardManagerDataClient
    },

    mutations: {
        setFlashcardManagerDataClient(state, data) {
            state.flashcardManagerDataClient = data;
        }
    },

    actions: {
        getFlashcardManagerDataClient({ commit }) {
            axios
                .get("http://vxut-app.test/api/manager-my-flash-cards")
                .then(response => {
                    commit("setFlashcardManagerDataClient", response.data);
                })
                .catch(err => {
                    commit(err);
                });
        },
        storeFlashcardManagerDataClientRequest({ commit }, data) {
            return axios
                .post("http://vxut-app.test/api/manager-my-flash-cards", data)
                .then(response => {
                    // commit("setTestData", response.data);
                });
        },
        updateFlashcardManagerDataClientRequest({ commit }, data) {
            return axios
                .put("http://vxut-app.test/api/manager-my-flash-cards/" + data.id, data)
                .then(response => {
                    // commit("setTestData", response.data);
                });
        },
        destroyFlashcardManagerDataClientRequest({ commit }, data) {
            return axios
                .delete("http://vxut-app.test/api/manager-my-flash-cards/" + data)
                .then(response => {
                });
        },
    }
};



