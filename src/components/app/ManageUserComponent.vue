<template>
    <div>
        <vue-headful title="Manage Users | Yrbuk" />
        <!-- navbar -->
        <NavbarComponent></NavbarComponent>

        <!-- content -->
        <div class="main-page-content">
        <div class="sub-profile">
        <!-- menu Panel -->
        <div id="section1" class="section dark1" @click="ChangeMenu('AllUsersList')" :class="AllUsersList">
            <p class="left">All Users</p>
        </div>
        <div id="section2" class="section dark2" @click="ChangeMenu('NewUserViaForm')" :class="NewUserViaForm">
            <p class="left">New User via Form</p>
        </div>
        <div id="section3" class="section dark3" @click="ChangeMenu('NewUserViaExcel')" :class="NewUserViaExcel">
            <p class="left">New User via Excel Sheet</p>
        </div>

            <!-- content -->
            <div class="content" style="min-height:100vh; height:100%; width:100% !important; padding:0px 35px;">


                <div class="body" style="margin-bottom:50px;">

                    <!-- All Users -->
                    <div class="users-table" v-show="AllUsersList == 'active'">
                        <center class="action-panel" style="margin-bottom:20px;">
                            <button class="btn" style="background: #377262;">Resend Invitation E-mail <br> to Pending Users</button>
                            <br>
                            <br>
                            <button class="btn btn-danger" @click="DeleteAccount()">Delete Account(s)</button>
                        </center>

                        <vue-good-table  @on-row-click="toggleSelectRow" :columns="tableColumns" :rows="tableRows" :sort-options="{ enabled: true, initialSortBy: {field: 'name', type: 'asc'}}" :select-options="{ enabled: true, selectionText: 'user(s) selected', clearSelectionText: 'clear',}" :search-options="{ enabled: true, placeholder: 'Search User'}"
                            :pagination-options="{ enabled: true, perPage: 20, position: 'both' }" styleClass="vgt-table striped bordered"
                        />
                    </div>


                    <!-- New User Via Form -->
                    <div class="new-user-form" style="margin-top:35px;" v-show="NewUserViaForm == 'active'">
                        
                        <Loading v-if="IsLoading"></Loading>
                        
                        <form @submit.prevent="AddUserViaForm" v-show="!IsLoading && accountkey != '78110001135491'">
                            <div class="col-md-12" style="padding:0px !important; margin:0px;">
                                <div class="col-md-6">
                                    <div class="group">
                                        <input v-model="form._name" type="text" required>
                                        <span class="highlight"></span>
                                        <span class="bar"></span>
                                        <label class="group-label">Full Name
                                            <span class="text-danger">*</span>
                                        </label>
                                        <span class="error-text" v-if="error._name">{{error._name}}</span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="group">
                                        <input type="text" v-model="form._email" required>
                                        <span class="highlight"></span>
                                        <span class="bar"></span>
                                        <label class="group-label">E-mail
                                            <span class="text-danger">*</span>
                                        </label>
                                        <span class="error-text" v-if="error._email">{{error._email}}</span>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="group">
                                        <input type="text" v-model="form.matric_no" required>
                                        <span class="highlight"></span>
                                        <span class="bar"></span>
                                        <label class="group-label">Matric No.
                                            <span class="text-danger">*</span>
                                        </label>
                                        <span class="error-text" v-if="error.matric_no">{{error.matric_no}}</span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="group">
                                        <input type="text" v-model="form._phone" required>
                                        <span class="highlight"></span>
                                        <span class="bar"></span>
                                        <label class="group-label">Phone</label>
                                        <span class="error-text" v-if="error._phone">{{error._phone}}</span>
                                    </div>
                                </div>

                                <div class="col-md-6" v-show="accountkey == '78110110135491' ">
                                    <div class="group">
                                        <select v-model="form.institution" v-on:change="GetGradClass()">
                                            <option value= 'null' disabled selected>Institution
                                                <span class="text-danger" style="color:red !important;">*</span>
                                            </option>
                                            <option v-for="institution in institutions" :value="institution.id" v-text="institution.name"></option>
                                        </select>
                                        <span class="highlight"></span>
                                        <span class="bar"></span>
                                        <label class="group-label"></label>
                                        <span class="error-text" v-if="error.institution">{{error.institution}}</span>
                                    </div>
                                </div>
                                <div class="col-md-6" v-show="accountkey == '78110110135491' || accountkey == '78110101135491' ">
                                    <div class="group">
                                        <select v-model="form.grad_class" v-on:change="GetPrograms()">
                                            <option value= 'null' disabled selected>Graduating Class
                                                <span class="text-danger" style="color:red !important;">*</span>
                                            </option>
                                            <option v-for="grad_class in gradclasses" :value="grad_class.id" v-text="grad_class.year"></option>
                                        </select>
                                        <span class="highlight"></span>
                                        <span class="bar"></span>
                                        <label class="group-label"></label>
                                        <span class="error-text" v-if="error.grad_class">{{error.grad_class}}</span>
                                    </div>
                                </div>

                                <div class="col-md-6" v-show="accountkey == '78110110135491' || accountkey == '78110101135491' ">
                                    <div class="group">
                                        <select v-model="form.program" required>
                                            <option value= 'null' disabled selected>Program
                                                <span class="text-danger" style="color:red !important;">*</span>
                                            </option>
                                            <option v-for="program in programs" :value="program.id" v-text="program.name"></option>
                                        </select>
                                        <span class="highlight"></span>
                                        <span class="bar"></span>
                                        <label class="group-label"></label>
                                        <span class="error-text" v-if="error.program">{{error.program}}</span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="group" v-show="accountkey == '78110110135491' || accountkey == '78110101135491' ">
                                        <select v-model="form._account_type" required>
                                            <option value='1'>User</option>
                                            <option value='2'>Course Rep.</option>
                                            <option value='3'>Asst. Course Rep.</option>
                                            <option value='4'>Student Rep.</option>
                                        </select>
                                        <span class="highlight"></span>
                                        <span class="bar"></span>
                                        <label class="group-label">Account Type
                                            <span class="text-danger">*</span>
                                        </label>
                                        <label class="group-label"></label>
                                        <span class="error-text" v-if="error._account_type">{{error._account_type}}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12" style="padding:0px !important; margin:0px; text-align:center;">
                                <button class="btn btn-flat" style="text-transform:uppercase; font-size:17px; padding:6px 45px; letter-spacing:0.5px; background: #377262; color:#fbfbfb;">Submit</button>
                            </div>

                        </form>
                    </div>
                </div>

                <!-- New User Via Excel Sheet -->
                <div class="new-user-excel" v-show="NewUserViaExcel == 'active'">

                    <div class="alert alert-danger" v-show="datasheetErrors.length > 0">
                        <ul>
                            <li v-for="error in datasheetErrors">{{ error }}</li>
                        </ul>
                    </div>

                    <p class="pull-right" v-show="!IsLoading" style="margin-bottom:20px; margin-right:18px; font-size:16px;">Download datasheet template
                        <a href="/misc/Yearbook-Datasheet.xlsx" download style="color:#377262; text-decoration:underline;">here</a>.</p>
                    
                    <Loading v-if="IsLoading"></Loading>
                    
                    <form @submit.prevent="AddUserViaExcel" v-show="!IsLoading && accountkey != '78110001135491'">
                        
                        <div class="col-md-12" style="padding:0px !important; margin:0px;">
                            <div class="col-md-6" v-show="accountkey == '78110110135491' ">
                                <div class="group">
                                    <select v-model="form.institution" v-on:change="GetGradClass()">
                                        <option value= 'null' disabled selected>Institution
                                            <span class="text-danger" style="color:red !important;">*</span>
                                        </option>
                                        <option v-for="institution in institutions" :value="institution.id" v-text="institution.name"></option>
                                    </select>
                                    <span class="highlight"></span>
                                    <span class="bar"></span>
                                    <label class="group-label"></label>
                                    <span class="error-text" v-if="error.institution">{{error.institution}}</span>
                                </div>
                            </div>
                            <div class="col-md-6" v-show="accountkey == '78110110135491' || accountkey == '78110101135491' ">
                                <div class="group">
                                    <select v-model="form.grad_class" v-on:change="GetPrograms()">
                                        <option value= 'null' disabled selected>Graduating Class
                                            <span class="text-danger" style="color:red !important;">*</span>
                                        </option>
                                        <option v-for="grad_class in gradclasses" :value="grad_class.id" v-text="grad_class.year"></option>
                                    </select>
                                    <span class="highlight"></span>
                                    <span class="bar"></span>
                                    <label class="group-label"></label>
                                    <span class="error-text" v-if="error.grad_class">{{error.grad_class}}</span>
                                </div>
                            </div>

                            <div class="col-md-6" v-show="accountkey == '78110110135491' || accountkey == '78110101135491' ">
                                <div class="group">
                                    <select v-model="form.program">
                                        <option value= 'null' disabled selected>Program
                                            <span class="text-danger" style="color:red !important;">*</span>
                                        </option>
                                        <option v-for="program in programs" :value="program.id" v-text="program.name"></option>
                                    </select>
                                    <span class="highlight"></span>
                                    <span class="bar"></span>
                                    <label class="group-label"></label>
                                    <span class="error-text" v-if="error.program">{{error.program}}</span>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <input type="file" id="datasheetInput" style="visibility:hidden;" @change="readURL($event);">
                                <a href="javascript:;" @click="NewDataSheet" style="color:#377262; font-size:16.5px; text-decoration:none;"> Attach Excel File
                                    <span class="fa fa-paperclip"></span>
                                </a>
                            </div>
                        </div>

                        <div class="col-md-12" style=" padding:0px !important; margin:0px; margin-top:50px !important; text-align:center;">
                            <button class="btn btn-flat" style="text-transform:uppercase; font-size:17px; padding:6px 45px; letter-spacing:0.5px; background: #377262; color:#fbfbfb;">Submit</button>
                        </div>
                    </form>
                </div>

            </div>

        </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
.content .body {
    border-top: 1px solid #ebebeb;
    padding-top: 22px;
    color: #ffffff;
}
.section.active {
    border-left: 5px solid #377262;
    border-bottom: 3px solid #377262;
}

.section:hover {
    border-left: 5px solid #377262;
    border-bottom: 3px solid #377262;
}

button {
    outline:none !important;
}
button:active, button:focus {
    outline:none !important;
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
    import LetterAvatar from 'vue-avatar';
    import iziToast from '../../helpers/iziToast';

    export default {
        components: {
            NavbarComponent,
            Loading,
            LetterAvatar,
        },
        data() {
            return {
                tableColumns: [{
                        label: 'id',
                        field: 'user_id',
                        hidden: true,
                    },
                    {
                        label: 'Full Name',
                        field: 'name',
                        filterable: true,
                    },
                    {
                        label: 'Matric No.',
                        field: 'matric_no',
                        filterable: true,
                    },
                    {
                        label: 'Program',
                        field: 'program',
                        filterable: true,
                    },
                    {
                        label: 'Institution',
                        field: 'institution',
                        filterable: true,
                    },
                    {
                        label: 'Class',
                        field: 'grad_class',
                        filterable: true,
                    },
                    {
                        label: 'Status',
                        field: 'status',
                        filterable: true,
                    }
                ],
                tableRows: [],
                AllUsersList: 'active',
                NewUserViaForm: '',
                NewUserViaExcel: '',
                form: {
                    _name: null,
                    _email: null,
                    _phone: null,
                    matric_no: null,
                    grad_class: null,
                    institution: null,
                    program: null,
                    _account_type: '1',
                    _datasheet: ''
                },
                formfield: {
                    _datasheet: ''
                },
                error: {},
                accountkey: '0',
                IsLoading: true,
                institutions: [],
                gradclasses: [],
                programs: [],
                IsDisabled: false,
                datasheetErrors: [],
                SelectedUsers: []
            }
        },
        created() {
            this.GetUsers();
        },
        methods: {
			openContent(key) {
                document.getElementById("icon-"+ key).setAttribute("style", "display: none;");
                document.getElementById("iconBefore-"+ key).setAttribute("style", "display: block;");
			},
			closeContent(key) {
                document.getElementById("icon-"+ key).setAttribute("style", "display: block;");
                document.getElementById("iconBefore-"+ key).setAttribute("style", "display: none;");
			},

            GetUsers() {
                get('http://gmkyrbuk.cloudapp.net/api/user/all')
                    .then((res) => {
                        this.tableRows = res.data.users;
                    })
                    .catch((err) => {

                    })
            },
            ChangeMenu(menu) {
                if (menu == "AllUsersList") {
                    this.AllUsersList = 'active';
                    this.NewUserViaForm = '';
                    this.NewUserViaExcel = '';
                } else if (menu == "NewUserViaForm") {
                    this.ClearForm();
                    this.AllUsersList = '';
                    this.NewUserViaForm = 'active';
                    this.NewUserViaExcel = '';
                    if (this.accountkey == '0') {
                        this.CheckAccountType();
                        this.IsLoading = true;
                    }
                } else if (menu == "NewUserViaExcel") {
                    this.ClearForm();
                    this.AllUsersList = '';
                    this.NewUserViaForm = '';
                    this.NewUserViaExcel = 'active';
                    if (this.accountkey == '0') {
                        this.CheckAccountType();
                        this.IsLoading = true;
                    }
                }
            },
            CheckAccountType() {

                post('http://gmkyrbuk.cloudapp.net/api/user/account/type')
                    .then((res) => {
                        this.accountkey = res.data.key;

                        // course rep. , Asst course rep.
                        if (this.accountkey == "78110010135491" || this.accountkey == "78110011135491") {

                            this.form.grad_class = Auth.state.u_class;
                            this.form.institution = Auth.state.u_institution;
                            this.form.program = Auth.state.u_program;

                        } else if (this.accountkey == "78110101135491") {

                            this.form.institution = Auth.state.u_institution;
                            this.GetGradClass();

                        } else if (this.accountkey == "78110110135491") {
                            this.GetInstitutions();
                        }

                        this.IsLoading = false;
                    })
                    .catch((err) => {
                        this.IsLoading = false;
                    })

            },
            GetPrograms() {
                get('http://gmkyrbuk.cloudapp.net/api/yearbook/details/' + this.form.institution + '/' + this.form.grad_class)
                    .then((res) => {
                        this.programs = res.data.programs;
                    })
                    .catch((err) => {

                    })
            },
            GetInstitutions() {
                get('http://gmkyrbuk.cloudapp.net/api/misc/get/institutions')
                    .then((res) => {
                        this.institutions = res.data.institutions;
                    })
                    .catch((err) => {})
            },
            GetGradClass() {
                post('http://gmkyrbuk.cloudapp.net/api/misc/institution/gradclass', this.form)
                    .then((res) => {
                        this.gradclasses = res.data.gradclasses;
                    })
                    .catch((err) => {

                    })
            },
            AddUserViaForm() {

                if (navigator.onLine) {
                    this.IsDisabled = true;
                    this.error = {};
                    post('http://gmkyrbuk.cloudapp.net/api/user/add-user/form', this.form)
                        .then((res) => {
                            if (res.data.success) {
                                this.$toast.success("New User Added & Invitation E-mail sent", "", iziToast.success);
                            }
                            this.CheckAccountType();
                            this.ClearForm();
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
            AddUserViaExcel() {

                this.datasheetErrors = [];
                if (this.formfield._datasheet && this.formfield._datasheet.length <= 0) {
                    this.$toast.error("Choose Excel File", "", iziToast.error);
                } else if (navigator.onLine) {
                    this.IsDisabled = true;
                    this.error = {};
                    this.formdata = new FormData();
                    this.formdata.append("_datasheet", this.formfield._datasheet);
                    this.formdata.append("institution", this.form.institution);
                    this.formdata.append("program", this.form.program);
                    this.formdata.append("grad_class", this.form.grad_class);
                    this.formdata.append("_account_type", this.form._account_type);
                    post('http://gmkyrbuk.cloudapp.net/api/user/add-user/excel', this.formdata)
                        .then((res) => {
                            console.log(res.data);
                            if (res.data.success) {
                                this.$toast.success(res.data.success, "", iziToast.success);
                            }
                            if (res.data.error.length > 0) {
                                this.datasheetErrors = res.data.error;
                            }
                            this.CheckAccountType();
                            this.ClearForm();
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
            readURL(e) {
                var files = e.target.files;
                this.formfield._datasheet = files[0];
            },
            NewDataSheet() {
                document.getElementById("datasheetInput").click();
            },
            ClearForm() {
                this.form = {
                    _name: null,
                    _email: null,
                    _phone: null,
                    matric_no: null,
                    grad_class: null,
                    institution: null,
                    program: null,
                    _account_type: '1',
                };
            },
            DeleteAccount() {
                if (this.SelectedUsers.length > 0) {
                    let _this = this; 
                    _this.$toast.question('You are about to delete ' + this.SelectedUsers.length + ' account(s)?', 'confirm action', 
                        {
                        timeout: false,
                        close: false,
                        overlay: true,
                        toastOnce: true,
                        id: 'question',
                        zindex: 999,
                        position: 'center',
                        buttons: [
                            ['<button><b>Proceed</b></button>', function (instance, iziToast) {
                                this.form.SelectedUsers = this.SelectedUsers;
                                if (navigator.onLine) {
                                    post('http://gmkyrbuk.cloudapp.net/api/user/account/remove', this.form)
                                        .then((res) => {
                                            _this.GetUsers();
                                            if (res.data.success) {
                                                 instance.hide({ transitionOut: 'fadeOut' }, iziToast, 'button');
                                                _this.$toast.success(res.data.success, "", iziToast.success);
                                            }
                                        })
                                        .catch((err) => {
                                            if(err.response.data.error){
                                                 _this.$toast.error("Something went wrong, try again", "", iziToast.error);
                                            }
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
                        ]});
                    return false;
                } else {
                    this.$toast.warning("Select Account(s) you want to delete", "", iziToast.warning);
                }
            },
            toggleSelectRow(params) {

                if (params.selected && !this.SelectedUsers.includes(params.row.user_id)) {
                    this.SelectedUsers.push(params.row.user_id);
                } else if (!params.selected && this.SelectedUsers.includes(params.row.user_id)) {
                    var index = this.SelectedUsers.indexOf(params.row.user_id);
                    if (index > -1) {
                        this.SelectedUsers.splice(index, 1);
                    }
                }
            }
        }
    }
</script>