<template>
  <div class="main">
    <AppNavbar class="main-dashboard__navbar"></AppNavbar>
    <AppSidebar :user="user"></AppSidebar>
    <router-view></router-view>
  </div>
</template>
<script>
import AppNavbar from "../components/app-navbars/AppNavbar.vue";
import AppSidebar from "../components/app-sidebar/AppSidebar.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Main",
  components: {
    AppNavbar,
    AppSidebar,
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
.main-dashboard {
  &__navbar {
    margin-bottom: 40px;
  }
}
</style>