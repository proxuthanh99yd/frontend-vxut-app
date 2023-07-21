import axios from "axios";

export default {
    namespaced: true,

    state: {
        myFlashcardData: null,
    },

    getters: {
        myFlashcard: state => state.myFlashcardData
    },

    mutations: {
        setMyFlashcardDataData(state, data) {
            state.myFlashcardData = data;
        }
    },

    actions: {
        getFlashcardsData({ commit }) {
            axios
                .get("http://vxut-app.test/api/my-flash-cards")
                .then(response => {
                    commit("setMyFlashcardDataData", response.data);
                })
                .catch(err => {
                    commit(err);
                });
        },
        getFlashcardData({ commit }, data) {
            axios
                .get("http://vxut-app.test/api/my-flash-card/" + data)
                .then(response => {
                    commit("setMyFlashcardDataData", response.data);
                })
                .catch(err => {
                    commit(err);
                });
        },
        getAllFlashcardsData({ commit }) {
            axios
                .get("http://vxut-app.test/api/flash-cards")
                .then(response => {
                    commit("setMyFlashcardDataData", response.data);
                })
                .catch(err => {
                    commit(err);
                });
        },
        getAdminAllFlashcardsData({ commit }) {
            axios
                .get("http://vxut-app.test/api/admin/manager-flash-cards")
                .then(response => {
                    commit("setMyFlashcardDataData", response.data);
                })
                .catch(err => {
                    commit(err);
                });
        },

    }
};



