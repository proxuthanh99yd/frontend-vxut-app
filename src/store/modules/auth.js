import axios from "axios";

export default {
  namespaced: true,

  state: {
    userData: null,
    msg: null,
  },

  getters: {
    user: state => state.userData,
    msg: state => state.msg
  },

  mutations: {
    setUserData(state, user) {
      state.userData = user;
    },
    setMsg(state, msg) {
      state.msg = msg;
    }
  },

  actions: {
    getUserData({ commit }) {
      axios
        .get(process.env.VUE_APP_API_BASE_URL + "user")
        .then(response => {
          commit("setUserData", response.data);
        })
        .catch(() => {
          localStorage.removeItem("authToken");
        });
    },
    updateUserData({ commit }, data) {
      axios
        .post(process.env.VUE_APP_API_BASE_URL + "edit-user", data)
        .then(response => {
          commit("setUserData", response.data);
        })
        .catch(() => {
          localStorage.removeItem("authToken");
        });
    },
    updateProfileData({ commit }, data) {
      axios
        .post(process.env.VUE_APP_API_BASE_URL + "edit-profile", data)
        .then(response => {
          commit("setUserData", response.data);
        })
        .catch(() => {
          localStorage.removeItem("authToken");
        });
    },
    changePassUserData({ commit }, data) {
      axios
        .post(process.env.VUE_APP_API_BASE_URL + "change-password", data)
        .then(response => {
          commit("setMsg", response.data);
        })
        .catch(() => {
          localStorage.removeItem("authToken");
        });
    },
    sendLoginRequest({ commit }, data) {
      commit("setErrors", {}, { root: true });
      return axios
        .post(process.env.VUE_APP_API_BASE_URL + "login", data)
        .then(response => {
          commit("setUserData", response.data.user);
          localStorage.setItem("authToken", response.data.token);
        });
    },
    sendRegisterRequest({ commit }, data) {
      commit("setErrors", {}, { root: true });
      return axios
        .post(process.env.VUE_APP_API_BASE_URL + "register", data)
        .then(response => {
          if (response) {
            commit("setUserData", response.data.user);
            localStorage.setItem("authToken", response.data.token);
          } else {
            commit("setUserData", response.data.user);
          }

          localStorage.setItem("authToken", response.data.token);
        });
    },
    sendLogoutRequest({ commit }) {
      axios.post(process.env.VUE_APP_API_BASE_URL + "logout").then(() => {
        commit("setUserData", null);
        localStorage.removeItem("authToken");
      });
    },
    sendVerifyResendRequest() {
      return axios.get(process.env.VUE_APP_API_BASE_URL + "email/resend");
    },
    sendVerifyRequest({ dispatch }, hash) {
      return axios
        .get(process.env.VUE_APP_API_BASE_URL + "email/verify/" + hash)
        .then(() => {
          dispatch("getUserData");
        });
    }
  }
};
