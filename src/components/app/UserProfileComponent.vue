<template>
    <div>
        <vue-headful :title="profile.title" />
        <!-- navbar -->
        <NavbarComponent></NavbarComponent>

        <!-- content -->
        <div class="main-page-content">
            
        <div class="main-profile">
                <Loading v-if="IsLoading"></Loading>
                <center>
                    <LetterAvatar :username="profile.name"  class="img img-circle logo" v-if="profile.avatar == ''" :size="120" color="#FFFFFF" :rounded="true"></LetterAvatar>
                </center>
                <clazy-load :src="profile.avatar" v-if="profile.avatar != '' " style="max-height:120px !important;">
                    <img :src="profile.avatar" class="img user-img img-circle" style="max-height:120px !important; margin:5px 5px;" alt="avatar" slot="image">
                    <div slot="placeholder">
                        <Loading></Loading>
                    </div>
                </clazy-load>
            <p class="title" v-html="profile.name"></p>
            <p class="course-title" v-html="profile.course"></p>
            <p class="icon"><i class="material-icons">school</i></p>
            <p class="title" v-html="profile.institution"></p>
            <p class="class-title" v-html="profile.class"></p>
            <p class="icon"><i class="material-icons">stars</i></p>
            <p class="title" v-html="profile.role"></p>
            <br>
        </div>
        <div class="sub-profile"> 
            <Loading v-if="IsLoading"></Loading>
            <div v-if="!IsLoading">
                <div v-for="question_answer, key in questions_answers">
                <div v-for="answer, question in question_answer" > 
                    <div id="section1" class="section dark1">
                        <p class="left" v-html="question"></p>
                        <p id="icon-1" class="right"><i class="material-icons" @click="openContent(1)">add</i></p>
                        <p id="iconBefore-1" class="right after"><i class="material-icons" @click="closeContent(1)">remove</i></p>
                    </div>
                    <div id="content-1" class="section-content">
                        <p class="question-answer" v-html="answer" v-if="answer !='' && answer != null "></p>
                        <p class="question-answer" style="font-style:italic;" v-if="answer =='' || answer == null ">Not answered</p>
                    </div>
                </div>
                </div>
           </div>
        </div>
    </div>
    </div>
</template>

<script type="text/javascript">
    import NavbarComponent from "./NavbarComponent.vue";
    import YearBookQuestions from "./YearBookQuestionsModal.vue";
    import { get } from '../../helpers/api';
    import Auth from '../../storage/auth';
    import Loading from './LoadingComponent.vue';
    import LetterAvatar from 'vue-avatar';
    export default {
        components: {
            NavbarComponent,
            YearBookQuestions,
            Loading,
            LetterAvatar
        },data() {
            return {
                profile: {
                    title: 'Yrbuk',
                    name:'',
                    avatar: '',
                    institution: '',
                    program: '',
                    class: '',
                    role: ''
                },
                questions_answers: {},
                IsLoading: true,
                user_id: this.$route.params.id
            }
        }, created() {
            this.UserProfile();
        }, methods: {
			openContent(key) {
                
                document.getElementById("content-"+ key).setAttribute("style", "display: block;padding:20px 10px 10px 10px;");
                document.getElementById("icon-"+ key).setAttribute("style", "display: none;");
                document.getElementById("iconBefore-"+ key).setAttribute("style", "display: block;");
			},
			closeContent(key) {
                document.getElementById("content-"+ key).setAttribute("style", "display: none;");
                document.getElementById("icon-"+ key).setAttribute("style", "display: block;");
                document.getElementById("iconBefore-"+ key).setAttribute("style", "display: none;");
			},

            UserProfile() {
                get('http://gmkyrbuk.cloudapp.net/api/yearbook/user/' + this.user_id)
                .then((res) => {
                    this.IsLoading = false;
                    var result = res.data;
                    this.profile.title = result.name + ' | Yrbuk';
                    this.profile.avatar = result.yearbook_img;
                    this.profile.name = result.name;
                    this.profile.program = result.user_program;
                    this.profile.institution = result.institution;
                    this.profile.class = 'Class of ' + result.class_year;
                    this.profile.role = result.user_role;
                    this.questions_answers = result.questions_answers
                }).catch((err) => {

                    // go to login
                    if (err.response.status === 401) {
                        this.$router.push('/login');
                    }

                })
            }
        }
    }
</script>