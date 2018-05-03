<template>
    <div>
        <modal name="QuestionsModal" @opened="" :click-to-close="false" :scrollable="false" :adaptive="true">
            <div class="modal-content">
                <div class="modal-head">
                    <a href="javascript:;" title="skip process" @click="hideModal">skip</a>
                    <h3 style="color:#818181; text-align:center;">Let's complete your profile</h3>
                </div>
                <div class="modal-body" style="margin:0px 20px;">
                    <ImageCropUpload></ImageCropUpload>
                    <YearBookQuestions></YearBookQuestions>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
    import iziToast from '../../helpers/iziToast'  
    import { get, post } from '../../helpers/api';
    import Auth from '../../storage/auth';
    import YearBookQuestions from './YearBookQuestionsComponent';
    import ImageCropUpload from "./ImageCropUploadComponent.vue";
    export default {
        components:{
            YearBookQuestions,
            ImageCropUpload
        },
        data() {
            return {
                form: {
                    avatar: '',
                    user_answer: []
                },
                QuestionsLoading:true,
                isDisabled: false,
                maxWord: 250,
                questions: {},
            }
        },
        methods: {
            hideModal() {
                this.$modal.hide('QuestionsModal');
            },
        }
    }
</script>