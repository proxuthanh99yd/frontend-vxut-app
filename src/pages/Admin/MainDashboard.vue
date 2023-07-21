<template>
  <div class="home-page container">
    <div class="row" v-if="user">
      <div class="col-lg-3 col-6">
        <!-- small box -->
        <div class="small-box bg-info">
          <div class="inner">
            <h3>JLPT</h3>

            <p>Thi thử jlpt</p>
          </div>
          <div class="icon">
            <i><b-icon icon="vector-pen"></b-icon></i>
          </div>
          <router-link class="small-box-footer" :to="{ name: 'Test' }"
            >Quản lý bài thi<i
              ><b-icon icon="arrow-right-circle-fill"></b-icon></i
          ></router-link>
        </div>
      </div>
      <!-- ./col -->
      <div class="col-lg-3 col-6">
        <!-- small box -->
        <div class="small-box bg-success">
          <div class="inner">
            <h3>SKILL</h3>

            <p>Luyện kỹ năng</p>
          </div>
          <div class="icon">
            <i><b-icon icon="capslock-fill"></b-icon></i>
          </div>
          <router-link class="small-box-footer" :to="{ name: 'TestSkill' }"
            >Quản lý luyện tập
            <i><b-icon icon="arrow-right-circle-fill"></b-icon></i
          ></router-link>
        </div>
      </div>
      <!-- ./col -->
      <div class="col-lg-3 col-6">
        <!-- small box -->
        <div class="small-box bg-warning">
          <div class="inner">
            <h3>FLASH CARD</h3>

            <p>Ôn tập từ vựng</p>
          </div>
          <div class="icon">
            <i><b-icon icon="files"></b-icon></i>
          </div>
          <router-link class="small-box-footer" :to="{ name: 'FlashcardMg' }"
            >Quản lý flashcard
            <i><b-icon icon="arrow-right-circle-fill"></b-icon></i
          ></router-link>
        </div>
      </div>
      <!-- ./col -->
      <div class="col-lg-3 col-6">
        <!-- small box -->
        <div class="small-box bg-danger">
          <div class="inner">
            <h3>USERS</h3>

            <p>Thông tin người dùng</p>
          </div>
          <div class="icon">
            <i><b-icon icon="person-square"></b-icon></i>
          </div>
          <router-link class="small-box-footer" :to="{ name: 'Users' }"
            >Quản lý thông tin người dùng
            <i><b-icon icon="arrow-right-circle-fill"></b-icon></i
          ></router-link>
        </div>
      </div>
      <!-- ./col -->
      <div class="col-lg-3 col-6">
        <!-- small box -->
        <div class="small-box bg-danger">
          <div class="inner">
            <h3>RESULT</h3>

            <p>Kết quả</p>
          </div>
          <div class="icon">
            <i><b-icon icon="card-checklist"></b-icon></i>
          </div>
          <router-link class="small-box-footer" :to="{ name: 'ResultManager' }"
            >Quản lý kết quả
            <i><b-icon icon="arrow-right-circle-fill"></b-icon></i
          ></router-link>
        </div>
      </div>
      <!-- ./col -->
    </div>
    <div class="row"><digital-clock :blink="true" /></div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import DigitalClock from "vue-digital-clock";
export default {
  name: "HomePage",
  components: { DigitalClock },
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
<style  scoped>
.bg-info,
.bg-info > a {
  color: #fff !important;
}
.bg-info {
  background-color: #17a2b8 !important;
}
.small-box {
  color: #fff !important;
  border-radius: 0.25rem;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.125), 0 1px 3px rgba(0, 0, 0, 0.2);
  display: block;
  margin-bottom: 20px;
  position: relative;
}

.small-box > .inner {
  padding: 10px;
}
*,
::after,
::before {
  box-sizing: border-box;
}
.small-box h3,
.small-box p {
  z-index: 5;
}
.small-box h3 {
  font-size: 2.2rem;
  font-weight: 700;
  margin: 0 0 10px;
  padding: 0;
  white-space: nowrap;
}
.small-box p {
  font-size: 1rem;
}
.small-box .icon {
  color: rgba(0, 0, 0, 0.15);
  z-index: 0;
}
.small-box .icon > i.ion {
  font-size: 70px;
  top: 20px;
}
.small-box .icon > i {
  font-size: 90px;
  position: absolute;
  right: 15px;
  top: 15px;
  transition: -webkit-transform 0.3s linear;
  transition: transform 0.3s linear;
  transition: transform 0.3s linear, -webkit-transform 0.3s linear;
}
.small-box > .small-box-footer {
  background-color: rgba(0, 0, 0, 0.1);
  color: rgba(255, 255, 255, 0.8);
  display: block;
  padding: 3px 0;
  position: relative;
  text-align: center;
  text-decoration: none;
  z-index: 10;
}
</style>