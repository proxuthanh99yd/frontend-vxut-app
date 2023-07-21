<template>
  <div class="app-sidebar">
    <b-sidebar
      id="sidebar-backdrop"
      v-if="user"
      :title="user.name"
      right
      backdrop
      shadow
    >
      <template #default="{ hide }">
        <div class="p-3">
          <nav class="mb-3 bg-white" v-if="user.role_id < 3">
            <b-nav vertical>
              <b-nav-item active @click="hide"
                ><router-link
                  :to="{ name: 'Dashboard' }"
                  router-link-exact-active
                  >Admin Dashboard</router-link
                ></b-nav-item
              >
              <b-nav-item @click="hide"
                ><router-link :to="{ name: 'Test' }"
                  >Admin Manager Test</router-link
                ></b-nav-item
              >
              <b-nav-item @click="hide"
                ><router-link :to="{ name: 'TestSkill' }"
                  >Admin Manager Skill Test</router-link
                ></b-nav-item
              >
              <b-nav-item @click="hide"
                ><router-link :to="{ name: 'ResultManager' }"
                  >Admin Manager Result Test</router-link
                ></b-nav-item
              >
              <b-nav-item @click="hide"
                ><router-link :to="{ name: 'FlashcardMg' }"
                  >Admin Manager Flash Card</router-link
                ></b-nav-item
              >
              <b-nav-item @click="hide"
                ><router-link :to="{ name: 'Users' }"
                  >Admin Manager Users</router-link
                ></b-nav-item
              >
            </b-nav>
          </nav>
          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item active @click="hide"
                ><router-link
                  :to="{ name: 'HomePage' }"
                  router-link-exact-active
                  >Home Page</router-link
                ></b-nav-item
              >
              <b-nav-item active @click="hide"
                ><router-link :to="{ name: 'Tests' }" router-link-exact-active
                  >JLPT Test</router-link
                ></b-nav-item
              >
              <b-nav-item @click="hide"
                ><router-link :to="{ name: 'TestSkillLevel' }"
                  >SKill Test</router-link
                ></b-nav-item
              >
              <b-nav-item @click="hide"
                ><router-link :to="{ name: 'Flashcard' }"
                  >Flash Card</router-link
                ></b-nav-item
              >
              <b-nav-item @click="hide"
                ><router-link :to="{ name: 'Profile' }"
                  >My Proflie</router-link
                ></b-nav-item
              >
            </b-nav>
          </nav>
        </div>
      </template>
      <template #footer="{}">
        <div class="d-flex text-light align-items-center px-3 py-2">
          <b-button @click="logout" variant="outline-info" class="mb-2">
            <b-icon icon="power" aria-hidden="true"></b-icon> Logout
          </b-button>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "AppSidebar",
  props: {
    user: Object,
  },
  data() {
    return {};
  },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    ...mapActions("auth", ["sendLogoutRequest"]),
    logout() {
      this.sendLogoutRequest().then(() => {
        this.$router.push({ name: "Home" });
      });
    },
  },
};
</script>
<style lang="scss">
</style>