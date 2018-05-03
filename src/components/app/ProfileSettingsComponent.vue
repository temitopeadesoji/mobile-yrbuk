<template>
    <div>
        <vue-headful title="Settings >> Profile | Yrbuk" />
        <!-- navbar -->
        <NavbarComponent></NavbarComponent>

        <!-- content -->
        <div class="main-page-content">
            
        <div class="main-profile">
            <img src="/imgs/team3.jpg" alt="logo" class="logo">
            <p class="title">Jone Doe</p>
            <p class="course-title">Management Information System</p>
            <p class="icon"><i class="material-icons">school</i></p>
            <p class="title">Babcock University</p>
            <p class="class-title">Class of 2017</p>
            <p class="icon"><i class="material-icons">stars</i></p>
            <p class="title">Graduant</p>
            <p class="social-icons">
                    <i class="fa fa-instagram"></i>
                    <i class="fa fa-twitter"></i>
                    <i class="fa fa-facebook"></i>
                    <i class="fa fa-globe"></i>
            </p>
        </div>
        <div class="sub-profile">
        <div id="section1" class="section dark1">
            <p class="left">Favorite university experience</p>
            <p id="icon-1" class="right"><i class="material-icons" @click="openContent(1)">add</i></p>
            <p id="iconBefore-1" class="right after"><i class="material-icons" @click="closeContent(1)">remove</i></p>
        </div>
        <div id="content-1" class="section-content">
                <form action="" method="post" style="margin-top:1px;">
                    <div class="group">
                        <textarea type="text" required></textarea>
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label class="group-label">Question 1</label>
                        <small class="no-count">150 / 220</small>
                    </div>
                </form>
        </div>
        <div id="section2" class="section dark2">
            <p class="left">Favorite university experience</p>
            <p id="icon-2" class="right"><i class="material-icons" @click="openContent(2)">add</i></p>
            <p id="iconBefore-2" class="right after"><i class="material-icons" @click="closeContent(2)">remove</i></p>
        </div>
        <div id="content-2" class="section-content">
                <form action="" method="post" style="margin-top:1px;">
                    <div class="group">
                        <textarea type="text" required></textarea>
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label class="group-label">Question 1</label>
                        <small class="no-count">150 / 220</small>
                    </div>
                </form>
        </div>
        <div id="section3" class="section dark3">
            <p class="left">Where would you be in 10 years</p>
            <p id="icon-3" class="right"><i class="material-icons" @click="openContent(3)">add</i></p>
            <p id="iconBefore-3" class="right after"><i class="material-icons" @click="closeContent(3)">remove</i></p>
        </div>
        <div id="content-3" class="section-content">
                <form action="" method="post" style="margin-top:1px;">
                    <div class="group">
                        <textarea type="text" required></textarea>
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label class="group-label">Question 1</label>
                        <small class="no-count">150 / 220</small>
                    </div>
                </form>
        </div>
        </div>
    </div>
    </div>
</template>

<script>
    import NavbarComponent from "./NavbarComponent.vue"
    import SettingsSidebarComponent from "./SettingsSidebarComponent"
    import iziToast from '../../helpers/iziToast'
    import Auth from '../../storage/auth'
    import { post } from '../../helpers/api'
    export default {
        components: {
            SettingsSidebarComponent,
            NavbarComponent
        }, data() {
            return {
                error: {},
                isDisabled: false,
                maxWord: 250
            }
        }, mounted() {

            // if(Auth.state.api_token == null){
            //     // go to login
            //     this.$router.push('/login');
            // }
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
            submit() {
                if(navigator.onLine) {
                this.isDisabled = true
                this.error = {}
                post('http://gmkyrbuk.cloudapp.net/api/user/new/feedback', this.form)
                    .then((res) => {
                        if(res.data.success) {
                            this.$toast.success("we have recieved your feedback","",iziToast.success);
                        }
                        this.isDisabled = false;
                    })
                    .catch((err) => {
                        this.error = err.response.data;
                        var message = err.response.data.error;
                        if(message){
                            this.$toast.error(message,"",iziToast.error);
                        }
                        this.isDisabled = false;
                    })
                }else{
                    this.$toast.info("It seems you're offline, check connectivity and try again.","",iziToast.baloon);
                }
            },
            isTyping (field) {
                this.WordCount(field);
            },WordCount(field) {
                var valueEntered = document.getElementById('anwerbox_'+field).value;
                var regex = /\s+/gi;
                var wordCount = valueEntered.length;
                document.getElementById("wordCount"+field).innerHTML = wordCount;
            }
        }
    }
</script>