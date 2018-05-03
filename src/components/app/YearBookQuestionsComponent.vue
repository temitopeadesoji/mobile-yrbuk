<template>
    <div class="yearbook-questions">
    <!-- <ImageCropUpload v-show="isLoaded"></ImageCropUpload> -->
        <Loading v-show="!isLoaded"></Loading>
        <form @submit.prevent="UpdateAnswer" style="margin-top:50px;" v-show="isLoaded">
            <div class="group" v-for="question, key in questions">
                <textarea type="text" :maxlength="maxWord" name="answers[]" v-model="form.user_answer[key]" :id="'anwerbox_'+key" v-on:keyup="isTyping(key)"
                    required></textarea>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label class="group-label" v-for="quest, key in question" v-html="key"></label>
                <small class="no-count">
                    <span :id="'wordCount'+key"></span> / {{maxWord}}</small>
            </div>
            <div class="button">
                <button class="btn" v-bind:disabled="isDisabled" type="submit">Done</button>
            </div>
            <div class="social-accounts">
                <span class="fa fa-instagram"></span>
                <span class="fa fa-twitter"></span>
                <span class="fa fa-facebook"></span>
                <span class="fa fa-globe"></span>
            </div>
        </form>
    </div>
</template>

<script>
    import { post, get } from '../../helpers/api';
    import iziToast from '../../helpers/iziToast';
    import Auth from '../../storage/auth';
    import Loading from './LoadingComponent.vue';
    import ImageCropUpload from "./ImageCropUploadComponent.vue";
        export default {
            components: {
                Loading,
                ImageCropUpload
            },
            data() {
                return {
                    isLoaded: false,
                    error: {},
                    isDisabled: false,
                    maxWord: 250,
                    questions: {},
                    form: {
                        avatar: '',
                        user_answer: [],
                        type: ''
                    }
                }
            },
            mounted() {
                this.LoadQuestionsAndAnswers();
            },
            methods: {
                LoadQuestionsAndAnswers() {
                    get('/api/yearbook/user/' + Auth.state.u_id)
                        .then((res) => {
                            var questions_answers = res.data.questions_answers;
                            var questions = [];
                            this.user_program = res.data.user_program;
                            this.questions = questions_answers;
                            for (var key in questions_answers) {
                                var obj = questions_answers[key];
                                for (var prop in obj) {
                                    if (!obj.hasOwnProperty(prop)) continue;
                                    questions.push(prop);
                                    this.form.user_answer[key] = obj[prop];
                                    // console.log(prop + " = " + obj[prop]);
                                }
                            }
                            this.isLoaded = true;

                        }).catch((err) => {

                            // go to login
                            if (err.response.status === 401) {
                                this.$router.push('/login');
                            }

                        })
                },
                UpdateAnswer() {
                    if (navigator.onLine) {
                        this.isDisabled = true;
                        this.error = {};
                        this.form.type = "ybk_answers";
                        post('/api/yearbook/update/profile', this.form)
                            .then((res) => {
                                if (res.data.success) {
                                    this.$toast.success("your profile has been updated", "", iziToast.success);
                                }
                                this.hideModal();
                                this.isDisabled = false;
                            })
                            .catch((err) => {
                                this.error = err.response.data;
                                var message = err.response.data.error;
                                if (message) {
                                    this.$toast.error(message, "", iziToast.error);
                                }
                                this.isDisabled = false;
                            })
                    } else {
                        this.$toast.info("It seems you're offline, check connectivity and try again.", "", iziToast.baloon);
                    }
                },
                isTyping(field) {
                    this.WordCount(field);
                },
                WordCount(field) {
                    var valueEntered = document.getElementById('anwerbox_' + field).value;
                    var regex = /\s+/gi;
                    var wordCount = valueEntered.length;
                    document.getElementById("wordCount" + field).innerHTML = wordCount;
                },hideModal() {
                    this.$modal.hide('QuestionsModal');
                },
            }
        }
</script>