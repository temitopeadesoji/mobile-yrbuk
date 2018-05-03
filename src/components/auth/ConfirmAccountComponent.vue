<template>
    <div style="height:100%; text-align:center;">
        <span class="fa fa-spinner fa-spin isLoading-Spinner" style="margin-top:50px;"></span>
        <p>processing your request...</p>
    </div>
</template>
<script>
    import iziToast from '../../helpers/iziToast'
    import Auth from '../../storage/auth'
    import { post } from '../../helpers/api'
    export default {
        data() {
            return {
                form: {
                    key: '',
                }
            }
        },
        mounted() {
            if(this.$route.query.token){
                this.form.key = this.$route.query.token;
                            post('/api/mail/confirm-key', this.form)
                .then((res) => {
                    var message = res.data.success;
                    if (message) {
                        this.$toast.success(message, "", iziToast.success);
                    }
                    this.$router.push('/login');
                })
                .catch((err) => {
                   
                    var message = err.response.data.error;
                    if (message) {
                        this.$toast.error(message, "", iziToast.error);
                    }
                    this.$router.push('/login');

                })
            }else{
                this.$toast.error("Activation token is required", "", iziToast.error);
                this.$router.push('/login');
            }

        }
    }
</script>