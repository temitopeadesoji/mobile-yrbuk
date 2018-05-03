<template>
    <div class="footer-content">
            <back-to-top> <button id="scroll-to-top" title="Go to top"><span class="fa fa-chevron-up"></span></button></back-to-top>
        
            <div class="section-1">
                <h3>Quick Links</h3>
                <p>
                    <router-link :to="{ name: 'Home' }">Home</router-link>
                </p>
                <p>
                    <router-link :to="{ name: 'Yearbooks' }">Yearbooks</router-link>
                </p>
                <p>
                    <router-link :to="{ name: 'Contact' }">Contact Us</router-link>
                </p>
                <h3>Access</h3>
                <p>
                    <router-link :to="{ name: 'Login' }">Login</router-link>
                </p>
                <p>
                    <router-link :to="{ name: 'Signup' }">Sign Up</router-link>
                </p>
                <h3>Legal</h3>
                <p>
                    <router-link :to="{ name: 'privacy-policy' }">Privacy Policy</router-link>
                </p>
                <p>
                    <router-link :to="{ name: 'terms-conditions' }">Terms & Conditions</router-link>
                </p>
                <h3>We're Online</h3>
                <p class="social-icons">
                        <i class="fa fa-instagram"></i>
                        <i class="fa fa-twitter"></i>
                        <i class="fa fa-facebook"></i>
                </p>
            </div>
            <div class="section-2">
                <p>
                    <img src="/imgs/logo-sm.png" alt="logo" class="logo"> 
                </p>
                <h2 class="site-name">YrbUK</h2>
            &copy; 2018 yearbuk.me all rights reserved.
            </div>
    </div>
</template>