<template>
    <div>
        <vue-headful title="Manage Events | Yrbuk" />
        <!-- navbar -->
        <NavbarComponent></NavbarComponent>

        <!-- content -->
        <div class="main-page-content">
        <div class="sub-profile">

            <div style="padding-top:15px;">

                <Loading v-if="IsLoading" style="margin-top:35px;"></Loading>
                <!-- previous Events -->
                <div class="events-history" style="" v-if="!IsLoading">
                    <h3 class="title underline" style="">Events History</h3>

                    <div class="content col-md-12 no-padding" style="padding:0px 0px !important; max-height:600px; overflow-y:auto;">

                        <div class="event">

                            <div v-for="event_history in events_history" :title="event_history.description" class="col-md-12 no-padding column">
                                <clazy-load :src="event_history.banner.sm[0]">
                                    <img class="pull-left banner" :src="event_history.banner.sm[0]" :alt="event_history.title" slot="image">
                                    <div slot="placeholder">
                                        <Loading></Loading>
                                    </div>
                                </clazy-load>
                                <div class="event-brief">
                                    <p class="title" v-html="event_history.title"></p>
                                    <p class="author" v-html="event_history.added_by"></p>
                                    <span class="day_history" v-html="event_history.added_at"></span>
                                </div>
                                <button v-bind:disabled="IsDisabled" title="remove event" @click="RemoveEvent(event_history.event_id)" style="cursor:pointer; border:0px;" class="remove-event"><i class="material-icons">delete</i></button>
                            </div>

                        </div>

                    </div>
                </div>

            </div>

            <div class="col-md-8 new-event" style="min-height:100vh !important; margin-bottom:50px; padding:10px 10px;">
                <h3 class="title underline" style="margin-bottom:35px;">Add An Event</h3>

                <form  @submit.prevent="AddEvent" autocomplete="off">

                    <div class="col-md-12 no-padding">
                        <div class="group">
                            <input type="text" v-model="form.title" required>
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label class="group-label">Event Title
                                <span class="text-danger">*</span>
                            </label>
                            <span class="error-text"></span>
                        </div>
                    </div>

                    <div class="col-md-12 no-padding">
                        <div class="group">
                            <textarea v-model="form.desc"></textarea>
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label class="group-label">Let's describe this event</label>
                            <span class="error-text"></span>
                        </div>
                    </div>

                    <div class="col-md-12 no-padding" v-if="ShowGradClassField">
                        <div class="group">
                            <select v-model="form.grad_class">
                                <option v-for="grad_class in gradclasses" :value="grad_class.id" v-text="grad_class.year"></option>
                            </select>
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label class="group-label">Graduating Class
                                <span class="text-danger">*</span>
                            </label>
                            <label class="group-label"></label>
                            <span class="error-text"></span>
                        </div>
                    </div>

                    <!-- Image uploader -->
                    <div class="col-md-12 no-padding" style="margin-bottom:30px;">
                        <vue-dropzone ref="dropzone" v-on:vdropzone-sending="UploadEvent" id="dropzone" :options="dropOptions"></vue-dropzone>
                    </div>

                    <div class="col-md-12 no-padding text-center">
                        <button v-bind:disabled="IsDisabled" type="submit" class="btn">Add Event</button>
                    </div>
                </form>
            </div>


        </div>
        </div>
    </div>
</template>
<style lang="css" scoped>
.title.underline {
  font-size: 25px;
  font-stretch: narrower;
  color: #3e5851;
  text-align: center;
  font-stretch: narrower;
}

.event .column {
  margin-top:20px;
    max-width:100%;
}

.event .column:after {
    content: "";
    display: block;
    border-bottom: 1.5px solid #e9e9f0;
    padding-top:20px; 
}
 
 .event .column .banner {
    border:1px solid #e9e9f0;
    max-width:100px;
 }

.event .event-brief {
    margin-top:5px;
    margin-left:115px;
    width:100%;
}

.event-brief .title{
    float: left;
    font-weight:600;
    font-size:18.5px;
    letter-spacing:1px;
    color:#000000;
    width:100%;
}

.event-brief .author{
    font-size:15px;
}

.event-brief .day_history{
    font-size:14px;
    color:#746d76;
}

.event .column .remove-event {
    color:#fbfbfb;
    background:#377262;
    border-radius:15px;
    padding:6px 8px;
    position:absolute;
    top:0;
    right:0;
    margin-right:5px;
}

.btn {
    border: 1px solid #377262;
    color:#377262;
    background: #fcfcfc;
    text-transform: uppercase;
    padding: 8px 50px;
    font-size: 16.5px;
}

.btn:hover{
    border: 1px solid #fcfcfc;
    color:#fcfcfc;
    background: #377262;
}

#dropzone {
    height:220px !important;
    overflow-y:auto;
}

</style>
<script>
    import NavbarComponent from "./NavbarComponent.vue";
    import {
        get,
        post
    } from '../../helpers/api';
    import Auth from '../../storage/auth';
    import Loading from './LoadingComponent.vue';
    import iziToast from '../../helpers/iziToast';
    import vueDropzone from "vue2-dropzone";
    export default {
        components: {
            NavbarComponent,
            Loading,
            vueDropzone
        },
        data() {
            return {
                IsLoading: false,
                dropOptions: {
                    url: "http://gmkyrbuk.cloudapp.net/api/events/new/media",
                    headers: {'Authorization': `Bearer ${Auth.state.api_token}`},
                    thumbnailMethod: "contain",
                    thumbnailWidth: 100,
                    thumbnailHeight: 100,
                    addRemoveLinks: true,
                    acceptedFiles: '.jpg,.jpeg,.png',
                    autoProcessQueue: false,
                    dictCancelUploadConfirmation: false,
                    dictDefaultMessage: "Drag & Drop Event Pictures here <i class='fa fa-cloud-upload'></i>",
                    dictRemoveFile: "<i class='fa fa-trash' style='font-size:17px; cursor:pointer; color:#377262; margin-left:calc(105%); text-align:center;'></i>"
                },
                events_history: {},
                form: {
                    title: '',
                    institution: Auth.state.u_institution,
                    desc: '',
                    grad_class: '',
                    ext_upload: '0',
                    new_event: ''
                },
                gradclasses: [],
                ShowGradClassField: false,
                IsDisabled: false
            }

        },
        created() {
            this.PullEvents();
            this.CheckAccountType();
        },
        methods: {
            PullEvents() {
                this.IsLoading = true;
                get('http://gmkyrbuk.cloudapp.net/api/events/all?_ins_id=' + Auth.state.u_institution + '&_class_id=' + Auth.state.u_class)
                    .then((res) => {
                        this.IsLoading = false;
                        this.events_history = res.data.events;
                    }).catch((err) => {

                        // go to login
                        if (err.response.status === 401) {
                            this.$router.push('/login');
                        }

                    })
            },
            AddEvent() {
                this.IsDisabled = true;
                post('http://gmkyrbuk.cloudapp.net/api/events/new', this.form)
                    .then((res) => {
                        this.IsDisabled = false;
                        this.form.title = '';
                        this.form.desc = '';
                        this.form.new_event = res.data.event;
                        this.$refs.dropzone.processQueue();
                        this.PullEvents();
                    }).catch((err) => {
                        this.IsDisabled = false;
                    })
            },
            UploadEvent (file, xhr, formData) {
                formData.append('event_id', this.form.new_event);
                formData.append('description', "");
            },
            GetGradClass() {
                post('http://gmkyrbuk.cloudapp.net/api/misc/institution/gradclass', this.form)
                    .then((res) => {
                        this.gradclasses = res.data.gradclasses;
                    })
                    .catch((err) => {

                    })
            },
            RemoveEvent(event_id) {
                this.IsDisabled = true;
                let _this = this;
                _this.$toast.question('Are you sure you want to delete this Event', 'confirm action', {
                    timeout: false,
                    close: false,
                    overlay: true,
                    toastOnce: true,
                    id: 'question',
                    zindex: 999,
                    position: 'center',
                    buttons: [
                        ['<button style="outline:none;"><b>Proceed</b></button>', function (instance, iziToast) {
                            if (navigator.onLine) {
                                post('http://gmkyrbuk.cloudapp.net/api/events/remove', {
                                        '_event_id': event_id
                                    })
                                    .then((res) => {
                                        instance.hide({
                                            transitionOut: 'fadeOut'
                                        }, iziToast, 'button');
                                        _this.PullEvents();
                                        this.IsDisabled = false;
                                    }).catch((err) => {
                                        instance.hide({
                                            transitionOut: 'fadeOut'
                                        }, iziToast, 'button');
                                        if (err.response.data.error) {
                                            _this.$toast.error(err.response.data.error, "", iziToast.error);
                                        } else {
                                            _this.$toast.error("Something went wrong, try again", "", iziToast.error);
                                        }
                                        this.IsDisabled = false;
                                    })
                            } else {
                                _this.$toast.info("It seems you're offline, check connectivity and try again.", "", iziToast.baloon);
                            }
                        }, true],
                        ['<button>Cancel</button>', function (instance, iziToast) {
                            instance.hide({
                                transitionOut: 'fadeOut'
                            }, iziToast, 'button');
                        }]
                    ]
                });
            },
            CheckAccountType() {

                post('http://gmkyrbuk.cloudapp.net/api/user/account/type')
                    .then((res) => {
                        this.accountkey = res.data.key;

                        // course rep. , Asst course rep.
                        if (this.accountkey == "78110010135491" || this.accountkey == "78110011135491") {
                            this.form.grad_class = Auth.state.u_class;
                        } else if (this.accountkey == "78110101135491") {
                            this.GetGradClass();
                            this.ShowGradClassField = true;
                        } else {
                            this.IsDisabled = true;
                        }

                        this.IsLoading = false;
                    })
                    .catch((err) => {
                        this.IsLoading = false;
                    })

            }
        }
    }
</script>