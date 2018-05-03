<template>
    <div class="main-content">
        <vue-headful title="Signup | Yrbuk" />
        <!-- bg -->
        <BackgroundComponent></BackgroundComponent>
        <!-- form -->
        <div class="col-md-12 login-form">
            <h3>Join the world's largest yearbook collection.</h3>

            <form @submit.prevent="signup" autocomplete="off">

                <div class="group">
                    <input type="text" v-model="form._matric_no" v-bind:class="{error_input: MatricHasError}" @focus="isTyping('matric')" @blur="isNotTypngAndEmpty('matric')" autocapitalize="off" required>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label class="group-label">Matric No</label>
                    <span class="error-text" v-if="error.matric">{{error.matric}}</span>
                </div>

                <div class="group">
                    <input type="text" v-model="form._email" v-on:keypress="validateEmail"  v-bind:class="{error_input: EmailHasError}" @blur="isNotTypngAndEmpty('email')" autocapitalize="off" required>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label class="group-label">Email Address</label>
                    <span class="error-text" v-if="error.email">{{error.email}}</span>
                </div>

                <div class="group">
                    <input type="password" v-model="form.pass_word" v-bind:class="{error_input: passwordHasError}" @focus="isTyping('password')" @blur="isNotTypngAndEmpty('password')"  required>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label class="group-label">Password</label>
                    <span class="error-text" v-if="error.password">{{error.password}}</span>
                </div>
                <div class="button">
                    <button class="btn" v-bind:disabled="!isFilled || isDisabled || EmailHasError" type="submit">SIGN UP</button>
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
                    _matric_no: '',
                    pass_word: '',
                    _email: '',
                    _type: '_user'
                },
                error: {},
                isDisabled: false,
                passwordHasError: false,
                EmailHasError: false,
                MatricHasError: false
            }
        },
        methods: {
            signup() {
                if(navigator.onLine) {
                this.isDisabled = true
                this.error = {}
                post('http://gmkyrbuk.cloudapp.net/api/auth/signup/', this.form)
                    .then((res) => {
                        if(res.data.status == "Authorized") {
                            // set token
                            Auth.set(res.data._token, res.data.user_details.id);

                            // go to dashboard
                            this.$router.push('/')
                        }
                        this.isDisabled = false
                    })
                    .catch((err) => {
                        this.error = err.response.data;
                        var message = this.error.error;
                        if(message){
                            this.$toast.error(message,"",iziToast.error);
                        }
                        this.form.pass_word = '';
                        if(this.error.password) this.HasError ("password");
                        if(this.error.matric) this.HasError ("matric");
                        if(this.error.email) this.HasError ("email");
                        this.isDisabled = false;
                    })
                }else{
                    this.$toast.info("It seems you're offline, check connectivity and try again.","",iziToast.baloon);
                }
            },
            isTyping (field) {
                if(field == "password")this.passwordHasError = false;
                if(field == "matric")this.MatricHasError = false;
            },
            isNotTypngAndEmpty (field) {
                if(field == "password" && this.form.pass_word == "")this.HasError(field);
                if(field == "email" && this.form._email == "" && !this.validateEmail())this.HasError(field);
                if(field == "matric" && this.form._matric_no == "")this.HasError(field);
            },
            HasError (field) {
                if(field == "password")this.passwordHasError = true;
                if(field == "email")this.EmailHasError = true;
                if(field == "matric")this.MatricHasError = true;
            },
            validateEmail() {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(re.test(this.form._email) == false){
                    this.HasError("email");
                }else{
                    this.EmailHasError = false;
                }
                return re.test(this.form._email);
            }
        },computed: {
            isFilled () {
                return this.form._email && this.form._matric_no && this.form.pass_word && this.validateEmail();
            }
        }
    }
</script>