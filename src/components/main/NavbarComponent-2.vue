<template>
               <div class="">
                    <div class="navbar"> 
                        <div class="left">
                            <span class="menu-bar" @click="openNav"><i class="material-icons">menu</i></span>
                            <router-link :to="{ name: 'Home' }" class="brand-icon">YrbUk</router-link>
                        </div>
                        <div class="right">
                            <span class="search-icon" @click="openSearch"><i class="material-icons">search</i></span>
                        </div>
                    </div>
                    <div id="mySearchnav" class="searchbar"> 
                        <div class="left">
                             <form action="">
                                <span class="menu-bar" @click="openNav"><i class="material-icons">menu</i></span>
                            </form>
                        </div>
                        <div class="right">
                                <div class="search-line">
                                    <input type="text" placeholder="Select School, Name, Class">
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
                        <p class="main-menu active">Memories</p>
                        <p class="main-menu">My Yearbook</p>
                        <p class="main-menu">Notifications</p>
                        <p>My Account</p>
                        <p>Settings</p>
                        <p>Feedback</p>
                        <p>Logout</p>
                        <br>
                        </div>
                    </div>
                </div>
</template>
<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
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
			}
		}
	}
</script>