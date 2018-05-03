<template>
    <div>
        <vue-headful title="Settings >> Account | Yrbuk" />
        <!-- navbar -->
        <NavbarComponent></NavbarComponent>
        <!-- content -->

        <div class="main-page-content settings">
                <form @submit.prevent="updatePassword">
                    <!-- Password -->
                    <div class="password-panel">
                        <h3 class="title">Change Password</h3>
                        <div class="group">
                            <input type="password" v-model="form.old_password" v-on:keyup="DoesPwdMatch()" v-bind:class="{error_input: OldPwdHasError}" @focus="isTyping('oldpwd')" @blur="isNotTypngAndEmpty('oldpwd')" required>
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label class="group-label">Current Password</label>
                            <span class="error-text" v-if="error.oldpwd">{{error.oldpwd}}</span>
                        </div>
                        <div class="group">
                            <input type="password" v-model="form._password" v-bind:class="{error_input: NewPwdHasError}" v-on:keyup="DoesPwdMatch()" @focus="isTyping('newpwd')" @blur="isNotTypngAndEmpty('newpwd')" required>
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label class="group-label">New Password</label>
                            <span class="error-text" v-if="error.newpwd">{{error.newpwd}}</span>
                        </div>
                    </div>
                    <div class="button">
                        <button class="btn" v-bind:disabled="!isFilled || isDisabled" type="submit">Update</button>
                    </div>

                    <!-- Notification -->
                    <div class="notification-panel">
                        <h3 class="title" style="margin-bottom:35px;">Notification Settings</h3>
                        <label for="email_notify">
                            <input type="checkbox" name="email_notify" @click="updateNotification('email')" v-model="form.email_notification" id="email_notify"> Receive E-Mail Notifications
                        </label>
                        <label for="push_notify">
                            <input type="checkbox" name="push_notify" @click="updateNotification('web_push')" v-model="form.web_push_notification" id="push_notify"> Receive push notifications
                        </label>
                    </div>
                </form>
        </div>

    </div>
</template>

<script type="text/javascript">
    import NavbarComponent from "./NavbarComponent.vue"
    import iziToast from '../../helpers/iziToast'
    import Auth from '../../storage/auth'
    import {post, get} from '../../helpers/api'
    export default {
        components: {
            NavbarComponent
        },
        data() {
            return {
                form: {
                    _password: '',
                    old_password: '',
                    email_notification: false,
                    web_push_notification: false
                },
                error: {},
                OldPwdHasError: false,
                NewPwdHasError: false,
                isDisabled: false,
            }
        },
        mounted() {
          if (Auth.state.api_token == null) {
           // go to login
               this.$router.push('/login');
           }
        },
        created() {
            get('http://gmkyrbuk.cloudapp.net/api/user/get/general')
                .then((res) => {
                    this.form._email_notification = res.data.email;
                    this.form._web_push_notification = res.data.web_push;
                    if(res.data.email == "1"){ this.form.email_notification = true; }else{ this.form.email_notification = false};
                    if(res.data.web_push == "1"){ this.form.web_push_notification = true; }else{ this.form.web_push_notification = false};
                }).catch((err) => {
                    // go to login
                    if(err.response.status === 401) {
                        this.$router.push('/login');
                    }
                })
        },
        methods: {
            updatePassword() {
                if (navigator.onLine) {
                    this.isDisabled = true;
                    this.error = {}
                    post('http://gmkyrbuk.cloudapp.net/api/user/update/password', this.form)
                        .then((res) => {
                            if (res.data.success) {
                                this.$toast.success("password change successful", "", iziToast.success);
                            }
                            this.isDisabled = false;
                            this.form._password = "";
                            this.form.old_password = "";
                        })
                        .catch((err) => {
                            this.error = err.response.data;
                            var message = err.response.data.error;
                            if (message) {
                                this.$toast.error(message, "", iziToast.error);
                            }
                            if (this.error.oldpwd) this.HasError("oldwd");
                            if (this.error.newpwd) this.HasError("newpwd");
                            this.isDisabled = false;
                        })
                } else {
                    this.$toast.info("It seems you're offline, check connectivity and try again.", "", iziToast.baloon);
                }
            },updateNotification(field){
                if (navigator.onLine) {
                    this.isDisabled = true;
                    if(field == "email"){
                        if(this.form.email_notification == true)this.form._email_notification = "0";else this.form._email_notification = "1";
                    }else if(field == "web_push"){
                        if(this.form.web_push_notification == true)this.form._web_push_notification = "0";else this.form._web_push_notification = "1";
                    }
                    post('http://gmkyrbuk.cloudapp.net/api/user/update/notification', this.form)
                        .then((res) => {
                            if (res.data.success) {
                                this.$toast.success("preference updated", "", iziToast.success);
                            }
                            this.isDisabled = false;
                        })
                        .catch((err) => {
                            this.isDisabled = false;
                        })
                } else {
                    this.$toast.info("It seems you're offline, check connectivity and try again.", "", iziToast.baloon);
                }
            },
            isTyping(field) {
                if (field == "oldpwd") this.OldPwdHasError = false;
                if (field == "newpwd") this.NewPwdHasError = false;
            },
            DoesPwdMatch(){
                if(this.form.old_password != "" && this.form._password != ""){
                    if(this.form.old_password != this.form._password){
                        this.HasError('newpwd');
                        this.isDisabled = true;
                    }else{
                        this.NewPwdHasError = false;
                        this.isDisabled = false;
                    }
                }
            },
            isNotTypngAndEmpty(field) {
                if (field == "oldpwd" && this.form.old_password == "") this.HasError(field);
                if (field == "newpwd" && this.form._password == "") this.HasError(field);
            },
            HasError(field) {
                if (field == "oldpwd") this.OldPwdHasError = true;
                if (field == "newpwd") this.NewPwdHasError = true;
            }
        },
        computed: {
            isFilled() {
                return this.form.old_password && this.form._password;
            }
        }
    }
</script>