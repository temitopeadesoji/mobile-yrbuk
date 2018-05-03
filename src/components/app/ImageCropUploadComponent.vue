<template>
    <div style="text-align:center;">
        <!-- the result -->
        <div class="">
                <center>
                    <LetterAvatar :username="uname"  class="img img-circle" v-if="cropped == ''" :size="150" color="#FFFFFF" :rounded="true"></LetterAvatar>
                </center>
                <clazy-load :src="cropped" v-if="cropped != '' ">
                    <img :src="cropped" class="img user-img img-circle" style="margin:5px 5px;" alt="avatar" slot="image">
                    <div slot="placeholder">
                        <Loading></Loading>
                    </div>
                </clazy-load>
            <span class="fa fa-pencil" title="change your avatar"  @click="NewImg()" style="top:100px; position:absolute; margin-left:85px; cursor:pointer;"></span>
        </div>
        <!-- Rotate angle is Number -->

        <modal name="crop-img-modal" :click-to-close="false">
            <div class="modal-content">
                <div class="modal-head">
                    <a href="javascript:;" title="cancel" @click="cancleCrop()"><span class="fa fa-times" style="color:#377262;"></span></a>
                </div>
                <div class="modal-body" >
                    <vue-croppie ref=croppieRef :enableOrientation="true" :enableResize="false" :mouseWheelZoom="true" :viewport="{ width: 300, height: 300, type: 'square' }" @result="result"></vue-croppie>
                </div>
                <div class="modal-footer">
                    <!-- <button >Crop Via Callback</button> -->
                    <div class="button text-center">
                        <button class="btn" @click="crop()" type="submit">Done</button>
                    </div>
                </div>
            </div>
        </modal>

        <input type="file" id="FileInput" style="visibility:hidden;" @change="readURL($event);">
    </div>
</template>

<style lang="css" scoped>
    .btn {
        background: #377262;
        color: #fcfcfc;
        text-transform: uppercase;
        padding: 8px 75px;
        font-size: 16px;
    }
</style>
<script>
    import { post, get } from '../../helpers/api';
    import iziToast from '../../helpers/iziToast';
    import Auth from '../../storage/auth';
    import Loading from './LoadingComponent.vue';
    import LetterAvatar from 'vue-avatar';
export default {
    components:{
        Loading,
        LetterAvatar
    },
    data() {
        return {
            cropped: '',
            uname: Auth.state.name,
            form:{ avatar:'', institution: Auth.state.u_institution, class: Auth.state.u_class  },
            options: {
                format: 'jpeg', 
                circle: false,
                square: true,
            }
        }
    },mounted() {
        if(Auth.state.avatar && Auth.state.avatar != "" && Auth.state.avatar != null){
            this.cropped = Auth.state.avatar;
        }else{
            this.cropped = '';
        }
    },
    methods: {
        // CALBACK USAGE
        crop() {
            this.$refs.croppieRef.result(this.options, (output) => {
                this.cropped = output;
                this.form.avatar = output;
                this.$modal.hide('crop-img-modal');
            });

            post('/api/user/add/avatar', this.form)
                .then((res) => {
                    if (res.data.img) {
                        var AuthData = Auth.state;
                        AuthData.avatar = res.data.img;
                        Auth.update(AuthData);
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
        },
        // EVENT USAGE
        cropViaEvent() {
            this.$refs.croppieRef.result(this.options);
        },
        result(output) {
            this.cropped = output;
        },
        NewImg(){
            document.getElementById("FileInput").click();
        },
        readURL(e) {
            var files = e.target.files || e.dataTransfer.files;
            var file = files[0];
            if(file){
                this.$modal.show('crop-img-modal');
            }

            var reader = new FileReader();
            reader.onload = (e) => {
                this.$refs.croppieRef.bind({
                    url: e.target.result,
                });
            };
            reader.readAsDataURL(file);
        },
        createImage(img) {
            let reader = new FileReader();
            let vm = this;
            reader.onload = (e) => {
                vm.form.avatar = e.target.result;
            };
            
            reader.readAsDataURL(img);
        },
        cancleCrop() {
            this.$modal.hide('crop-img-modal');
        }
    }
}
</script>