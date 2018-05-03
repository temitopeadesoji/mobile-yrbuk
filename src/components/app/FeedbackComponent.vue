<template>
<div>
        <vue-headful title="Feedback | Yrbuk" />
        <!-- navbar -->
        <NavbarComponent></NavbarComponent>

        <!-- content -->
        
        <div class="main-page-content settings">
                <form @submit.prevent="submit">
                    <div class="password-panel">
                        <h3 class="title">Feedback</h3>
                    <div class="group">
                        <input type="text" v-model="form.subject" v-bind:class="{error_input: SubjectHasError}" @focus="isTyping('subject')" @blur="isNotTypngAndEmpty('subject')" required>
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label class="group-label">Subject</label>
                        <span class="error-text" v-if="error.subject">{{error.subject}}</span>
                    </div>
                    <div class="group">
                        <textarea type="text" v-model="form.message" v-bind:class="{error_input: MessageHasError}" @focus="isTyping('message')" @blur="isNotTypngAndEmpty('message')" required></textarea>
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label class="group-label">Your Message</label>
                        <span class="error-text" v-if="error.message">{{error.message}}</span>
                    </div>
                    </div>
                    <div class="button">
                        <button class="btn" v-bind:disabled="!isFilled || isDisabled" type="submit">Send</button>
                    </div>
                </form>

                <p class="comment">Your feedback matters to all of us at Yr3buk. Let us know what challenges you may be facing.</p>

        </div>

    </div>
</template>

<script type="text/javascript">
    import NavbarComponent from "./NavbarComponent.vue"
    import SettingsSidebarComponent from "./SettingsSidebarComponent"
    import iziToast from '../../helpers/iziToast'
    import Auth from '../../storage/auth'
    import { post } from '../../helpers/api'
        export default {
            components: {
                NavbarComponent,
                SettingsSidebarComponent
            }, data() {
            return {
                form: {
                    subject: '',
                    message: ''
                },
                error: {},
                SubjectHasError: false,
                MessageHasError: false,
                isDisabled: false,
            }
        }, mounted() {

            if(Auth.state.api_token == null){
                // go to login
                this.$router.push('/login');
            }
        }, methods: {
            submit() {
                if(navigator.onLine) {
                this.isDisabled = true
                this.error = {}
                post('http://gmkyrbuk.cloudapp.net/api/user/new/feedback', this.form)
                    .then((res) => {
                        if(res.data.success) {
                            this.$toast.success("we have recieved your feedback","Thank You",iziToast.success);
                        }
                        this.isDisabled = false;
                        this.form.subject = "";
                        this.form.message = "";
                    })
                    .catch((err) => {
                        this.error = err.response.data;
                        var message = err.response.data.error;
                        if(message){
                            this.$toast.error(message,"",iziToast.error);
                        }
                        if(this.error.message) this.HasError ("message");
                        if(this.error.subject) this.HasError ("subject");
                        this.isDisabled = false;
                    })
                }else{
                    this.$toast.info("It seems you're offline, check connectivity and try again.","",iziToast.baloon);
                }
            },
            isTyping (field) {
                if(field == "subject")this.SubjectHasError = false;
                if(field == "message")this.MessageHasError = false;
            },
            isNotTypngAndEmpty (field) {
                if(field == "subject" && this.form.subject == "")this.HasError(field);
                if(field == "message" && this.form.message == "")this.HasError(field);
            },
            HasError (field) {
                if(field == "subject")this.SubjectHasError = true;
                if(field == "message")this.MessageHasError = true;
            }
        },computed: {
            isFilled () {
                return this.form.subject && this.form.message;
            },
        }
        }
</script>