import axios from "axios";

export default {
    namespaced: true,

    state: {
        usersData: null,
    },

    getters: {
        users: state => state.usersData
    },

    mutations: {
        setUsersData(state, data) {
            state.usersData = data;
        }
    },

    actions: {
        getUsersData({ commit }) {
            return axios
                .get("http://vxut-app.test/api/admin/users")
                .then(response => {
                    commit("setUsersData", response.data);
                })
                .catch(err => {
                    commit(err);
                });
        },
        storeUsersData({ commit }, data) {
            return axios
                .patch("http://vxut-app.test/api/admin/users/" + data.id, data)
                .then(response => {

                })
                .catch(err => {
                    commit(err);
                });
        },
    }
};



