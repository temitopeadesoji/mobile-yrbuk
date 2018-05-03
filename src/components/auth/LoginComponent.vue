<template>
<div class="main-content">
        <vue-headful title="Login | Yrbuk" />
        <!-- bg -->
        <BackgroundComponent></BackgroundComponent>
        <!-- form -->
        <div class="col-md-7 login-form">
            <h3>Welcome back! Please login to your account.</h3>

            <form  @submit.prevent="login" autocomplete="off">

                <div class="group">
                    <input type="text" v-model="form.email_matric_" v-bind:class="{error_input: EmailMatricHasError}" @focus="isTyping('email_matric')" @blur="isNotTypngAndEmpty('email_matric')" autocapitalize="off" required>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label class="group-label">Email Address / Matric No</label>
                    <span class="error-text" v-if="error.email_matric">{{error.email_matric}}</span>
                </div>

                <div class="group">
                    <input type="password" autocomplete="off" v-model="form.pass_word" v-bind:class="{error_input: passwordHasError}" @focus="isTyping('password')" @blur="isNotTypngAndEmpty('password')" required>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label class="group-label">Password</label>
                    <span class="error-text" v-if="error.password">{{error.password}}</span>
                </div>
                <div class="actions">

                    <router-link :to="{ name: 'PwdReset' }">Forgot Password?</router-link>
                </div>
                <div class="button">
                    <button class="btn" v-bind:disabled="!isFilled || isDisabled" type="submit">Login</button>
                </div>
            </form>
            
            <div class="policy text-center">
                <a href="http://">Term of use</a>
                <span style="margin:4px 10px; font-size:35px;">.</span>
                <a href="http://">Privacy Policy</a>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    import iziToast from '../../helpers/iziToast'
    import Auth from '../../storage/auth'
    import { post } from '../../helpers/api'
     import BackgroundComponent from "./BackgroundComponent.vue"
    export default {
                components: {
            BackgroundComponent
        },
        data() {
            return {
                form: {
                    email_matric_: '',
                    pass_word: ''
                },
                error: {},
                isDisabled: false,
                passwordHasError: false,
                EmailMatricHasError: false
            }
        },
        methods: {
            login() {
                if(navigator.onLine) {
                this.isDisabled = true
                this.error = {}
                post('http://gmkyrbuk.cloudapp.net/api/auth/signin', this.form)
                    .then((res) => {
                        if(res.data.status == "Authorized") {
                            // set token
                            Auth.set(res.data);
                            
                            // go to dashboard
                            this.$router.push('/dashboard');
                        }
                        this.isDisabled = false;
                    })
                    .catch((err) => {
                        this.error = err.response.data;
                        var message = err.response.data.error;
                        if(message){
                            this.$toast.error(message,"",iziToast.error);
                        }
                        this.form.pass_word = '';
                        if(this.error.password) this.HasError ("password");
                        if(this.error.email_matric) this.HasError ("email_matric");
                        this.isDisabled = false;
                    })
                }else{
                    this.$toast.info("It seems you're offline, check connectivity and try again.","",iziToast.baloon);
                }
            },
            isTyping (field) {
                if(field == "password")this.passwordHasError = false;
                if(field == "email_matric")this.EmailMatricHasError = false;
            },
            isNotTypngAndEmpty (field) {
                if(field == "password" && this.form.pass_word == "")this.HasError(field);
                if(field == "email_matric" && this.form.email_matric_ == "")this.HasError(field);
            },
            HasError (field) {
                if(field == "password")this.passwordHasError = true;
                if(field == "email_matric")this.EmailMatricHasError = true;
            }
        },computed: {
            isFilled () {
                return this.form.email_matric_ && this.form.pass_word;
            },
        }
    }
</script>
