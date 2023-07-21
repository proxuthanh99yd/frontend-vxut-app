import Vue from 'vue'
import Vuex from 'vuex'
import homepage from "./modules/homepage";
import dashboard from "./modules/dashboard"
import test from "./modules/test"
import auth from "./modules/auth"
import chapter from "./modules/chapter"
import question from "./modules/question"
import answer from "./modules/answer"
import clientContest from "./modules/client-contest"
import clientAnswer from "./modules/client-answer"
import clientChapter from "./modules/client-chapter"
import clientQuestion from "./modules/client-question"
import clientTest from "./modules/client-test"
import clientResult from "./modules/client-result"
import users from "./modules/users"
import testSkill from './modules/test-skill';
import questionSkill from './modules/question-skill';
import answerSkill from "./modules/answer-skill";
import clientTestSkill from './modules/client-test-skill';
import clientTestSkillQuestion from './modules/client-test-skill-question';
import clientFlashcardManager from './modules/client-flashcard-manager';
import clientFlashcardManagerDetail from './modules/client-flashcard-manager-detail';
import myFlashcard from './modules/my-flashcard';


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    homepage,
    dashboard,
    test,
    auth,
    chapter,
    question,
    answer,
    clientContest,
    clientAnswer,
    clientChapter,
    clientQuestion,
    clientTest,
    clientResult,
    users,
    testSkill,
    questionSkill,
    answerSkill,
    clientTestSkill,
    clientTestSkillQuestion,
    clientFlashcardManager,
    clientFlashcardManagerDetail,
    myFlashcard
  }
})

export default store;