<template>
    <div>
        <vue-headful 
            :title="'class of '+ event_year +' '+ event_title+' | Yrbuk'"
            :description="event_description"
            :image="event_banner[0]"
        />

        <!-- navbar -->
        <NavbarComponent></NavbarComponent>

        <!-- content -->
        <div class="main-page-content">
        <div class="sub-profile">

                <Loading style="text-align:center; margin-top:70px;" v-if="IsLoading"></Loading>

                <div class="event-details" style="height:100%;" v-if="!IsLoading">
                    <!-- Banner -->
                    <div class="hero-image" v-bind:style="{ backgroundImage: 'url(' + event_banner[0] + ')' }">
                        <div class="hero-text">
                            <h1 style="font-size:50px" v-text="event_title"></h1>
                            <p v-text="event_description"></p>
                            <small v-text="'By '+added_by" style="font-size:16px; font-weight:600;"></small>
                            <div class="social-share">
                                <span class="fa fa-facebook-square" @click="ImageAction(event_id,'facebook')" title="share this on facebook"></span>
                                <span class="fa fa-twitter-square" @click="ImageAction(event_id,'twitter')" title="share this on twitter"></span>
                            </div>
                        </div>
                        <div class="gradientback"></div>
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

<script type="text/javascript">
    import NavbarComponent from "./NavbarComponent.vue";
    import {
        get
    } from '../../helpers/api';
    import Auth from '../../storage/auth';
    import Loading from './LoadingComponent.vue';
    import baguetteBox from 'baguettebox.js';
    export default {
        components: {
            NavbarComponent,
            Loading
        },
        data() {
            return {
                event_title: '',
                event_description: '',
                added_by: '',
                event_pictures: [],
                event_banner: [],
                IsLoading: true,
                event_id: this.$route.params.id,
                event_year: this.$route.params.year,
                picture_items: []
            }
        },
        created() {
            this.EventDetails();

        },
        mounted() {

        },
        methods: {
            EventDetails() {
                this.IsLoading = true;
                get('http://gmkyrbuk.cloudapp.net/api/events/details/' + this.event_id)
                    .then((res) => {
                        this.IsLoading = false;
                        var result = res.data;
                        this.added_by = result.added_by;
                        this.event_title = result.title;
                        this.event_description = result.description;
                        this.event_banner = result.banner;
                        this.event_pictures = result.pictures;

                        this.$nextTick(function () {
                            this.downloadPhotos();
                        })
                    }).catch((err) => {

                        // go to login
                        if (err.response.status === 401) {
                            this.$router.push('/login');
                        }

                    })
            },
            downloadPhotos() {

                const vueEnv = this;

                window.setTimeout(() => { //simulate download
                    for (var index in vueEnv.event_pictures) {
                        vueEnv.picture_items.push(vueEnv.event_pictures[index]);
                    }
                    this.$nextTick(() => {
                        baguetteBox.run('#pictures', {
                            filter: /.*/
                        });
                    });
                }, 1000);
            },
            ImageAction(url,action) {
                if(action == 'download') {
                    window.open(url, '_blank');
                }else if(action == 'facebook') {
                    window.open('https://www.facebook.com/dialog/feed?app_id=167619493908551&display=page&description='+this.event_description+'&link=http://gmkyrbuk.cloudapp.net/api/share/event/'+url+'&redirect_uri=http://www.facebook.com&name='+this.event_title+' &picture='+this.event_banner[0]+'', '_blank');
                }else if(action == 'twitter') {
                    window.open("http://twitter.com/share?url=http://gmkyrbuk.cloudapp.net/api/share/event/"+url, '_blank');
                }
            }

        }
    }
</script>