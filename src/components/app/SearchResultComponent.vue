<template>
    <div>
        <vue-headful :title="PageTitle" />
        <!-- navbar -->
        <NavbarComponent></NavbarComponent>

        <div class="main-page-content">
        <div class="sub-profile">
        <div id="section1" class="section dark1" @click="ActiveTab('user')" :class="Usersactive">
            <p class="left"><span class="fa fa-angle-double-right pull-right"> User</span></p>
            <p id="icon-user" class="right"><i class="material-icons">add</i></p>
        </div>
        <div id="section2" class="section dark2" @click="ActiveTab('memory')" :class="Memoriesactive">
            <p class="left"><span class="fa fa-angle-double-right pull-right"> memory</span></p>
            <p id="icon-memory" class="right"><i class="material-icons">add</i></p>
        </div>

        <Loading v-if="IsLoading" style="padding-top:50px !important;"></Loading>
        <div class="section-contents">
                <div class="top text-center">
                    <p style="margin-top:5px; color:#37514a !important; letter-spacing:0.5px; font-size:19px; font-weight:500;">Showing results for "<span style="font-size:21px; color:#ce407a; font-weight:600;">{{ form.query }}</span>" </p>
                </div>
                <Loading v-if="AuthoritiesLoading"></Loading>
                    <div v-show="Usersactive == 'active' && !IsLoading" class="">
                        <div v-show="users.length <= 0" style="color:#dbdbe3; padding:80px 20px; text-align:center;">
                            <span class="fa fa-search" style="font-size:120px; "></span>
                            <p style="font-size:23px; margin-top:25px;">Oops! Let's try another search keyword</p>
                        </div>
                    <div class="honor-content" style="padding:0px !important;">

                        <div class="col-sm-12 user-listing" v-show="users.length > 0" v-for="(user, key, index) in users"> 
                            <router-link style="text-decoration:none; color:inherit;" :to="{ name: 'UserProfile', params: {id: user.id} }">
                                <LetterAvatar class="u-img img img-circle" :username="user.name" v-if="user.avatar_small == '' || user.avatar_small == null"
                                    :size="40" color="#FFFFFF" :rounded="true"></LetterAvatar>
                                <clazy-load v-if="user.avatar_small != '' && user.avatar_small != null" :src="user.avatar_small">
                                    <img :src="user.avatar_small" class="u-img img img-circle" :alt="user.name" slot="image">
                                    <div slot="placeholder">
                                        <Loading></Loading>
                                    </div>
                                </clazy-load>
                                <div class="u-detail">
                                    <p v-html="user.name"></p>
                                    <p>{{ user.program }} | <i>{{ user.institution }}</i></p>
                                </div>
                            </router-link>
                        </div>
                    </div>
                    </div>
                    <!-- Memories Result -->
                    <div v-show="Memoriesactive == 'active' && !IsLoading">

                        <div v-show="memories.length <= 0" style="color:#dbdbe3; padding:80px 20px; text-align:center;">
                            <span class="fa fa-search" style="font-size:120px; "></span>
                            <p style="font-size:23px; margin-top:25px;">Oops! Let's try another search keyword</p>
                        </div>

                    </div>
                    </div>
        </div>

        </div>

    </div>
</template>

<style lang="css" scoped>

    .menu-item a.active {
        font-weight:600;
        padding-left: 20px;
        border-left: 3px solid #38524b;
        color: #37514a;
    }

    .menu-item .count {
        background:#ce407a;
        padding:5px 12px;
        font-weight:400;
        border-radius:15px;
        font-size:10px;
        color:#ffffff;
    }
</style>
<script>
    import NavbarComponent from "./NavbarComponent.vue";
    import { get, post } from '../../helpers/api';
    import Auth from '../../storage/auth';
    import Loading from './LoadingComponent.vue';
    import LetterAvatar from 'vue-avatar';

    export default {
        components: {
            NavbarComponent,
            Loading,
            LetterAvatar
        },
        data() {
            return {
                form: {
                    query: this.$route.query.query,
                    category: 'users',
                },
                PageTitle: 'search result: '+ this.$route.query.query +' | Yrbuk',
                Usersactive: 'active',
                Memoriesactive: '',
                users: [],
                memories: [],
                IsLoading: false
            }
        },
        created() {
            this.ProcessSearch();
        },
        methods: {

            ProcessSearch() {
                this.IsLoading = true;
                post('http://gmkyrbuk.cloudapp.net/api/misc/search', this.form)
                    .then((res) => {
                        this.IsLoading = false;

                        if(res.data.users){
                            this.users = res.data.users;
                        }
                        if(res.data.memories){
                            this.memories = res.data.memories;
                        }
                    })
                    .catch((err) => {
                        this.IsLoading = false;
                    })
                    
            },
            ActiveTab(Tab) {

                if(Tab == 'user'){
                    this.Usersactive = 'active';
                    this.Memoriesactive = '';
                    if(this.users.length <= 0){
                        this.form.category = 'users';
                        this.ProcessSearch();
                    }
                }

                if(Tab == 'memory'){
                    this.Usersactive = '';
                    this.Memoriesactive = 'active';
                    this.IsLoading = true;
                    if(this.memories.length <= 0){
                        this.form.category = 'memories';
                        this.ProcessSearch();
                    }else{
                        this.IsLoading = false;
                    }
                }
            }

        }
    }
</script>