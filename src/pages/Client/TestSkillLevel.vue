<template>
  <b-container>
    <el-page-header
      class="m-2 mb-4 col-md-10"
      @back="goBack"
      content="Test skills "
    ></el-page-header>
    <b-card no-body>
      <b-tabs pills card vertical>
        <b-tab title="N5" active>
          <b-card-text
            ><router-link
              :to="{
                name: 'ClientTestSkill',
                params: { level_id: 2, skill_id: 1 },
              }"
              >Từ vựng - Chữ hán</router-link
            ></b-card-text
          >
          <b-card-text
            ><router-link
              :to="{
                name: 'ClientTestSkill',
                params: { level_id: 2, skill_id: 2 },
              }"
              >Ngữ pháp</router-link
            ></b-card-text
          >
          <b-card-text
            ><router-link
              :to="{
                name: 'ClientTestSkill',
                params: { level_id: 2, skill_id: 3 },
              }"
              >Đọc hiểu</router-link
            ></b-card-text
          >
          <b-card-text
            ><router-link
              :to="{
                name: 'ClientTestSkill',
                params: { level_id: 2, skill_id: 4 },
              }"
              >Nghe hiểu</router-link
            ></b-card-text
          >
        </b-tab>
        <b-tab title="N4">
          <b-card-text
            ><router-link
              :to="{
                name: 'ClientTestSkill',
                params: { level_id: 3, skill_id: 1 },
              }"
              >Từ vựng - Chữ hán</router-link
            ></b-card-text
          >
          <b-card-text
            ><router-link
              :to="{
                name: 'ClientTestSkill',
                params: { level_id: 3, skill_id: 2 },
              }"
              >Ngữ pháp</router-link
            ></b-card-text
          >
          <b-card-text
            ><router-link
              :to="{
                name: 'ClientTestSkill',
                params: { level_id: 3, skill_id: 3 },
              }"
              >Đọc hiểu</router-link
            ></b-card-text
          >
          <b-card-text
            ><router-link
              :to="{
                name: 'ClientTestSkill',
                params: { level_id: 3, skill_id: 4 },
              }"
              >Nghe hiểu</router-link
            ></b-card-text
          >
        </b-tab>
        <b-tab title="N3"
          ><b-card-text
            ><router-link
              :to="{
                name: 'ClientTestSkill',
                params: { level_id: 4, skill_id: 1 },
              }"
              >Từ vựng - Chữ hán</router-link
            ></b-card-text
          >
          <b-card-text
            ><router-link
              :to="{
                name: 'ClientTestSkill',
                params: { level_id: 4, skill_id: 2 },
              }"
              >Ngữ pháp</router-link
            ></b-card-text
          >
          <b-card-text
            ><router-link
              :to="{
                name: 'ClientTestSkill',
                params: { level_id: 4, skill_id: 3 },
              }"
              >Đọc hiểu</router-link
            ></b-card-text
          >
          <b-card-text
            ><router-link
              :to="{
                name: 'ClientTestSkill',
                params: { level_id: 4, skill_id: 4 },
              }"
              >Nghe hiểu</router-link
            ></b-card-text
          >
        </b-tab>
        <b-tab title="N2"
          ><b-card-text
            ><router-link
              :to="{
                name: 'ClientTestSkill',
                params: { level_id: 5, skill_id: 1 },
              }"
              >Từ vựng - Chữ hán</router-link
            ></b-card-text
          >
          <b-card-text
            ><router-link
              :to="{
                name: 'ClientTestSkill',
                params: { level_id: 5, skill_id: 2 },
              }"
              >Ngữ pháp</router-link
            ></b-card-text
          >
          <b-card-text
            ><router-link
              :to="{
                name: 'ClientTestSkill',
                params: { level_id: 5, skill_id: 3 },
              }"
              >Đọc hiểu</router-link
            ></b-card-text
          >
          <b-card-text
            ><router-link
              :to="{
                name: 'ClientTestSkill',
                params: { level_id: 5, skill_id: 4 },
              }"
              >Nghe hiểu</router-link
            ></b-card-text
          >
        </b-tab>
      </b-tabs>
    </b-card>
  </b-container>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style>
</style>