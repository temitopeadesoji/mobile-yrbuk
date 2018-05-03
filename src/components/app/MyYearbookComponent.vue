<template>
    <div>
        <vue-headful title="My yearbook | Yrbuk" />
        <!-- navbar -->
        <NavbarComponent></NavbarComponent>

        <!-- content -->
        <div class="main-page-content">
        <div class="sub-profile">
        <div id="section1" class="section dark1">
            <p class="left" v-html="class_title"></p>
            <p id="icon-1" class="right"><i class="material-icons" @click="openContent(1)">add</i></p>
            <p id="iconBefore-1" class="right after"><i class="material-icons" @click="closeContent(1)">remove</i></p>
        </div>
        <div id="content-1" class="section-content">
                <Loading v-if="ClassNoteLoading"></Loading>
                
                <div class="top" v-if="!ClassNoteLoading">
                    <h2 class="" v-html="class_title"></h2>
                    <div class="social-icon">
                        <a title="Follow us on Instagram" v-if="class_contact.instagram && class_contact.instagram != '' " :href="class_contact.instagram">
                            <span class="fa fa-instagram"></span>
                        </a>
                        <a title="Follow us on Twitter" v-if="class_contact.twitter && class_contact.twitter != '' " :href="class_contact.twitter">
                            <span class="fa fa-twitter"></span>
                        </a>
                        <a title="Like our Facebook page" v-if="class_contact.facebook && class_contact.facebook != '' " :href="class_contact.facebook">
                            <span class="fa fa-facebook"></span>
                        </a>
                        <a title="Visit our website" v-if="class_contact.website && class_contact.website != '' " :href="class_contact.website">
                            <span class="fa fa-globe"></span>
                        </a>
                    </div>
                    <center>
                    <button v-on:click='EditClassNote = !EditClassNote' v-if="!ClassNoteLoading && !EditClassNote" class="btn" style="background: #377262; color: #fff;">Edit Note +</button>
                    </center>
                    <br>
                </div>
                <div class="class-note" v-if="!ClassNoteLoading && !EditClassNote">
                    <p v-html="class_note"></p>
                </div>
                <div  v-if="EditClassNote && !ClassNoteLoading" style="width:100%;">
                <form @submit.prevent="UpdateClassNote">
                    <center>
                    <button v-on:click='EditClassNote = !EditClassNote' class="btn" style="background: #377262; color: #fff;">Discard</button>
                    </center>
                        <br>
                        
        <quill-editor v-model="form.class_note" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)">
          <div id="toolbar" slot="toolbar">
            <!-- Add a bold button -->
            <button class="ql-bold">Bold</button> <button class="ql-italic">Italic</button>
            <!-- Add font size dropdown -->
            <select class="ql-size">
              <option value="small"></option>
              <option selected></option>
              <option value="large"></option>
              <option value="huge"></option>
            </select>
            <select class="ql-font">
              <option selected="selected"></option>
              <option value="serif"></option>
              <option value="monospace"></option>
            </select>
            <!-- Add subscript and superscript buttons -->
            <button class="ql-script" value="sub"></button>
            <button class="ql-script" value="super"></button>
          </div>
        </quill-editor>
                    <div class="signed right" v-if="!ClassNoteLoading" v-html="class_chairman"></div>
                    <button class="btn" type="submit" v-bind:disabled="isDisabled || form.class_note == class_note " style="width:100%; margin-top:5px; background: #377262; color: #fcfcfc; padding: 8px 75px;">Save</button>
                </form>
                </div>
        </div>

        <div id="section2" class="section dark2">
            <p class="left" v-if="!AuthoritiesLoading">Honor Role</p>
            <p id="icon-2" class="right"><i class="material-icons" @click="openContent(2)">add</i></p>
            <p id="iconBefore-2" class="right after"><i class="material-icons" @click="closeContent(2)">remove</i></p>
        </div>
        <div id="content-2" class="section-content">
                <div class="top">
                    <h2>Honor Role</h2>
                </div>
                <Loading v-if="AuthoritiesLoading"></Loading>
                    <div class="honor-content" style="padding:0px !important;">

                        <div class="col-sm-6 user-listing" v-for="(class_authority, key, index) in class_authorities" style="padding:0px !important;">
                            <router-link style="text-decoration:none; color:inherit;" :to="{ name: 'UserProfile', params: {id: class_authority.user_id} }">
                                <LetterAvatar class="u-img img img-circle" :username="class_authority.name"  v-if="class_authority.user_avatar == '' || class_authority.user_avatar == null" :size="40" color="#FFFFFF" :rounded="true"></LetterAvatar>
                                <clazy-load v-if="class_authority.user_avatar != '' && class_authority.user_avatar != null" :src="class_authority.user_avatar">
                                    <img :src="class_authority.user_avatar" class="u-img img img-circle" :alt="class_authority.name" slot="image">
                                    <div slot="placeholder">
                                        <Loading></Loading>
                                    </div>
                                </clazy-load>
                                <div class="u-detail">
                                    <p v-html="class_authority.name"></p>
                                    <p v-html="class_authority.program"></p>
                                </div>
                            </router-link>
                        </div>

                    </div>
        </div>
        
        <div id="section3" class="section dark3">
            <p class="left" v-if="!AuthoritiesLoading">Programs</p>
            <p id="icon-3" class="right"><i class="material-icons" @click="openContent(3)">add</i></p>
            <p id="iconBefore-3" class="right after"><i class="material-icons" @click="closeContent(3)">remove</i></p>
        </div>
        <div id="content-3" class="section-content program-list">
                <div class="top">
                    <h2>Programs</h2>
                </div>
                <Loading v-if="ProgramsLoading"></Loading>
                <div class="row" v-if="!ProgramsLoading">
                    <div class="col-xs-6 col-sm-4 col-md-3" v-for="program in programs">
                        <div class="discover card">
                         <router-link style="text-decoration:none;" :to="{ name: 'Program', params: {institution: institution, gradclass: gradclass, program: program.id} }">
                         <div class="wrapper" v-bind:style="{ backgroundImage: 'url(' + program.img + ')' }">
                           <div class='dim'></div>
                           <div class="data">
                                <div class="content">
                                  <h1 class="title white" v-html="program.name"></h1>
                                </div>
                              </div>
                         </div>
                           </router-link>
                        </div>
                   </div>
                </div>
        </div>
        
        <div class="program-list">
                <div class="top text-center">
                    <h2>Final Year Events</h2>
                    <router-link :to="{ name: 'ManageEvents' }" class="text-center" style="color:#fff; font-size:15px; font-weight:600; text-decoration:underline;"><button class="btn" style="background: #377262;">Manage Event +</button></router-link>
                </div>
                <div style="margin-top: 20px;">
                <Loading v-if="EventsLoading"></Loading>
                <div class="row" v-show="!EventsLoading">
                    <div class="col-xs-6 col-sm-4 col-md-3" v-for="evenT in events">
                        <div class="discover card">
                        <router-link :to="{ name: 'EventDetails', params: {year: evenT.year, id: evenT.event_id} }" :title="evenT.description">
                         <div class="wrapper" v-bind:style="{ backgroundImage: 'url(' + evenT.banner.sm[0] + ')' }">
                           <div class='dim'></div>
                           <div class="data">
                                <div class="content">
                                  <h1 class="title white" v-html="evenT.title"></h1>
                                </div>
                              </div>
                         </div>
                        </router-link>
                        </div>
                   </div>
                </div>
                </div>
        </div>
        </div>

        </div>
    </div>
</template>
<style lang="css" scoped>

.row {
  max-width: 100%;
  margin: 0px;
}

.card {
  width: 100%;
  padding: 0px;
  margin-bottom: 30px;
}
.discover.card .wrapper {
  cursor:pointer;
  overflow: hidden;
  min-height: 200px;
  position: relative;
  background-color: #fff;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.2);
}
.wrapper .dim {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0.1;
  opacity: 0.52;
  cursor:pointer;
  position: absolute;
  text-decoration: none;
  background: linear-gradient(40deg, #4025b4 37%, #0277bd 60%);
}
.card .wrapper:hover .data {
  -webkit-transform: translateY(0);
          transform: translateY(0);
}
.discover.card .data {
  -webkit-transform: translateY(0.2em);
          transform: translateY(0.2em);
}
.card .data {
  position: absolute;
  bottom: 0;
  width: 100%;
  -webkit-transform: translateY(calc(70px + 1em));
          transform: translateY(calc(70px + 1em));
  -webkit-transition: -webkit-transform 0.3s;
  transition: -webkit-transform 0.3s;
  transition: transform 0.3s;
  transition: transform 0.3s, -webkit-transform 0.3s;
}
.card .data .content {
  padding: 1em;
  position: relative;
  z-index: 1;
  font-family: "Open Sans", sans-serif;
}
.card .author {
  font-size: 8px;
  font-family: "Open Sans", sans-serif;
}
.card .title {
  font-size: 20px;
  margin-top: 10px;
  font-family: xanny-font;
  color: #fff;
}
.card .text {
  height: 70px;
  margin: 0;
}
</style>
<script>
    import NavbarComponent from "./NavbarComponent.vue";
    import Loading from './LoadingComponent.vue';
    import { get, post } from '../../helpers/api';
    import Auth from '../../storage/auth';
    import LetterAvatar from 'vue-avatar';
    import iziToast from '../../helpers/iziToast';
    // require styles
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';

    import { quillEditor } from 'vue-quill-editor'
    
    export default {
        components: {
            NavbarComponent,
            Loading,
            LetterAvatar,
            quillEditor
        },
        data() {
            return {
                events: [],
                programs: [],
                programs_: [],
                class_authorities: {},
                searchBox: {
                    program: '',
                    event: ''
                },
                class_title: '',
                class_note: '',
                class_chairman: '',
                institution: '',
                gradclass: '',
                EventsLoading: true,
                ProgramsLoading: true,
                AuthoritiesLoading: true,
                ClassNoteLoading: true,
                EditClassNote: false,
                isDisabled: false,
                form: {
                    class_note: ''
                },
                editorOption: {
                   modules: {
                      toolbar: '#toolbar'
                    }
                },
                customToolbar: [
                    ['bold', 'italic'],
                    [{
                        'list': 'ordered'
                    }],
                    [{ 'size': ['small', false, 'large', 'huge'] }],
                    [{ 'font': [] }],
                ]
            }
        },
        created() {
            this.YearBookDetails();
            this.EventDetails();
        },
        methods: {
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

            YearBookDetails() {
                get('http://gmkyrbuk.cloudapp.net/api/yearbook/details/' + Auth.state.u_institution + '/' + Auth.state.u_class)
                    .then((res) => {
                        this.ClassNoteLoading = false;
                        this.AuthoritiesLoading = false;
                        this.ProgramsLoading = false;
                        this.class_title = res.data.title;
                        this.class_note = res.data.graduating_note;
                        this.form.class_note = this.class_note;
                        this.class_chairman = '-' + res.data.class_chairman;
                        this.class_contact = res.data.contact_data;
                        this.class_authorities = res.data.class_authorities;
                        this.programs = res.data.programs;
                        this.programs_ = res.data.programs;
                        this.institution = res.data.institution;
                        this.gradclass = res.data.class;
                    }).catch((err) => {

                        // go to login
                        if (err.response.status === 401) {
                            this.$router.push('/login');
                        }

                    })
            },
            EventDetails() {
                get('http://gmkyrbuk.cloudapp.net/api/events/all?_ins_id=' + Auth.state.u_institution + '&_class_id=' + Auth.state.u_class)
                    .then((res) => {
                        this.EventsLoading = false;
                        this.events = res.data.events;
                    }).catch((err) => {

                        // go to login
                        if (err.response.status === 401) {
                            this.$router.push('/login');
                        }

                    })
            },
            FindProgram() {
                // alert(this.searchBox.program);
                var query = this.searchBox.program;
                query = query.toLowerCase();
                var array = this.programs_;
                var result = [];
                for (let i = 0; i < array.length; i++) {
                    var program_name = array[i].name;
                    program_name = program_name.toLowerCase();
                    if (program_name.includes(query)) {
                        var program = array[i];
                        if (result.indexOf(program.name) === -1) {
                            result.push(program);
                        }

                    }
                }
                this.programs = result;
            },
            UpdateClassNote() {
                if(navigator.onLine) {
                    this.isDisabled = true;
                    this.error = {};
                    this.EditClassNote = false;
                    post('http://gmkyrbuk.cloudapp.net/api/yearbook/update/classnote', this.form)
                        .then((res) => {
                            this.isDisabled = false;
                            this.class_note = this.form.class_note;
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
            }
        }
    }
</script>