<template>
               <div class="pages-header">
                    <div class="navbar"> 
                        <div class="left">
                            <span class="menu-bar" @click="openNav"><i class="material-icons">menu</i></span>
                            <router-link :to="{ name: 'Dashboard' }" class="brand-icon">YrbUk</router-link>
                        </div>
                        <div class="right">
                            <span class="search-icon" @click="openSearch"><i class="material-icons">search</i></span>
                        </div>
                    </div>
                    <div id="mySearchnav" class="searchbar"> 
                        <div class="left">
                                <span class="menu-bar" @click="openNav"><i class="material-icons">menu</i></span>
                        </div>
                        <div class="right">
                            <div class="search-line">
                                <form @submit.prevent="SearchQuery">
                                    <input type="text" name="q" v-model="form.searchQuery" placeholder="Select School, Name, Class">
                                </form>
                                <span class="remove-icon" @click="closeSearch"><i class="material-icons">clear</i></span>
                            </div>
                        </div>
                    </div>
                    <div id="mySidenav" class="sidenav">
                        <div class="top-sidenav  text-left">
                            <span class="closebtn" @click="closeNav"><i class="material-icons">clear</i></span>
                            <img src="/imgs/team3.jpg" alt="logo" class="logo">
                            <p>Jane Doe</p>
                        </div>
                        <div class="bottom-sidenav">
                        <router-link :to="{ name: 'Memories' }" class="menu main-menu">Memories</router-link>
                        <router-link :to="{ name: 'MyYearbook' }" class="menu main-menu">My Yearbook</router-link>
                        <router-link :to="{ name: 'ManageUser' }" class="menu main-menu">Manage Users</router-link>
                        <router-link :to="{ name: 'Home' }" class="menu main-menu">Notifications</router-link>
                        <router-link :to="{ name: 'ProfileSettings' }" class="menu">My Account</router-link>
                        <router-link :to="{ name: 'Feedback' }" class="menu">Feedback</router-link>
                        <a href="javascript:;" @click="logout" class="menu">Logout</a>
                        <br>
                        </div>
                    </div>
                </div>
</template>

<style lang="css" scoped>
    .navbar {
        background-color: #377262 !important;
        border-color: #377262 !important;
        margin-bottom: 0px !important;
    }

    .navbar .links {
        color: #b2c8c2 !important;
        font-size: 17px;
        font-family: SourceSansPro-Light !important;
    }

    .navbar-brand {
        letter-spacing: 2px;
        font-family: 1000 !important;
        color: #fcfcfc !important;
        font-size: 25px !important;
        font-family: SourceSansPro-SemiBold !important;
    }

    .Search-field {
        margin-top: 5px;
        background: #c8d8d4 !important;
        width: 270px !important;
        height: 29.5px !important;
        outline:none !important;
    }

    input:focus {
        outline:none !important;
    }

    .Search-field::-webkit-input-placeholder {
        font-size: 11px;
    }

    .Search-field::-moz-placeholder {
        font-size: 11px;
    }

    .Search-field:-ms-input-placeholder {
        font-size: 11px;
    }

    .Search-field:focus {
        background: #fcfcfc !important;
    }

    .demacator {
        margin-top: 12px !important;
        color: #fcfcfc;
        font-weight: 600;
    }

    .navbar-default .navbar-nav>li>a {
        color: #FFFFFF !important;
    }

    .dropdown-item {
        display: block;
        width: 100%;
        padding: 7px 40px;
        clear: both;
        font-weight: 400;
        color: #212529;
        white-space: nowrap;
        background-color: transparent;
        border: 0;
        text-decoration: none;
        text-align: center;
        border-bottom: 1px solid lightgray;
        align-content: center;
    }

    .app-navbar a.active {
        font-weight:600;
    }
    
    .navbar-left a.router-link-exact-active {
        font-weight:600;
        color:#FFFFFF;
    }
</style>

<script>
    import Auth from '../../storage/auth'
    import Notifications from './NotificationsDropdown'
    import { post, interceptors } from '../../helpers/api'
    export default {
        components: {
            Notifications
        },
        data() {
            return {
                uname: Auth.state.name,
                form: {
                    searchQuery: ''
                }
            }
        },methods: {
			openNav() {
                document.getElementById("mySidenav").style.width = "80%";
			},
			openSearch() {
                document.getElementById("mySearchnav").setAttribute("style", "width:100%;padding:10px 10px;");
			},
			closeSearch() {
                document.getElementById("mySearchnav").setAttribute("style", "width:0;padding:0px 0px;");
			},
			closeNav() {
                document.getElementById("mySidenav").style.width = "0";
			},
			logout() {
				post('http://gmkyrbuk.cloudapp.net/api/user/logout')
				    .then((res) => {
				        if(res.data.success) {

				            // remove token
				            Auth.remove();
				            this.$router.push('/login');
				        }
				    })
            },
            SearchQuery() {

                if(this.form.searchQuery != '' && this.form.searchQuery != null){
                    this.$router.push('/search-result?query='+this.form.searchQuery);
                }

            }
		}
    }
</script>