import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";

Vue.use(VueRouter);

const guest = (to, from, next) => {
    if (!localStorage.getItem("authToken")) {
        return next();
    } else {
        return next("/");
    }
};
const auth = (to, from, next) => {
    if (localStorage.getItem("authToken")) {
        return next();
    } else {
        return next("/login");
    }
};
const admin = (to, from, next) => {
    axios.get('http://vxut-app.test/api/user')
        .then(function (response) {
            if (response.data.role_id < 3) {
                return next();
            } else {
                return next("/");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
};

const routes = [
    {
        path: "/",
        name: "Home",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "home" */ "../pages/Main.vue"),
        children: [
            {
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                path: '/admin',
                name: 'Dashboard',
                beforeEnter: admin,
                component: () => import(/* webpackChunkName: "home" */ "../pages/Admin/MainDashboard.vue"),
            },
            {
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                path: '/admin/test',
                name: 'Test',
                beforeEnter: admin,
                component: () => import(/* webpackChunkName: "home" */ "../pages/Admin/TestManager.vue"),
            },
            {
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                path: '/admin/chapter/:test_id',
                name: 'Chapter',
                beforeEnter: admin,
                component: () => import(/* webpackChunkName: "home" */ "../pages/Admin/ChapterManager.vue"),
            },
            {
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                path: '/admin/question/:chapter_id',
                name: 'Question',
                beforeEnter: admin,
                component: () => import(/* webpackChunkName: "home" */ "../pages/Admin/QuestionManager.vue"),
            },
            {
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                path: '/admin/answer/:question_id',
                name: 'Answer',
                beforeEnter: admin,
                component: () => import(/* webpackChunkName: "home" */ "../pages/Admin/AnswerManager.vue"),
            },
            {
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                path: '/admin/users',
                name: 'Users',
                beforeEnter: admin,
                component: () => import(/* webpackChunkName: "home" */ "../pages/Admin/UserManager.vue"),
            },
            {
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                path: '/admin/flash-card',
                name: 'FlashcardMg',
                beforeEnter: admin,
                component: () => import(/* webpackChunkName: "home" */ "../pages/Admin/FlashcardManager.vue"),
            },
            {
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                path: '/admin/test-skill',
                name: 'TestSkill',
                beforeEnter: admin,
                component: () => import(/* webpackChunkName: "home" */ "../pages/Admin/TestSkillManager.vue"),
            },
            {
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                path: '/admin/question-skill/:test_skill_id',
                name: 'QuestionSkill',
                beforeEnter: admin,
                component: () => import(/* webpackChunkName: "home" */ "../pages/Admin/QuestionSkillManager.vue"),
            },
            {
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                path: '/admin/answer-skill/:question_skill_id',
                name: 'AnswerSkill',
                beforeEnter: admin,
                component: () => import(/* webpackChunkName: "home" */ "../pages/Admin/AnswerSkillManager.vue"),
            },
            {
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                path: '/admin/result',
                name: 'ResultManager',
                beforeEnter: admin,
                component: () => import(/* webpackChunkName: "home" */ "../pages/Admin/ResultManager.vue"),
            },
            {
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                path: '/admin/result-test/:test_id',
                name: 'ResultTestManager',
                beforeEnter: admin,
                component: () => import(/* webpackChunkName: "home" */ "../pages/Admin/ResultTestManager.vue"),
            },
            {
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                path: '/admin/result-test-detail/:test_id/:user_id',
                name: 'ResultTestDetailManager',
                beforeEnter: admin,
                component: () => import(/* webpackChunkName: "home" */ "../pages/Admin/ResultTestDetail.vue"),
            },
            {
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                path: '/admin/result-test-skill/:test_skill_id',
                name: 'ResultTestSkillManager',
                beforeEnter: admin,
                component: () => import(/* webpackChunkName: "home" */ "../pages/Admin/ResultTestSkillManager.vue"),
            },
            {
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                path: '/admin/result-test-skill/:test_skill_id/:user_id/:result_skill_id',
                name: 'ResultTestSkillDetailManager',
                beforeEnter: admin,
                component: () => import(/* webpackChunkName: "home" */ "../pages/Admin/ResultTestSkillDetail.vue"),
            },
            {
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                path: '',
                name: 'HomePage',
                component: () => import(/* webpackChunkName: "home" */ "../pages/Client/HomePage.vue"),
            },
            {
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                path: '/tests',
                name: 'Tests',
                component: () => import(/* webpackChunkName: "home" */ "../pages/Client/Tests.vue"),
            },
            {
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                path: '/test/:test_id',
                name: 'ClientTest',
                component: () => import(/* webpackChunkName: "home" */ "../pages/Client/Test.vue"),
            },
            {
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                path: '/test-skills/',
                name: 'TestSkillLevel',
                component: () => import(/* webpackChunkName: "home" */ "../pages/Client/TestSkillLevel.vue"),
            },
            {
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                path: '/test-skills/:level_id/:skill_id',
                name: 'ClientTestSkill',
                component: () => import(/* webpackChunkName: "home" */ "../pages/Client/TestSkill.vue"),
            },
            {
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                path: '/test-skill-question/:test_skill_id',
                name: 'ClientTestSkillQuestion',
                component: () => import(/* webpackChunkName: "home" */ "../pages/Client/TestSkillQuestion.vue"),
            },

            {
                path: '/flashcard-manager/:flashcards_manager_id',
                name: 'ClientFlashcardManager',
                component: () => import(/* webpackChunkName: "home" */ "../pages/Client/FlashCardManager.vue"),
            },
            {
                path: '/my-flashcards',
                name: 'MyFlashcards',
                component: () => import(/* webpackChunkName: "home" */ "../pages/Client/MyFlashcards.vue"),
            },
            {
                path: '/my-flashcard/:my_flashcard_id',
                name: 'MyFlashcard',
                component: () => import(/* webpackChunkName: "home" */ "../pages/Client/MyFlashcard.vue"),
            },
            {
                path: '/flashcards',
                name: 'Flashcard',
                component: () => import(/* webpackChunkName: "home" */ "../pages/Client/FlashCards.vue"),
            },
            {
                path: '/profile',
                name: 'Profile',
                component: () => import(/* webpackChunkName: "home" */ "../pages/Client/Profile.vue"),
            },
            {
                path: '/result-history/:test_id',
                name: 'ResultHistory',
                component: () => import(/* webpackChunkName: "home" */ "../pages/Client/ResultHistory.vue"),
            },
            {
                path: '/result-skill-history/:test_skill_id/:result_skill_id',
                name: 'ResultSkillHistory',
                component: () => import(/* webpackChunkName: "home" */ "../pages/Client/ResultSkillHistory.vue"),
            },
        ]
    },
    {
        path: "/login",
        name: "Login",
        beforeEnter: guest,
        component: () =>
            import(/* webpackChunkName: "login" */ "../pages/Login.vue")
    },
    {
        path: "/register",
        name: "Register",
        beforeEnter: guest,
        component: () =>
            import(/* webpackChunkName: "register" */ "../pages/Register.vue")
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
