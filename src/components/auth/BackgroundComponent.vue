<template>
        <div class="col-md-6 login-bg">
            <div class="content">
                <router-link :to="{ name: 'Home' }">
                    <img src="imgs/logo-sm.png" alt="logo" class="logo">
                    <h2 class="title">YrbUK</h2>
                </router-link>
                <div class="links text-center">
                    <router-link class="link" :to="{ name: 'Login' }">Login</router-link>
                    
                    <router-link class="link" :to="{ name: 'Signup' }">Sign Up</router-link>
                </div>
            </div>
        </div>
</template>