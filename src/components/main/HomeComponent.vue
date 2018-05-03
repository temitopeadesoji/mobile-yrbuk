<template>
    <div class="home-page">
        <vue-headful title="Yrbuk" />
        <!-- Header -->
        <header class="home-header">
            <NavbarComponent></NavbarComponent>
            <div class="banner-content">
                <h1 class="title">Welcome to YearBook.ME</h1>
                <p class="body">Keep all your memories right next to you. Welcome to the
                    leader of online yearbook systems.
                    </p>
                <div class="auth-buttons">
                        <router-link  class="auth-button" :to="{ name: 'Login' }">
                            <button class="btn">LOGIN</button>
                        </router-link>
                        <router-link  class="auth-button" :to="{ name: 'Signup' }">
                            <button class="btn">SIGN UP</button>
                        </router-link>
                </div>
            </div>
        </header>
        <div class="section-1">
            <div class="text">
                <h4>All your memories in one place</h4>
                <p>Keep all your memories right next to you. Welcome to the leader of online yearbook systems. Save all your memories
                here and keep your story in check</p>
            </div>
            <div class="img-background"></div>
        </div>
        <div class="section-2">
            <div class="text">
                <h4>The largest yearbook collection</h4>
                <p>Keep all your memories right next to you. Welcome to the leader of online yearbook systems. Save all your memories
                here and keep your story in check</p>
            </div>
            <div class="img-background"></div>
        </div>
        <div class="section-3">
            <div class="top-panel">
                <h3>{{ dialog_title }}</h3>
                <p>{{ dialog_content }}</p>
            </div>
            <div class="img-section" v-if="yearbook_dialog">
                    <div class="">
                       <!-- team-img -->
                       <div class="team-block">
                           <div class="team-img">
                               <img src="https://www.w3schools.com/bootstrap/paris.jpg" alt="">
                               <div class="team-content">
                                   <p class="team-meta">Covenant University</p>
                                   <p class="team-meta">Class of 2018</p>
                               </div>
                           </div>
                       </div>
                   </div>
                    <div class="">
                       <!-- team-img -->
                       <div class="team-block">
                           <div class="team-img">
                               <img src="https://www.w3schools.com/bootstrap/paris.jpg" alt="">
                               <div class="team-content">
                                   <p class="team-meta">Covenant University</p>
                                   <p class="team-meta">Class of 2018</p>
                               </div>
                           </div>
                       </div>
                   </div>
            </div>
            <!-- memories -->
            <div class="img-section" v-if="memory_dialog">
                    <div class="">
                       <!-- team-img -->
                       <div class="team-block">
                           <div class="team-img">
                               <img src="https://www.w3schools.com/bootstrap/paris.jpg" alt="">
                               <div class="team-content">
                                   <p class="team-meta">Covenant University</p>
                                   <p class="team-meta">Class of 2018</p>
                               </div>
                           </div>
                       </div>
                   </div>
                    <div class="">
                       <!-- team-img -->
                       <div class="team-block">
                           <div class="team-img">
                               <img src="/imgs/download.png" alt="">
                               <div class="team-content">
                                   <p class="team-meta">Covenant University</p>
                                   <p class="team-meta">Class of 2018</p>
                               </div>
                           </div>
                       </div>
                   </div>
            </div>
            <div class="yearbook-memory-section text-center">
                <span class="fa fa-chevron-right  text-center " @click="next_dialog"></span>
            </div>

        </div>

        <DividerComponent></DividerComponent>
        <FooterComponent></FooterComponent>
    </div>
</template>
<script>
    import DividerComponent from "./DividerComponent.vue"
    import NavbarComponent from "./NavbarComponent.vue"
    import FooterComponent from "./FooterComponent.vue"

    export default {
        data() {
            return {
                yearbook_dialog: true,
                memory_dialog: false,
                dialog_title: "Yearbooks",
                dialog_content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            }
        },
        methods: {
            next_dialog() {
                if (this.memory_dialog == true) this.memory_dialog = false;
                else if (this.memory_dialog == false) {
                    this.memory_dialog = true;
                    this.dialog_title = "Memories";
                    this.dialog_content =
                        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
                }
                if (this.yearbook_dialog == true) this.yearbook_dialog = false;
                else if (this.yearbook_dialog == false) {
                    this.yearbook_dialog = true;
                    this.dialog_title = "Yearbooks";
                    this.dialog_content =
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
                }
            }
        },
        components: {
            DividerComponent,
            NavbarComponent,
            FooterComponent
        }
    }
</script>