<template>
     <div class="main-content">
             <vue-headful title="Reset Password | Yrbuk" />
        <!-- bg -->
        <BackgroundComponent></BackgroundComponent>
        <!-- form -->
        <div class="col-md-7 login-form">
            <h3>Reset link would be sent to your email address</h3>
            <form @submit.prevent="resetPassword" autocomplete="off">

                <div class="group">
                    <input type="text" v-model="form._email" v-on:keypress="validateEmail"  v-bind:class="{error_input: EmailHasError}" @blur="isNotTypngAndEmpty('email')" autocapitalize="off" required>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label class="group-label">Email Address</label>
                    <span class="error-text" v-if="error.email">{{error.email}}</span>
                </div>

                <div class="button">
                    <button class="btn" v-bind:disabled="!isFilled || isDisabled || EmailHasError" type="submit">Submit</button>
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
                    _email: '',
                },
                error: {},
                isDisabled: false,
                EmailHasError: false,
            }
        },
        methods: {
            resetPassword() {
                if(navigator.onLine) {
                this.isDisabled = true
                this.error = {}
                post('http://gmkyrbuk.cloudapp.net/api/auth/initialize/reset-pwd', this.form)
                    .then((res) => {
                        var message = res.data.success;
                            if(message){
                                this.$toast.error(message,"",iziToast.success);
                            }
                        this.isDisabled = false
                    })
                    .catch((err) => {
                        this.error = err.response.data;
                        var message = this.error.error;
                        if(message){
                            this.$toast.error(message,"",iziToast.error);
                        }
                        if(this.error.email) this.HasError ("email");
                        this.isDisabled = false;
                    })
                }else{
                    this.$toast.info("It seems you're offline, check connectivity and try again.","",iziToast.baloon);
                }
            },
            isNotTypngAndEmpty (field) {
                if(field == "email" && this.form._email == "" && !this.validateEmail())this.HasError(field);
            },
            HasError (field) {
                if(field == "email")this.EmailHasError = true;
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
                return this.form._email && this.validateEmail();
            }
        }
    }
</script>
