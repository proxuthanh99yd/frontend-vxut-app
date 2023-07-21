<template>
  <div class="app-navbar">
    <div class="container">
      <div class="app-navbar__logo">
        <router-link :to="{ name: 'HomePage' }"
          ><h2>VXUT <span>japanese test quiz system</span></h2></router-link
        >
      </div>
      <div class="app-navbar__user-info">
        <div class="app-navbar__user-info"></div>
        <div v-if="user">
          <b-avatar
            v-if="user.avatar"
            variant="info"
            :src="this.baseImg + user.avatar"
          ></b-avatar
          ><b-avatar v-else></b-avatar>
        </div>
      </div>
      <div class="app-navbar__menu" v-b-toggle.sidebar-backdrop>
        <b-button v-if="user" variant="info"
          >Menu <BIconMenuButtonWide
        /></b-button>
        <b-button
          v-if="!user"
          class="mr-2"
          @click="$router.push('/login')"
          variant="info"
          >Login
        </b-button>
        <b-button v-if="!user" @click="$router.push('/register')" variant="info"
          >Register
        </b-button>
      </div>
    </div>
  </div>
</template>
<script>
import { BIconMenuButtonWide } from "bootstrap-vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "AppNavbar",
  components: {
    BIconMenuButtonWide,
  },
  data() {
    return {
      baseImg: "http://vxut-app.test/images/",
      centered: false,
    };
  },
  created() {
    this.getUserData();
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  methods: {
    ...mapActions("auth", ["getUserData"]),
  },
};
</script>
<style lang="scss" scoped>
* {
  color: white;
}
.app-navbar {
  padding: 30px 0;
  background: #086fb2;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__logo {
    font-size: 60px;
    font-weight: bold;
    flex: 1;
    h2 {
      font-size: 45px;
      font-weight: bold;
      font-family: cursive;
      padding-left: 10px;
    }
    span {
      font-size: 20px;
      font-weight: bold;
      font-family: cursive;
      padding-left: 10px;
    }
  }
  &__user-info {
    display: flex;
    align-items: center;
    margin-right: 30px;
    &__avatar {
      width: 35px;
      height: 35px;
      margin-right: 5px;
      img {
        width: 100%;
        border-radius: 50%;
        border: 1px solid white;
      }
    }
  }
}
</style>