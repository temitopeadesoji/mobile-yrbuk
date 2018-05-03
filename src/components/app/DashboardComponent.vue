<template>
    <div>
        <vue-headful title="Dashboard | Yrbuk" />
        <!-- navbar -->
        <NavbarComponent></NavbarComponent>

        <!-- content -->
        <div class="main-page-content">
                <Loading v-if="SidebarLoading"></Loading>

        <div class="sub-profile">
        <div id="section1" class="section dark1" v-show="!SidebarLoading">
            <p class="left" v-text="program"></p>
            <p id="iconBefore-1" class="right "><i class="material-icons">remove</i></p>
        </div>
        <div class="sub-content">
                <clazy-load  v-if="program_banner != '' && program_banner != null" alt="class picture" :title="program_title" :src="program_banner">
                        <div class="discover card">
                            <div class="wrapper banner" alt="class picture" :style="'background: url('+program_banner+') center/cover no-repeat;'"></div>
                        </div>
                    <div slot="placeholder">
                        <Loading></Loading>
                    </div>
                </clazy-load>
                    <p>Program:
                        <span class="content" v-text="program"></span>
                    </p>
                    <p v-if="!isObjEmpty(program_reps.head)">Course Rep:
                        <span class="content" style="text-transform: capitalize;" v-for="program_rep in program_reps.head" v-text="program_rep"></span>
                    </p>
                    <p v-if="!isObjEmpty(program_reps.assistant)">Asst. Rep:
                        <span class="content" style="text-transform: capitalize;" v-for="asst_rep in program_reps.assistant" v-text="asst_rep"></span>
                    </p>
                   
        </div>   
        <div class="class-students ">
                <center>
                <div class="row" id="infinite-list">

                    <!-- students -->
                    <div class="col-xs-6 student-brief" v-for="student in students">
                        <span class="ribbon" v-if="student.is_course_rep == 1 || student.is_asst_course_rep == 1"></span>
                        
                        <router-link style="text-decoration:none;" :to="{ name: 'UserProfile', params: {id: student.user_id} }">
                            <LetterAvatar :username="student.name" v-if="student.avatar == '' || student.avatar == null" :size="130" color="#FFFFFF"
                                :rounded="false"></LetterAvatar>
                            <clazy-load v-if="student.avatar != '' && student.avatar != null" :src="student.avatar">
                                <img :src="student.avatar" :alt="student.name" slot="image">
                                <div slot="placeholder">
                                    <Loading></Loading>
                                </div>
                            </clazy-load>

                            <div class="overlay">
                                <div class="student-name">
                                    <p class="name" v-text="student.name"></p>
                                    <small class="post" v-if="student.is_course_rep == 1">Class Rep.</small>
                                    <small class="post" v-if="student.is_asst_course_rep == 1">Asst. Class Rep.</small>
                                </div>
                            </div>
                        </router-link>

                    </div>

                    <div class="col-md-12">
                        <!-- is loading spinner -->
                        <Loading v-if="ItemIsLoading"></Loading>
                        <span v-show="ItemIsAllEmpty" style="color:lightgray; font-size:20px;">
                            No Post yet.
                        </span>
                        <!-- back to top -->
                        <a v-show="ItemIsEmpty" href="javascript:;" @click="ToTop" style="color:#3a544d; font-weight:600; text-decoration:underline;">Back to Top</a>
                    </div>
                </div>
                </center>
            </div>
            </div>

                </div>

                    </div>
</template>

<style lang="css" scoped>
    .vue-avatar--wrapper {
        width:100% !important;
        height:150px !important;
        background-size: cover !important;
        font-size:45px !important;
        letter-spacing:3px;
    }
.card {
  width: 100%;
  float: left;
}
.discover.card .wrapper {
  cursor:pointer;
  overflow: hidden;
  min-height: 200px;
  position: relative;
  background-color: #fff;
}
.class-info {
  background: #f5f5f5;
  height: 100vh;
  padding: 20px 27px !important;
}

.class-info .name {
  letter-spacing: 0.7px;
  color: #3a544d;
  font-size: 25px;
  margin-bottom: 25px;
}

.class-info .banner {
  background-color: transparent;
  background-size: cover;
  width: 100%;
  margin-bottom: 25px;
  border-radius: 10px;
}

.class-info .other-details p {
  color: #000000;
  font-size: 14px;
  font-weight: 400;
}

.class-students {
  background: #fbfbfb;
  padding-top: 5px;
  -ms-flex-line-pack: center;
      align-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  text-align: center;
  height: 90vh;
}
.row {
    width: 100%;
    padding: 10px !important;
}

.class-students .student-brief {
  width: auto;
  margin-bottom: 18px;
  background-color: transparent;
  border-radius: 7px !important;
  padding: 0.4px !important;
  margin-left: 5px !important;
  margin-right: 5px !important;
}

.class-students .student-brief img {
  background-color: transparent;
  width: 130px;
  cursor: pointer;
}

.ribbon {
  z-index: 0.5;
  position: absolute;
  background: #ff6565;
  padding: 10px 10px;
  border-radius: 20px;
  top: -10px;
  left: -10px;
}

.student-brief .overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  min-width: 100px;
  opacity: 0.5;
  -webkit-transition: .5s ease;
  transition: .5s ease;
  background-color: black;
  word-wrap: break-word;
  cursor: pointer;
  border-radius: 5px;
}

.student-brief .student-name {
  font-family: SourceSansPro-Light;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

.student-brief .student-name .name {
  color: #eeedeb;
  word-wrap: break-word;
  font-size: 20px;
  font-weight: 600;
  opacity: 1 !important;
}

.student-brief .student-name .post {
  word-break: none;
  font-size: 14px !important;
  color: #FFFFFF;
}

</style>
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
        },
        data() {
            return {
                students: [],
                program: "",
                program_banner: "",
                program_reps: {},
                nextStudent: 1,
                ItemIsLoading: false,
                query_interval: 14,
                query_from: 0,
                query_to: 0,
                ItemIsEmpty: false,
                ItemIsAllEmpty: false,
                SidebarLoading: true,
                program_title: ""
            }
        },
        created() {

            get('http://gmkyrbuk.cloudapp.net/api/yearbook/program/' + Auth.state.u_institution + '/' + Auth.state.u_class + '/' + Auth.state.u_program)
                .then((res) => {
                    this.SidebarLoading = false;
                    this.program = res.data.program;
                    this.program_banner = res.data.program_img;
                    this.program_title = res.data.program_title;
                    this.program_reps = res.data.reps;
                }).catch((err) => {

                    // go to login
                    if (err.response.status === 401) {
                        this.$router.push('/login');
                    }

                })
        },
        mounted() {

            if (Auth.state.api_token == null) {
                // go to login
                this.$router.push('/login');
            }

            if(Auth.state.new_user == "Yes"){
                this.showModal();
            }

            // Detect when scrolled to bottom.
            const listElm = document.querySelector('#infinite-list');
            listElm.addEventListener('scroll', e => {
                if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
                    // set new query from and query to
                    this.query_from = this.query_to;
                    this.query_to = this.query_to + this.query_interval;
                    this.loadStudents(this.query_from, this.query_to);
                }
            });

            // Initially load some items.
            this.query_to = this.query_to + this.query_interval;
            this.loadStudents(this.query_from, this.query_to);


        },
        methods: {
            isObjEmpty(obj) {
                for (var key in obj) {
                    return false;
                }
                return true;
            },
            loadStudents(query_from, query_to) {
                if (!this.ItemIsEmpty) {
                    this.ItemIsLoading = true;
                    get('http://gmkyrbuk.cloudapp.net/api/yearbook/program/users/' + Auth.state.u_institution + '/' + Auth.state.u_class + '/' +
                            Auth.state.u_program + '?from=' + query_from + '&to=' + query_to)
                        .then((res) => {
                            var users = res.data.users;
                            if (users.length == 0 && this.students.length > 0) {
                                this.ItemIsEmpty = true;

                            } else if (users.length == 0 && this.students.length == 0) {
                                this.ItemIsAllEmpty = true;
                            }
                            for (var user in users) {
                                this.students.push(users[user]);
                            }
                            this.ItemIsLoading = false;
                        })
                }
            },
            ToTop() {
                this.BackToTop(0, 100);
            },
            BackToTop(to, dur) {
                var div = document.getElementById('infinite-list');
                if (dur < 0) return;
                var diff = to - div.scrollTop;
                var perTick = diff / dur * 2;

                setTimeout(function () {
                    div.scrollTop = div.scrollTop + perTick;
                    this.BackToTop(to, dur - 2);
                }.bind(this), 10);
                // div.scrollTop = 0;
            },
            showModal() {
                this.$modal.show('QuestionsModal');
            },
            hideModal() {
                this.$modal.hide('QuestionsModal');
            }
        }
    }
</script>